// Utility per formattare date in italiano
export const formatDate = (iso) => {
  if (!iso) return ""; // se non arriva nulla, evita errore
  const date = new Date(iso);
  if (isNaN(date)) return ""; // se non è una data valida
  return date.toLocaleDateString("it-IT", {
    day: "2-digit",
    month: "short",
    year: "numeric",
  });
};
