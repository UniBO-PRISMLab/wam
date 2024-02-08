import { spawn } from 'child_process';

export default async function install(projectDir: string): Promise<void> {
  // Sadly npm 8 throws an error on import and we need to catch it
  // here.
  let npm = null;
  try {
    npm = await import('npm');
  } catch (error) {
    return installV8AndLater(projectDir);
  }
  // @ts-ignore
  const version = npm.version;
  if (version.startsWith('6.')) {
    return installV6(projectDir, npm);
  } else if (version.startsWith('7.')) {
    return installV7(projectDir, npm);
  } else {
    return installV8AndLater(projectDir);
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

function installV8AndLater(projectDir: string): Promise<void> {
  return new Promise((resolve, reject) => {
    const bufferedOutput: Array<{ stream: NodeJS.WriteStream; data: Buffer }> = [];

    const childProcess = spawn('npm', ['install'], {
      // Always pipe stderr to allow for failures to be reported
      stdio: ['ignore', 'ignore', 'pipe'],
      shell: true,
      cwd: projectDir,
    }).on('close', (code: number) => {
      if (code === 0) {
        resolve();
      } else {
        bufferedOutput.forEach(({ stream, data }) => stream.write(data));
        reject(new Error('npm install failed'));
      }
    });

    if (childProcess.stderr) {
      childProcess.stderr.on('data', (data: Buffer) => bufferedOutput.push({ stream: process.stdout, data }));
    }
  });
}
