import config from "./config.json";
import {loadDocument} from "./load-document";
import {createContainer, mountMicroFrontendInPage, unmountMicroFrontendFromPage} from "./mount";
import {IBootstrapRouter} from "./public-api";

export class Router implements IBootstrapRouter {
  history: ReadonlyArray<string> = [];

  activateMicroFrontend(path: string): Promise<any> {
    if (this.history.length !== 0) {
      unmountMicroFrontendFromPage();
    }

    const mfePathId = getPathId(path);
    const mfeName = getMicroFrontendNameFromPathId(mfePathId);
    const mfePath = getMicroFrontendEntryPoint(mfeName);
    return loadDocument(mfePath)
      .then(microFrontendDocument => {
        mountMicroFrontendInPage(mfeName, microFrontendDocument)
      })
      .then(() => {
        this.history = this.history.concat(path);
        window.history.pushState({}, '', path);
      })
  }
}


function getPathId(path: string): string {
  const MicroFrontendPathMatch = 1;
  return path.split('/')[MicroFrontendPathMatch];
}

function getMicroFrontendNameFromPathId(pathId: string): string {
  if (!config?.routes) { throw new Error('No route configuration'); }

  const routes = config.routes;
  if (routes.length === 0) { throw new Error('No route defined'); }

  const route = routes.find(({path}: {path: string}) => path === pathId);

  if (!route) { throw new Error(`No application matches path id: ${pathId}`)}

  return route.name;
}

function getMicroFrontendEntryPoint(name: string): string {
  return `/mfe/${name}/index.html`;
}



