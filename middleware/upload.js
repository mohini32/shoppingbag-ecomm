const multer = require('multer');

// Simple no-op middleware for production without AWS
const createMulter = (folder) => {
    console.warn('⚠️  File uploads disabled in production (AWS not configured)');

    // Return a middleware that just passes through without processing files
    return {
        array: (fieldName, maxCount) => {
            return (req, res, next) => {
                // Just continue without processing any files
                req.files = []; // Empty files array
                next();
            };
        },
        single: (fieldName) => {
            return (req, res, next) => {
                // Just continue without processing any files
                req.file = null;
                next();
            };
        }
    };
}
module.exports={createMulter};


