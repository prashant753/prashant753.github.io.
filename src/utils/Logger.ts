export class Logger {
  public static log(...params: any[]) {
    // tslint:disable-next-line: no-console
    console.log(params);
  }

  public static debug(...params: any[]) {
    // tslint:disable-next-line: no-console
    console.debug(params);
  }

  public static warn(...params: any[]) {
    // tslint:disable-next-line: no-console
    console.warn(params);
  }

  public static info(...params: any[]) {
    // tslint:disable-next-line: no-console
    console.info(params);
  }

  public static error(...params: any[]) {
    // tslint:disable-next-line: no-console
    console.warn(params);
  }
}
