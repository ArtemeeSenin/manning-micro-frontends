export const enum Lifecycle {
  WILL_MOUNT = "mfewillmount",
  DID_MOUNT = "mfedidmount",
  WILL_UNMOUNT = "mfewillunmount",
  DID_UNMOUNT = "mfedidunmount"
}

export function callLifecycle<T>(hookName: Lifecycle, data: T): void {
  document.dispatchEvent(new CustomEvent(hookName, {
    detail: data
  }));
}
