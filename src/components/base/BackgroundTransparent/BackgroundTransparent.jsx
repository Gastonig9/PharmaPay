/* eslint-disable react/prop-types */
import "./BackgroundTransparent.css"
export const BackgroundTransparent = ({colorP}) => {
  return (
    <div className={colorP.colorMode ? "background-transparent" : "background-transparent-dark"}></div>
  )
}
