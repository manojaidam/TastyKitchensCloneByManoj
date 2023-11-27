import {Component} from 'react'
import {BiRupee} from 'react-icons/bi'
import {HiOutlineMinusSm} from 'react-icons/hi'
import {BsPlus} from 'react-icons/bs'
import './index.css'

class CartItem extends Component {
  increment = () => {
    const {eachCartItem, incrementQuantity} = this.props
    incrementQuantity(eachCartItem.id)
  }

  decrement = () => {
    const {eachCartItem, decrementQuantity} = this.props
    decrementQuantity(eachCartItem.id)
  }

  render() {
    const {eachCartItem} = this.props
    // console.log(eachCartItem)
    const price = eachCartItem.cost * eachCartItem.quantity
    console.log(price)
    return (
      <li>
        <div className="CartListItem" testid="cartItem">
          <img
            src={eachCartItem.imageUrl}
            alt="cart-item"
            className="ItemImage"
          />
          <div className="CartNameDetailsContainer">
            <h1 className="CartItemName">{eachCartItem.name}</h1>
            <div className="each-item-counter-container">
              <button
                type="button"
                testid="decrement-quantity"
                className="minus-icon-container"
                onClick={this.decrement}
              >
                <HiOutlineMinusSm className="minus-icon" />
              </button>
              <p testid="item-quantity" className="count-value">
                {eachCartItem.quantity}
              </p>
              <button
                type="button"
                className="plus-icon-container"
                testid="increment-quantity"
                onClick={this.increment}
              >
                <BsPlus className="plus-icon" />
              </button>
            </div>
            <div className="ItemRateContainer">
              <BiRupee className="ItemRupee" />
              <p className="ItemCost">{eachCartItem.cost}</p>
            </div>
          </div>
        </div>
      </li>
    )
  }
}

export default CartItem
