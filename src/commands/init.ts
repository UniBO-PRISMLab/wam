import { readFileSync } from 'fs';
import { copySync, ensureDirSync, outputFileSync } from 'fs-extra';
import { compile } from 'handlebars';
import { extname, resolve, basename } from 'path';

import { askInit } from '../questions/askInit';
import { trimFileExt } from '../utils/trimFileExt';

export async function init(directory: any): Promise<void> {
  const selectedDirectory = directory ? directory : '.';

  const initData = await askInit(basename(resolve(selectedDirectory)));
  initData.keywords = (initData.keywords as string).split(',');

  const selectedTemplate = resolve(__dirname, '../../templates/simple');

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
}
