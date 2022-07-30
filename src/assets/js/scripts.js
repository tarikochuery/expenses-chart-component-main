import { data } from '../db/data.js'

const bars = document.getElementsByClassName('bar')
const barsArray = Array.from(bars)

const getHigherDayExpense = () => {
  let higherDayExpense = {
    amount: 0,
    day: ''
  }

  data.forEach((dayExpense) => {
    const { day, amount } = dayExpense

    if (amount > higherDayExpense.amount) {
      higherDayExpense.amount = amount
      higherDayExpense.day = day
    }
  })

  return higherDayExpense
}

const getBarsHeight = () => {
  let barsData = []
  
  const higherDayExpense = getHigherDayExpense()

  data.forEach((dayExpense) => {
    const PERCENTAGE_HEIGHT_HIGHER_BAR = 0.85

    const { amount } = dayExpense
    const higherAmount = higherDayExpense.amount

    const height = (amount/higherAmount) * PERCENTAGE_HEIGHT_HIGHER_BAR * 100
    const heightString = height.toFixed(2) + '%'

    const dayData = {...dayExpense, height: heightString}

    barsData = [...barsData, dayData]
  })

  return barsData
}

const barsData = getBarsHeight()

barsArray.forEach((bar) => {
  const className = bar.className

  for (let barData of barsData){
    const { day, height } = barData
    if (className.includes(day)){
      bar.style.height = height;
    }
  }
})