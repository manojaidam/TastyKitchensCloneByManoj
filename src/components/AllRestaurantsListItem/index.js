import {Link} from 'react-router-dom'
import {FaStar} from 'react-icons/fa'
import './index.css'

const ListItem = props => {
  const {item} = props
  const {imageUrl, name, cuisine, id, userRating} = item
  const {rating, totalReviews} = userRating

  return (
    <Link
      to={`/restaurant/${id}`}
      style={{textDecoration: 'none'}}
      testid="restaurant-item"
    >
      <li className="ListItem">
        <img src={imageUrl} alt="restaurant" className="RestaurantImage" />
        <div className="RestaurantDetails">
          <h1 className="Name">{name}</h1>
          <p className="Cuisine">{cuisine}</p>
          <div className="RatingsContainer">
            <FaStar size="13px" color="#FFCC00" />
            <p className="Rating">{rating}</p>
            <p className="Reviews">({totalReviews} ratings)</p>
          </div>
        </div>
      </li>
    </Link>
  )
}

export default ListItem
