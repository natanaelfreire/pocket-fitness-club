export function formataTelefone(telefone?: string){
  if (telefone) {
    //retira os caracteres indesejados...
    telefone = telefone.replace(/[^\d]/g, "");

    if (telefone.length === 11) {
      return telefone.replace(/(\d{2})(\d{1})(\d{4})(\d{4})/, "($1) $2 $3-$4");
    }
    else if (telefone.length === 10) {
      return telefone.replace(/(\d{2})(\d{4})(\d{4})/, "($1) $2-$3");
    }
    else 
      return telefone;

  } else {
    return "";
  }    
}