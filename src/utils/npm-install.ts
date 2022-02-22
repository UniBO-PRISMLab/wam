export default async function install(projectDir: string): Promise<void> {
  // Sadly npm 8 throws an error on import and we need to catch it
  // here.
  const npm = await import('npm');
  // @ts-ignore
  const version = npm.version;
  if (version.startsWith('6.')) {
    return installV6(projectDir, npm);
  } else if (version.startsWith('7.')) {
    return installV7(projectDir, npm);
  } else {
    throw new Error(`Unsupported npm version: ${version}`);
  }
}

function installV6(projectDir: string, npm: any): Promise<void> {
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

function installV7(projectDir: string, npm: any): Promise<void> {
  return new Promise((resolve, reject) => {
    npm.load(() => {
      npm.prefix = projectDir;
      npm.commands.install([], (error: Error) => {
        if (error) {
          reject(error);
        } else {
          resolve();
        }
      });
    });
  });
}
