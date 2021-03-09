import {IBootstrapPublicAPI} from "../../bootstrap/src/public-api";

export function getBootstrapApi(): IBootstrapPublicAPI {
  return (window as any).bootstrap;
}

export function getLifecycleEvents() {
  const bootstrap = getBootstrapApi();
  return bootstrap.lifecycle;
}
