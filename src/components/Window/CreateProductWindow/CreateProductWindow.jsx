/* eslint-disable react/prop-types */
import "./CreateProductWindow.css";
import { ButtonClose, CreatePForm, BackgroundTransparent } from "../../base";


export const CreateProductWindow = ({ close }) => {
  

  return (
    <>
      <BackgroundTransparent />
      <div className="window-create-product d-flex flex-column gap-4 p-3">
        <h1>Agregar nuevo producto</h1>
        <CreatePForm/>

        <ButtonClose close={close}/>
      </div>
    </>
  );
};
