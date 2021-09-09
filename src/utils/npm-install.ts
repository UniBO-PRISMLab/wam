import npm from 'global-npm';

export default async function install(projectDir: string): Promise<void> {
  // @ts-ignore
  const version = npm.version;
  if (version.startsWith('6.')) {
    return installV6(projectDir);
  } else if (version.startsWith('7.')) {
    return installV7(projectDir);
  } else {
    throw new Error(`Unsupported npm version: ${version}`);
  }
}

function installV6(projectDir: string): Promise<void> {
  return new Promise((resolve, reject) => {
    // @ts-ignore
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

function installV7(projectDir: string): Promise<void> {
  return new Promise((resolve, reject) => {
    // @ts-ignore
    npm.load(() => {
      npm.prefix = projectDir;
      // @ts-ignore
      // @types/global-npm define a wrong ts declaration for install function
      npm.commands.install([], error => {
        if (error) {
          reject(error);
        } else {
          resolve();
        }
      });
    });
  });
}
