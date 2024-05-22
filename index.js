//require in packages and modularized files

const inquirer = require('inquirer');
const { prompts } = require('./lib/prompts');
const {
    getDepartments,
    getRoles,
    getEmployees,
    addDepartment,
    addRole,
    addEmployee,
    updateEmployeeRole
} = require('./lib/queries');




