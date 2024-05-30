/* eslint-disable react/prop-types */
import "./CreateProductWindow.css";
import { ButtonClose, CreatePForm, BackgroundTransparent } from "../../base";
import { useState } from "react";
import { UpdatePForm } from "../../base/Form/UpdatePForm/UpdatePForm";
import { useTranslation } from "react-i18next";


export const CreateProductWindow = ({ products, close, colorP }) => {
  const [createOrUpdate, setcreateOrUpdate] = useState("create")
  const { t } = useTranslation();

  return (
    <>
      <BackgroundTransparent colorP={colorP} />
      <div className={colorP.colorMode ? 'window-create-product d-flex flex-column gap-4 p-3' : 'window-create-product-dark d-flex flex-column gap-4 p-3'}>
        <h1>{t('CreateProductWindow.title')}</h1>
        <div className="buttons-update-create-product">
          <button onClick={()=>{setcreateOrUpdate("create")}}>Crear nuevo</button>
          <button onClick={()=>{setcreateOrUpdate("update")}}>Agregar existente</button>
        </div>

        {createOrUpdate === "create" ? <CreatePForm close={close}/> : <UpdatePForm close={close} products={products}/>}
        

        <ButtonClose close={close}/>
      </div>
    </>
  );
};
