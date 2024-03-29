// tslint:disable:no-console
import { readFileSync } from 'fs';
import { copySync, ensureDirSync, outputFileSync } from 'fs-extra';
import { compile } from 'handlebars';
import { extname, resolve, basename } from 'path';

import { askInit } from '../questions/askInit';
import { trimFileExt } from '../utils/trimFileExt';
import * as packageJson from '../../package.json';
import chalk from 'chalk';
import { Lang } from '../models/choice';
import install from '../utils/npm-install';
import ora from 'ora';

export async function init(directory: any): Promise<void> {
  const selectedDirectory = directory ? directory : '.';

  const initData = await askInit(basename(resolve(selectedDirectory)));
  initData.keywords = (initData.keywords as string).split(',');
  initData.selfVersion = `^${packageJson.version}`;
  const templatePath = initData.language === Lang.JS ? '../../templates/simple' : '../../templates/simplets';
  const selectedTemplate = resolve(__dirname, templatePath);

  const transformFile = (src: string, dest: string): boolean => {
    if (extname(src) === '.hbs') {
      const source = readFileSync(src).toString();
      const template = compile(source);
      outputFileSync(trimFileExt(dest), template(initData));
      return false;
    }
    return true;
  };

  ensureDirSync(selectedDirectory);
  copySync(selectedTemplate, selectedDirectory, { filter: transformFile });

  console.log();
  console.log(`${chalk.bold('Thanks!')}; installing packages using ${chalk.bold('npm')}:`);
  const spinner = ora({
    text: `Installing`,
    spinner: 'dots',
  }).start();

  try {
    await install(selectedDirectory);
    spinner.succeed(`Done! ${chalk.bold('🎉')}`);
  } catch (error) {
    spinner.fail(`${chalk.bold('💥')} npm couldn't install your packages;`);
    console.log(`As a workaround, you can run ${chalk.bold('npm install')} manually.`);
  }

  console.log();
  console.log();
  console.log(`${chalk.bold.green('WAM')}! your project is ready`);
  console.log(`try it out!:`);
  console.log(
    `${chalk.bold('cd')} ${selectedDirectory} && ${chalk.bold('npm')} run build && ${chalk.bold('npm')} start`,
  );
}
