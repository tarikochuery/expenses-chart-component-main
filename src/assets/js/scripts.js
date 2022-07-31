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

const calculateHeight = (amount, higherAmount) => {
  const PERCENTAGE_HEIGHT_HIGHER_BAR = 0.7
  
  const height = (amount/higherAmount) * PERCENTAGE_HEIGHT_HIGHER_BAR * 100 /* Get Percentage Value */
  const heightString = height.toFixed(2) + '%'

  return heightString
}

const setBarsHeight = (data) => {
  let barsData = []
  
  const higherDayExpense = getHigherDayExpense()

  data.forEach((dayExpense) => {
    const { amount } = dayExpense
    const higherAmount = higherDayExpense.amount

    const height = calculateHeight(amount, higherAmount)

    const dayData = {...dayExpense, height}

    barsData = [...barsData, dayData]
  })

  return barsData
}

const setBarsColors = (data) => {
  let barsData = []
  const { day: higherDayExpense } = getHigherDayExpense()


  data.forEach(dayExpense => {
    const { day } = dayExpense

    if (day === higherDayExpense){
      dayExpense = {...dayExpense, color: 'var(--cyan)'}
    } else {
      dayExpense = {...dayExpense, color: 'var(--soft-red)'}    
    }

    barsData = [...barsData, dayExpense]
  })

  return barsData
}

const changeBarElementHeight = (barElement, height) => {
  barElement.style.height = height
}

const changeBarElementColor = (barElement, color) => {
  barElement.style.backgroundColor = color
}

const setBarElementsStyle = (barsArray, data) => {
  data.forEach(dataObject => {
    const {day, height, color} = dataObject
    barsArray.forEach(bar => {
      const barClass = bar.className
      if (barClass.includes(day)){
        changeBarElementColor(bar, color)
        changeBarElementHeight(bar, height)
      }
    })

  })
}

const setBarsData = data => {
  const colorData = setBarsColors(data)
  const fullData = setBarsHeight(colorData)

  return fullData
}

const barsData = setBarsData(data)

setBarElementsStyle(barsArray, barsData)