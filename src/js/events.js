export const DATA_UPDATED_EVENT = "lenadi:data-updated";

export function notifyDataUpdated() {
  document.dispatchEvent(
    new Event(DATA_UPDATED_EVENT)
  );
}

export function onDataUpdated(callback) {
  document.addEventListener(
    DATA_UPDATED_EVENT,
    callback
  );
}