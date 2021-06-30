import React, { Component } from 'react'
import ReactDOM from 'react-dom'
import { browserHistory, Link } from 'react-router'
import Jump from 'jump.js'
import userConnector from 'lib/frontend/site/connectors/user'
import config from 'lib/config'
import Footer from 'lib/frontend/site/footer/component'
import forumStore from 'ext/lib/stores/forum-store/forum-store'
import ForumContainer from './forum-container/component'
import ForumCard from './forum-card/component'
import Search from './search/component'

class HomeMultiForum extends Component {
  constructor (props) {
    super(props)

    this.state = {
      page: 0,
      activeFilter: 'byDate',
      forums: []
    }
  }

  componentDidMount () {
    const {
      activeFilter
    } = this.state;

    forumStore
      .filterBy(activeFilter)
      .then((forums) => {
        this.setState({
          forums,
          // las páginas son de a 3 (definido en ext/lib/api/filter.js), entonces si devuelve 3, tal vez hay más
          showMore: forums.length === 3
        })
      })
      .catch(console.error)
  }

  handleClick = (name) => {
    const { page } = this.state;

    forumStore
      .filterBy(name)
      .then((forums) => {
        this.setState({
          page,
          forums,
          activeFilter: name
        })
      })
      .catch(console.error)
  }

  handleMoreClick = () => {
    const {
      page,
      activeFilter
    } = this.state;

    forumStore
      .filterBy(activeFilter, page + 1)
      .then((forums) => {
        this.setState({
          page: this.state.page + 1,
          forums: [...this.state.forums, ...forums],
          showMore: forums.length === 3
        });
      })
      .catch(console.error)
  }

  handleButtonClick = () => {
    Jump('#consultas')
    // const consultasNode = ReactDOM.findDOMNode(this.refs.consultas)
    // window.scrollTo(0, consultasNode.offsetTop)
  }

  render () {
    if (this.props.user.state.pending) return null

    const {
      showMore,
      activeFilter,
      forums
    } = this.state

    return (
      <div className='ext-site-home-multiforum'>
        <section
          className='cover jumbotron'
          style={{
            backgroundImage: `url('${config.imgs.backgroundHome}')`
          }}>
          <div className='jumbotron_body'>
            <div className='container'>
              <img
                src={config.imgs.logoCentralHome}
                alt="Logo"
                width="270px"
              />
              <p className='lead highlight'>
                <b>2021 Consultation on new OGP Participation and Co-Creation Standards</b>
              </p>
              <p className='lead highlight'>
                {config.bajadaPlataforma}
              </p>
              {/*
                <a
                  className='btn register-btn'
                  href="/signup">
                    WANT TO REGISTER
                </a>
              */}
              
            </div>
          </div>
        </section>
        <a className="participate-now" href="#follow">
          &darr; <span>Participate Now</span> &darr;
        </a>
        <div className='lead-paragraph container'>
          <p>
            To drive more ambition and better implemented commitments in open government action plans, the Open Government Partnership has been exploring ways to streamline the <a href="https://www.opengovpartnership.org/ogp-participation-co-creation-standards/" target="_blank">Participation and Co-Creation Standards</a>, and Introduce some flexibility in the action plan cycle.
          </p>
          <p>
            OGP is seeking feedback from the open government community on new and concrete proposals on how this could look like in practice.
          </p>
          
          <br />
        </div>
        <div className="steps" id="follow">
          <div className="container">
            <p className="icons-title lead-paragraph">
              Follow this steps to participate and debate in a effective and collaborative way
            </p>
            <div className='section-icons col-md-10 offset-md-1'>
              <div className='row'>
                <div className='section-icon col-md-4'>
                  <img
                    className='icon'
                    src={config.imgs.iconoHomeInformate}
                    alt='Informate'
                    />
                  <div className='text'>
                    <h5>Explore</h5> the new proposals
                  </div>
                </div>
                <div className='section-icon col-md-4'>
                <img
                    className='icon'
                    src={config.imgs.iconoHomeParticipa}
                    alt='Participá'
                    />
                  <div className='text'>
                    <h5>Comment</h5> and Vote to make your voice heard
                  </div>
                </div>
                <div className='section-icon col-md-4'>
                <img
                    className='icon'
                    src={config.imgs.iconoHomeComparti}
                    alt='Proponé'
                    />
                  <div className='text'>
                    <h5>Share</h5> with Other Open Gov reformers
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className='container forums-list' id='consultas'>
          <h2 className='forums-list-title'>Know more about the consultations</h2>
          <div className="filter-container content-center">
            <div className="btn-group btn-group-sm dropdown-element" role="group" aria-label="Filtros">
            <button
                className={`btn dropbtn ${activeFilter === 'byDate' ? 'btn-active' : 'btn-secondary'}`}
                onClick={this.handleClick.bind(this, 'byDate')}
              >
              {(() => {
                switch(this.state.activeFilter) {
                  case 'byDate':
                    return  'Nuevas'
                  case 'byPopular':
                    return 'Relevantes'
                  case 'byClosed':
                    return 'Finalizadas'
                  }
              })()}
              </button>
            <ul className='dropdown-content'>
              <li
                className={`btn btn-item-dropdown filter-btn ${activeFilter === 'byDate' ? 'filter-active' : ''}`}
                onClick={this.handleClick.bind(this, 'byDate')}
              >
                New
              </li>
              <li
                className={`btn btn-item-dropdown filter-btn ${activeFilter === 'byPopular' ? 'filter-active' : ''}`}
                onClick={this.handleClick.bind(this, 'byPopular')}
              >
                Relevant
              </li>
              <li
                className={`btn btn-item-dropdown filter-btn ${activeFilter === 'byClosed' ? 'filter-active' : ''}`}
                onClick={this.handleClick.bind(this, 'byClosed')}
              >
                Finished
              </li></ul>
            </div>
          </div>

          <Search />

          {!forums.length && <h3 className="no-result content-center">No results...</h3>}

          {!!forums.length && forums.map((forum, key) => (
            <ForumContainer forum={forum} key={forum.id} />
          ))}
          {!!forums.length && showMore &&
            <div className='row content-center'>
              <button className="btn btn-active show-more" onClick={this.handleMoreClick}>
                New forum
              </button>
            </div>
          }
        </div>
        <Footer />
      </div>
    )
  }
}

export default userConnector(HomeMultiForum)
