import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export const CustomizedToast = ({ message, type }) => {
  switch (type) {
    case "SUCCESS":
      toast.success(`${message}`, {
        position: "bottom-center",
        autoClose: 4000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      });
      break;
    case "ERROR":
      toast.error(` ${message}`, {
        position: "bottom-center",
        autoClose: 4000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      });
      break;
    case "LOADING":
      toast.loading(` ${message}`, {
        position: "bottom-center",
        autoClose: 4000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      });
      break;

    default:
  }
};
