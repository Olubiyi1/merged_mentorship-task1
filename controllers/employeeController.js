const {v4: uuuidv4} = require('uuid');

const employees = require('../data/employees');

const getAllEmployees = (req, res) => {
    const {department, position, status} = req.query;
    let result = [...employees];

    if(department) {
        result =result.filter(
            (empl) => empl.department.toLowerCase() === department.toLowerCase()
        );
    }

    if(status) {
        result = result.filter(
            (empl) => empl.status.toLowerCase() === status.toLowerCase()
        );
    }

    if(position) {
        result = result.filter(
            (empl) => empl.position.toLowerCase() === position.toLowerCase()
        );
    }

    res.status(200).json({
        success: true,
        count: result.length,
        data: result
    });


};

const createEmployee = (req, res) => {
    const {firstName, lastName, email, department, position, salary, hireDate, phone, status} = req.body;

    const requiredFields = { firstName, lastName, email, department, position} ;
    const missingFields = Object.keys(requiredFields).filter((key) => !requiredFields[key]);

    if(missingFields.length > 0) {
        return res.status(400).json({
            success: false,
            message: `Missing required fields: ${missingFields.join(', ')}`
        });
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if(!emailRegex.test(email)) {
        return res.status(400).json({
            success: false,
            message: 'Invalid email format'
        });
    }

    const emailExixts = employees.find((empl) => empl.email === email);
    if(emailExixts) {
        return res.status(400).json({
            success: false,
            message: 'Email already exists'
        });
    }

    const newEmployee = {
        id: uuuidv4(),
        firstName,
        lastName,
        email,
        department,
        position,
        salary: salary || 0,
        hireDate: hireDate || new Date().toISOString().split('T')[0],
        phone: phone || '',
        status: status || 'active',
    };

    employees.push(newEmployee);
    res.status(201).json({
        success: true,
        message: `Employee "${newEmployee.firstName} ${newEmployee.lastName}" created successfully`,
        data: newEmployee
    });
};

module.exports = {
    getAllEmployees,
    createEmployee,
    // getEmployeeById,
};