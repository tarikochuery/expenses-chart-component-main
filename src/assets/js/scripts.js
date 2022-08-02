import { data } from '../db/data.js'
import { setBarElementsStyle, setBarsData } from './chartScripts.js'
import { updateDaysAmount, updateWeekSpent } from './amountScripts.js'

const bars = document.getElementsByClassName('bar')
const barsArray = Array.from(bars)

const barsData = setBarsData(data)

setBarElementsStyle(barsArray, barsData)
updateDaysAmount()
updateWeekSpent()