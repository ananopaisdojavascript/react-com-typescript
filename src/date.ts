const MONTHS = [
  "Janeiro", "Fevereiro", "Março", "Abril", "Maio", "Junho", "Julho", "Agosto", "Setembro", "Outubro", "Novembro", "Dezembro"
]

const getToday = () => {
  return "2024-02-23"
}

const formatMonth = (iso: string) => {
  const [year, month] = iso.split("-")
  return `${MONTHS[(parseInt(month) - 1)]} de ${year}`
}


const addMonths = (month: string, increment: number) => {
  const jsDate = new Date(`${month}-01T12:00:00`)
  jsDate.setMonth(jsDate.getMonth() + increment)
  return `${jsDate.getFullYear()}-${(jsDate.getMonth() + 1).toString().padStart(2, "0")}`
}

export default {
  getToday, formatMonth, addMonths
}