export interface IBootstrapRouter {
  history: ReadonlyArray<string>;
  activateMicroFrontend<T>(path: string): Promise<T>;
}
export interface IBootstrapPublicAPI {
  router: IBootstrapRouter;
}

export function exposePublicApi(api: IBootstrapPublicAPI): void {
  (window as any).bootstrap = api;
}

export function getPublicApi(): IBootstrapPublicAPI {
  return (window as any).bootstrap;
}
