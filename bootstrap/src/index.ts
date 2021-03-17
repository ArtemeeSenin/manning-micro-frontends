import {exposeBootstrapApi, IBootstrapPublicAPI} from "./public-api";
import {Router} from "./router";
import {Lifecycle} from "./lifecycle";
import {getToken, setToken, validateToken} from "./auth";

const publicAPI: IBootstrapPublicAPI = {
  router: new Router(),
  lifecycle: {
    WILL_MOUNT: Lifecycle.WILL_MOUNT,
    DID_MOUNT: Lifecycle.DID_MOUNT,
    WILL_UNMOUNT: Lifecycle.WILL_UNMOUNT,
    DID_UNMOUNT: Lifecycle.DID_UNMOUNT
  },
  authentication: {
    setToken,
    getToken,
  }
}

exposeBootstrapApi(publicAPI);

validateToken().then(() => publicAPI.router.navigateTo(window.location.pathname));
