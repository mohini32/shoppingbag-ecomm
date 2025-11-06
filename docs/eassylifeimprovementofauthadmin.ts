// contexts/AuthContext.tsx
export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [permissions, setPermissions] = useState([]);

  useEffect(() => {
    initializeAuth();
  }, []);

  const initializeAuth = async () => {
    const token = tokenUtils.get();
    if (token) {
      try {
        // ✅ Single API call for user + permissions
        const response = await fetch('/admin-api/me', {
          headers: { 'admin-auth-token': token }
        });
        const data = await response.json();
        setUser(data.admin);
        setPermissions(data.permissions);
      } catch (error) {
        tokenUtils.remove();
      }
    }
    setLoading(false);
  };

  const login = async (username, password) => {
    const response = await loginAPI(username, password);
    if (response.success) {
      tokenUtils.set(response.token);
      setUser(response.admin);
      setPermissions(response.permissions);
    }
  };

  const logout = () => {
    tokenUtils.remove();
    setUser(null);
    setPermissions([]);
  };

  return (
    <AuthContext.Provider value={{
      user,
      loading,
      permissions,
      login,
      logout,
      isAuthenticated: !!user
    }}>
      {children}
    </AuthContext.Provider>
  );
}







// contexts/AuthContext.tsx
interface AuthContextType {
  // User State
  user: User | null;
  loading: boolean;
  
  // Role & Permissions
  role: 'super_admin' | 'manager' | 'spoc' | 'provider' | 'b2b_customer' | null;
  permissions: string[];
  assignedClients: string[];
  
  // Access Control Methods
  hasPermission: (permission: string) => boolean;
  canAccessClient: (clientId: string) => boolean;
  canAccessB2B: () => boolean;
  canAccessAdmin: () => boolean;
  
  // Auth Methods
  login: (credentials: LoginCredentials, userType: UserType) => Promise<void>;
  logout: () => void;
  switchRole: (newRole: string) => Promise<void>;
}

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [role, setRole] = useState(null);
  const [permissions, setPermissions] = useState([]);
  const [assignedClients, setAssignedClients] = useState([]);
  const [loading, setLoading] = useState(true);

  // ✅ SINGLE initialization for ALL token types
  useEffect(() => {
    initializeAuth();
  }, []);

  const initializeAuth = async () => {
    try {
      // Check all possible token locations
      const adminToken = localStorage.getItem('token') || localStorage.getItem('adminToken');
      const providerToken = localStorage.getItem('providerToken');
      const b2bToken = getCookie('b2b_customer_token');
      
      let authData = null;
      
      if (adminToken) {
        authData = await verifyAdminToken(adminToken);
      } else if (providerToken) {
        authData = await verifyProviderToken(providerToken);
      } else if (b2bToken) {
        authData = await verifyB2BToken(b2bToken);
      }
      
      if (authData) {
        setUser(authData.user);
        setRole(authData.role);
        setPermissions(authData.permissions);
        setAssignedClients(authData.assignedClients || []);
      }
    } catch (error) {
      console.error('Auth initialization failed:', error);
      clearAllTokens();
    } finally {
      setLoading(false);
    }
  };

  // ✅ UNIFIED login for all user types
  const login = async (credentials, userType) => {
    let response;
    
    switch (userType) {
      case 'admin':
        response = await adminLogin(credentials);
        localStorage.setItem('token', response.token);
        break;
      case 'provider':
        response = await providerLogin(credentials);
        localStorage.setItem('providerToken', response.token);
        break;
      case 'b2b_customer':
        response = await b2bLogin(credentials);
        // Token stored in httpOnly cookie by backend
        break;
    }
    
    setUser(response.user);
    setRole(response.role);
    setPermissions(response.permissions);
    setAssignedClients(response.assignedClients || []);
  };

  // ✅ SMART permission checking
  const hasPermission = useCallback((permission: string) => {
    if (role === 'super_admin') return true;
    return permissions.includes(permission) || permissions.includes('*');
  }, [role, permissions]);

  // ✅ CLIENT access control for SPOC system
  const canAccessClient = useCallback((clientId: string) => {
    if (['super_admin', 'manager'].includes(role)) return true;
    return assignedClients.includes(clientId);
  }, [role, assignedClients]);

  // ✅ FEATURE access control
  const canAccessB2B = useCallback(() => {
    return ['super_admin', 'manager', 'spoc'].includes(role);
  }, [role]);

  const canAccessAdmin = useCallback(() => {
    return ['super_admin', 'manager'].includes(role);
  }, [role]);

  // ✅ UNIFIED logout
  const logout = () => {
    clearAllTokens();
    setUser(null);
    setRole(null);
    setPermissions([]);
    setAssignedClients([]);
    router.push('/auth/login');
  };

  return (
    <AuthContext.Provider value={{
      user, loading, role, permissions, assignedClients,
      hasPermission, canAccessClient, canAccessB2B, canAccessAdmin,
      login, logout
    }}>
      {children}
    </AuthContext.Provider>
  );
}



function B2BCustomersPage() {
  const { canAccessB2B, hasPermission, loading } = useAuth();
  
  if (loading) return <div>Loading...</div>;
  if (!canAccessB2B()) return <div>Access Denied</div>;
  
  return (
    <div>
      <h1>B2B Customers</h1>
      {hasPermission('/b2b/customers/create') && (
        <Button>Add Customer</Button>
      )}
    </div>
  );
}



function SPOCOrdersList() {
  const { canAccessClient, assignedClients, role } = useAuth();
  
  const filteredOrders = orders.filter(order => {
    if (['super_admin', 'manager'].includes(role)) return true;
    return canAccessClient(order.customer_id);
  });
  
  return <OrdersList orders={filteredOrders} />;
}





function AdminSidebar() {
  const { canAccessB2B, canAccessAdmin, hasPermission } = useAuth();
  
  return (
    <nav>
      {canAccessAdmin() && <Link href="/admin/users">User Management</Link>}
      {canAccessB2B() && <Link href="/admin/b2b">B2B Management</Link>}
      {hasPermission('/admin/analytics') && <Link href="/admin/analytics">Analytics</Link>}
    </nav>
  );
}