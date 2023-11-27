import {Component} from 'react'
import Cookies from 'js-cookie'
import {BiRupee} from 'react-icons/bi'
import {AiFillStar} from 'react-icons/ai'
import Loader from 'react-loader-spinner'
import NavBar from '../NavBar'
import FoodItem from '../FoodItem/index'
import Footer from '../Footer'
import './index.css'

const restaurantsApiStatusConstants = {
  initial: 'INITIAL',
  success: 'SUCCESS',
  failure: 'FAILURE',
  inProgress: 'IN_PROGRESS',
}

class RestaurantDetailsRoute extends Component {
  state = {
    apiStatus: restaurantsApiStatusConstants.initial,
    restaurantData: [],
    loadfooter: false,
  }

  // component did mount method
  componentDidMount() {
    this.getRestaurantData()
    window.scrollTo(0, 0)
  }

  // convert snake case to camel case

  convertItemsData = foodArray => {
    const item = {
      cost: foodArray.cost,
      foodType: foodArray.food_type,
      id: foodArray.id,
      imageUrl: foodArray.image_url,
      name: foodArray.name,
      rating: foodArray.rating,
    }

    return item
  }

  convertData = object => {
    const converted = {
      costForTwo: object.cost_for_two,
      cuisine: object.cuisine,
      foodItems: object.food_items.map(eachItem =>
        this.convertItemsData(eachItem),
      ),
      restaurantId: object.id,
      imageUrl: object.image_url,
      itemCount: object.items_count,
      location: object.location,
      name: object.name,
      opensAt: object.opens_at,
      rating: object.rating,
      reviewsCount: object.reviews_count,
    }
    return converted
  }

  // get restaurant details

  getRestaurantData = async () => {
    this.setState({apiStatus: restaurantsApiStatusConstants.inProgress})
    const {match} = this.props
    const {params} = match
    const {id} = params
    const jwtToken = Cookies.get('jwt_token')
    const apiUrl = `https://apis.ccbp.in/restaurants-list/${id}`
    const options = {
      method: 'GET',
      headers: {
        Authorization: `Bearer ${jwtToken}`,
      },
    }
    const response = await fetch(apiUrl, options)
    // console.log(response)
    const data = await response.json()
    // console.log(data)
    if (response.ok === true) {
      const convertedData = this.convertData(data)
      this.setState({
        apiStatus: restaurantsApiStatusConstants.success,
        restaurantData: convertedData,
        loadfooter: true,
      })
    }
  }

  // restaurant loader

  restaurantsDisplayLoading = () => (
    <div className="Loader" testid="restaurant-details-loader">
      <Loader type="ThreeDots" color="#0b69ff" height="50" width="50" />
    </div>
  )

  // restaurants view

  restaurantView = () => {
    const {restaurantData} = this.state

    const {
      costForTwo,
      name,
      restaurantId,
      cuisine,
      imageUrl,
      location,
      rating,
      reviewsCount,
    } = restaurantData
    // console.log(reviewsCount)
    // console.log(costForTwo)

    // console.log(foodItems)
    return (
      <div className="MainContainer">
        <div className="RestaurantContainer" key={restaurantId}>
          <img src={imageUrl} alt="restaurant" className="img" />
          <div className="DetailsContainer">
            <h1 className="Name">{name}</h1>
            <p className="Cuisine">{cuisine}</p>
            <p className="Location">{location}</p>
            <div className="RatingAndCostContainer">
              <div className="RatingsContainer">
                <div className="Ratings">
                  <AiFillStar className="Star" />
                  <p className="RatingPara">{rating}</p>
                </div>
                <p className="Reviews">{reviewsCount}+ Ratings</p>
              </div>
              <div className="VerticalLine">
                <p style={{display: 'none'}}>.</p>
              </div>
              <div className="CostContainer">
                <div className="Cost">
                  <BiRupee className="Rupee" />
                  <p className="CostForTwo">{costForTwo}</p>
                </div>
                <p className="CostPara">Cost for two</p>
              </div>
            </div>
          </div>
        </div>
        {this.foodItemsView()}
      </div>
    )
  }

  // food items view

  foodItemsView = () => {
    const {restaurantData} = this.state
    const {foodItems} = restaurantData

    // console.log(foodItems)
    return (
      <ul className="FoodItemsContainer">
        {foodItems.map(eachItem => (
          <FoodItem key={eachItem.id} foodItem={eachItem} />
        ))}
      </ul>
    )
  }

  // on render restaurants details
  onRenderDisplayRestaurantDetails = () => {
    const {apiStatus} = this.state

    switch (apiStatus) {
      case restaurantsApiStatusConstants.success:
        return this.restaurantView()
      case restaurantsApiStatusConstants.inProgress:
        return this.restaurantsDisplayLoading()
      case restaurantsApiStatusConstants.failure:
        return null
      default:
        return null
    }
  }

  render() {
    /* const {match} = this.props
    const {params} = match
    const {id} = params */
    const {loadfooter} = this.state
    return (
      <>
        <div className="BackgroundContainer">
          <NavBar />
          {this.onRenderDisplayRestaurantDetails()}
          {loadfooter && <Footer />}
        </div>
      </>
    )
  }
}

export default RestaurantDetailsRoute
