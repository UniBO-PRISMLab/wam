import * as inquirer from 'inquirer';

import { Choice, License } from '../models/choice';
import { InitData } from '../models/initData';

export async function askInit(): Promise<InitData> {
  const licenses: Choice[] = [
    { name: 'Apache License 2.0', value: License.APACHE },
    { name: 'GNU General Public License v3.0', value: License.GPL3 },
    { name: 'MIT License', value: License.MIT },
  ];

  return inquirer.prompt([
    {
      name: 'name',
      type: 'input',
    },
    {
      name: 'version',
      type: 'input',
    },
    {
      name: 'description',
      type: 'input',
    },
    {
      name: 'keywords',
      message: 'Enter the keywords separated by a comma:',
      type: 'input',
    },
    {
      name: 'author',
      type: 'input',
    },
    {
      name: 'license',
      type: 'list',
      choices: licenses,
    },
  ]);
}
