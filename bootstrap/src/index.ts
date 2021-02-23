import { loadDocument } from './load-document';
import config from './config.json';

function getPathId(path: string): string {
  const MicroFrontendPathMatch = 1;
  return path.split('/')[MicroFrontendPathMatch];
}

function getMicroFrontendNameFromPathId(pathId: string): string {
  if (!config?.routes) { throw new Error('No route configuration'); }

  const routes = config.routes;
  if (routes.length === 0) { throw new Error('No route defined'); }

  const route = routes.find(({path}) => path === pathId);

  if (!route) { throw new Error(`No application matches path id: ${pathId}`)}

  return route.name;
}

function getMicroFrontendEntryPoint(name: string): string {
  return `/mfe/${name}/index.html`;
}

const mfePathId = getPathId(window.location.pathname);
const mfeName = getMicroFrontendNameFromPathId(mfePathId);
const mfePath = getMicroFrontendEntryPoint(mfeName);

loadDocument(mfePath).then(console.log)

