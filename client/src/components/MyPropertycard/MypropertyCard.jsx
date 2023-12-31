import React from 'react'
import '../propertyCard/PropertyCard.css'
import {AiFillHeart} from 'react-icons/ai'
import { useNavigate } from 'react-router-dom'
import {truncate} from 'lodash'
import Heart from '../Heart/Heart'
import './MyPropertyCard.css'
const MypropertyCard = ({card}) => {

  const navigate = useNavigate()

  return (
   
    <div className="flexColStart r-card" onClick={()=> navigate(`../Myproperties/${card.id}`)}>
      <div className='Heart'>
      <Heart id={card?.id} />
      </div>
      {/* Conditionally display "Sold Out" over the image when card.sold is true */}
      
      <img src={card.image} alt="" />
      <span className="secondaryText r-price">
      {card.sold ? (
        <p className="sold-out-overlay">Sold Out</p>
      ) : null}
        <span style={{ color: "orange" }}>$</span>
        <span>{card.price}</span>
      </span>
      <span className="primaryText">{truncate(card.title,{length:15})}</span>
      <span className="secondaryText">{truncate(card.description,{length:80})}</span>
      
    </div>

  )
}

export default MypropertyCard
