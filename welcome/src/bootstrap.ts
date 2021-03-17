import {IBootstrapPublicAPI} from "../../bootstrap/src/public-api";

function assertBootstrapIsAvailable(bootstrap: any): true | never {
  if (!bootstrap) {
    throw new Error('Bootstrap is not available');
  }

  return true;
}

function getBootstrapApi(): IBootstrapPublicAPI | never {
  const bootstrap = (window as any).bootstrap;
  assertBootstrapIsAvailable(bootstrap);
  return bootstrap;
}

let bootstrap: IBootstrapPublicAPI;

function provideBootstrapApi(): IBootstrapPublicAPI | never {
  if (!bootstrap) {
    bootstrap = getBootstrapApi();
  }

  return bootstrap;
}
export { provideBootstrapApi as getBootstrapApi }

export function getLifecycleEvents() {
  const bootstrap = getBootstrapApi();
  return bootstrap.lifecycle;
}
