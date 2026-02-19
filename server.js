const express = require('express');

const employeeRoutes = require('./routes/employeeRoutes');
const errorHandler = require('./middleware/errorHandler');

const app = express();
const port = 3000;

app.use(express.json());

app.use((req, res, next) => {
    console.log(`[${new Date().toLocaleTimeString()}] ${req.method} ${req.url}`);
    next();
});

app.use('/api/employees', employeeRoutes);

app.get('/', (req, res) => {
    res.json({
        message: 'Welcome to the Employee Management API',
        endpoints: {
            'GET /api/employees': 'Get all employees',
            'POST /api/employees': 'Create a new employee',
            'GET /api/employees/:id': 'Get existing employee by ID',
            'PUT /api/employees/:id': 'Update existing employee by ID',
            'DELETE /api/employees/:id': 'Delete existing employee by ID'
        },
    });
});

app.use(errorHandler);

app.listen(port, () =>  {
    console.log(`Server is running on http://localhost:${port}`);
});