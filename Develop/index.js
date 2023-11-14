// TODO: Include packages needed for this application
const inquirer = require('inquirer')


// TODO: Create an array of questions for user input
const questions = [
    {
        type: 'input',
        name: 'title',
        message: 'Title of Project:'
    },
    {
        type: 'input',
        name: 'description',
        message: 'Description:'
    },
    {
        type: 'input',
        name: 'table',
        message: 'Table of Contents:'
    },
    {
        type: 'input',
        name: 'installation',
        message: 'Installation:'
    },
    {
        type: 'input',
        name: 'usage',
        message: 'Usage:'
    },
    {
        type: 'input',
        name: 'license',
        message: 'License:'
    },
    {
        type: 'input',
        name: 'contributors',
        message: 'Contributors:'
    },
    {
        type: 'input',
        name: 'tests',
        message: 'Tests:'
    },
    {
        type: 'input',
        name: 'questions',
        message: 'Questions:'
    }
];

async function startGenerator() {
    try {
        const answers = await inquirer.prompt(questions);
    } catch (err) {
        console.error(err);
    }
}


// TODO: Create a function to write README file
function writeToFile(fileName, data) {}

// TODO: Create a function to initialize app
function init() {}

// Function call to initialize app
init();
