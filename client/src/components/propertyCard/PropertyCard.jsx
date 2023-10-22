import React from 'react'
import './PropertyCard.css'
import {AiFillHeart} from 'react-icons/ai'
import { useNavigate } from 'react-router-dom'
import {truncate} from 'lodash'
import Heart from '../Heart/Heart'

const PropertyCard = ({card}) => {

  const navigate = useNavigate()

  return (
   
    <div className="flexColStart r-card" onClick={()=> navigate(`../properties/${card.id}`)}>
      <div className='Heart'>
      <Heart id={card?.id} />
      </div>
      <img src={card.image} alt="" />
      <span className="secondaryText r-price">
        <span style={{ color: "orange" }}>$</span>
        <span>{card.price}</span>
      </span>
      <span className="primaryText">{truncate(card.title,{length:15})}</span>
      <span className="secondaryText">{truncate(card.description,{length:80})}</span>
    </div>

  )
}

export default PropertyCard
