import {Lifecycle} from "./lifecycle";

export interface IBootstrapRouter {
  history: ReadonlyArray<string>;
  navigateTo<T>(path: string): Promise<T>;
}
export interface IBootstrapPublicAPI {
  router: IBootstrapRouter;
  lifecycle: {
    [key in keyof typeof Lifecycle]: Lifecycle
  }
}

export function exposeBootstrapApi(api: IBootstrapPublicAPI): void {
  (window as any).bootstrap = api;
}

export function getBootstrapApi(): IBootstrapPublicAPI {
  return (window as any).bootstrap;
}
