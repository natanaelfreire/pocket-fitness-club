export function formataData(data?: string) {
  if (data)
    return new Date(data.split('.')[0]).toLocaleDateString('pt-BR');
  else
    return "";

}

export function formataHora(data?: string, hour12?: boolean) {
  if (data)
    return new Date(data.split(".")[0]).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', hour12: hour12 ? hour12 : false })
  else
    return "";
}

export function formataDataHora(data?: string) {
  if (data)
    return formataData(data) + ' ' + formataHora(data);
  else
    return "";
}