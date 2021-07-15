const config = require('lib/config')
const utils = require('lib/backend/utils')

const html = require('es6-string-html-template').html
// para inline-ar estilos css - https://github.com/Automattic/juice
const juice = require('juice');

const emailTemplate = require('ext/lib/notifier/responsive-html-email-template');
const buttonTemplate = require('ext/lib/notifier/responsize-email-button-template');

const baseUrl = utils.buildUrl(config)

module.exports = ({
  userName, topicTitle, comment, url
}, {
  lang
}) => emailTemplate({
  body: html`
    <p>Hello <strong>${userName}</strong>,</p>
    <p>The user <strong>${comment.author.fullName}</strong> commented on <strong>${topicTitle}</strong>:</p>
    <div style='padding:15px;border-radius: 5px;'><i>${comment.text}</i></div>
    <br />
    ${buttonTemplate({
      url: url,
      text: 'See comment'
    })}
    <p><br /><strong>${config.organizationName}</strong></p>
    <p style='font-size:12px'><i>If the button "See comment" doesnt work, copy and paste this address in your browser <a href="${url}" target="_blank">${url}</a></i></p>

  `
})
