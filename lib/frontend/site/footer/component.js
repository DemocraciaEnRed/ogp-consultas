import React, { Component } from 'react'
import { Link } from 'react-router'
import t from 't-component'
import config from 'lib/config'

export default class Footer extends Component {

  render () {
    return (
      <footer className='ext-footer'>
        <div className='footer container'>
          <div className='institutional'>
            <div className='logo gob'>
              <a href='/' alt="Open goverment partnership">
                <img src={config.imgs.logoFooter} />
              </a>
            </div>
            <p className='small'>
            The contents of this page are licensed under <a href='https://www.gnu.org/licenses/gpl-3.0-standalone.html'>GNU General Public License v3.0</a>
            </p>
          </div>
            <nav className='menu'>
              <Link to='/help/how-does-it-work'>How can I participate?</Link>
              <Link to='/help/about'>About this site</Link>
              <Link to='/help/about'>Contact</Link>
            </nav>
            <nav className='menu'>
              <Link to='/help/terms-and-conditions'>{ t('help.tos.title')}</Link>
              <Link to='/help/privacy'>{ t('help.pp.title')}</Link>
              <Link to='/help/background'>{ t('help.background.title')}</Link>
            </nav>
        </div>
        <div className="container social-media">
          <a href="https://www.facebook.com/OpenGovernmentPartnership" target="_blank">
            <i className="icon-social-facebook"/>
          </a>
          <a href="https://twitter.com/opengovpart" target="_blank">
            <i className="icon-social-twitter"/>
          </a>
          <a href="https://www.instagram.com/opengovpartnership/" target="_blank">
            <i className="icon-social-instagram"/>
          </a>
          <a href="https://www.youtube.com/channel/UCCDhqc6Xx5a-VKZNo6q_8aQ" target="_blank">
            <i className="icon-social-youtube"/>
          </a>
        </div>
      </footer>
    )
  }
}
