import "./App.css"
import { useState } from "react"
import { menuItems } from "../Menu"
import { Order } from "./components/TableOrder.jsx"
import { Header } from "./components/Header.jsx"
import { nanoid } from "nanoid"

export default function App() {
  const menu = [...menuItems]
  const [orders, setOrders] = useState(() => tableOrders())
  const [kitchen, setKitchen] = useState(() => kitchenOutput())
  const [text, setText] = useState("Bring orders to the table.")
  const [reputation, setReputation] = useState(0)
  
  
  /***** Check Condition *****/
  console.log(`Reputation is: ${reputation}`)

  if(reputation === 20) {
    setText("Game Won! This restaurant is the best in town!")
  }

  const lockedMeals = [];
  kitchen.map(meal => {
    meal.isLocked && lockedMeals.push(meal.name)
  })

  function sendOrders() {
    const copyOrders = [...orders]
    const check = lockedMeals.sort().toString() === copyOrders.sort().toString()
    if(check) {
      setText("Amazing work! Keep going.")
      setReputation(oldRep => oldRep += 5)
    } else {
      setText("Whoops, pay attention!")
    }
    setTimeout( _ => setText("Bring orders to the table."), 1500)
    setOrders(tableOrders())
    setKitchen(kitchenOutput())
  }

  /***** Table ******/

  function tableOrders() {
    return new Array(4).fill(1).map( _ => {
      const randomNum = Math.floor(Math.random() * menuItems.length)
      return menu[randomNum]
    })
  }

  const displayOrders = orders.map(meal => 
    <Order 
      key={nanoid()}
      meal={meal}
    />)

  /***** Kitchen ******/

  function kitchenOutput() {
    return new Array(6).fill(1).map( _ => {
      const randomNum = Math.floor(Math.random() * menuItems.length)
      return {
        name: menu[randomNum],
        isLocked: false,
        id: nanoid()
      }  
    })
  }

  const displayKitchen = kitchen.map(meal => 
  <Order
    key={meal.id}
    meal={meal.name}
    isLocked={meal.isLocked}
    id={meal.id}
    onClick={()=> lockItem(meal.id)}
  />)

  function changeKitchen() {
    setKitchen(oldMeals => oldMeals.map(meal=> {
      return meal.isLocked ? meal : { ...meal, name: menu[Math.floor(Math.random() * menuItems.length)]}
    }))
  }

  function lockItem(id) {
    setKitchen(oldMeals => oldMeals.map(meal => (
      meal.id === id ? { ...meal, isLocked: !meal.isLocked } : { ...meal }
    )))
  }
 
  return (
    <>
      <Header />

      <main>
        <section className="leftSec">
          <div className="orders">
            {displayOrders}
          </div>
          <div className="cheers">
            <p>
              {text}
            </p>
          </div>
        </section>

        <section className="rightSec">
          <div className="kitchen">
            {displayKitchen}
          </div> 
        </section>
      </main>

      <footer>
        {lockedMeals.length === 4 ? 
        <button 
          onClick={sendOrders}
          className="mainButton">Send Orders?
        </button>        
        : <button 
          onClick={changeKitchen}
          className="mainButton">Refresh Kitchen
        </button>      
        }
      </footer>
    </>

  )
}
