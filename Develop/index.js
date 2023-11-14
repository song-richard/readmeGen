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
        name: 'question',
        message: 'Questions:'
    }
];


async function startGenerator() {
    try {
        const answers = await inquirer.prompt(questions);
    const { title } = answers;
    const { description } = answers;
    const { table } = answers;
    const { installation } = answers;
    const { usage } = answers;
    const { license } = answers;
    const { contributors } = answers;
    const { tests } = answers;
    const { question } = answers;
    
    const readMeContent = `## ${title}\n## ${description} \n## ${table} \n## ${installation} \n## ${usage} \n## ${license} \n## ${contributors} \n## ${tests} \n## ${question}`;

    writeToFile('READMETEST.md', readMeContent)

    } catch (err) {
        console.error(err);
    }
}



// TODO: Create a function to write README file
function writeToFile(fileName, data) {
    fs.writeFileSync(fileName, data, 'utf8');
    console.log(`File ${fileName} has been written successfully!`)
}

// TODO: Create a function to initialize app
// function init() {}

// Function call to initialize app
// init();

startGenerator();