import {exposeBootstrapApi, IBootstrapPublicAPI} from "./public-api";
import {Router} from "./router";
import {Lifecycle} from "./lifecycle";

const publicAPI: IBootstrapPublicAPI = {
  router: new Router(),
  lifecycle: {
    WILL_MOUNT: Lifecycle.WILL_MOUNT,
    DID_MOUNT: Lifecycle.DID_MOUNT,
    WILL_UNMOUNT: Lifecycle.WILL_UNMOUNT,
    DID_UNMOUNT: Lifecycle.DID_UNMOUNT
  }
}

exposeBootstrapApi(publicAPI);

publicAPI.router.navigateTo(window.location.pathname);
