// TODO: Include packages needed for this application
const inquirer = require('inquirer');
const fs = require('fs')


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
        name: 'anyQ',
        message: 'Questions:'
    }
];

async function startGenerator() {
    try {
        const answers = await inquirer.prompt(questions);
        const { title, description, table, installation, usage, license, contributors, tests, anyQ } = answers;

        let readMeContent = `## Title\n${title}\n\n## Description\n${description}\n\n## Table of Contents\n${table}\n\n## Installation\n${installation}\n\n## Usage\n${usage}\n\n## License\n${license}\n\n## Contributors\n${contributors}\n\n## Tests\n${tests}\n\n## Questions\n${anyQ}\n`;

        writeToFile('READMETEST.md', readMeContent);

    } catch (err) {
        console.error(err);
    }
}

// TODO: Create a function to write README file
function writeToFile(fileName, data) {
    fs.writeFileSync(fileName, data, 'utf8');
    console.log(`File ${fileName} has been written successfully!`);
}

// TODO: Create a function to initialize app
// function init() {}

// Function call to initialize app
// init();

startGenerator();