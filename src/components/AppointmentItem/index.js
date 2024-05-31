// AppointmentItem.js

import {format} from 'date-fns'
import './index.css'

const AppointmentItem = props => {
  const {initialList, likedStar} = props
  const {id, isFavourite, date, userName} = initialList

  const starToggle = () => {
    likedStar(id)
  }

  return (
    <div className="listCon">
      <div className="nameStar">
        <p>{userName}</p>
        <button type="button" onClick={starToggle} data-testid="star">
          {isFavourite ? (
            <img
              src="https://assets.ccbp.in/frontend/react-js/appointments-app/filled-star-img.png"
              alt="star"
            />
          ) : (
            <img
              src="https://assets.ccbp.in/frontend/react-js/appointments-app/star-img.png"
              alt="star"
              className="starLogo"
            />
          )}
        </button>
      </div>
      <p>{format(new Date(date), 'dd MMMM yyyy, EEEE')}</p>
    </div>
  )
}

export default AppointmentItem
