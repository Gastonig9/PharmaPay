/* eslint-disable react/prop-types */
import "./CreateProductWindow.css";
import { ButtonClose, CreatePForm, BackgroundTransparent } from "../../base";
import { useState } from "react";
import { UpdatePForm } from "../../base/Form/UpdatePForm/UpdatePForm";
import { useTranslation } from "react-i18next";


export const CreateProductWindow = ({ products, close }) => {
  const [createOrUpdate, setcreateOrUpdate] = useState("create")
  const { t } = useTranslation();

  return (
    <>
      <BackgroundTransparent />
      <div className="window-create-product d-flex flex-column gap-4 p-3">
        <h1>{t('CreateProductWindow.title')}</h1>
        <div className="buttons-update-create-product">
          <button onClick={()=>{setcreateOrUpdate("create")}}>Crear nuevo</button>
          <button onClick={()=>{setcreateOrUpdate("update")}}>Agregar existente</button>
        </div>

        {createOrUpdate === "create" ? <CreatePForm/> : <UpdatePForm products={products}/>}
        

        <ButtonClose close={close}/>
      </div>
    </>
  );
};
