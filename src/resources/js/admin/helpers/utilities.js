const toast = Swal.mixin({
  toast: true,
  position: "top-end",
  showConfirmButton: false,
  timer: 3000,
  timerProgressBar: true,
  onOpen: toast => {
    toast.addEventListener("mouseenter", Swal.stopTimer);
    toast.addEventListener("mouseleave", Swal.resumeTimer);
  }
});

export const formSubmit = async (
  method = `post`,
  url,
  payload,
  message,
  redirect = ""
) => {
  let errors = {};

  if (method === "patch") {
    payload.append("_method", "PATCH");
    method = "post";
  }

  try {
    await axios[method](url, payload);
    Swal.fire({
      icon: "success",
      title: message,
      text: redirect ? "Redirecting..." : "",
      showConfirmButton: false,
      timer: 2000,
      onClose: () => {
        if (redirect) window.location = redirect;
      }
    });
  } catch (error) {
    let { data } = error.response;
    errors = data.errors;
    // Swal.fire({
    //   title: `An error occured`,
    //   text: `Please fill the required fields`,
    //   icon: `error`
    // })
  }

  return errors;
};

export const swalDelete = async (url, payload, toastTitle) => {
  return new Promise(function(resolve, reject) {
    swal
      .fire({
        title: "Are you sure?",
        text: "Selected items will be deleted.",
        icon: "warning",
        showCancelButton: true,
        showConfirmButton: true,
        confirmButtonColor: "#b3e19f",
        confirmButtonText: "Yes, remove it!",
        focusConfirm: false,
        showLoaderOnConfirm: true,
        preConfirm: () => {
          return axios
            .delete(`${url}`, {
              params: { ids: payload }
            })
            .then(response => {
              return true;
            })
            .catch(error => {
              toast({
                icon: "error",
                title: "Request failed. Please try again."
              });
              return false;
            });
        },
        allowOutsideClick: () => !Swal.isLoading()
      })
      .then(result => {
        if (result.value) {
          let subject =
            payload.length > 1 ? toastTitle.plural : toastTitle.singular;
          toast.fire({
            icon: "info",
            title: `${subject} successfully deleted.`
          });
          resolve(true);
        }
      });
  });
};

export const currencyFormat = value => {
  return new Intl.NumberFormat("en", { minimumFractionDigits: 2 }).format(
    value || 0
  );
};
