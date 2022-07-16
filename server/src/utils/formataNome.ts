export function formataNome(nome: string) {
  const nomes = nome ? nome.split(' ') : []

  if (nomes.length == 1)
    return nomes[0];

  if (nomes[1].length <= 3 && nomes.length > 2) {
    const iniciaisMaiusculas = nomes[0].charAt(0).toUpperCase() + nomes[0].slice(1).toLowerCase() + ' ' + nomes[2].charAt(0).toUpperCase() + nomes[2].slice(1).toLowerCase()
    return iniciaisMaiusculas
  }
  else {
    const iniciaisMaiusculas = nomes[0].charAt(0).toUpperCase() + nomes[0].slice(1).toLowerCase() + ' ' + nomes[1].charAt(0).toUpperCase() + nomes[1].slice(1).toLowerCase()
    return iniciaisMaiusculas
  }
}
