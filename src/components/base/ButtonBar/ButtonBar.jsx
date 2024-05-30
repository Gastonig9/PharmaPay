/* eslint-disable react/prop-types */
import "./ButtonBar.css"
export const ButtonBar = ({ buttonTitle, open, colorP }) => {
  return (
    <button  className={colorP.colorMode ? 'w-50 button-action' : 'w-50 button-action-dark'} onClick={open}>
      {buttonTitle}
    </button>
  );
};