import * as inquirer from 'inquirer';

import { Choice, License, Lang } from '../models/choice';
import { InitData } from '../models/initData';

export async function askInit(defaultName: string): Promise<InitData> {
  const licenses: Choice[] = [
    { name: 'Apache License 2.0', value: License.APACHE },
    { name: 'GNU General Public License v3.0', value: License.GPL3 },
    { name: 'MIT License', value: License.MIT },
  ];

  const langs: Lang[] = [Lang.TS, Lang.JS];

  return inquirer.prompt([
    {
      name: 'language',
      type: 'list',
      default: Lang.JS,
      choices: langs,
    },
    {
      name: 'name',
      type: 'input',
      default: defaultName,
    },
    {
      name: 'version',
      type: 'input',
      default: '1.0.0',
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
