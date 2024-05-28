/* eslint-disable react/prop-types */
import { useTranslation } from "react-i18next";
import "./ButtonClose.css";

export const ButtonClose = ({ close }) => {
  const { t } = useTranslation();
  return (
    <div className="w-100 d-flex justify-content-end ">
      <button onClick={close} className="btn-close-product">
        {t('ButtonClose.close_button')}
      </button>
    </div>
  );
};
