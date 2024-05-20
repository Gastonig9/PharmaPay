import { format } from "date-fns";
import { es } from "date-fns/locale";


export const parseDate = (dateStr) => {
  const [year, month, day] = dateStr.split('-').map(Number);
  return new Date(year, month - 1, day, 0, 0, 0);  // Asegurarse de que la hora sea medianoche
};

export const formatDate = (date) => {
  return date ? format(parseDate(date), "d 'de' MMMM 'de' yyyy", { locale: es }) : "";
};

export function simplificarFecha(fecha) {
  const date = new Date(fecha);
  const month = date.toLocaleString("default", { month: "short" });
  const day = date.getDate();
  return `${month} ${day}`;
}

export function simplificarHora(fecha) {
  const date = new Date(fecha);
  const hours = date.getHours();
  const minutes = date.getMinutes();
  const ampm = hours >= 12 ? "pm" : "am";
  const formattedHours = hours % 12 || 12;
  return `${formattedHours}:${minutes < 10 ? "0" : ""}${minutes} ${ampm}`;
}
