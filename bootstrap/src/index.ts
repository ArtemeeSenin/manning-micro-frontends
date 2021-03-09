import {exposeBootstrapApi} from "./public-api";
import {Router} from "./router";

const publicAPI = {
  router: new Router(),
}

exposeBootstrapApi(publicAPI);

publicAPI.router.navigateTo(window.location.pathname);
