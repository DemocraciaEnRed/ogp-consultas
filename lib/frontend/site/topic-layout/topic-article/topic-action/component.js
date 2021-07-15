import React from 'react'
import { Link } from 'react-router'
import t from 't-component'
import Vote from 'lib/frontend/site/topic-layout/topic-article/vote/component'
import Poll from 'lib/frontend/site/topic-layout/topic-article/poll/component'
import Cause from 'lib/frontend/site/topic-layout/topic-article/cause/component'
import Slider from 'lib/frontend/site/topic-layout/topic-article/slider/component'
import Hierarchy from 'lib/frontend/site/topic-layout/topic-article/hierarchy/component'

const text = (method) => {
  switch (method) {
    case 'cause':
      return 'Give your support to the initiative'
    case 'slider':
      return 'Slide to the side that is more inclined to your opinion'
    case 'hierarchy':
      return 'You can arrange or drag the options in the order that best suits your priorities'
    case 'vote':
      return 'Choose the most suitable option'
    case 'poll':
      return 'Choose the most suitable option'
    default:
      return 'Choose the most suitable option'
  }
}

export default ({ topic, userAttrs }) => (
  <div className='topic-article-content topic-article-action'>
    {topic.attrs && topic.attrs.pregunta &&
      <h3 className='topic-action-title'>{topic.attrs.pregunta}</h3>
    }
  
    {!topic.closed && !topic.voted && userAttrs &&
      <p className='topic-action-explain'>{text(topic.action.method)}</p>
    }
    {!topic.closed && topic.voted && topic.action.method === 'poll' &&
      <div className='alert alert-info alert-poll' role='alert'>
        <span className='icon-info bold' />
        <span className='black bold thanks'>{t('topics.actions.thanks')}</span>
        <span className='black'>{t('topics.actions.feedback')}</span>
      </div>
    }
    {(() => {
      switch(topic.action.method) {
        case 'vote':
          return  <Vote topic={topic} positiveColor='#0695d6' neutralColor='#666666' negativeColor='#7b548a' />
        case 'poll':
          return  <Poll topic={topic} />
        case 'cause':
          return <Cause topic={topic} />
        case 'slider':
          return <Slider topic={topic} />
        case 'hierarchy':
          return <Hierarchy topic={topic} />
        }
    })()}
    {topic.voted && !topic.closed &&
      <div className='voted-results-exp'>
        As soon as the consultation closes you will be able to see the results
      </div>
    }
    {topic.closed &&
      <div>
        {topic.action.method == 'cause' ?
         (  <div className='action-count'>
            <span className='number'>{topic.action.count}</span>
            <span>{topic.action.count === 1 ? 'participant provided' : 'participants provided'} their support.</span>
            </div>  )  : ( 
          <div className='action-count'>
            <div className='participantes' />
            <span className='number'>{topic.action.count}</span>
            <span>{topic.action.count === 1 ? 'participante' : 'participantes'}</span>
          </div> )
         }
        <Link to='/'>
          <button className='btn btn-primary'>
            Participate in other consultation
          </button>
        </Link>
      </div>
    }
  </div>
)
