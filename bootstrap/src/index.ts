import {exposePublicApi} from "./public-api";
import {Router} from "./router";

const publicAPI = {
  router: new Router(),
}

exposePublicApi(publicAPI);

publicAPI.router.activateMicroFrontend(window.location.pathname);
