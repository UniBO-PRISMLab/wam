import npm from 'global-npm';

export default function install(projectDir: string): Promise<void> {
  return new Promise((resolve, reject) => {
    npm.load({}, () => {
      // @ts-ignore
      // @types/global-npm define a wrong ts declaration for install function
      npm.commands.install(projectDir, [], error => {
        if (error) {
          reject(error);
        } else {
          resolve();
        }
      });
    });
  });
}
