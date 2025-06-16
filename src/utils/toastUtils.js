// import { toast } from "react-toastify";
// import { debounce } from "lodash";

// const debouncedError = debounce((message) => toast.error(message), 1000);

// export const showToast = {
//   success: (message) => toast.success(message),
//   error: (message) => debouncedError(message),
//   info: (message, options = {}) => toast.info(message, { autoClose: 3000, ...options }),
//   warn: (message) => toast.warn(message),
// };

import { toast } from "react-toastify";

export const showToast = {
  success: (message) => toast.success(message, { position: "bottom-right" }),
  error: (message) => toast.error(message, { position: "bottom-right" }),
  info: (message) => toast.info(message, { position: "bottom-right" }),
};