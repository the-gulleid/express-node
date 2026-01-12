// Simple logging middleware
const logger = (req, res, next) => {
    const timestamp = new Date().toISOString();
    console.log(`[${timestamp}] ${req.method} ${req.path}`);
    next(); // Pass control to the next middleware
};

module.exports = logger;

