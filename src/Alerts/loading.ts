import Swal from "sweetalert2";

const showLoading = (message: string): void => {
  Swal.fire({
    toast: true,
    position: "top-end",
    title: message,
    didOpen: () => {
      Swal.showLoading();
    },
    showConfirmButton: false,
    allowOutsideClick: false,
    allowEscapeKey: false,
    customClass: {
      popup: "swal-margin-top",
    },
    background: '#ffffff',
    color: '#1f2937'
  });
};

export default showLoading;