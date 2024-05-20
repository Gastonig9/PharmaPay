/* eslint-disable react/prop-types */
import "./ButtonClose.css";

export const ButtonClose = ({ close }) => {
  return (
    <div className="w-100 d-flex justify-content-end ">
      <button onClick={close} className="btn-close-product">
        Cerrar
      </button>
    </div>
  );
};
