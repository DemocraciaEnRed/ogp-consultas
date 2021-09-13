import React, { PureComponent } from 'react'
import { Link } from 'react-router'
import t from 't-component'
import Footer from 'lib/frontend/site/footer/component'
import Sidebar from 'ext/lib/site/help/sidebar/component'
import MarkdownGuide from 'lib/frontend/site/help/md-guide/component'
import * as articles from './articles'
import Stats from './stats/component'


export default class HelpLayout extends PureComponent {
  articles = [
    {
      title: 'Help / FAQ',
      Content: () => <Content content={articles.como} />,
      slug: 'how-does-it-work',
      path: '/help/how-does-it-work'
    },
    {
      title: 'About this site',
      Content: () => <Content content={articles.acerca} />,
      slug: 'about',
      path: '/help/about'
    },
        {
      title: 'Statistics',
      Content: Stats,
      slug: 'statistics',
      path: '/help/statistics'
    },
    {
      title: 'Terms and Conditions',
      Content: () => <Content content={articles.tos} />,
      slug: 'terms-and-conditions',
      path: '/help/terms-and-conditions'
    },
    {
      title: t('help.pp.title'),
      Content: () => <Content content={articles.pp} />,
      slug: 'privacy',
      path: '/help/privacy'
    }
    // {
    //   title: t('help.background.title'),
    //   Content: () => <Content content={articles.background} />,
    //   slug: 'background',
    //   path: '/help/background'
    // },
    // {
    //   title: t('help.markdown.title'),
    //   Content: MarkdownGuide,
    //   slug: 'markdown',
    //   path: '/help/markdown'
    // }
  ]

  componentDidMount() {
    window.scrollTo(0, 0);
  }

  render () {
    const article = this.props.params.article || this.articles[0].slug
    const active = this.articles.find((art) => art.slug === article)

    return (
      <div>
        <div className='help-container container'>
          <ol className='breadcrumb'>
            <li className='breadcrumb-item'>
              <Link to='/'>Consultation</Link>
            </li>
            <li className='breadcrumb-item active'>
              <Link to='/help'>Help</Link>
            </li>
            <li className='breadcrumb-item active'>
              <span>{active.title}</span>
            </li>
          </ol>
          <section>
            <div className='row'>
              <aside className='col-md-4'>
                <Sidebar
                  activeSlug={active.slug}
                  articles={this.articles} />
              </aside>
              <article className='help-content col-md-8'>
                <active.Content />
              </article>
            </div>
          </section>
        </div>
        <Footer />
      </div>
    )
  }
}

const Content = ({ content }) => (
  <div dangerouslySetInnerHTML={{ __html: content }} />
)
