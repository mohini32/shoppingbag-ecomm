# 🚀 React/Next.js/TypeScript Beginner to Interview Ready - 18 Days Roadmap
## October 8-25, 2025 | From Zero to Full-Stack Hero

> **Your Situation:** You know React/Next.js names but not in-depth. ZERO TypeScript & Tailwind knowledge. You've worked on eassylife React frontend but relied heavily on AI.
> **Goal:** Become interview-ready for Full-Stack Developer positions (Node.js + Next.js)

---

## 📋 Pre-Study Setup (Do This First!)

### Your Eassylife React Project Analysis:
```
✅ Uses Next.js 14 with App Router (not Pages Router!)
✅ TypeScript enabled (tsconfig.json)
✅ Tailwind CSS for styling
✅ Shadcn/ui component library (@radix-ui)
✅ React Hook Form + Zod for forms
✅ Axios for API calls
✅ Context API for state management
✅ Middleware for authentication
```

### Install Tools:
```bash
# 1. Check Node.js version
node --version  # Should be v18+ or v20+

# 2. VS Code Extensions (Install these!)
- ES7+ React/Redux/React-Native snippets
- Tailwind CSS IntelliSense
- TypeScript Error Translator
- Pretty TypeScript Errors

# 3. Navigate to your React project
cd d:\eassylife\React

# 4. Install dependencies (if not already)
npm install

# 5. Run development server
npm run dev
# Open: http://localhost:3000
```

---

## 🎯 WEEK 1: REACT & TYPESCRIPT FUNDAMENTALS (Oct 8-14)

### **DAY 1 (Oct 8) - React Basics & Your First Component**

#### Morning Session (2 hours) - Understanding React

**1. What is React?**
```
React = JavaScript library for building user interfaces
Think of it like LEGO blocks for websites:
- Each block = Component (reusable piece of UI)
- Combine blocks = Complete website

Traditional way (HTML):
<div>
  <h1>Hello</h1>
  <p>Welcome</p>
</div>

React way:
function Greeting() {
  return (
    <div>
      <h1>Hello</h1>
      <p>Welcome</p>
    </div>
  );
}
```

**2. JSX - JavaScript + HTML**
```jsx
// JSX looks like HTML but it's JavaScript
function Welcome() {
  const name = "John";
  const isLoggedIn = true;
  
  return (
    <div>
      {/* Use {} for JavaScript expressions */}
      <h1>Hello, {name}!</h1>
      
      {/* Conditional rendering */}
      {isLoggedIn ? <p>Welcome back!</p> : <p>Please login</p>}
      
      {/* className instead of class */}
      <button className="btn-primary">Click me</button>
    </div>
  );
}
```

**3. Components - Two Types**
```jsx
// 1. Function Component (Modern way - we use this!)
function Button() {
  return <button>Click me</button>;
}

// 2. Class Component (Old way - you'll see in legacy code)
class Button extends React.Component {
  render() {
    return <button>Click me</button>;
  }
}

// We ONLY use Function Components in modern React!
```

#### Afternoon Session (2 hours) - Hands-on Practice

**4. Create Your First Component**
```jsx
// Create file: components/practice/MyFirstComponent.tsx
// Note: .tsx = TypeScript + JSX

export default function MyFirstComponent() {
  return (
    <div>
      <h1>My First React Component!</h1>
      <p>This is amazing!</p>
    </div>
  );
}

// Use it in a page:
// app/practice/page.tsx
import MyFirstComponent from '@/components/practice/MyFirstComponent';

export default function PracticePage() {
  return (
    <div>
      <MyFirstComponent />
    </div>
  );
}
```

**5. Props - Passing Data to Components**
```jsx
// Component that receives props
function UserCard(props) {
  return (
    <div>
      <h2>{props.name}</h2>
      <p>Age: {props.age}</p>
      <p>Email: {props.email}</p>
    </div>
  );
}

// Using the component
function App() {
  return (
    <div>
      <UserCard name="John" age={25} email="john@example.com" />
      <UserCard name="Jane" age={30} email="jane@example.com" />
    </div>
  );
}

// Modern way - Destructuring props
function UserCard({ name, age, email }) {
  return (
    <div>
      <h2>{name}</h2>
      <p>Age: {age}</p>
      <p>Email: {email}</p>
    </div>
  );
}
```

**6. Practice Exercise**
```jsx
// Create a ProductCard component
// File: components/practice/ProductCard.tsx

export default function ProductCard({ name, price, image, inStock }) {
  return (
    <div className="border p-4 rounded">
      <img src={image} alt={name} className="w-full h-48 object-cover" />
      <h3 className="text-xl font-bold mt-2">{name}</h3>
      <p className="text-green-600 text-lg">${price}</p>
      {inStock ? (
        <span className="text-green-500">In Stock</span>
      ) : (
        <span className="text-red-500">Out of Stock</span>
      )}
      <button className="bg-blue-500 text-white px-4 py-2 rounded mt-2">
        Add to Cart
      </button>
    </div>
  );
}

// Use it:
function Shop() {
  return (
    <div className="grid grid-cols-3 gap-4">
      <ProductCard 
        name="Laptop" 
        price={999} 
        image="/laptop.jpg" 
        inStock={true} 
      />
      <ProductCard 
        name="Phone" 
        price={699} 
        image="/phone.jpg" 
        inStock={false} 
      />
    </div>
  );
}
```

#### Interview Questions:
1. **Q: What is React?**
   - A: "React is a JavaScript library for building user interfaces using reusable components. It uses a virtual DOM for efficient updates and follows a component-based architecture."

2. **Q: What is JSX?**
   - A: "JSX is a syntax extension for JavaScript that looks like HTML. It gets compiled to React.createElement() calls. We use it to describe what the UI should look like."

3. **Q: What are props?**
   - A: "Props (properties) are how we pass data from parent components to child components. They're read-only and flow in one direction (top-down)."

4. **Q: What's the difference between function and class components?**
   - A: "Function components are simpler, use hooks for state/lifecycle, and are the modern standard. Class components use this.state and lifecycle methods, but are legacy."

---

### **DAY 2 (Oct 9) - TypeScript Basics (From Absolute Zero)**

#### Morning Session (2 hours) - What is TypeScript?

**1. Understanding TypeScript**
```typescript
// JavaScript (no types)
function add(a, b) {
  return a + b;
}
add(5, 3);        // 8 ✅
add("5", "3");    // "53" ❌ (string concatenation, not addition!)
add(5, "hello");  // "5hello" ❌ (makes no sense!)

// TypeScript (with types)
function add(a: number, b: number): number {
  return a + b;
}
add(5, 3);        // 8 ✅
add("5", "3");    // ❌ Error: Argument of type 'string' is not assignable to parameter of type 'number'
add(5, "hello");  // ❌ Error caught before running!

// TypeScript = JavaScript + Type Safety
// Catches errors BEFORE you run the code!
```

**2. Basic Types**
```typescript
// Primitive types
let name: string = "John";
let age: number = 25;
let isActive: boolean = true;
let nothing: null = null;
let notDefined: undefined = undefined;

// Arrays
let numbers: number[] = [1, 2, 3, 4, 5];
let names: string[] = ["John", "Jane", "Bob"];
let mixed: (string | number)[] = [1, "two", 3, "four"];

// Objects
let user: { name: string; age: number } = {
  name: "John",
  age: 25
};

// Any (avoid this! defeats the purpose of TypeScript)
let anything: any = "hello";
anything = 123;  // No error, but not recommended
```

**3. Interfaces - Defining Object Shapes**
```typescript
// Define the shape of an object
interface User {
  id: number;
  name: string;
  email: string;
  age?: number;  // ? means optional
  isActive: boolean;
}

// Use the interface
const user1: User = {
  id: 1,
  name: "John",
  email: "john@example.com",
  isActive: true
  // age is optional, so we can skip it
};

const user2: User = {
  id: 2,
  name: "Jane",
  email: "jane@example.com",
  age: 30,
  isActive: false
};

// Function using interface
function greetUser(user: User): string {
  return `Hello, ${user.name}!`;
}

greetUser(user1);  // ✅
greetUser({ name: "Bob" });  // ❌ Error: missing required properties
```

#### Afternoon Session (2 hours) - TypeScript in React

**4. Typing React Components**
```typescript
// Component with typed props
interface ButtonProps {
  text: string;
  onClick: () => void;
  disabled?: boolean;
  variant?: 'primary' | 'secondary';  // Only these values allowed
}

function Button({ text, onClick, disabled = false, variant = 'primary' }: ButtonProps) {
  return (
    <button 
      onClick={onClick} 
      disabled={disabled}
      className={variant === 'primary' ? 'bg-blue-500' : 'bg-gray-500'}
    >
      {text}
    </button>
  );
}

// Usage
<Button text="Click me" onClick={() => console.log('Clicked!')} />
<Button text="Submit" onClick={handleSubmit} variant="secondary" />
```

**5. Type vs Interface**
```typescript
// Interface (preferred for objects)
interface User {
  name: string;
  age: number;
}

// Type (more flexible)
type User = {
  name: string;
  age: number;
};

// Type can do more:
type ID = string | number;  // Union type
type Status = 'pending' | 'approved' | 'rejected';  // Literal types

// When to use what?
// Interface: For object shapes, especially React props
// Type: For unions, intersections, primitives
```

**6. Real Example from Your Eassylife Code**
```typescript
// From your codebase: React\src\lib\api.tsx
interface LoginResponse {
  status: boolean;
  message: string;
  data?: {
    token: string;
    admin: {
      id: string;
      username: string;
      email: string;
    };
  };
}

// API function with types
export const login = async (
  username: string, 
  password: string
): Promise<LoginResponse> => {
  const response = await axios.post(`${BASE_URL}/login`, {
    username,
    password,
  });
  
  return response.data;
};

// Now TypeScript knows exactly what login() returns!
// You get autocomplete and error checking
```

**7. Practice Exercise**
```typescript
// Create a typed component
// File: components/practice/UserProfile.tsx

interface UserProfileProps {
  user: {
    id: number;
    name: string;
    email: string;
    role: 'admin' | 'user' | 'guest';
    avatar?: string;
  };
  onEdit: (userId: number) => void;
  onDelete: (userId: number) => void;
}

export default function UserProfile({ user, onEdit, onDelete }: UserProfileProps) {
  return (
    <div className="border p-4 rounded">
      {user.avatar && <img src={user.avatar} alt={user.name} />}
      <h2>{user.name}</h2>
      <p>{user.email}</p>
      <span className={
        user.role === 'admin' ? 'text-red-500' : 
        user.role === 'user' ? 'text-blue-500' : 
        'text-gray-500'
      }>
        {user.role}
      </span>
      <button onClick={() => onEdit(user.id)}>Edit</button>
      <button onClick={() => onDelete(user.id)}>Delete</button>
    </div>
  );
}
```

#### Interview Questions:
1. **Q: What is TypeScript?**
   - A: "TypeScript is a superset of JavaScript that adds static typing. It catches errors at compile-time rather than runtime, provides better IDE support, and makes code more maintainable."

2. **Q: What's the difference between interface and type?**
   - A: "Both define object shapes. Interface is extendable and better for objects/React props. Type is more flexible and can represent unions, intersections, and primitives."

3. **Q: Why use TypeScript in React?**
   - A: "TypeScript provides type safety for props, state, and API responses. It catches errors early, provides autocomplete, makes refactoring safer, and serves as documentation."

4. **Q: What is the any type?**
   - A: "any disables type checking for a variable. It should be avoided as it defeats TypeScript's purpose. Use unknown or specific types instead."

---

### **DAY 3 (Oct 10) - React State & useState Hook**

#### Morning Session (2 hours) - Understanding State

**1. What is State?**
```jsx
// Without state (static - never changes)
function Counter() {
  let count = 0;  // This won't work!

  function increment() {
    count = count + 1;
    console.log(count);  // Logs 1, 2, 3...
    // But UI doesn't update! ❌
  }

  return (
    <div>
      <p>Count: {count}</p>
      <button onClick={increment}>Increment</button>
    </div>
  );
}

// With state (dynamic - triggers re-render)
import { useState } from 'react';

function Counter() {
  const [count, setCount] = useState(0);
  //     ↑       ↑           ↑
  //   value  setter    initial value

  function increment() {
    setCount(count + 1);  // Updates state AND re-renders UI ✅
  }

  return (
    <div>
      <p>Count: {count}</p>
      <button onClick={increment}>Increment</button>
    </div>
  );
}
```

**2. useState Hook Basics**
```typescript
import { useState } from 'react';

function Examples() {
  // String state
  const [name, setName] = useState<string>('');

  // Number state
  const [age, setAge] = useState<number>(0);

  // Boolean state
  const [isOpen, setIsOpen] = useState<boolean>(false);

  // Array state
  const [items, setItems] = useState<string[]>([]);

  // Object state
  const [user, setUser] = useState<{ name: string; age: number }>({
    name: '',
    age: 0
  });

  return (
    <div>
      <input
        value={name}
        onChange={(e) => setName(e.target.value)}
      />

      <button onClick={() => setAge(age + 1)}>
        Increment Age
      </button>

      <button onClick={() => setIsOpen(!isOpen)}>
        Toggle
      </button>

      <button onClick={() => setItems([...items, 'New Item'])}>
        Add Item
      </button>

      <button onClick={() => setUser({ ...user, age: user.age + 1 })}>
        Update User Age
      </button>
    </div>
  );
}
```

**3. Common State Patterns**
```typescript
// 1. Toggle boolean
const [isOpen, setIsOpen] = useState(false);
const toggle = () => setIsOpen(!isOpen);

// 2. Increment/Decrement
const [count, setCount] = useState(0);
const increment = () => setCount(count + 1);
const decrement = () => setCount(count - 1);

// 3. Update object (MUST spread existing properties!)
const [user, setUser] = useState({ name: 'John', age: 25 });
const updateName = (newName: string) => {
  setUser({ ...user, name: newName });  // ✅ Correct
  // setUser({ name: newName });  // ❌ Wrong! Loses age property
};

// 4. Update array
const [items, setItems] = useState<string[]>([]);
const addItem = (item: string) => {
  setItems([...items, item]);  // Add to end
};
const removeItem = (index: number) => {
  setItems(items.filter((_, i) => i !== index));
};
```

#### Afternoon Session (2 hours) - Building Interactive Components

**4. Todo List Example**
```typescript
// File: components/practice/TodoList.tsx
import { useState } from 'react';

interface Todo {
  id: number;
  text: string;
  completed: boolean;
}

export default function TodoList() {
  const [todos, setTodos] = useState<Todo[]>([]);
  const [inputValue, setInputValue] = useState('');

  const addTodo = () => {
    if (inputValue.trim() === '') return;

    const newTodo: Todo = {
      id: Date.now(),
      text: inputValue,
      completed: false
    };

    setTodos([...todos, newTodo]);
    setInputValue('');  // Clear input
  };

  const toggleTodo = (id: number) => {
    setTodos(todos.map(todo =>
      todo.id === id
        ? { ...todo, completed: !todo.completed }
        : todo
    ));
  };

  const deleteTodo = (id: number) => {
    setTodos(todos.filter(todo => todo.id !== id));
  };

  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold mb-4">Todo List</h1>

      <div className="flex gap-2 mb-4">
        <input
          type="text"
          value={inputValue}
          onChange={(e) => setInputValue(e.target.value)}
          onKeyPress={(e) => e.key === 'Enter' && addTodo()}
          placeholder="Add a todo..."
          className="border px-3 py-2 rounded flex-1"
        />
        <button
          onClick={addTodo}
          className="bg-blue-500 text-white px-4 py-2 rounded"
        >
          Add
        </button>
      </div>

      <ul className="space-y-2">
        {todos.map(todo => (
          <li
            key={todo.id}
            className="flex items-center gap-2 border p-2 rounded"
          >
            <input
              type="checkbox"
              checked={todo.completed}
              onChange={() => toggleTodo(todo.id)}
            />
            <span className={todo.completed ? 'line-through' : ''}>
              {todo.text}
            </span>
            <button
              onClick={() => deleteTodo(todo.id)}
              className="ml-auto text-red-500"
            >
              Delete
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
}
```

**5. Form with Multiple Inputs**
```typescript
interface FormData {
  name: string;
  email: string;
  age: number;
  country: string;
}

export default function UserForm() {
  const [formData, setFormData] = useState<FormData>({
    name: '',
    email: '',
    age: 0,
    country: ''
  });

  // Generic handler for all inputs
  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: name === 'age' ? parseInt(value) : value
    });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log('Form submitted:', formData);
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <input
        name="name"
        value={formData.name}
        onChange={handleChange}
        placeholder="Name"
        className="border px-3 py-2 rounded w-full"
      />

      <input
        name="email"
        type="email"
        value={formData.email}
        onChange={handleChange}
        placeholder="Email"
        className="border px-3 py-2 rounded w-full"
      />

      <input
        name="age"
        type="number"
        value={formData.age}
        onChange={handleChange}
        placeholder="Age"
        className="border px-3 py-2 rounded w-full"
      />

      <select
        name="country"
        value={formData.country}
        onChange={handleChange}
        className="border px-3 py-2 rounded w-full"
      >
        <option value="">Select Country</option>
        <option value="USA">USA</option>
        <option value="UK">UK</option>
        <option value="India">India</option>
      </select>

      <button
        type="submit"
        className="bg-blue-500 text-white px-4 py-2 rounded"
      >
        Submit
      </button>
    </form>
  );
}
```

#### Interview Questions:
1. **Q: What is state in React?**
   - A: "State is data that changes over time in a component. When state updates, React re-renders the component to reflect the changes in the UI."

2. **Q: What is the useState hook?**
   - A: "useState is a React hook that lets you add state to function components. It returns an array with the current state value and a function to update it."

3. **Q: Why can't we directly mutate state?**
   - A: "React uses reference equality to detect changes. Direct mutation doesn't create a new reference, so React won't re-render. We must create new objects/arrays using spread operator or methods like map/filter."

4. **Q: What happens when you call setState?**
   - A: "React schedules a re-render of the component. The update is asynchronous and may be batched with other updates for performance."

---

### **DAY 4 (Oct 11) - Tailwind CSS Basics (From Absolute Zero)**

#### Morning Session (2 hours) - What is Tailwind?

**1. Understanding Tailwind CSS**
```html
<!-- Traditional CSS -->
<style>
  .button {
    background-color: blue;
    color: white;
    padding: 8px 16px;
    border-radius: 4px;
  }
</style>
<button class="button">Click me</button>

<!-- Tailwind CSS (utility classes) -->
<button class="bg-blue-500 text-white px-4 py-2 rounded">
  Click me
</button>

<!-- Tailwind = Pre-built CSS classes for everything! -->
```

**2. Basic Utility Classes**
```html
<!-- Colors -->
<div class="bg-blue-500">Blue background</div>
<div class="text-red-500">Red text</div>
<div class="border-green-500">Green border</div>

<!-- Spacing (padding & margin) -->
<!-- p = padding, m = margin -->
<!-- t/r/b/l = top/right/bottom/left -->
<!-- x = left+right, y = top+bottom -->
<div class="p-4">Padding all sides (16px)</div>
<div class="px-4 py-2">Padding x=16px, y=8px</div>
<div class="mt-4">Margin top 16px</div>
<div class="mb-8">Margin bottom 32px</div>

<!-- Sizing -->
<div class="w-full">Width 100%</div>
<div class="w-1/2">Width 50%</div>
<div class="w-64">Width 256px</div>
<div class="h-screen">Height 100vh</div>

<!-- Text -->
<p class="text-sm">Small text</p>
<p class="text-lg">Large text</p>
<p class="text-2xl">Extra large text</p>
<p class="font-bold">Bold text</p>
<p class="text-center">Centered text</p>
```

**3. Flexbox with Tailwind**
```html
<!-- Horizontal layout -->
<div class="flex gap-4">
  <div>Item 1</div>
  <div>Item 2</div>
  <div>Item 3</div>
</div>

<!-- Center items -->
<div class="flex items-center justify-center h-screen">
  <div>Centered content</div>
</div>

<!-- Space between -->
<div class="flex justify-between">
  <div>Left</div>
  <div>Right</div>
</div>

<!-- Vertical layout -->
<div class="flex flex-col gap-2">
  <div>Item 1</div>
  <div>Item 2</div>
</div>
```

**4. Grid with Tailwind**
```html
<!-- 3 column grid -->
<div class="grid grid-cols-3 gap-4">
  <div>Column 1</div>
  <div>Column 2</div>
  <div>Column 3</div>
</div>

<!-- Responsive grid -->
<div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
  <!-- 1 column on mobile, 2 on tablet, 3 on desktop -->
  <div>Item 1</div>
  <div>Item 2</div>
  <div>Item 3</div>
</div>
```

#### Afternoon Session (2 hours) - Building UI with Tailwind

**5. Responsive Design**
```html
<!-- Breakpoints:
  sm: 640px
  md: 768px
  lg: 1024px
  xl: 1280px
  2xl: 1536px
-->

<!-- Hidden on mobile, visible on desktop -->
<div class="hidden md:block">
  Desktop only content
</div>

<!-- Different sizes on different screens -->
<div class="text-sm md:text-base lg:text-lg">
  Responsive text
</div>

<!-- Different layouts -->
<div class="flex flex-col md:flex-row">
  <!-- Vertical on mobile, horizontal on desktop -->
  <div>Item 1</div>
  <div>Item 2</div>
</div>
```

**6. Common Patterns**
```html
<!-- Card -->
<div class="border rounded-lg p-6 shadow-md bg-white">
  <h2 class="text-xl font-bold mb-2">Card Title</h2>
  <p class="text-gray-600">Card content goes here</p>
</div>

<!-- Button -->
<button class="bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded">
  Click me
</button>

<!-- Input -->
<input
  type="text"
  class="border border-gray-300 rounded px-3 py-2 w-full focus:outline-none focus:ring-2 focus:ring-blue-500"
  placeholder="Enter text..."
/>

<!-- Badge -->
<span class="bg-green-100 text-green-800 text-xs font-semibold px-2 py-1 rounded">
  Active
</span>
```

**7. Real Example from Your Eassylife Code**
```typescript
// From your codebase: React\src\app\auth\login\components\LoginForm.tsx
<Form {...form}>
  <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
    <FormField
      control={form.control}
      name="username"
      render={({ field }) => (
        <FormItem>
          <FormLabel>Username</FormLabel>
          <FormControl>
            <Input
              placeholder="Enter your username"
              {...field}
              className="w-full"
            />
          </FormControl>
          <FormMessage />
        </FormItem>
      )}
    />

    <Button
      type="submit"
      className="w-full"
      disabled={isLoading}
    >
      {isLoading ? (
        <>
          <LoaderCircle className="mr-2 h-4 w-4 animate-spin" />
          Logging in...
        </>
      ) : (
        'Login'
      )}
    </Button>
  </form>
</Form>
```

**8. Practice Exercise - Build a Profile Card**
```typescript
// File: components/practice/ProfileCard.tsx
interface ProfileCardProps {
  name: string;
  role: string;
  avatar: string;
  email: string;
  isOnline: boolean;
}

export default function ProfileCard({
  name,
  role,
  avatar,
  email,
  isOnline
}: ProfileCardProps) {
  return (
    <div className="max-w-sm mx-auto bg-white rounded-lg shadow-lg overflow-hidden">
      {/* Header with gradient */}
      <div className="h-32 bg-gradient-to-r from-blue-500 to-purple-600"></div>

      {/* Avatar */}
      <div className="relative px-6 -mt-16">
        <div className="relative">
          <img
            src={avatar}
            alt={name}
            className="w-32 h-32 rounded-full border-4 border-white object-cover"
          />
          {/* Online indicator */}
          {isOnline && (
            <div className="absolute bottom-2 right-2 w-4 h-4 bg-green-500 rounded-full border-2 border-white"></div>
          )}
        </div>
      </div>

      {/* Content */}
      <div className="px-6 py-4">
        <h2 className="text-2xl font-bold text-gray-800">{name}</h2>
        <p className="text-gray-600 text-sm">{role}</p>
        <p className="text-gray-500 text-sm mt-2">{email}</p>

        {/* Actions */}
        <div className="flex gap-2 mt-4">
          <button className="flex-1 bg-blue-500 hover:bg-blue-600 text-white font-semibold py-2 px-4 rounded transition">
            Message
          </button>
          <button className="flex-1 border border-blue-500 text-blue-500 hover:bg-blue-50 font-semibold py-2 px-4 rounded transition">
            Follow
          </button>
        </div>
      </div>

      {/* Stats */}
      <div className="border-t border-gray-200 px-6 py-4">
        <div className="flex justify-around text-center">
          <div>
            <p className="text-2xl font-bold text-gray-800">1.2K</p>
            <p className="text-gray-600 text-sm">Followers</p>
          </div>
          <div>
            <p className="text-2xl font-bold text-gray-800">543</p>
            <p className="text-gray-600 text-sm">Following</p>
          </div>
          <div>
            <p className="text-2xl font-bold text-gray-800">89</p>
            <p className="text-gray-600 text-sm">Posts</p>
          </div>
        </div>
      </div>
    </div>
  );
}
```

#### Interview Questions:
1. **Q: What is Tailwind CSS?**
   - A: "Tailwind is a utility-first CSS framework that provides low-level utility classes to build custom designs. Instead of writing custom CSS, you compose classes directly in HTML."

2. **Q: What are the benefits of Tailwind?**
   - A: "Faster development, no naming conflicts, smaller CSS bundle (with purging), consistent design system, responsive design built-in, and no context switching between HTML and CSS files."

3. **Q: How does responsive design work in Tailwind?**
   - A: "Tailwind uses mobile-first breakpoint prefixes (sm:, md:, lg:, xl:, 2xl:). Classes without prefix apply to all sizes, prefixed classes apply from that breakpoint up."

4. **Q: What is the difference between p-4 and px-4?**
   - A: "p-4 applies padding to all sides (16px). px-4 applies padding only to left and right (x-axis). Similarly, py-4 applies to top and bottom (y-axis)."

---

### **DAY 5 (Oct 12) - useEffect Hook & Side Effects**

#### Morning Session (2 hours) - Understanding useEffect

**1. What are Side Effects?**
```typescript
// Side effects = Things that happen OUTSIDE the component
// Examples:
// - Fetching data from API
// - Setting up timers
// - Subscribing to events
// - Updating document title
// - Reading from localStorage

import { useEffect } from 'react';

function Example() {
  // ❌ Don't do side effects directly in component body!
  fetch('/api/data');  // This runs on EVERY render!

  // ✅ Use useEffect for side effects
  useEffect(() => {
    fetch('/api/data');  // This runs only when needed
  }, []);

  return <div>Example</div>;
}
```

**2. useEffect Basics**
```typescript
import { useState, useEffect } from 'react';

function Component() {
  const [count, setCount] = useState(0);

  // Runs after EVERY render
  useEffect(() => {
    console.log('Component rendered');
  });

  // Runs only ONCE (on mount)
  useEffect(() => {
    console.log('Component mounted');
  }, []);  // Empty dependency array

  // Runs when count changes
  useEffect(() => {
    console.log('Count changed:', count);
  }, [count]);  // Dependency array with count

  // Cleanup function
  useEffect(() => {
    const timer = setInterval(() => {
      console.log('Tick');
    }, 1000);

    // Cleanup runs when component unmounts
    return () => {
      clearInterval(timer);
      console.log('Cleanup');
    };
  }, []);

  return <div>Count: {count}</div>;
}
```

**3. Common useEffect Patterns**
```typescript
// 1. Fetch data on mount
useEffect(() => {
  async function fetchData() {
    const response = await fetch('/api/users');
    const data = await response.json();
    setUsers(data);
  }

  fetchData();
}, []);

// 2. Update document title
useEffect(() => {
  document.title = `Count: ${count}`;
}, [count]);

// 3. Subscribe to events
useEffect(() => {
  function handleResize() {
    setWindowWidth(window.innerWidth);
  }

  window.addEventListener('resize', handleResize);

  return () => {
    window.removeEventListener('resize', handleResize);
  };
}, []);

// 4. Debounced search
useEffect(() => {
  const timer = setTimeout(() => {
    searchAPI(searchTerm);
  }, 500);

  return () => clearTimeout(timer);
}, [searchTerm]);
```

#### Afternoon Session (2 hours) - Fetching Data

**4. Complete Data Fetching Example**
```typescript
// File: components/practice/UserList.tsx
import { useState, useEffect } from 'react';

interface User {
  id: number;
  name: string;
  email: string;
  phone: string;
}

export default function UserList() {
  const [users, setUsers] = useState<User[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function fetchUsers() {
      try {
        setLoading(true);
        setError(null);

        const response = await fetch('https://jsonplaceholder.typicode.com/users');

        if (!response.ok) {
          throw new Error('Failed to fetch users');
        }

        const data = await response.json();
        setUsers(data);
      } catch (err) {
        setError(err instanceof Error ? err.message : 'An error occurred');
      } finally {
        setLoading(false);
      }
    }

    fetchUsers();
  }, []);

  if (loading) {
    return <div className="text-center p-4">Loading...</div>;
  }

  if (error) {
    return <div className="text-red-500 p-4">Error: {error}</div>;
  }

  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold mb-4">Users</h1>
      <div className="grid gap-4">
        {users.map(user => (
          <div key={user.id} className="border p-4 rounded">
            <h2 className="font-bold">{user.name}</h2>
            <p className="text-gray-600">{user.email}</p>
            <p className="text-gray-600">{user.phone}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
```

**5. Search with Debounce**
```typescript
import { useState, useEffect } from 'react';

export default function SearchUsers() {
  const [searchTerm, setSearchTerm] = useState('');
  const [results, setResults] = useState<User[]>([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    // Don't search if empty
    if (searchTerm.trim() === '') {
      setResults([]);
      return;
    }

    setLoading(true);

    // Debounce: wait 500ms after user stops typing
    const timer = setTimeout(async () => {
      try {
        const response = await fetch(`/api/search?q=${searchTerm}`);
        const data = await response.json();
        setResults(data);
      } catch (error) {
        console.error('Search failed:', error);
      } finally {
        setLoading(false);
      }
    }, 500);

    // Cleanup: cancel previous timer if user keeps typing
    return () => clearTimeout(timer);
  }, [searchTerm]);

  return (
    <div className="p-4">
      <input
        type="text"
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
        placeholder="Search users..."
        className="border px-3 py-2 rounded w-full"
      />

      {loading && <p className="mt-2">Searching...</p>}

      <div className="mt-4 space-y-2">
        {results.map(user => (
          <div key={user.id} className="border p-2 rounded">
            {user.name}
          </div>
        ))}
      </div>
    </div>
  );
}
```

**6. Real Example from Your Eassylife Code**
```typescript
// From: React\src\contexts\StatusOptionsContext.tsx
export function StatusOptionsProvider({ children }: StatusOptionsProviderProps) {
  const [statusOptions, setStatusOptions] = useState<StatusOption[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const loadStatusOptions = async () => {
    try {
      setLoading(true);
      setError(null);

      console.log('🔄 Loading status options from API...');
      const response = await fetchB2BStatusOptions();

      if (response.success) {
        setStatusOptions(response.data.status_options);
        console.log('✅ Status options loaded successfully');
      }
    } catch (err: any) {
      console.error('❌ Failed to load status options:', err);
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadStatusOptions();
  }, []);

  return (
    <StatusOptionsContext.Provider value={{ statusOptions, loading, error }}>
      {children}
    </StatusOptionsContext.Provider>
  );
}
```

#### Interview Questions:
1. **Q: What is useEffect?**
   - A: "useEffect is a React hook for performing side effects in function components. It runs after render and can optionally clean up before the component unmounts or before the next effect runs."

2. **Q: What is the dependency array in useEffect?**
   - A: "The dependency array controls when the effect runs. Empty array [] runs once on mount. With dependencies [count], runs when count changes. No array runs after every render."

3. **Q: What is the cleanup function in useEffect?**
   - A: "The cleanup function is returned from useEffect and runs before the component unmounts or before the effect runs again. It's used to cancel subscriptions, clear timers, or clean up resources."

4. **Q: Why do we need to handle loading and error states?**
   - A: "For better UX. Loading state shows feedback while fetching. Error state handles failures gracefully. This prevents blank screens and provides clear communication to users."

---

### **DAY 6 (Oct 13) - Next.js App Router Basics**

#### Morning Session (2 hours) - Understanding Next.js

**1. What is Next.js?**
```
React = Library for building UIs
Next.js = Framework built on React with extra features:
  ✅ File-based routing (no react-router needed!)
  ✅ Server-side rendering (SSR)
  ✅ API routes (backend in same project!)
  ✅ Image optimization
  ✅ Built-in TypeScript support
  ✅ Automatic code splitting
```

**2. App Router vs Pages Router**
```
Your eassylife project uses App Router (Next.js 13+)

Pages Router (Old):
pages/
  index.tsx        → /
  about.tsx        → /about
  users/[id].tsx   → /users/:id

App Router (New - what you use!):
app/
  page.tsx         → /
  about/
    page.tsx       → /about
  users/
    [id]/
      page.tsx     → /users/:id
```

**3. File Conventions in App Router**
```
app/
  layout.tsx       → Shared layout (wraps all pages)
  page.tsx         → Page component (the actual route)
  loading.tsx      → Loading UI (shown while page loads)
  error.tsx        → Error UI (shown when error occurs)
  not-found.tsx    → 404 page
  route.ts         → API route
```

**4. Your Eassylife Structure**
```typescript
// From your project:
React/src/app/
  layout.tsx              → Root layout (wraps everything)
  page.tsx                → Home page (/)

  admin/
    layout.tsx            → Admin layout
    page.tsx              → /admin

    booking/
      page.tsx            → /admin/booking
      add/
        page.tsx          → /admin/booking/add
      [id]/
        page.tsx          → /admin/booking/:id (dynamic route)

    sp-payout/
      page.tsx            → /admin/sp-payout

  auth/
    login/
      page.tsx            → /auth/login
```

#### Afternoon Session (2 hours) - Building Pages

**5. Creating a Simple Page**
```typescript
// File: app/practice/page.tsx
export default function PracticePage() {
  return (
    <div className="p-8">
      <h1 className="text-3xl font-bold">Practice Page</h1>
      <p className="mt-4">This is a Next.js page!</p>
    </div>
  );
}

// Access at: http://localhost:3000/practice
```

**6. Creating a Layout**
```typescript
// File: app/practice/layout.tsx
export default function PracticeLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div>
      {/* This header appears on all /practice/* pages */}
      <header className="bg-blue-500 text-white p-4">
        <h1>Practice Section</h1>
      </header>

      <main className="p-4">
        {children}  {/* Page content goes here */}
      </main>

      <footer className="bg-gray-200 p-4 text-center">
        Footer
      </footer>
    </div>
  );
}
```

**7. Dynamic Routes**
```typescript
// File: app/users/[id]/page.tsx
interface PageProps {
  params: {
    id: string;
  };
}

export default function UserPage({ params }: PageProps) {
  return (
    <div className="p-8">
      <h1 className="text-2xl font-bold">User ID: {params.id}</h1>
    </div>
  );
}

// /users/1 → shows "User ID: 1"
// /users/abc → shows "User ID: abc"
```

**8. Navigation Between Pages**
```typescript
import Link from 'next/link';
import { useRouter } from 'next/navigation';

export default function Navigation() {
  const router = useRouter();

  return (
    <div>
      {/* Declarative navigation with Link */}
      <Link href="/" className="text-blue-500">
        Home
      </Link>

      <Link href="/about">
        About
      </Link>

      <Link href="/users/123">
        User 123
      </Link>

      {/* Programmatic navigation */}
      <button onClick={() => router.push('/dashboard')}>
        Go to Dashboard
      </button>

      <button onClick={() => router.back()}>
        Go Back
      </button>
    </div>
  );
}
```

**9. Real Example from Your Eassylife Code**
```typescript
// From: React\src\app\admin\layout.tsx
export default function AdminLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex h-screen">
      {/* Sidebar */}
      <aside className="w-64 bg-gray-800 text-white">
        <nav>
          <Link href="/admin">Dashboard</Link>
          <Link href="/admin/booking">Bookings</Link>
          <Link href="/admin/sp-payout">SP Payout</Link>
        </nav>
      </aside>

      {/* Main content */}
      <main className="flex-1 overflow-auto">
        {children}
      </main>
    </div>
  );
}
```

**10. Loading and Error States**
```typescript
// File: app/users/loading.tsx
export default function Loading() {
  return (
    <div className="flex items-center justify-center h-screen">
      <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-500"></div>
    </div>
  );
}

// File: app/users/error.tsx
'use client';  // Error components must be Client Components

export default function Error({
  error,
  reset,
}: {
  error: Error;
  reset: () => void;
}) {
  return (
    <div className="p-8 text-center">
      <h2 className="text-2xl font-bold text-red-500">Something went wrong!</h2>
      <p className="mt-2">{error.message}</p>
      <button
        onClick={reset}
        className="mt-4 bg-blue-500 text-white px-4 py-2 rounded"
      >
        Try again
      </button>
    </div>
  );
}
```

#### Interview Questions:
1. **Q: What is Next.js and why use it?**
   - A: "Next.js is a React framework that provides file-based routing, server-side rendering, API routes, and optimizations out of the box. It simplifies building production-ready React apps."

2. **Q: What's the difference between App Router and Pages Router?**
   - A: "App Router (Next.js 13+) uses the app directory with layouts, server components, and streaming. Pages Router uses the pages directory. App Router is the modern approach with better performance and features."

3. **Q: How does file-based routing work in Next.js?**
   - A: "Files in the app directory automatically become routes. page.tsx creates a route, layout.tsx wraps pages, [id] creates dynamic routes. No need for react-router configuration."

4. **Q: What is the purpose of layout.tsx?**
   - A: "layout.tsx defines UI that's shared across multiple pages. It wraps page.tsx components and persists across navigation without re-rendering, improving performance."

---

### **DAY 7 (Oct 14) - Server Components vs Client Components**

#### Morning Session (2 hours) - Understanding the Difference

**1. Server Components (Default in App Router)**
```typescript
// This is a Server Component (default in Next.js 13+)
// Runs on the SERVER, not in the browser!

export default async function ServerComponent() {
  // ✅ Can directly access database
  const users = await db.users.findAll();

  // ✅ Can use server-only libraries
  const fs = require('fs');

  // ✅ Can access environment variables securely
  const apiKey = process.env.SECRET_API_KEY;

  // ❌ Cannot use useState, useEffect, onClick, etc.
  // ❌ Cannot access browser APIs (window, document)

  return (
    <div>
      <h1>Users from Database</h1>
      {users.map(user => (
        <div key={user.id}>{user.name}</div>
      ))}
    </div>
  );
}
```

**2. Client Components (Need 'use client')**
```typescript
'use client';  // This directive makes it a Client Component

import { useState } from 'react';

export default function ClientComponent() {
  // ✅ Can use hooks (useState, useEffect, etc.)
  const [count, setCount] = useState(0);

  // ✅ Can use event handlers
  const handleClick = () => setCount(count + 1);

  // ✅ Can access browser APIs
  const width = window.innerWidth;

  // ❌ Cannot directly access database
  // ❌ Cannot use server-only libraries

  return (
    <div>
      <p>Count: {count}</p>
      <button onClick={handleClick}>Increment</button>
    </div>
  );
}
```

**3. When to Use Which?**
```
Use Server Components (default) when:
✅ Fetching data from database/API
✅ Accessing backend resources
✅ Keeping sensitive data on server
✅ Reducing JavaScript bundle size

Use Client Components ('use client') when:
✅ Using React hooks (useState, useEffect, etc.)
✅ Handling user interactions (onClick, onChange)
✅ Using browser APIs (localStorage, window)
✅ Using third-party libraries that need browser
```

**4. Composition Pattern**
```typescript
// Server Component (default)
import ClientCounter from './ClientCounter';

export default async function ServerPage() {
  // Fetch data on server
  const data = await fetchData();

  return (
    <div>
      <h1>Server Component</h1>
      <p>Data from server: {data}</p>

      {/* Embed Client Component */}
      <ClientCounter initialCount={data.count} />
    </div>
  );
}

// ClientCounter.tsx
'use client';

import { useState } from 'react';

export default function ClientCounter({ initialCount }: { initialCount: number }) {
  const [count, setCount] = useState(initialCount);

  return (
    <div>
      <p>Count: {count}</p>
      <button onClick={() => setCount(count + 1)}>Increment</button>
    </div>
  );
}
```

#### Afternoon Session (2 hours) - Real-World Examples

**5. Fetching Data in Server Component**
```typescript
// app/users/page.tsx (Server Component)
interface User {
  id: number;
  name: string;
  email: string;
}

export default async function UsersPage() {
  // Fetch directly in component (no useEffect needed!)
  const response = await fetch('https://api.example.com/users', {
    cache: 'no-store'  // Don't cache (always fresh data)
  });

  const users: User[] = await response.json();

  return (
    <div className="p-8">
      <h1 className="text-2xl font-bold mb-4">Users</h1>
      <div className="grid gap-4">
        {users.map(user => (
          <div key={user.id} className="border p-4 rounded">
            <h2 className="font-bold">{user.name}</h2>
            <p className="text-gray-600">{user.email}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
```

**6. Interactive Form (Client Component)**
```typescript
// components/ContactForm.tsx
'use client';

import { useState } from 'react';

export default function ContactForm() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: ''
  });
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      const response = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData)
      });

      if (response.ok) {
        alert('Message sent!');
        setFormData({ name: '', email: '', message: '' });
      }
    } catch (error) {
      alert('Failed to send message');
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <input
        type="text"
        value={formData.name}
        onChange={(e) => setFormData({ ...formData, name: e.target.value })}
        placeholder="Name"
        className="border px-3 py-2 rounded w-full"
        required
      />

      <input
        type="email"
        value={formData.email}
        onChange={(e) => setFormData({ ...formData, email: e.target.value })}
        placeholder="Email"
        className="border px-3 py-2 rounded w-full"
        required
      />

      <textarea
        value={formData.message}
        onChange={(e) => setFormData({ ...formData, message: e.target.value })}
        placeholder="Message"
        className="border px-3 py-2 rounded w-full h-32"
        required
      />

      <button
        type="submit"
        disabled={loading}
        className="bg-blue-500 text-white px-4 py-2 rounded disabled:opacity-50"
      >
        {loading ? 'Sending...' : 'Send Message'}
      </button>
    </form>
  );
}
```

**7. Real Example from Your Eassylife Code**
```typescript
// From: React\src\app\auth\login\components\LoginForm.tsx
'use client';  // Client Component because it uses useState, useForm

import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { useRouter } from 'next/navigation';

export default function LoginForm() {
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();

  const form = useForm({
    defaultValues: {
      username: '',
      password: '',
    },
  });

  const onSubmit = async (data) => {
    setIsLoading(true);
    try {
      const response = await login(data.username, data.password);
      // Store token and redirect
      router.push('/admin');
    } catch (error) {
      // Handle error
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <form onSubmit={form.handleSubmit(onSubmit)}>
      {/* Form fields */}
    </form>
  );
}
```

#### Interview Questions:
1. **Q: What are Server Components in Next.js?**
   - A: "Server Components run on the server and can directly access databases, file systems, and server-only resources. They don't send JavaScript to the client, reducing bundle size."

2. **Q: What are Client Components?**
   - A: "Client Components run in the browser and can use React hooks, event handlers, and browser APIs. They're marked with 'use client' directive."

3. **Q: When should you use 'use client'?**
   - A: "Use 'use client' when you need interactivity (useState, onClick), browser APIs (localStorage, window), or third-party libraries that require the browser environment."

4. **Q: Can you use Server Components inside Client Components?**
   - A: "No, but you can pass Server Components as children or props to Client Components. This is the composition pattern."

---

## 🎯 WEEK 2: NEXT.JS DEEP DIVE & API INTEGRATION (Oct 15-21)

### **DAY 8 (Oct 15) - API Routes & Data Fetching**

#### Morning Session (2 hours) - Creating API Routes

**1. What are API Routes?**
```
Next.js lets you create backend APIs in the same project!

app/api/
  hello/
    route.ts       → /api/hello
  users/
    route.ts       → /api/users
    [id]/
      route.ts     → /api/users/:id
```

**2. Creating a Simple API Route**
```typescript
// File: app/api/hello/route.ts
import { NextResponse } from 'next/server';

// GET /api/hello
export async function GET() {
  return NextResponse.json({
    message: 'Hello from API!'
  });
}

// POST /api/hello
export async function POST(request: Request) {
  const body = await request.json();

  return NextResponse.json({
    message: 'Data received',
    data: body
  });
}
```

**3. Connecting to Your Node.js Backend**
```typescript
// Your eassylife setup: Frontend calls Node.js backend
// File: lib/api.ts

import axios from 'axios';

const BASE_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5001/admin-api';

const apiClient = axios.create({
  baseURL: BASE_URL,
});

// Add auth token to all requests
apiClient.interceptors.request.use((config) => {
  const token = localStorage.getItem('token');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

export default apiClient;
```

**4. API Functions with TypeScript**
```typescript
// lib/api.ts (continued)

export interface User {
  id: number;
  name: string;
  email: string;
  role: string;
}

export interface ApiResponse<T> {
  success: boolean;
  data: T;
  message?: string;
}

// GET request
export async function getUsers(): Promise<ApiResponse<User[]>> {
  const response = await apiClient.get('/users');
  return response.data;
}

// POST request
export async function createUser(userData: Omit<User, 'id'>): Promise<ApiResponse<User>> {
  const response = await apiClient.post('/users', userData);
  return response.data;
}

// PUT request
export async function updateUser(id: number, userData: Partial<User>): Promise<ApiResponse<User>> {
  const response = await apiClient.put(`/users/${id}`, userData);
  return response.data;
}

// DELETE request
export async function deleteUser(id: number): Promise<ApiResponse<void>> {
  const response = await apiClient.delete(`/users/${id}`);
  return response.data;
}
```

#### Afternoon Session (2 hours) - Using APIs in Components

**5. Fetching Data in Components**
```typescript
'use client';

import { useState, useEffect } from 'react';
import { getUsers, User } from '@/lib/api';

export default function UserList() {
  const [users, setUsers] = useState<User[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    loadUsers();
  }, []);

  const loadUsers = async () => {
    try {
      setLoading(true);
      setError(null);
      const response = await getUsers();

      if (response.success) {
        setUsers(response.data);
      }
    } catch (err) {
      setError('Failed to load users');
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return <div className="text-center p-4">Loading...</div>;
  }

  if (error) {
    return <div className="text-red-500 p-4">{error}</div>;
  }

  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold mb-4">Users</h1>
      <div className="grid gap-4">
        {users.map(user => (
          <div key={user.id} className="border p-4 rounded">
            <h2 className="font-bold">{user.name}</h2>
            <p className="text-gray-600">{user.email}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
```

**6. Real Example from Your Eassylife Code**
```typescript
// From: React\src\lib\api.tsx
export const login = async (username: string, password: string): Promise<LoginResponse> => {
  const response = await axios.post(`${BASE_URL}/login`, {
    username,
    password,
  });
  return response.data;
};

export async function getAllB2BCustomers(): Promise<ApiResponse<B2BCustomer[]>> {
  const response = await apiClient.get('/b2b-customers');
  return response.data;
}

export async function createB2BQuotation(data: CreateQuotationData): Promise<ApiResponse<B2BQuotation>> {
  const response = await apiClient.post('/b2b-quotations', data);
  return response.data;
}
```

#### Interview Questions:
1. **Q: How do you connect Next.js frontend to Node.js backend?**
   - A: "Use axios or fetch to call backend APIs. Store backend URL in environment variables (NEXT_PUBLIC_API_URL). Add auth tokens via axios interceptors."

2. **Q: What are axios interceptors?**
   - A: "Interceptors let you modify requests/responses globally. Request interceptors add auth tokens. Response interceptors handle errors like 401 redirects."

3. **Q: How do you handle loading and error states?**
   - A: "Use useState for loading/error states. Set loading=true before API call, false in finally block. Show loading UI, error messages, or data based on state."

4. **Q: What's the difference between GET and POST?**
   - A: "GET retrieves data (no body), POST creates data (with body). GET is idempotent and cacheable, POST is not."

---

### **DAY 9 (Oct 16) - React Hook Form + Zod Validation**

#### Morning Session (2 hours) - Understanding Form Libraries

**1. Why Use React Hook Form?**
```typescript
// Without React Hook Form (manual - lots of code!)
function ManualForm() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [errors, setErrors] = useState({});

  const handleSubmit = (e) => {
    e.preventDefault();
    const newErrors = {};
    if (!name) newErrors.name = 'Name required';
    if (!email) newErrors.email = 'Email required';
    setErrors(newErrors);
  };

  return (
    <form onSubmit={handleSubmit}>
      <input value={name} onChange={(e) => setName(e.target.value)} />
      {errors.name && <span>{errors.name}</span>}
      {/* Repeat for each field... */}
    </form>
  );
}

// With React Hook Form (clean & simple!)
import { useForm } from 'react-hook-form';

function HookForm() {
  const { register, handleSubmit, formState: { errors } } = useForm();

  const onSubmit = (data) => {
    console.log(data);  // All form data!
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <input {...register('name', { required: 'Name required' })} />
      {errors.name && <span>{errors.name.message}</span>}
    </form>
  );
}
```

**2. React Hook Form Basics**
```typescript
import { useForm } from 'react-hook-form';

interface FormData {
  name: string;
  email: string;
  age: number;
}

export default function BasicForm() {
  const {
    register,        // Register inputs
    handleSubmit,    // Handle submission
    formState: { errors, isSubmitting },
    reset,           // Reset form
    watch            // Watch values
  } = useForm<FormData>({
    defaultValues: {
      name: '',
      email: '',
      age: 0
    }
  });

  const onSubmit = async (data: FormData) => {
    await createUser(data);
    reset();  // Clear form
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
      <div>
        <input
          {...register('name', {
            required: 'Name is required',
            minLength: { value: 3, message: 'Min 3 chars' }
          })}
          placeholder="Name"
          className="border px-3 py-2 rounded w-full"
        />
        {errors.name && (
          <p className="text-red-500 text-sm">{errors.name.message}</p>
        )}
      </div>

      <button
        type="submit"
        disabled={isSubmitting}
        className="bg-blue-500 text-white px-4 py-2 rounded"
      >
        {isSubmitting ? 'Submitting...' : 'Submit'}
      </button>
    </form>
  );
}
```

**3. Zod Schema Validation**
```typescript
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';

// Define validation schema
const FormSchema = z.object({
  name: z.string().min(3, 'Name must be at least 3 characters'),
  email: z.string().email('Invalid email'),
  age: z.number().min(18, 'Must be 18+').max(100),
  password: z.string().min(8, 'Min 8 characters'),
  confirmPassword: z.string()
}).refine((data) => data.password === data.confirmPassword, {
  message: "Passwords don't match",
  path: ['confirmPassword']
});

type FormSchemaType = z.infer<typeof FormSchema>;

export default function ZodForm() {
  const form = useForm<FormSchemaType>({
    resolver: zodResolver(FormSchema),
    defaultValues: {
      name: '',
      email: '',
      age: 18,
      password: '',
      confirmPassword: ''
    }
  });

  const onSubmit = (data: FormSchemaType) => {
    console.log(data);  // Validated data!
  };

  return (
    <form onSubmit={form.handleSubmit(onSubmit)}>
      {/* Form fields */}
    </form>
  );
}
```

#### Afternoon Session (2 hours) - Shadcn/ui Forms (Your Eassylife Pattern)

**4. Using Shadcn/ui Form Components**
```typescript
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';

const FormSchema = z.object({
  username: z.string().min(3),
  email: z.string().email(),
  password: z.string().min(8),
});

type FormSchemaType = z.infer<typeof FormSchema>;

export default function ShadcnForm() {
  const form = useForm<FormSchemaType>({
    resolver: zodResolver(FormSchema),
    defaultValues: {
      username: '',
      email: '',
      password: '',
    },
  });

  const onSubmit = async (data: FormSchemaType) => {
    console.log(data);
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
        <FormField
          control={form.control}
          name="username"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Username</FormLabel>
              <FormControl>
                <Input placeholder="Enter username" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="email"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Email</FormLabel>
              <FormControl>
                <Input type="email" placeholder="Enter email" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <Button type="submit" disabled={form.formState.isSubmitting}>
          Submit
        </Button>
      </form>
    </Form>
  );
}
```

**5. Real Example from Your Eassylife Code**
```typescript
// From: React\src\app\auth\login\components\LoginForm.tsx
const FormSchema = z.object({
  username: z.string().min(1, { message: 'Username is required' }),
  password: z.string().min(1, { message: 'Password is required' }),
});

type FormSchemaType = z.infer<typeof FormSchema>;

export default function LoginForm() {
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();
  const { toast } = useToast();

  const form = useForm<FormSchemaType>({
    resolver: zodResolver(FormSchema),
    defaultValues: {
      username: '',
      password: '',
    },
  });

  const onSubmit: SubmitHandler<FormSchemaType> = async (data) => {
    setIsLoading(true);
    try {
      const response = await login(data.username, data.password);

      if (response.status && response.data) {
        tokenUtils.setToken(response.data.token);
        toast({
          title: 'Success',
          description: 'Login successful!',
        });
        router.push('/admin');
      }
    } catch (error) {
      toast({
        title: 'Error',
        description: 'Invalid credentials',
        variant: 'destructive',
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
        {/* Form fields */}
      </form>
    </Form>
  );
}
```

#### Interview Questions:
1. **Q: Why use React Hook Form?**
   - A: "Reduces re-renders, better performance, built-in validation, integrates with Zod, simplifies form state management compared to manual useState."

2. **Q: What is Zod?**
   - A: "TypeScript-first schema validation library. Validates data at runtime and provides type inference for type-safe forms."

3. **Q: What does zodResolver do?**
   - A: "Connects Zod schemas to React Hook Form, enabling automatic validation based on schema definition."

4. **Q: How do you show validation errors?**
   - A: "Access errors from formState.errors. Each field error has a message property. Use FormMessage component in shadcn/ui."

---

### **DAY 10 (Oct 17) - Context API & State Management**

#### Morning Session (2 hours) - Understanding Context

**1. The Problem Context Solves**
```typescript
// Without Context (Prop Drilling - passing props through many levels)
function App() {
  const [user, setUser] = useState({ name: 'John' });

  return <Dashboard user={user} />;
}

function Dashboard({ user }) {
  return <Sidebar user={user} />;
}

function Sidebar({ user }) {
  return <UserMenu user={user} />;
}

function UserMenu({ user }) {
  return <div>{user.name}</div>;  // Finally used here!
}

// With Context (Direct access anywhere!)
const UserContext = createContext();

function App() {
  const [user, setUser] = useState({ name: 'John' });

  return (
    <UserContext.Provider value={user}>
      <Dashboard />
    </UserContext.Provider>
  );
}

function UserMenu() {
  const user = useContext(UserContext);  // Direct access!
  return <div>{user.name}</div>;
}
```

**2. Creating a Context**
```typescript
// File: contexts/ThemeContext.tsx
'use client';

import { createContext, useContext, useState, ReactNode } from 'react';

// 1. Define the context type
interface ThemeContextType {
  theme: 'light' | 'dark';
  toggleTheme: () => void;
}

// 2. Create the context
const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

// 3. Create the provider component
export function ThemeProvider({ children }: { children: ReactNode }) {
  const [theme, setTheme] = useState<'light' | 'dark'>('light');

  const toggleTheme = () => {
    setTheme(theme === 'light' ? 'dark' : 'light');
  };

  return (
    <ThemeContext.Provider value={{ theme, toggleTheme }}>
      {children}
    </ThemeContext.Provider>
  );
}

// 4. Create a custom hook for easy access
export function useTheme() {
  const context = useContext(ThemeContext);

  if (!context) {
    throw new Error('useTheme must be used within ThemeProvider');
  }

  return context;
}
```

**3. Using the Context**
```typescript
// app/layout.tsx
import { ThemeProvider } from '@/contexts/ThemeContext';

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html>
      <body>
        <ThemeProvider>
          {children}
        </ThemeProvider>
      </body>
    </html>
  );
}

// Any component can now use the theme
'use client';

import { useTheme } from '@/contexts/ThemeContext';

export default function Header() {
  const { theme, toggleTheme } = useTheme();

  return (
    <header className={theme === 'dark' ? 'bg-black text-white' : 'bg-white text-black'}>
      <button onClick={toggleTheme}>
        Toggle Theme (Current: {theme})
      </button>
    </header>
  );
}
```

#### Afternoon Session (2 hours) - Real-World Context Examples

**4. Auth Context**
```typescript
// contexts/AuthContext.tsx
'use client';

import { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { useRouter } from 'next/navigation';

interface User {
  id: number;
  name: string;
  email: string;
  role: string;
}

interface AuthContextType {
  user: User | null;
  loading: boolean;
  login: (username: string, password: string) => Promise<void>;
  logout: () => void;
  isAuthenticated: boolean;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);
  const router = useRouter();

  // Check if user is logged in on mount
  useEffect(() => {
    const token = localStorage.getItem('token');
    if (token) {
      // Fetch user data
      fetchUser(token);
    } else {
      setLoading(false);
    }
  }, []);

  const fetchUser = async (token: string) => {
    try {
      const response = await fetch('/api/me', {
        headers: { Authorization: `Bearer ${token}` }
      });
      const data = await response.json();
      setUser(data.user);
    } catch (error) {
      localStorage.removeItem('token');
    } finally {
      setLoading(false);
    }
  };

  const login = async (username: string, password: string) => {
    const response = await fetch('/api/login', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ username, password })
    });

    const data = await response.json();

    if (data.success) {
      localStorage.setItem('token', data.token);
      setUser(data.user);
      router.push('/dashboard');
    }
  };

  const logout = () => {
    localStorage.removeItem('token');
    setUser(null);
    router.push('/login');
  };

  return (
    <AuthContext.Provider value={{
      user,
      loading,
      login,
      logout,
      isAuthenticated: !!user
    }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within AuthProvider');
  }
  return context;
}
```

**5. Using Auth Context**
```typescript
'use client';

import { useAuth } from '@/contexts/AuthContext';

export default function Dashboard() {
  const { user, logout, isAuthenticated } = useAuth();

  if (!isAuthenticated) {
    return <div>Please login</div>;
  }

  return (
    <div>
      <h1>Welcome, {user?.name}!</h1>
      <p>Email: {user?.email}</p>
      <p>Role: {user?.role}</p>
      <button onClick={logout}>Logout</button>
    </div>
  );
}
```

**6. Real Example from Your Eassylife Code**
```typescript
// From: React\src\contexts\StatusOptionsContext.tsx
'use client';

import { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { fetchB2BStatusOptions, StatusOption } from '@/lib/api';

interface StatusOptionsContextType {
  statusOptions: StatusOption[];
  loading: boolean;
  error: string | null;
  refetch: () => Promise<void>;
}

const StatusOptionsContext = createContext<StatusOptionsContextType | undefined>(undefined);

export function StatusOptionsProvider({ children }: { children: ReactNode }) {
  const [statusOptions, setStatusOptions] = useState<StatusOption[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const loadStatusOptions = async () => {
    try {
      setLoading(true);
      setError(null);

      const response = await fetchB2BStatusOptions();

      if (response.success) {
        setStatusOptions(response.data.status_options);
      }
    } catch (err: any) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadStatusOptions();
  }, []);

  const refetch = async () => {
    await loadStatusOptions();
  };

  return (
    <StatusOptionsContext.Provider value={{ statusOptions, loading, error, refetch }}>
      {children}
    </StatusOptionsContext.Provider>
  );
}

export function useStatusOptions() {
  const context = useContext(StatusOptionsContext);
  if (!context) {
    throw new Error('useStatusOptions must be used within StatusOptionsProvider');
  }
  return context;
}
```

#### Interview Questions:
1. **Q: What is Context API?**
   - A: "Context provides a way to share data across the component tree without prop drilling. It's built into React for global state management."

2. **Q: When should you use Context?**
   - A: "Use Context for global data like theme, auth, language, or data needed by many components. Don't use for frequently changing data (causes re-renders)."

3. **Q: What is prop drilling?**
   - A: "Prop drilling is passing props through multiple component levels to reach a deeply nested component. Context solves this problem."

4. **Q: What's the difference between Context and Redux?**
   - A: "Context is built into React, simpler for basic global state. Redux has middleware, dev tools, time-travel debugging, better for complex state logic."

---

### **DAY 11 (Oct 18) - Advanced TypeScript for React**

#### Morning Session (2 hours) - Generics & Utility Types

**1. Generics - Reusable Type-Safe Code**
```typescript
// Without generics (not reusable)
function getFirstString(arr: string[]): string {
  return arr[0];
}

function getFirstNumber(arr: number[]): number {
  return arr[0];
}

// With generics (reusable!)
function getFirst<T>(arr: T[]): T {
  return arr[0];
}

const firstString = getFirst<string>(['a', 'b', 'c']);  // Type: string
const firstNumber = getFirst<number>([1, 2, 3]);        // Type: number

// TypeScript can infer the type
const first = getFirst([1, 2, 3]);  // Automatically knows it's number
```

**2. Generic Components**
```typescript
// Generic List component
interface ListProps<T> {
  items: T[];
  renderItem: (item: T) => React.ReactNode;
}

function List<T>({ items, renderItem }: ListProps<T>) {
  return (
    <div>
      {items.map((item, index) => (
        <div key={index}>{renderItem(item)}</div>
      ))}
    </div>
  );
}

// Usage
interface User {
  id: number;
  name: string;
}

function UserList() {
  const users: User[] = [
    { id: 1, name: 'John' },
    { id: 2, name: 'Jane' }
  ];

  return (
    <List<User>
      items={users}
      renderItem={(user) => <div>{user.name}</div>}
    />
  );
}
```

**3. Utility Types**
```typescript
interface User {
  id: number;
  name: string;
  email: string;
  password: string;
  role: string;
}

// Partial - Makes all properties optional
type PartialUser = Partial<User>;
// { id?: number; name?: string; email?: string; ... }

// Pick - Select specific properties
type UserPreview = Pick<User, 'id' | 'name' | 'email'>;
// { id: number; name: string; email: string; }

// Omit - Exclude specific properties
type UserWithoutPassword = Omit<User, 'password'>;
// { id: number; name: string; email: string; role: string; }

// Required - Makes all properties required
type RequiredUser = Required<Partial<User>>;

// Record - Create object type with specific keys
type UserRoles = Record<'admin' | 'user' | 'guest', string>;
// { admin: string; user: string; guest: string; }
```

**4. Real-World Example**
```typescript
// API response type
interface ApiResponse<T> {
  success: boolean;
  data: T;
  message?: string;
  error?: string;
}

// Generic API function
async function fetchData<T>(url: string): Promise<ApiResponse<T>> {
  const response = await fetch(url);
  return response.json();
}

// Usage with different types
const users = await fetchData<User[]>('/api/users');
const user = await fetchData<User>('/api/users/1');
const stats = await fetchData<{ count: number }>('/api/stats');

// Form data without password
type CreateUserData = Omit<User, 'id' | 'password'>;

function createUser(data: CreateUserData) {
  // data doesn't have id or password
}

// Update user (all fields optional except id)
type UpdateUserData = Partial<Omit<User, 'id'>> & { id: number };

function updateUser(data: UpdateUserData) {
  // Must have id, other fields optional
}
```

#### Afternoon Session (2 hours) - Advanced Patterns

**5. Discriminated Unions**
```typescript
// Different types based on a discriminator field
type LoadingState = {
  status: 'loading';
};

type SuccessState<T> = {
  status: 'success';
  data: T;
};

type ErrorState = {
  status: 'error';
  error: string;
};

type DataState<T> = LoadingState | SuccessState<T> | ErrorState;

// Component using discriminated union
function DataDisplay<T>({ state }: { state: DataState<T> }) {
  // TypeScript knows which properties exist based on status
  if (state.status === 'loading') {
    return <div>Loading...</div>;
  }

  if (state.status === 'error') {
    return <div>Error: {state.error}</div>;  // error property exists
  }

  // TypeScript knows this is SuccessState
  return <div>Data: {JSON.stringify(state.data)}</div>;
}
```

**6. Type Guards**
```typescript
// Check if value is of specific type
function isUser(value: any): value is User {
  return value && typeof value.id === 'number' && typeof value.name === 'string';
}

function processData(data: unknown) {
  if (isUser(data)) {
    // TypeScript knows data is User here
    console.log(data.name);
  }
}

// Array type guard
function isStringArray(value: any): value is string[] {
  return Array.isArray(value) && value.every(item => typeof item === 'string');
}
```

**7. Const Assertions**
```typescript
// Without const assertion
const colors = ['red', 'blue', 'green'];
// Type: string[]

// With const assertion
const colors = ['red', 'blue', 'green'] as const;
// Type: readonly ['red', 'blue', 'green']

type Color = typeof colors[number];
// Type: 'red' | 'blue' | 'green'

// Useful for component props
const BUTTON_VARIANTS = ['primary', 'secondary', 'danger'] as const;
type ButtonVariant = typeof BUTTON_VARIANTS[number];

interface ButtonProps {
  variant: ButtonVariant;  // Only 'primary' | 'secondary' | 'danger'
}
```

**8. Real Example from Your Eassylife Code**
```typescript
// Generic API response
export interface ApiResponse<T> {
  success: boolean;
  data: T;
  message?: string;
}

// Omit password when creating user
export type CreateUserData = Omit<User, 'id' | 'password'>;

// Partial update
export type UpdateUserData = Partial<User> & { id: number };

// Pick specific fields for list view
export type UserListItem = Pick<User, 'id' | 'name' | 'email' | 'role'>;
```

#### Interview Questions:
1. **Q: What are generics in TypeScript?**
   - A: "Generics allow you to write reusable, type-safe code that works with multiple types. They're like function parameters but for types."

2. **Q: What is Partial<T>?**
   - A: "Partial makes all properties of type T optional. Useful for update operations where you don't need to provide all fields."

3. **Q: What is Omit<T, K>?**
   - A: "Omit creates a new type by removing specific properties K from type T. Useful for excluding sensitive fields like passwords."

4. **Q: What are discriminated unions?**
   - A: "A pattern where a common property (discriminator) determines which type variant you have. TypeScript narrows the type based on this property."

---

### **DAY 12 (Oct 19) - Middleware & Authentication**

#### Morning Session (2 hours) - Understanding Next.js Middleware

**1. What is Middleware?**
```typescript
// Middleware runs BEFORE a request is completed
// Use cases:
// - Authentication (check if user is logged in)
// - Redirects (redirect based on conditions)
// - Rewriting URLs
// - Setting headers

// File: middleware.ts (in src/ or root directory)
import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

export function middleware(request: NextRequest) {
  console.log('Middleware running for:', request.nextUrl.pathname);

  // Continue to the page
  return NextResponse.next();
}

// Specify which routes to run middleware on
export const config = {
  matcher: ['/admin/:path*', '/dashboard/:path*']
};
```

**2. Authentication Middleware**
```typescript
// middleware.ts
import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

export function middleware(request: NextRequest) {
  const token = request.cookies.get('token')?.value;
  const { pathname } = request.nextUrl;

  // Public routes (no auth needed)
  const publicRoutes = ['/login', '/register', '/'];
  const isPublicRoute = publicRoutes.includes(pathname);

  // If no token and trying to access protected route
  if (!token && !isPublicRoute) {
    return NextResponse.redirect(new URL('/login', request.url));
  }

  // If has token and trying to access login page
  if (token && pathname === '/login') {
    return NextResponse.redirect(new URL('/dashboard', request.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: ['/((?!api|_next/static|_next/image|favicon.ico).*)']
};
```

**3. Role-Based Access Control**
```typescript
// middleware.ts
import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';
import { jwtDecode } from 'jwt-decode';

interface TokenPayload {
  userId: number;
  role: string;
}

export function middleware(request: NextRequest) {
  const token = request.cookies.get('token')?.value;
  const { pathname } = request.nextUrl;

  // Check authentication
  if (!token) {
    return NextResponse.redirect(new URL('/login', request.url));
  }

  try {
    // Decode token to get user role
    const decoded = jwtDecode<TokenPayload>(token);

    // Admin-only routes
    if (pathname.startsWith('/admin') && decoded.role !== 'admin') {
      return NextResponse.redirect(new URL('/unauthorized', request.url));
    }

    // Manager routes
    if (pathname.startsWith('/manager') && !['admin', 'manager'].includes(decoded.role)) {
      return NextResponse.redirect(new URL('/unauthorized', request.url));
    }

    return NextResponse.next();
  } catch (error) {
    // Invalid token
    return NextResponse.redirect(new URL('/login', request.url));
  }
}

export const config = {
  matcher: ['/admin/:path*', '/manager/:path*', '/dashboard/:path*']
};
```

#### Afternoon Session (2 hours) - Implementing Auth Flow

**4. Login Component**
```typescript
// app/login/page.tsx
'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';

const LoginSchema = z.object({
  username: z.string().min(1, 'Username required'),
  password: z.string().min(1, 'Password required'),
});

type LoginFormData = z.infer<typeof LoginSchema>;

export default function LoginPage() {
  const [error, setError] = useState('');
  const router = useRouter();

  const form = useForm<LoginFormData>({
    resolver: zodResolver(LoginSchema),
    defaultValues: {
      username: '',
      password: '',
    },
  });

  const onSubmit = async (data: LoginFormData) => {
    try {
      const response = await fetch('/api/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data),
      });

      const result = await response.json();

      if (result.success) {
        // Token is set as httpOnly cookie by the API
        router.push('/dashboard');
      } else {
        setError(result.message || 'Login failed');
      }
    } catch (err) {
      setError('An error occurred');
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen">
      <form onSubmit={form.handleSubmit(onSubmit)} className="w-full max-w-md space-y-4 p-8 border rounded">
        <h1 className="text-2xl font-bold">Login</h1>

        {error && (
          <div className="bg-red-100 text-red-700 p-3 rounded">
            {error}
          </div>
        )}

        <input
          {...form.register('username')}
          placeholder="Username"
          className="w-full border px-3 py-2 rounded"
        />
        {form.formState.errors.username && (
          <p className="text-red-500 text-sm">{form.formState.errors.username.message}</p>
        )}

        <input
          {...form.register('password')}
          type="password"
          placeholder="Password"
          className="w-full border px-3 py-2 rounded"
        />
        {form.formState.errors.password && (
          <p className="text-red-500 text-sm">{form.formState.errors.password.message}</p>
        )}

        <button
          type="submit"
          disabled={form.formState.isSubmitting}
          className="w-full bg-blue-500 text-white py-2 rounded disabled:opacity-50"
        >
          {form.formState.isSubmitting ? 'Logging in...' : 'Login'}
        </button>
      </form>
    </div>
  );
}
```

**5. Protected Page Component**
```typescript
// app/dashboard/page.tsx
'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';

interface User {
  id: number;
  name: string;
  email: string;
  role: string;
}

export default function DashboardPage() {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);
  const router = useRouter();

  useEffect(() => {
    fetchUser();
  }, []);

  const fetchUser = async () => {
    try {
      const response = await fetch('/api/me');
      const data = await response.json();

      if (data.success) {
        setUser(data.user);
      } else {
        router.push('/login');
      }
    } catch (error) {
      router.push('/login');
    } finally {
      setLoading(false);
    }
  };

  const handleLogout = async () => {
    await fetch('/api/logout', { method: 'POST' });
    router.push('/login');
  };

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <div className="p-8">
      <h1 className="text-2xl font-bold">Dashboard</h1>
      <p>Welcome, {user?.name}!</p>
      <p>Email: {user?.email}</p>
      <p>Role: {user?.role}</p>
      <button
        onClick={handleLogout}
        className="mt-4 bg-red-500 text-white px-4 py-2 rounded"
      >
        Logout
      </button>
    </div>
  );
}
```

**6. Real Example from Your Eassylife Code**
```typescript
// From: React\src\middleware.ts
import { NextRequest, NextResponse } from 'next/server';
import { authMiddleware } from './middleware/authMiddleware';
import { roleMiddleware } from './middleware/roleMiddleware';

export function middleware(req: NextRequest) {
  // Check authentication first
  const response = authMiddleware(req);
  if (response) return response;

  // Then check role-based access
  const roleResponse = roleMiddleware(req);
  if (roleResponse) return roleResponse;

  return NextResponse.next();
}

export const config = {
  matcher: ['/admin/:path*', '/auth/login', '/contact-us'],
};

// From: React\src\middleware\authMiddleware.ts
export function authMiddleware(req: NextRequest) {
  const token = req.cookies.get('token')?.value;
  const { pathname } = req.nextUrl;

  const publicRoutes = ['/contact-us', '/auth/login'];

  if (!token && !publicRoutes.includes(pathname)) {
    return NextResponse.redirect(new URL('/auth/login', req.url));
  }

  if (token && pathname === '/auth/login') {
    return NextResponse.redirect(new URL('/admin', req.url));
  }

  return null;
}
```

#### Interview Questions:
1. **Q: What is Next.js middleware?**
   - A: "Middleware runs before a request is completed. It's used for authentication, redirects, URL rewriting, and setting headers. Runs on the Edge runtime."

2. **Q: How do you implement authentication in Next.js?**
   - A: "Use middleware to check for auth tokens in cookies. Redirect unauthenticated users to login. Store JWT tokens in httpOnly cookies for security."

3. **Q: What's the difference between middleware and API routes?**
   - A: "Middleware runs before the request reaches the page/API route. API routes handle business logic and database operations. Middleware is for routing decisions."

4. **Q: How do you implement role-based access control?**
   - A: "Decode JWT token in middleware to get user role. Check role against route requirements. Redirect unauthorized users to appropriate pages."

---

### **DAY 13 (Oct 20) - Custom Hooks & Reusable Logic**

#### Morning Session (2 hours) - Creating Custom Hooks

**1. What are Custom Hooks?**
```typescript
// Custom hooks = Reusable logic extracted into functions
// Must start with "use"
// Can use other hooks inside

// Without custom hook (repeated code)
function Component1() {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetch('/api/data')
      .then(res => res.json())
      .then(setData)
      .catch(setError)
      .finally(() => setLoading(false));
  }, []);

  // ... use data, loading, error
}

// With custom hook (reusable!)
function useFetch(url: string) {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetch(url)
      .then(res => res.json())
      .then(setData)
      .catch(setError)
      .finally(() => setLoading(false));
  }, [url]);

  return { data, loading, error };
}

// Usage
function Component1() {
  const { data, loading, error } = useFetch('/api/data');
  // Clean and simple!
}
```

**2. useFetch Hook**
```typescript
// hooks/useFetch.ts
import { useState, useEffect } from 'react';

interface UseFetchResult<T> {
  data: T | null;
  loading: boolean;
  error: string | null;
  refetch: () => void;
}

export function useFetch<T>(url: string): UseFetchResult<T> {
  const [data, setData] = useState<T | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchData = async () => {
    try {
      setLoading(true);
      setError(null);

      const response = await fetch(url);
      if (!response.ok) throw new Error('Failed to fetch');

      const result = await response.json();
      setData(result);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'An error occurred');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, [url]);

  return { data, loading, error, refetch: fetchData };
}

// Usage
interface User {
  id: number;
  name: string;
}

function UserList() {
  const { data: users, loading, error, refetch } = useFetch<User[]>('/api/users');

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error}</div>;

  return (
    <div>
      {users?.map(user => <div key={user.id}>{user.name}</div>)}
      <button onClick={refetch}>Refresh</button>
    </div>
  );
}
```

**3. useLocalStorage Hook**
```typescript
// hooks/useLocalStorage.ts
import { useState, useEffect } from 'react';

export function useLocalStorage<T>(key: string, initialValue: T) {
  // Get initial value from localStorage or use default
  const [value, setValue] = useState<T>(() => {
    if (typeof window === 'undefined') return initialValue;

    try {
      const item = window.localStorage.getItem(key);
      return item ? JSON.parse(item) : initialValue;
    } catch (error) {
      console.error(error);
      return initialValue;
    }
  });

  // Update localStorage when value changes
  useEffect(() => {
    if (typeof window === 'undefined') return;

    try {
      window.localStorage.setItem(key, JSON.stringify(value));
    } catch (error) {
      console.error(error);
    }
  }, [key, value]);

  return [value, setValue] as const;
}

// Usage
function ThemeToggle() {
  const [theme, setTheme] = useLocalStorage<'light' | 'dark'>('theme', 'light');

  return (
    <button onClick={() => setTheme(theme === 'light' ? 'dark' : 'light')}>
      Current theme: {theme}
    </button>
  );
}
```

#### Afternoon Session (2 hours) - More Custom Hooks

**4. useDebounce Hook**
```typescript
// hooks/useDebounce.ts
import { useState, useEffect } from 'react';

export function useDebounce<T>(value: T, delay: number = 500): T {
  const [debouncedValue, setDebouncedValue] = useState<T>(value);

  useEffect(() => {
    const timer = setTimeout(() => {
      setDebouncedValue(value);
    }, delay);

    return () => clearTimeout(timer);
  }, [value, delay]);

  return debouncedValue;
}

// Usage - Search with debounce
function SearchUsers() {
  const [searchTerm, setSearchTerm] = useState('');
  const debouncedSearch = useDebounce(searchTerm, 500);
  const [results, setResults] = useState([]);

  useEffect(() => {
    if (debouncedSearch) {
      // This only runs 500ms after user stops typing
      fetch(`/api/search?q=${debouncedSearch}`)
        .then(res => res.json())
        .then(setResults);
    }
  }, [debouncedSearch]);

  return (
    <div>
      <input
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
        placeholder="Search..."
      />
      {results.map(result => <div key={result.id}>{result.name}</div>)}
    </div>
  );
}
```

**5. useToggle Hook**
```typescript
// hooks/useToggle.ts
import { useState, useCallback } from 'react';

export function useToggle(initialValue: boolean = false) {
  const [value, setValue] = useState(initialValue);

  const toggle = useCallback(() => {
    setValue(v => !v);
  }, []);

  const setTrue = useCallback(() => {
    setValue(true);
  }, []);

  const setFalse = useCallback(() => {
    setValue(false);
  }, []);

  return { value, toggle, setTrue, setFalse };
}

// Usage
function Modal() {
  const { value: isOpen, toggle, setTrue: open, setFalse: close } = useToggle();

  return (
    <div>
      <button onClick={open}>Open Modal</button>

      {isOpen && (
        <div className="modal">
          <h2>Modal Content</h2>
          <button onClick={close}>Close</button>
        </div>
      )}
    </div>
  );
}
```

**6. useForm Hook (Simplified)**
```typescript
// hooks/useForm.ts
import { useState, ChangeEvent } from 'react';

export function useForm<T extends Record<string, any>>(initialValues: T) {
  const [values, setValues] = useState<T>(initialValues);
  const [errors, setErrors] = useState<Partial<Record<keyof T, string>>>({});

  const handleChange = (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setValues(prev => ({ ...prev, [name]: value }));
  };

  const reset = () => {
    setValues(initialValues);
    setErrors({});
  };

  const validate = (validationRules: Partial<Record<keyof T, (value: any) => string | undefined>>) => {
    const newErrors: Partial<Record<keyof T, string>> = {};

    Object.keys(validationRules).forEach((key) => {
      const rule = validationRules[key as keyof T];
      if (rule) {
        const error = rule(values[key as keyof T]);
        if (error) {
          newErrors[key as keyof T] = error;
        }
      }
    });

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  return { values, errors, handleChange, reset, validate };
}

// Usage
interface FormData {
  name: string;
  email: string;
}

function ContactForm() {
  const { values, errors, handleChange, reset, validate } = useForm<FormData>({
    name: '',
    email: '',
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    const isValid = validate({
      name: (value) => !value ? 'Name is required' : undefined,
      email: (value) => !value.includes('@') ? 'Invalid email' : undefined,
    });

    if (isValid) {
      console.log('Form submitted:', values);
      reset();
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <input
        name="name"
        value={values.name}
        onChange={handleChange}
        placeholder="Name"
      />
      {errors.name && <span className="text-red-500">{errors.name}</span>}

      <input
        name="email"
        value={values.email}
        onChange={handleChange}
        placeholder="Email"
      />
      {errors.email && <span className="text-red-500">{errors.email}</span>}

      <button type="submit">Submit</button>
    </form>
  );
}
```

**7. Real Example from Your Eassylife Code**
```typescript
// From: React\src\hooks\useVariantBasedOnRoute.ts
import { usePathname } from 'next/navigation';

const useVariantBasedOnRoute = (): ((route: string) => 'default' | 'ghost') => {
  const pathname = usePathname();

  return (route: string) => {
    const pathSegments = pathname.split('/').filter(Boolean);
    const lastSegment = pathSegments[pathSegments.length - 1];

    const routeSegments = route.split('/').filter(Boolean);
    const lastRouteSegment = routeSegments[routeSegments.length - 1];

    return lastSegment === lastRouteSegment ? 'default' : 'ghost';
  };
};

export default useVariantBasedOnRoute;

// From: React\src\hooks\useRouteChange.ts
import { useEffect } from 'react';
import { usePathname } from 'next/navigation';

const useRouteChange = (callback: () => void) => {
  const pathname = usePathname();

  useEffect(() => {
    callback();
  }, [pathname]);
};

export default useRouteChange;
```

#### Interview Questions:
1. **Q: What are custom hooks?**
   - A: "Custom hooks are reusable functions that encapsulate stateful logic. They must start with 'use' and can call other hooks. They help avoid code duplication."

2. **Q: When should you create a custom hook?**
   - A: "When you have logic that's repeated across multiple components, involves hooks, and can be abstracted into a reusable function."

3. **Q: Can custom hooks use other hooks?**
   - A: "Yes! Custom hooks can use useState, useEffect, and other hooks. That's their main purpose - to compose hook logic."

4. **Q: What's the difference between a custom hook and a regular function?**
   - A: "Custom hooks can use React hooks and follow hook rules. Regular functions can't use hooks. Custom hooks must start with 'use'."

---

### **DAY 14 (Oct 21) - Understanding YOUR Eassylife React Codebase**

#### Full Day Session (4-6 hours) - Deep Dive into Your Project

**🎯 Goal:** Understand every part of your React codebase so you can confidently explain it in interviews.

**1. Project Structure Overview**
```
React/
├── src/
│   ├── app/                    # Next.js App Router pages
│   │   ├── layout.tsx          # Root layout
│   │   ├── page.tsx            # Home page (redirects to /admin)
│   │   ├── admin/              # Admin panel routes
│   │   │   ├── layout.tsx      # Admin layout with sidebar
│   │   │   ├── booking/        # Booking management
│   │   │   ├── sp-payout/      # SP payout system
│   │   │   ├── b2b/            # B2B management
│   │   │   └── ...
│   │   └── auth/
│   │       └── login/          # Login page
│   │
│   ├── components/             # Reusable components
│   │   ├── ui/                 # Shadcn/ui components
│   │   ├── b2b/                # B2B-specific components
│   │   └── ...
│   │
│   ├── contexts/               # React Context providers
│   │   └── StatusOptionsContext.tsx
│   │
│   ├── hooks/                  # Custom hooks
│   │   ├── use-toast.ts
│   │   ├── useVariantBasedOnRoute.ts
│   │   └── useRouteChange.ts
│   │
│   ├── lib/                    # Utility functions & API
│   │   ├── api.tsx             # API functions
│   │   ├── auth.tsx            # Auth functions
│   │   └── utils.ts            # Helper functions
│   │
│   ├── middleware/             # Next.js middleware
│   │   ├── authMiddleware.ts   # Check authentication
│   │   └── roleMiddleware.ts   # Check user roles
│   │
│   └── middleware.ts           # Main middleware entry
│
├── package.json                # Dependencies
├── tailwind.config.ts          # Tailwind configuration
└── tsconfig.json               # TypeScript configuration
```

**2. Authentication Flow - Study This!**
```typescript
// Step 1: User visits /admin
// → middleware.ts runs

// Step 2: middleware.ts
export function middleware(req: NextRequest) {
  const response = authMiddleware(req);  // Check if logged in
  if (response) return response;

  const roleResponse = roleMiddleware(req);  // Check role
  if (roleResponse) return roleResponse;

  return NextResponse.next();
}

// Step 3: authMiddleware.ts
export function authMiddleware(req: NextRequest) {
  const token = req.cookies.get('token')?.value;

  if (!token) {
    // No token → redirect to login
    return NextResponse.redirect(new URL('/auth/login', req.url));
  }

  return null;  // Has token, continue
}

// Step 4: Login page (app/auth/login/components/LoginForm.tsx)
const onSubmit = async (data) => {
  const response = await login(data.username, data.password);

  if (response.status && response.data) {
    tokenUtils.setToken(response.data.token);  // Store token
    router.push('/admin');  // Redirect to admin
  }
};

// Step 5: lib/auth.tsx
export const login = async (username: string, password: string) => {
  const response = await axios.post(`${BASE_URL}/login`, {
    username,
    password,
  });
  return response.data;
};

// Step 6: lib/utils.ts
export const tokenUtils = {
  setToken: (token: string) => {
    if (typeof window !== 'undefined') {
      document.cookie = `token=${token}; path=/; max-age=86400`;
    }
  },
  // ...
};
```

**3. API Integration Pattern - Study This!**
```typescript
// lib/api.tsx - Your API setup
const BASE_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5001/admin-api';

const apiClient = axios.create({
  baseURL: BASE_URL,
});

// Add token to all requests
apiClient.interceptors.request.use((config) => {
  const token = tokenUtils.getToken();
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

// Example API function
export async function getAllB2BCustomers(): Promise<ApiResponse<B2BCustomer[]>> {
  const response = await apiClient.get('/b2b-customers');
  return response.data;
}

// Usage in component
'use client';

import { useState, useEffect } from 'react';
import { getAllB2BCustomers, B2BCustomer } from '@/lib/api';

export default function B2BCustomerList() {
  const [customers, setCustomers] = useState<B2BCustomer[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadCustomers();
  }, []);

  const loadCustomers = async () => {
    try {
      const response = await getAllB2BCustomers();
      if (response.success) {
        setCustomers(response.data);
      }
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  // ... render customers
}
```

**4. Form Pattern with React Hook Form + Zod**
```typescript
// Your login form pattern (app/auth/login/components/LoginForm.tsx)

// 1. Define Zod schema
const FormSchema = z.object({
  username: z.string().min(1, { message: 'Username is required' }),
  password: z.string().min(1, { message: 'Password is required' }),
});

type FormSchemaType = z.infer<typeof FormSchema>;

// 2. Setup form with zodResolver
const form = useForm<FormSchemaType>({
  resolver: zodResolver(FormSchema),
  defaultValues: {
    username: '',
    password: '',
  },
});

// 3. Handle submission
const onSubmit: SubmitHandler<FormSchemaType> = async (data) => {
  setIsLoading(true);
  try {
    const response = await login(data.username, data.password);
    // Handle success
  } catch (error) {
    // Handle error
  } finally {
    setIsLoading(false);
  }
};

// 4. Render form with Shadcn/ui components
<Form {...form}>
  <form onSubmit={form.handleSubmit(onSubmit)}>
    <FormField
      control={form.control}
      name="username"
      render={({ field }) => (
        <FormItem>
          <FormLabel>Username</FormLabel>
          <FormControl>
            <Input {...field} />
          </FormControl>
          <FormMessage />
        </FormItem>
      )}
    />
    {/* More fields... */}
  </form>
</Form>
```

**5. Context Pattern - Status Options**
```typescript
// contexts/StatusOptionsContext.tsx

// 1. Create context
const StatusOptionsContext = createContext<StatusOptionsContextType | undefined>(undefined);

// 2. Provider component
export function StatusOptionsProvider({ children }: { children: ReactNode }) {
  const [statusOptions, setStatusOptions] = useState<StatusOption[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadStatusOptions();
  }, []);

  const loadStatusOptions = async () => {
    const response = await fetchB2BStatusOptions();
    if (response.success) {
      setStatusOptions(response.data.status_options);
    }
  };

  return (
    <StatusOptionsContext.Provider value={{ statusOptions, loading }}>
      {children}
    </StatusOptionsContext.Provider>
  );
}

// 3. Custom hook for easy access
export function useStatusOptions() {
  const context = useContext(StatusOptionsContext);
  if (!context) {
    throw new Error('useStatusOptions must be used within StatusOptionsProvider');
  }
  return context;
}

// 4. Usage in components
const { statusOptions, loading } = useStatusOptions();
```

**6. Custom Hooks in Your Project**
```typescript
// hooks/useVariantBasedOnRoute.ts
// Purpose: Highlight active navigation item
const useVariantBasedOnRoute = () => {
  const pathname = usePathname();

  return (route: string) => {
    const lastSegment = pathname.split('/').filter(Boolean).pop();
    const lastRouteSegment = route.split('/').filter(Boolean).pop();

    return lastSegment === lastRouteSegment ? 'default' : 'ghost';
  };
};

// Usage in sidebar
const getVariant = useVariantBasedOnRoute();

<Button variant={getVariant('/admin/booking')}>
  Bookings
</Button>
```

**7. Key Features to Understand**

**A. SP Payout System**
- Location: `app/admin/sp-payout/`
- What it does: Manages service provider payments
- Key components: Payment control panel, payout list, bulk actions
- API calls: `getPaymentStats()`, `searchPayouts()`, `bulkPaymentAction()`

**B. B2B Management**
- Location: `app/admin/b2b/`
- What it does: Manages B2B customers, orders, quotations, invoices
- Key components: Customer list, order forms, quotation generator
- Features: SPOC assignment, status tracking, invoice generation

**C. Booking System**
- Location: `app/admin/booking/`
- What it does: Manages service bookings
- Features: Create booking, assign provider, track status

**8. Interview Preparation - Explain Your Code**

**Practice saying:**

"In my eassylife project, I built the admin panel using Next.js 14 with App Router and TypeScript.

For authentication, I implemented middleware that checks for JWT tokens in cookies. If a user tries to access protected routes without a token, they're redirected to the login page.

The login form uses React Hook Form with Zod validation for type-safe form handling. When a user logs in, we call the Node.js backend API using axios, store the JWT token in cookies, and redirect to the admin dashboard.

For state management, I used React Context API for global data like status options that are needed across multiple components. This avoids prop drilling.

All API calls go through a centralized axios instance in lib/api.tsx with interceptors that automatically add auth tokens to requests.

The UI is built with Tailwind CSS and Shadcn/ui components for a consistent, accessible design system.

Key features I worked on include:
- SP payout management system with bulk payment actions
- B2B customer and order management
- SPOC (Single Point of Contact) assignment system
- Real-time status tracking for orders and invoices"

**9. Practice Exercise**

Open these files and trace the flow:
1. `middleware.ts` → `authMiddleware.ts` → `app/auth/login/page.tsx`
2. `lib/api.tsx` → `app/admin/b2b/customers/page.tsx`
3. `contexts/StatusOptionsContext.tsx` → Any component using it

**10. Questions You Should Be Able to Answer**

1. How does authentication work in your project?
2. How do you connect Next.js frontend to Node.js backend?
3. Why did you use React Hook Form instead of plain useState?
4. What is the purpose of middleware in your project?
5. How do you handle loading and error states?
6. What is Context API and where did you use it?
7. How do you ensure type safety with TypeScript?
8. What are the main features you built?

---

## 🎯 WEEK 3: INTERVIEW PREPARATION (Oct 22-25)

### **DAY 15 (Oct 22) - React/Next.js Interview Questions**

#### Full Day Session - Master These Questions

**REACT FUNDAMENTALS**

**1. Q: What is React and why use it?**
**A:** "React is a JavaScript library for building user interfaces using a component-based architecture. We use it because:
- **Component reusability**: Build once, use everywhere
- **Virtual DOM**: Efficient updates, better performance
- **Declarative**: Describe what UI should look like, React handles the how
- **Large ecosystem**: Tons of libraries and community support
- **Backed by Meta**: Well-maintained and widely adopted

In my eassylife project, React helped me build reusable components like forms, tables, and cards that I used across the admin panel."

**2. Q: What is the Virtual DOM?**
**A:** "The Virtual DOM is a lightweight copy of the actual DOM. When state changes:
1. React creates a new Virtual DOM tree
2. Compares it with the previous one (diffing)
3. Calculates the minimum changes needed
4. Updates only those parts in the real DOM

This is faster than updating the entire DOM. For example, in my B2B customer list, when one customer's status changes, React only updates that specific row, not the entire table."

**3. Q: What are React hooks?**
**A:** "Hooks are functions that let you use state and lifecycle features in function components. Common hooks:
- **useState**: Add state to components
- **useEffect**: Handle side effects (API calls, subscriptions)
- **useContext**: Access context values
- **useRef**: Reference DOM elements or persist values
- **useMemo/useCallback**: Performance optimization

In my login form, I use useState for loading state, useEffect to check if user is already logged in, and useForm hook from React Hook Form for form management."

**4. Q: Explain useState with an example.**
**A:** "useState adds state to function components. It returns an array with current value and setter function.

```typescript
const [count, setCount] = useState(0);
//     ↑       ↑           ↑
//   value  setter    initial value

// Update state
setCount(count + 1);  // New value
setCount(prev => prev + 1);  // Function form (better for async)
```

In my SP payout system, I use useState to manage:
- Loading state while fetching payouts
- Selected payouts for bulk actions
- Filter criteria for search"

**5. Q: What is useEffect and when do you use it?**
**A:** "useEffect handles side effects - things that happen outside the component like API calls, subscriptions, timers.

```typescript
// Run once on mount
useEffect(() => {
  fetchData();
}, []);

// Run when dependency changes
useEffect(() => {
  searchUsers(searchTerm);
}, [searchTerm]);

// Cleanup
useEffect(() => {
  const timer = setInterval(() => {}, 1000);
  return () => clearInterval(timer);  // Cleanup
}, []);
```

In my B2B customer list, useEffect fetches customers when the component mounts and refetches when filters change."

**NEXT.JS SPECIFIC**

**6. Q: What is Next.js and why use it over plain React?**
**A:** "Next.js is a React framework that adds:
- **File-based routing**: No need for react-router
- **Server-side rendering**: Better SEO and initial load
- **API routes**: Backend in same project
- **Image optimization**: Automatic image optimization
- **Built-in TypeScript**: Zero config TypeScript support

In eassylife, Next.js simplified routing (each folder in app/ is a route), and I could create API routes for server-side logic without a separate backend project."

**7. Q: What's the difference between App Router and Pages Router?**
**A:** "App Router (Next.js 13+) is the modern approach:
- Uses `app/` directory instead of `pages/`
- Supports Server Components by default
- Better layouts with `layout.tsx`
- Streaming and Suspense support
- More flexible data fetching

My eassylife project uses App Router. For example, `app/admin/booking/page.tsx` creates the `/admin/booking` route automatically."

**8. Q: What are Server Components vs Client Components?**
**A:** "**Server Components** (default):
- Run on server
- Can access database directly
- Don't send JavaScript to client
- Can't use hooks or event handlers

**Client Components** ('use client'):
- Run in browser
- Can use hooks (useState, useEffect)
- Can handle user interactions
- Need JavaScript in browser

In my project, data-fetching pages are Server Components, while forms and interactive UI are Client Components. For example, the login form is a Client Component because it uses useState and handles onClick events."

**9. Q: How does Next.js middleware work?**
**A:** "Middleware runs before a request completes. It's used for:
- Authentication checks
- Redirects
- URL rewriting
- Setting headers

```typescript
export function middleware(req: NextRequest) {
  const token = req.cookies.get('token');

  if (!token) {
    return NextResponse.redirect(new URL('/login', req.url));
  }

  return NextResponse.next();
}
```

In eassylife, middleware checks if users are authenticated before accessing admin routes. If no token, they're redirected to login."

**10. Q: How do you handle authentication in Next.js?**
**A:** "My authentication flow:
1. **Login**: User submits credentials → Call backend API → Receive JWT token
2. **Store token**: Save in httpOnly cookie for security
3. **Middleware**: Check token on every request to protected routes
4. **API calls**: Add token to Authorization header via axios interceptors
5. **Logout**: Clear token and redirect to login

```typescript
// Middleware checks token
const token = req.cookies.get('token');
if (!token) redirect('/login');

// API calls include token
apiClient.interceptors.request.use((config) => {
  config.headers.Authorization = `Bearer ${token}`;
  return config;
});
```"

**TYPESCRIPT**

**11. Q: Why use TypeScript with React?**
**A:** "TypeScript adds type safety:
- **Catch errors early**: Before runtime
- **Better IDE support**: Autocomplete, refactoring
- **Self-documenting**: Types serve as documentation
- **Safer refactoring**: Compiler catches breaking changes

In my project, TypeScript caught errors like:
- Passing wrong prop types to components
- Calling API functions with incorrect parameters
- Accessing properties that don't exist on API responses"

**12. Q: How do you type React components?**
**A:** "Using interfaces for props:

```typescript
interface ButtonProps {
  text: string;
  onClick: () => void;
  disabled?: boolean;  // Optional
  variant?: 'primary' | 'secondary';  // Literal types
}

function Button({ text, onClick, disabled = false, variant = 'primary' }: ButtonProps) {
  return <button onClick={onClick} disabled={disabled}>{text}</button>;
}
```

In my B2B forms, every component has typed props, ensuring I pass correct data."

**STATE MANAGEMENT**

**13. Q: What is Context API and when do you use it?**
**A:** "Context provides global state without prop drilling.

**When to use:**
- Theme (light/dark mode)
- Authentication (user data)
- Language/localization
- Data needed by many components

**When NOT to use:**
- Frequently changing data (causes re-renders)
- Data only needed by few components

In eassylife, I use Context for status options that are needed across multiple B2B components. Instead of fetching them in every component, I fetch once and share via Context."

**14. Q: How do you prevent unnecessary re-renders?**
**A:** "Several techniques:
1. **React.memo**: Memoize components
2. **useMemo**: Memoize expensive calculations
3. **useCallback**: Memoize functions
4. **Proper key props**: In lists
5. **Split components**: Isolate state changes

```typescript
// Memoize expensive calculation
const sortedUsers = useMemo(() => {
  return users.sort((a, b) => a.name.localeCompare(b.name));
}, [users]);

// Memoize callback
const handleClick = useCallback(() => {
  doSomething(id);
}, [id]);
```"

**FORMS**

**15. Q: Why use React Hook Form instead of plain useState?**
**A:** "React Hook Form provides:
- **Better performance**: Fewer re-renders
- **Built-in validation**: Integrates with Zod/Yup
- **Less code**: No manual state for each field
- **Error handling**: Automatic error management

```typescript
// Without React Hook Form (verbose)
const [name, setName] = useState('');
const [email, setEmail] = useState('');
const [errors, setErrors] = useState({});

// With React Hook Form (clean)
const { register, handleSubmit, formState: { errors } } = useForm();
```

In my login form, React Hook Form reduced code by 60% and integrated seamlessly with Zod validation."

---

### **DAY 16 (Oct 23) - Full-Stack Integration & System Design**

#### Morning Session - Explaining Full-Stack Architecture

**1. Q: Explain your full-stack architecture (Node.js + Next.js)**
**A:** "My eassylife project has a clear separation:

**Backend (Node.js + Express):**
- Runs on port 5001
- Handles business logic, database operations
- Provides REST APIs at `/admin-api`, `/b2b`, etc.
- Uses Sequelize ORM for MySQL
- JWT authentication with bcrypt
- Middleware for auth and role checking

**Frontend (Next.js + React):**
- Runs on port 3000
- Consumes backend APIs via axios
- Handles UI, user interactions, routing
- Uses TypeScript for type safety
- Tailwind CSS for styling
- Middleware for client-side route protection

**Communication:**
```typescript
// Frontend calls backend
const response = await axios.post('http://localhost:5001/admin-api/login', {
  username,
  password
});

// Backend responds with JWT
return { success: true, token: 'jwt_token', user: {...} };

// Frontend stores token and uses for subsequent requests
apiClient.interceptors.request.use((config) => {
  config.headers.Authorization = `Bearer ${token}`;
  return config;
});
```"

**2. Q: How do you handle errors across the stack?**
**A:** "**Backend error handling:**
```javascript
// Express error middleware
app.use((err, req, res, next) => {
  console.error(err);
  res.status(err.status || 500).json({
    success: false,
    message: err.message || 'Internal server error'
  });
});
```

**Frontend error handling:**
```typescript
// Axios interceptor for global errors
apiClient.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      router.push('/login');
    }
    return Promise.reject(error);
  }
);

// Component-level error handling
try {
  const response = await createUser(data);
  toast({ title: 'Success', description: 'User created' });
} catch (error) {
  toast({
    title: 'Error',
    description: error.message,
    variant: 'destructive'
  });
}
```

This ensures users always get feedback and errors are logged for debugging."

**3. Q: How would you optimize performance in your full-stack app?**
**A:** "**Backend optimizations:**
- Database indexing on frequently queried columns
- Pagination for large datasets
- Caching with Redis for repeated queries
- Connection pooling for database
- Compression middleware for responses

**Frontend optimizations:**
- Code splitting with Next.js dynamic imports
- Image optimization with Next.js Image component
- Lazy loading for heavy components
- Debouncing search inputs
- React.memo for expensive components
- useMemo/useCallback for expensive calculations

**Example - Pagination:**
```typescript
// Backend
router.get('/users', async (req, res) => {
  const { page = 1, limit = 10 } = req.query;
  const offset = (page - 1) * limit;

  const users = await User.findAndCountAll({
    limit,
    offset,
    order: [['createdAt', 'DESC']]
  });

  res.json({
    data: users.rows,
    total: users.count,
    page,
    totalPages: Math.ceil(users.count / limit)
  });
});

// Frontend
const [page, setPage] = useState(1);
const { data, loading } = useFetch(`/api/users?page=${page}&limit=10`);
```"

**4. Q: Design a feature: Real-time notifications**
**A:** "I would implement using WebSockets:

**Backend (Socket.io):**
```javascript
const io = require('socket.io')(server);

io.on('connection', (socket) => {
  console.log('User connected:', socket.id);

  // Join user-specific room
  socket.on('join', (userId) => {
    socket.join(`user_${userId}`);
  });

  // Disconnect
  socket.on('disconnect', () => {
    console.log('User disconnected');
  });
});

// Emit notification when event occurs
const notifyUser = (userId, notification) => {
  io.to(`user_${userId}`).emit('notification', notification);
};
```

**Frontend:**
```typescript
import { useEffect, useState } from 'react';
import io from 'socket.io-client';

function useNotifications(userId: number) {
  const [notifications, setNotifications] = useState([]);

  useEffect(() => {
    const socket = io('http://localhost:5001');

    socket.emit('join', userId);

    socket.on('notification', (notification) => {
      setNotifications(prev => [notification, ...prev]);
      toast({ title: notification.title });
    });

    return () => socket.disconnect();
  }, [userId]);

  return notifications;
}
```

**Alternative: Polling (simpler but less efficient)**
```typescript
useEffect(() => {
  const interval = setInterval(async () => {
    const response = await fetch('/api/notifications');
    setNotifications(response.data);
  }, 30000);  // Poll every 30 seconds

  return () => clearInterval(interval);
}, []);
```"

#### Afternoon Session - Project Explanation Practice

**5. Explain Your SP Payout System**

"The SP Payout system manages payments to service providers. Here's how it works:

**Backend (Node.js):**
- Calculates payout amounts based on completed bookings
- Deducts platform commission and GST
- Stores payout records in database
- Integrates with Razorpay for actual transfers
- Tracks payment status (pending, processing, completed, failed)

**Frontend (Next.js):**
- Dashboard showing payment statistics
- Search and filter payouts by provider, date, status
- Bulk actions (approve, reject, process multiple payouts)
- Individual payout details with breakdown

**Key Features I Implemented:**
1. **Bulk Payment Processing**: Select multiple payouts and process together
2. **Status Tracking**: Real-time status updates
3. **Search & Filters**: Find specific payouts quickly
4. **Payment Breakdown**: Show base amount, commission, GST, final amount

**Technical Challenges:**
- **Challenge**: Processing 100+ payouts took too long
- **Solution**: Implemented batch processing with progress tracking
- **Challenge**: Race conditions when multiple admins process same payout
- **Solution**: Added database-level locking and status checks

**Code Example:**
```typescript
// Frontend - Bulk action
const handleBulkApprove = async () => {
  const selectedIds = selectedPayouts.map(p => p.id);

  try {
    setLoading(true);
    const response = await bulkPaymentAction({
      payout_ids: selectedIds,
      action: 'approve'
    });

    if (response.success) {
      toast({ title: 'Success', description: `${selectedIds.length} payouts approved` });
      refetchPayouts();
    }
  } catch (error) {
    toast({ title: 'Error', description: 'Failed to approve payouts' });
  } finally {
    setLoading(false);
  }
};
```"

**6. Explain Your B2B Management System**

"The B2B system manages corporate clients and their service orders:

**Key Entities:**
- **Customers**: Corporate clients with contact details
- **Orders**: Service bookings for B2B customers
- **Quotations**: Price quotes before order confirmation
- **Invoices**: Bills generated after service completion
- **SPOC**: Single Point of Contact assigned to each customer

**Workflow:**
1. Create B2B customer
2. Assign SPOC (manager who handles all their requests)
3. Create quotation for requested services
4. Customer approves → Convert to order
5. Assign service provider
6. Complete service
7. Generate invoice
8. Track payment

**Features I Built:**
- **SPOC Assignment**: Each customer has dedicated manager
- **Quotation Generator**: Create detailed quotes with line items
- **Order Management**: Track order status, assign providers
- **Invoice Generation**: Auto-generate invoices from completed orders
- **Status Tracking**: Real-time status updates for orders and payments

**Technical Implementation:**
```typescript
// B2B Quotation with line items
interface QuotationItem {
  service_name: string;
  quantity: number;
  unit_price: number;
  total: number;
}

const createQuotation = async (data: {
  customer_id: number;
  items: QuotationItem[];
  notes: string;
}) => {
  const subtotal = data.items.reduce((sum, item) => sum + item.total, 0);
  const gst = subtotal * 0.18;
  const total = subtotal + gst;

  const response = await apiClient.post('/b2b-quotations', {
    ...data,
    subtotal,
    gst,
    total
  });

  return response.data;
};
```"

**7. Common Follow-up Questions**

**Q: How do you ensure data consistency between frontend and backend?**
**A:** "I use TypeScript interfaces on both sides:

```typescript
// Shared types (could be in a separate package)
interface User {
  id: number;
  name: string;
  email: string;
  role: string;
}

// Backend validates incoming data
const createUserSchema = Joi.object({
  name: Joi.string().required(),
  email: Joi.string().email().required(),
  role: Joi.string().valid('admin', 'user').required()
});

// Frontend uses same interface
const createUser = async (data: Omit<User, 'id'>): Promise<User> => {
  const response = await apiClient.post('/users', data);
  return response.data;
};
```

This ensures both sides expect the same data structure."

**Q: How do you handle file uploads?**
**A:** "Using multer on backend and FormData on frontend:

**Backend:**
```javascript
const multer = require('multer');
const upload = multer({ dest: 'uploads/' });

router.post('/upload', upload.single('file'), async (req, res) => {
  const file = req.file;
  // Process file, upload to S3, etc.
  res.json({ success: true, url: file.path });
});
```

**Frontend:**
```typescript
const handleFileUpload = async (file: File) => {
  const formData = new FormData();
  formData.append('file', file);

  const response = await apiClient.post('/upload', formData, {
    headers: { 'Content-Type': 'multipart/form-data' }
  });

  return response.data.url;
};
```"

---

### **DAY 17 (Oct 24) - Behavioral Questions & Mock Interview**

#### Morning Session - STAR Method Answers

**1. Tell me about yourself**

"I'm a full-stack developer with 3 years of experience, currently working at eassylife where I've built and maintained both backend and frontend systems.

On the backend, I work with Node.js and Express, building REST APIs, managing MySQL databases with Sequelize, and implementing features like JWT authentication and payment integrations with Razorpay.

On the frontend, I recently transitioned to Next.js and TypeScript, building admin panels with React, implementing form validation with React Hook Form and Zod, and creating responsive UIs with Tailwind CSS.

My key projects include:
- **SP Payout System**: Automated payment processing for service providers
- **B2B Management Platform**: Complete system for managing corporate clients, orders, and invoices
- **SPOC Assignment System**: Role-based access control for client management

I'm passionate about writing clean, maintainable code and I'm always learning new technologies. I'm particularly interested in improving my frontend skills and building more scalable systems."

**2. Describe a challenging bug you fixed**

**Situation:** "In our B2B system, we had a critical bug where Excel imports were creating duplicate customers instead of checking for existing ones."

**Task:** "I needed to fix the duplicate creation issue and ensure data integrity without breaking existing functionality."

**Action:**
"1. First, I analyzed the import code and found it was creating new customers without checking for existing ones
2. I added a check to search for existing customers by email or phone before creating
3. Implemented a matching algorithm that handles slight variations in data
4. Added validation to show users which customers already exist
5. Created a detailed error message system to guide users on what data is invalid
6. Wrote tests to ensure the fix worked for various scenarios"

**Result:** "The fix eliminated duplicate customer creation, improved data quality, and the detailed error messages reduced support tickets by 40%. Users could now confidently import large datasets without worrying about duplicates."

**3. Tell me about a time you had to learn something new quickly**

**Situation:** "When I joined the frontend team, I had to learn Next.js, TypeScript, and Tailwind CSS quickly as the project was already underway."

**Task:** "I needed to become productive within 2 weeks to contribute to the admin panel rebuild."

**Action:**
"1. Created a structured learning plan covering Next.js App Router, TypeScript basics, and Tailwind
2. Built small practice projects to understand core concepts
3. Studied the existing codebase to understand patterns and conventions
4. Paired with senior developers to learn best practices
5. Asked questions actively and documented learnings
6. Started with small tasks and gradually took on more complex features"

**Result:** "Within 2 weeks, I was contributing to the project. Within a month, I built the login system with authentication middleware and the B2B quotation form. I'm now comfortable with the entire stack and can work independently on features."

**4. Describe a time you improved performance**

**Situation:** "Our B2B customer list page was loading very slowly with 1000+ customers, taking 5-6 seconds to load."

**Task:** "Improve page load time to under 1 second."

**Action:**
"1. Analyzed the issue - we were fetching all customers at once
2. Implemented server-side pagination (10 customers per page)
3. Added search and filter functionality to reduce data fetched
4. Implemented debouncing on search input to reduce API calls
5. Used React.memo to prevent unnecessary re-renders
6. Added loading skeletons for better perceived performance"

**Result:** "Page load time dropped from 5-6 seconds to under 1 second. Users could find customers faster with search, and the app felt much more responsive. This pattern was then applied to other list pages."

**5. Tell me about a time you disagreed with a team member**

**Situation:** "During the SP payout feature development, I suggested using a web interface for bulk actions, but another developer wanted to keep it as command-line scripts."

**Task:** "Convince the team that a web interface would be better for non-technical users."

**Action:**
"1. I listened to their concerns - they thought a web interface would take too long to build
2. I created a quick prototype in 2 hours showing it wasn't that complex
3. I demonstrated how operations and management teams struggle with command-line tools
4. I showed how a web interface would reduce errors and support tickets
5. We compromised - I built a simple interface first, with plans to enhance it later"

**Result:** "The web interface was approved and built. Operations team loved it, errors decreased by 60%, and we saved hours of support time. The other developer later admitted it was the right call."

**6. How do you handle tight deadlines?**

**Situation:** "We had a client demo in 3 days and the B2B quotation feature wasn't complete."

**Task:** "Deliver a working quotation system for the demo."

**Action:**
"1. Broke down the feature into must-have and nice-to-have parts
2. Focused on core functionality: create quotation, add line items, calculate total
3. Skipped advanced features like templates and email sending for later
4. Worked extra hours and communicated progress daily
5. Tested thoroughly to ensure no bugs in the demo
6. Documented what was pending for post-demo completion"

**Result:** "Demo was successful, client was impressed. We got the contract. I completed the remaining features in the following week. Learned the importance of prioritization and MVP thinking."

#### Afternoon Session - Mock Interview Practice

**Technical Questions to Practice:**

1. Explain the difference between useEffect and useLayoutEffect
2. How does Next.js handle routing?
3. What are the benefits of TypeScript?
4. Explain how JWT authentication works
5. What is the difference between SQL and NoSQL?
6. How do you prevent SQL injection?
7. What is middleware in Express?
8. Explain CORS and how to handle it
9. What are HTTP status codes? Name 5 common ones
10. How do you handle environment variables?

**Coding Challenges to Practice:**

```typescript
// 1. Debounce function
function debounce<T extends (...args: any[]) => any>(
  func: T,
  delay: number
): (...args: Parameters<T>) => void {
  let timeoutId: NodeJS.Timeout;

  return function(...args: Parameters<T>) {
    clearTimeout(timeoutId);
    timeoutId = setTimeout(() => func(...args), delay);
  };
}

// 2. Flatten nested array
function flatten(arr: any[]): any[] {
  return arr.reduce((acc, item) => {
    return acc.concat(Array.isArray(item) ? flatten(item) : item);
  }, []);
}

// 3. Remove duplicates from array
function removeDuplicates<T>(arr: T[]): T[] {
  return [...new Set(arr)];
}

// 4. Group array of objects by key
function groupBy<T>(arr: T[], key: keyof T): Record<string, T[]> {
  return arr.reduce((acc, item) => {
    const groupKey = String(item[key]);
    if (!acc[groupKey]) {
      acc[groupKey] = [];
    }
    acc[groupKey].push(item);
    return acc;
  }, {} as Record<string, T[]>);
}
```

---

### **DAY 18 (Oct 25) - Final Preparation & Confidence Building**

#### Morning Session - Quick Review

**React Essentials Checklist:**
- ✅ Components (functional vs class)
- ✅ Props and state
- ✅ Hooks (useState, useEffect, useContext, custom hooks)
- ✅ Event handling
- ✅ Conditional rendering
- ✅ Lists and keys
- ✅ Forms and controlled components
- ✅ Component lifecycle

**Next.js Essentials Checklist:**
- ✅ App Router vs Pages Router
- ✅ File-based routing
- ✅ Server Components vs Client Components
- ✅ Layouts and nested layouts
- ✅ Dynamic routes
- ✅ Middleware
- ✅ API routes
- ✅ Data fetching patterns

**TypeScript Essentials Checklist:**
- ✅ Basic types (string, number, boolean, array)
- ✅ Interfaces and types
- ✅ Generics
- ✅ Utility types (Partial, Pick, Omit)
- ✅ Type inference
- ✅ Union and intersection types

**Full-Stack Essentials Checklist:**
- ✅ REST API design
- ✅ HTTP methods (GET, POST, PUT, DELETE)
- ✅ Status codes (200, 201, 400, 401, 404, 500)
- ✅ Authentication (JWT)
- ✅ Error handling
- ✅ Database operations (CRUD)
- ✅ Middleware
- ✅ Environment variables

#### Afternoon Session - Confidence Builders

**Your Strengths - Remember These:**

1. **Real Production Experience**: You've built actual features used by real users
2. **Full-Stack Knowledge**: You understand both frontend and backend
3. **Problem Solver**: You've fixed bugs, optimized performance, handled edge cases
4. **Quick Learner**: You learned Next.js, TypeScript, Tailwind in weeks
5. **Team Player**: You've worked with other developers, handled disagreements professionally

**Your Key Projects - Be Ready to Discuss:**

1. **SP Payout System**
   - Payment processing automation
   - Bulk actions
   - Razorpay integration
   - Status tracking

2. **B2B Management System**
   - Customer management
   - Order workflow
   - Quotation generation
   - Invoice creation
   - SPOC assignment

3. **Authentication System**
   - JWT implementation
   - Middleware protection
   - Role-based access control

**Final Tips:**

1. **Be Honest**: If you don't know something, say "I haven't worked with that, but I'm eager to learn"
2. **Ask Questions**: Show interest by asking about their tech stack, team structure, challenges
3. **Be Specific**: Use concrete examples from your projects
4. **Show Growth**: Mention what you learned from challenges
5. **Stay Calm**: Take a breath before answering, it's okay to think

**Questions to Ask Interviewers:**

1. "What does a typical day look like for this role?"
2. "What technologies does your team use?"
3. "How do you handle code reviews and knowledge sharing?"
4. "What are the biggest challenges the team is facing?"
5. "What opportunities are there for learning and growth?"
6. "Can you tell me about the team I'd be working with?"
7. "What does success look like in this role after 3 months? 6 months?"

**Last-Minute Reminders:**

- Review your eassylife codebase one more time
- Practice explaining your projects out loud
- Get good sleep the night before
- Prepare your workspace (if remote interview)
- Have a glass of water nearby
- Smile and be yourself!

---

## 🎉 CONGRATULATIONS!

You've completed the 18-day roadmap! You now have:

✅ **Solid React fundamentals** - Components, hooks, state management
✅ **Next.js expertise** - App Router, Server/Client Components, middleware
✅ **TypeScript proficiency** - Types, interfaces, generics
✅ **Tailwind CSS skills** - Utility-first styling
✅ **Form handling** - React Hook Form + Zod
✅ **API integration** - Axios, error handling, authentication
✅ **Full-stack understanding** - How frontend connects to backend
✅ **Real project knowledge** - Deep understanding of your eassylife code
✅ **Interview readiness** - Technical and behavioral questions prepared

**You're ready to ace those interviews! 🚀**

Remember: You have real production experience. You've built actual features. You've solved real problems. Be confident in what you know, be honest about what you don't, and show your eagerness to learn.

**Good luck! You've got this! 💪**



