import React, { Component } from 'react'
import CardsSlider from 'ext/lib/site/cards-slider/component'
import ForumCard from '../forum-card/component'

export default ({ forum }) => (
  <div className='container forum-card-container'>
    <ForumCard forum={forum} />
    <div className='forum-slider-wrapper'>
      <h4 className='forum-slider-title'>
      {
        forum.extra.contentType === 'llamado' && 'The proposals of this announcement are:'
        ||
        forum.extra.contentType === 'propuestas' && 'The proposals of this consultation are:'
        ||        
        (forum.extra.contentType === 'ejes' || forum.extra.contentType === undefined) && 'The main topics that correspond to this consultation are:'
      }
      </h4>
      <CardsSlider forum={forum} />
    </div>
  </div>
)
