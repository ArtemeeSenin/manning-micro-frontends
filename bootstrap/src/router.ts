import config from "./config.json";
import {loadDocument} from "./load-document";
import {mountMicroFrontendInPage, unmountMicroFrontendFromPage} from "./mount";
import {IBootstrapRouter} from "./public-api";
import {callLifecycle, Lifecycle} from "./lifecycle";
import {isUserAuthenticated} from "./auth";

export class Router implements IBootstrapRouter {
  history: ReadonlyArray<string> = [];

  get currentRoute(): string {
    return this.history[this.history.length - 1];
  }

  get currentMicroFrontendName(): string {
    return getMicroFrontendNameFromPathId(getPathId(this.currentRoute));
  }

  navigateTo(path: string): Promise<any> {
    const mfePathId = getPathId(path);
    let mfe;
    try {
      mfe = getMicroFrontendByPathId(mfePathId);
      if (!isUserAuthenticated && mfe.private) {
        return this.navigateTo(config.defaultPath);
      }
    } catch(e) {
      console.warn(e.message);
      return this.navigateTo(config.defaultPath);
    }

    const mfeName = mfe.name;
    const mfePath = getMicroFrontendEntryPoint(mfeName);

    if (isUserAuthenticated && !mfe.private) {
      return this.navigateTo(config.defaultPathForAuthorised);
    }

    if (this.history.length !== 0) {
      const currentMicroFrontendName = this.currentMicroFrontendName;

      callLifecycle(Lifecycle.WILL_UNMOUNT, {
        microFrontend: currentMicroFrontendName
      });
      unmountMicroFrontendFromPage();
      callLifecycle(Lifecycle.DID_UNMOUNT, {
        microFrontend: currentMicroFrontendName
      })
    }

    return loadDocument(mfePath)
      .then(microFrontendDocument => {
        callLifecycle(Lifecycle.WILL_MOUNT, {
          microFrontend: mfeName
        });
        return microFrontendDocument;
      })
      .then(microFrontendDocument => {
        mountMicroFrontendInPage(mfeName, microFrontendDocument)
      })
      .then(() => {
        this.history = this.history.concat(path);
        window.history.pushState({}, '', path);
      })
      .then(() => {
        callLifecycle(Lifecycle.DID_MOUNT, {
          microFrontend: mfeName
        })
      })
  }
}

function assertIsValidPathId(pathId: any): pathId is 'hello' | 'play' {
  const paths = ['hello', 'play'];
  return paths.includes(pathId);
}

function getPathId(path: string): string {
  const MicroFrontendPathMatch = 1;
  return path.split('/')[MicroFrontendPathMatch];
}

function getMicroFrontendByPathId(pathId: string): { name: string, private: boolean } | never {
  if (!config?.routes) { throw new Error('No route configuration'); }

  const routes = config.routes;
  if (Object.keys(routes).length === 0) { throw new Error('No route defined'); }
  if (!assertIsValidPathId(pathId)) { throw new Error('Invalid route'); }

  const route = routes[pathId];

  if (!route) { throw new Error(`No application matches path id: ${pathId}`)}

  return route;
}

function getMicroFrontendNameFromPathId(pathId: string): string {
  return getMicroFrontendByPathId(pathId).name;
}

function getMicroFrontendEntryPoint(name: string): string {
  return `/mfe/${name}/index.html`;
}



