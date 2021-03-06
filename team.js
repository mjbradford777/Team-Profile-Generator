const inquirer = require('inquirer');
const fs = require('fs');
let manager;
let newEngineer;
let newIntern;
let engineers = [];
let interns = [];

class Employee {
    constructor(name, ID, email, role) {
        this.name = name;
        this.ID = ID;
        this.email = email;
        this.role = role;
    }

    getName() {
        return this.name;
    }

    getID() {
        return this.ID;
    }

    getEmail() {
        return this.email;
    }

    getRole() {
        return 'Employee';
    }
}

class Manager extends Employee {
    constructor(name, ID, email, role, office) {
        super(name, ID, email, role);
        this.office = office;
    }

    getRole() {
        return 'Manager';
    }
}

class Engineer extends Employee {
    constructor(name, ID, email, role, github) {
        super(name, ID, email, role);
        this.github = github;
    }

    getGithub() {
        return this.github;
    }

    getRole() {
        return 'Engineer';
    }
}

class Intern extends Employee {
    constructor(name, ID, email, role, school) {
        super(name, ID, email, role);
        this.school = school;
    }

    getSchool() {
        return this.school;
    }

    getRole() {
        return 'Intern';
    }
}

const appendIntern = (newIntern) => {
    fs.appendFile('team.html', `<div class="card">\n<div class="card-body">\n<h3 class="card-title"><i class="fas fa-graduation-cap"></i> ${newIntern.name}</h3>\n<p class="card-text">ID: ${newIntern.ID}</p>\n<p class="card-text">Email: ${newIntern.email}</p>\n<p class="card-text">${newIntern.role}</p>\n<p class="card-text">School: ${newIntern.school}</p>\n</div>\n</div>\n`, 'utf8', (err) => {
        if (err) throw err;
      });
    
    return '</div>\n</div>\n</body>\n</html>';
}

async function appendEnd() {
    let result = await appendIntern(newIntern);
    fs.appendFile('team.html', `${result}`, 'utf8', (err) => {
        if (err) throw err;
      });
}

const createEngineer = () => {
    inquirer
        .prompt([{
            message: 'Engineer\'s name: ',
            name: 'engineerName'
        },
        {
            message: 'Engineer\'s ID: ',
            name: 'engineerID'
        },
        {
            message: 'Engineer\'s email: ',
            name: 'engineerEmail'
        },
        {
            message: 'Engineer\'s github username: ',
            name: 'engineerGithub'
        },
        {
            type: 'list',
            name: 'moreEngineers',
            message: 'Any more engineers to add?',
            choices: ['Yes', 'No']
        }
        ])
        .then(answers => {
            newEngineer = new Engineer(answers.engineerName, answers.engineerID, answers.engineerEmail, 'Engineer', answers.engineerGithub);
            engineers.push(newEngineer);
            fs.appendFile('team.html', `<div class="card">\n<div class="card-body">\n<h3 class="card-title"><i class="fas fa-laptop-code"></i> ${newEngineer.name}</h3>\n<p class="card-text">ID: ${newEngineer.ID}</p>\n<p class="card-text">Email: ${newEngineer.email}</p>\n<p class="card-text">${newEngineer.role}</p>\n<p class="card-text">Github: ${newEngineer.github}</p>\n</div>\n</div>\n`, 'utf8', (err) => {
                if (err) throw err;
              });
            if(answers.moreEngineers === 'Yes') {
                createEngineer();
            } else {
                createIntern();
            }
        });
};

const createIntern = () => {
    inquirer
        .prompt([{
            message: 'Intern\'s name: ',
            name: 'internName'
        },
        {
            message: 'Intern\'s ID: ',
            name: 'internID'
        },
        {
            message: 'Intern\'s email: ',
            name: 'internEmail'
        },
        {
            message: 'Intern\'s school: ',
            name: 'internSchool'
        },
        {
            type: 'list',
            name: 'moreInterns',
            message: 'Any more interns to add?',
            choices: ['Yes', 'No']
        }
        ])
        .then(answers => {
            newIntern = new Intern(answers.internName, answers.internID, answers.internEmail, 'Intern', answers.internSchool);
            interns.push(newIntern);            

            if(answers.moreInterns === 'Yes') {                
                appendIntern(newIntern);
                createIntern();
            } else {
                appendEnd();
            }
        });
};

inquirer
    .prompt([{
        message: 'Team manager\'s name: ',
        name: 'managerName'
    },
    {
        message: 'Manager\'s ID: ',
        name: 'managerID'
    },
    {
        message: 'Manager\'s email: ',
        name: 'managerEmail'
    },
    {
        message: 'Manager\'s office number: ',
        name: 'officeNumber'
    }
    ])
    .then(answers => {
        manager = new Manager(answers.managerName, answers.managerID, answers.managerEmail, 'Manager', answers.officeNumber);
        console.log(manager);
        fs.writeFile('team.html', `<!DOCTYPE html>\n<html lang="en-us">\n  <head>\n  <meta charset="UTF-8">\n<meta name="viewport" content="width=device-width, initial-scale=1">\n<link rel="stylesheet" href="https://stackpath.bootstrapcdn.com/bootstrap/4.3.1/css/bootstrap.min.css" integrity="sha384-ggOyR0iXCbMQv3Xipma34MD+dH/1fQ784/j6cY/iJTQUOhcWr7x9JvoRxT2MZw1T" crossorigin="anonymous">\n<script src="https://kit.fontawesome.com/2da00a6357.js" crossorigin="anonymous"></script>\n<link rel="stylesheet" href="style.css">\n</head>\n<body>\n<div class="container">\n<div class="row">\n<div class="card">\n<div class="card-body">\n<h3 class="card-title"><i class="fas fa-user"></i> ${manager.name}</h3>\n<p class="card-text">ID: ${manager.ID}</p>\n<p class="card-text">Email: ${manager.email}</p>\n<p class="card-text">${manager.role}</p>\n<p class="card-text">Office Number: ${manager.office}</p>\n</div>\n</div>\n`, 'utf8', (err) => {
            if (err) throw err;
          });
        createEngineer();
    });