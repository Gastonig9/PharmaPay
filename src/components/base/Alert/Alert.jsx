/* eslint-disable react/prop-types */
import { useEffect } from "react";
import toast, { Toaster } from "react-hot-toast";

export const Alert = ({ type, message, setMethod, setValue }) => {
  useEffect(() => {
    const showNotification = () => {
      switch (type) {
        case "success":
          toast.success(message);
          break;
        case "error":
          toast.error(message);
          break;
        case "promise":
          // Aquí asumo que `setMethod` y `setValue` son funciones que actualizan el estado
          toast.promise(setMethod(setValue), {
            loading: "En proceso...",
            success: <b>Operación finalizada con éxito</b>,
            error: <b>Ocurrió un error</b>,
          });
          break;
        default:
          toast.success(message);
          break;
      }
    };
    showNotification();
  }, []);

  return (
    <Toaster
      toastOptions={{
        duration: 6000,
      }}
    />
  );
};
