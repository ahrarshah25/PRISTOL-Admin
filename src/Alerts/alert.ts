import Swal from "sweetalert2";
import type { AlertIcon } from "../types";

const fireAlert = (icon: AlertIcon, title: string): void => {
  Swal.fire({
    toast: true,
    position: "top-end",
    icon: icon,
    title: title,
    showConfirmButton: false,
    timer: 2000,
    timerProgressBar: true,
    customClass: {
      popup: "swal-margin-top",
    },
    background: '#ffffff',
    color: '#1f2937'
  });
};

export default fireAlert;