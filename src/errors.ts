export class Exception extends Error {
  constructor(message: string) {
    super(message);
    this.name = 'Exception';
    if ('captureStackTrace' in Error) {
      // @ts-expect-error
      Error.captureStackTrace(this, Exception);
    }
  }
}

export class NotSetEnvError extends Error {
  constructor(envName: string) {
    super(`${envName} not set yet`);
    this.name = 'NotSetEnvError';
  }
}
