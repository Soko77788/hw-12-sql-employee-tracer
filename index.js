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

//begin program and trigger prompts() function in prompts.js
async function mainMenu() {
    const { action } = await prompts();

//switch statements to retrieve functions created in queries.js
    switch (action) {
        case 'View all departments':
            console.table(await getDepartments());
            break;
        case 'View all roles':
            console.table(await getRoles());
            break;
        case 'View all employees':
            console.table(await getEmployees());
            break;

            //Add new prompts to retrieve update data
        case 'Add a department':
            const { name } = await inquirer.prompt([{ type: 'input', name: 'name', message: 'Enter the name of the department:' }]);
            await addDepartment(name);
            break;
        case 'Add a role':
            // Fetch departments for prompt choices
            const departments = await getDepartments();
            const departmentChoices = departments.map(department => ({ name: department.name, value: department.id }));
            const { title, salary, department_id } = await inquirer.prompt([
                { type: 'input', name: 'title', message: 'Enter the title of the role:' },
                { type: 'input', name: 'salary', message: 'Enter the salary for the role:' },
                { type: 'list', name: 'department_id', message: 'Select the department for the role:', choices: departmentChoices },
            ]);
            await addRole(title, salary, department_id);
            break;
        case 'Add an employee':
            // Fetch roles and employees for prompt choices
            const roles = await getRoles();
            const roleChoices = roles.map(role => ({ name: role.title, value: role.id }));
            const employees = await getEmployees();
            const managerChoices = employees.map(employee => ({ name: `${employee.first_name} ${employee.last_name}`, value: employee.id }));
            managerChoices.push({ name: 'None', value: null });
            const { first_name, last_name, role_id, manager_id } = await inquirer.prompt([
                { type: 'input', name: 'first_name', message: 'Enter the first name of the employee:' },
                { type: 'input', name: 'last_name', message: 'Enter the last name of the employee:' },
                { type: 'list', name: 'role_id', message: 'Select the role for the employee:', choices: roleChoices },
                { type: 'list', name: 'manager_id', message: 'Select the manager for the employee:', choices: managerChoices },
            ]);
            await addEmployee(first_name, last_name, role_id, manager_id);
            break;
        case 'Update an employee role':
            // Fetch employees and roles for prompt choices
            const employeeChoices = (await getEmployees()).map(employee => ({ name: `${employee.first_name} ${employee.last_name}`, value: employee.id }));
            const roleChoicesForUpdate = (await getRoles()).map(role => ({ name: role.title, value: role.id }));
            const { employee_id, role_id: new_role_id } = await inquirer.prompt([
                { type: 'list', name: 'employee_id', message: 'Select the employee to update:', choices: employeeChoices },
                { type: 'list', name: 'role_id', message: 'Select the new role for the employee:', choices: roleChoicesForUpdate },
            ]);
            await updateEmployeeRole(employee_id, new_role_id);
            break;
        case 'Quit':
            process.exit();
    }
    mainMenu();
}

mainMenu();


