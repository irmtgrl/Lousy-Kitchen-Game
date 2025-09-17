import "./App.css"
import { useState } from "react"
import { menuItems } from "../Menu"
import { Order } from "./components/TableOrder.jsx"
import { nanoid } from "nanoid"

export default function App() {
  const [menu, setMenu] = useState(menuItems)
  const [orders, setOrders] = useState(() => tableOrders())
  const [kitchen, setKitchen] = useState(() => kitchenOutput())
  
  /***** Check Condition *****/

  let lockedMeals = [];
  kitchen.map(meal => {
    meal.isLocked && lockedMeals.push(meal.name)
    if (lockedMeals.length === 4) {
      /*** When length reaches 4, change button text with "Send Orders?" and its onclick to this area, where check is made.****/

      const check = lockedMeals.sort().toString() === orders.sort().toString()
      check ? console.log("All items match!") : console.log("No match")

      /*** If check is true, refresh the orders and kitchen. Add 5 to reputation and add a star. ****/
      /*** If check is false, change main text with "ooops wrong order, you lost reputation!", refresh orders and kitchen****/
    }
  })

  /***** Table ******/

  function tableOrders() {
    return new Array(4).fill(1).map( _ => {
      const randomNum = Math.floor(Math.random() * menuItems.length)
      return menu[randomNum]
    })
  }

  const displayOrders = orders.map(meal => 
    <Order meal={meal}/>)

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
      <header></header>

      <main>
        <section className="leftSec">
          <div className="orders">
            {displayOrders}
          </div>
          <div className="cheers">
            <p>
              {"Amazing Work!"}
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
        <button 
        onClick={changeKitchen}
        className="mainButton">Refresh Kitchen</button>
      </footer>
    </>

  )
}
