/* eslint-disable react/prop-types */
import "./ButtonBar.css"
export const ButtonBar = ({ buttonTitle, open }) => {
  return (
    <button  className="w-50 button-action " onClick={open}>
      {buttonTitle}
    </button>
  );
};
