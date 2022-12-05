import { debug, Debugger } from 'debug';
import { environment } from '../../environments/environment';

if (!environment.production) {
  debug.enable('app:*');
}

export interface Logger {
  debug: Debugger,
  error: Debugger,
}

export default (namespace: string): Logger => {
  const loggerDebug: Debugger = debug(`app:${namespace}`);
  const loggerError: Debugger = debug(`app:${namespace}`);
  loggerDebug.bind(console.log);
  loggerError.bind(console.error);
  return {
    debug: loggerDebug,
    error: loggerError,
  };
}


