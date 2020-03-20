import MagicString from 'magic-string';
import { resolve, basename } from 'path';

interface RollupWoTOption {
  mainFile: string;
}

export default function rollupWoT(options: RollupWoTOption) {
  let { mainFile } = options;
  mainFile = resolve(mainFile);
  return {
    name: 'wot',
    transform(code: string, id: string): any {
      if (mainFile !== id) {
        return null;
      }
      const moduleName = basename(id)
        .split('.')
        .slice(0, -1)
        .join('.');

      const s = new MagicString(code);
      const regex = new RegExp(`var\\s*${moduleName}\\s*=\\s*{.*};\\s*export\\sdefault\\s${moduleName};$`, 'gs');
      const m = regex.exec(code);

      if (m) {
        s.remove(regex.lastIndex - m[0].length, regex.lastIndex);
        return {
          code: s.toString(),
          map: s.generateMap({ hires: true }),
        };
      }
      return null;
    },
  };
}
