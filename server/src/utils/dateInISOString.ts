export const dateInISOString = () => {
  const newDate = new Date();

  return `${newDate.getFullYear()}-${String(newDate.getMonth() + 1).padStart(2, "0")}-${String(newDate.getDate()).padStart(2, "0")}T${newDate.getHours()}:${String(newDate.getMinutes()).padStart(2, "0")}:${String(newDate.getSeconds()).padStart(2, "0")}.${newDate.getMilliseconds()}Z`;
};