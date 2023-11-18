// TODO: Include packages needed for this application
const inquirer = require('inquirer');
const fs = require('fs');
const fetch = import('node-fetch').then((module) => module.default);

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
        name: 'licenseKey',
        message: 'License SPDX identifier:'
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
        const { title, description, table, installation, usage, licenseKey, contributors, tests, anyQ } = answers;
        const licenseInfo = await getLicenseInfo(licenseKey);
        let readMeContent = `## Title\n${title}\n\n## Description\n${description}\n\n## Table of Contents\n${table}\n\n## Installation\n${installation}\n\n## Usage\n${usage}\n\n## License\n${JSON.stringify(
            licenseInfo,
            null,
            2
          )}\n\n## Contributors\n${contributors}\n\n## Tests\n${tests}\n\n## Questions\n${anyQ}\n`;

        writeToFile('READMETEST.md', readMeContent);
    } catch (err) {
        console.error(err);
    }
}

async function getLicenseInfo(licenseKey) {
    try {
      const fetchModule = await import('node-fetch');
      const fetch = fetchModule.default;
      const response = await fetch(`https://api.github.com/licenses/${licenseKey}`);
      const data = await response.json();
      return {
        name: data.name,
        spdx_id: data.spdx_id,
        url: data.url,
        description: data.description,
        permissions: data.permissions,
        conditions: data.conditions,
        limitations: data.limitations,
        body: data.body,
      };
    } catch (error) {
      console.error('Error fetching license information:', error);
      return {};
    }
  }

// TODO: Create a function to write README file
function writeToFile(fileName, data) {
    fs.writeFileSync(fileName, data, 'utf8');
    console.log(`File ${fileName} has been written successfully!`);
}

startGenerator();