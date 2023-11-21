// TODO: Include packages needed for this application
const inquirer = require('inquirer');
const fs = require('fs');

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
        name: 'githubUsername',
        message: 'GitHub Username:'
    },
    {
        type: 'input',
        name: 'personalEmail',
        message: 'Personal Email:'
    },
];

function formatLicenseInfo(licenseInfo) {
    return `**License:**\n\nName: ${licenseInfo.name}\nSPDX ID: ${licenseInfo.spdx_id}\nURL: ${licenseInfo.url}\nDescription: ${licenseInfo.description}\n\nPermissions: ${licenseInfo.permissions.join(', ')}\nConditions: ${licenseInfo.conditions.join(', ')}\nLimitations: ${licenseInfo.limitations.join(', ')}\n\nBody: ${licenseInfo.body}\n`;
}

async function startGenerator() {
    try {
        const answers = await inquirer.prompt(questions);
        const { title, description, table, installation, usage, licenseKey, contributors, tests, anyQ, githubUsername, personalEmail } = answers;

        const licenseInfo = await getLicenseInfo(licenseKey);
        if (!licenseInfo.name) {
            console.log(`Invalid license key: ${licenseKey}`);
            return;
        }

        let readMeContent = `## Title\n${title}\n\n## Description\n${description}\n\n## Table of Contents\n${table}\n\n## Installation\n${installation}\n\n## Usage\n${usage}\n\n${formatLicenseInfo(licenseInfo)}\n## Contributors\n${contributors}\n\n## Tests\n${tests}\n\n## Questions\nFeel free to reach out with any questions on my [GitHub](https://github.com/${githubUsername}) or via email at ${personalEmail}.\n`;

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

function writeToFile(fileName, data) {
    fs.writeFileSync(fileName, data, 'utf8');
    console.log(`File ${fileName} has been written successfully!`);
}

startGenerator();