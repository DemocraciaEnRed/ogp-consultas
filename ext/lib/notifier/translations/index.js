const translations = require('democracyos-notifier/lib/translations')
const config = require('lib/config')
const {protocol, host} = config
const homeUrl = `${protocol}://${host}`

const t = translations.t

const overrides = {
  'templates.email.greeting': 'Hello {userName},',
  'templates.email.signature': `${config.organizationName} - ${config.bajadaPlataforma}`,

  'templates.welcome-email.subject': 'Welcome to ' + config.organizationName,
  'templates.welcome-email.body': `You started the registration process in <a href="${homeUrl}">${config.organizationName}</a>.<br><br> click  <a href=\"{validateUrl}\">HERE</a> to verify your email`,
  'templates.welcome-email.ps': 'En caso de no haberte registrado, por favor ignorá este correo.  ',

  'templates.comment-reply.subject': `You have a repply to your comment ${config.organizationName}!`,
  'templates.comment-reply.body': 'Someone repplied to your comment.',
  'templates.comment-reply.body2': '<a href=\"{url}\">click here</a> to check it out.',

  'templates.topic-published.subject': 'New topic!',
  'templates.topic-published.body': 'A new topic has ben created:',
  'templates.topic-published.body2': 'Please, <a href=\"{url}\">Click Here</a> to check it out.'
}

Object.assign(t.es, overrides)
Object.assign(t.en, overrides)
