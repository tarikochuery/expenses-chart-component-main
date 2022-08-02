import { data } from '../db/data.js'

const changeWeekSpent = (value) => {
  if (typeof value !== 'string') return
  const totalWeekSpentElement = document.getElementById('week-spent')
  totalWeekSpentElement.innerText = value
  return
}

const calculateWeekSpent = () => {
  let totalSpent = 0
  for (const dayExpense of data) {
    const { amount } = dayExpense
    totalSpent += amount
  }
  
  totalSpent = `$${totalSpent.toFixed(2)}`
  return totalSpent
}

export const updateWeekSpent = () => {
  const newAmountSpent = calculateWeekSpent()
  changeWeekSpent(newAmountSpent)
}

const changeDayAmount = (day, amount) => {
  const amountParagraph = document.createElement('p')
  console.log(amount)
  amountParagraph.innerText = `$${amount}`

  const dayContainer = document.getElementById(day)
  const dayContainerDiv = dayContainer.firstChild.nextSibling //Pegar a div dentro do day container
  dayContainerDiv.appendChild(amountParagraph)
  return
}

export const updateDaysAmount = () => {
  data.forEach(dayExepense => {
    const {day, amount} = dayExepense
    changeDayAmount(day, amount)
  })
}