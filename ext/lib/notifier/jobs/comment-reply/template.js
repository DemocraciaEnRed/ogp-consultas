const config = require('lib/config')
const utils = require('lib/backend/utils')

const html = require('es6-string-html-template').html
// para inline-ar estilos css - https://github.com/Automattic/juice
const juice = require('juice');

const emailTemplate = require('ext/lib/notifier/responsive-html-email-template');
const buttonTemplate = require('ext/lib/notifier/responsize-email-button-template');

const baseUrl = utils.buildUrl(config)

// original en: https://github.com/DemocracyOS/notifier/blob/master/lib/templates/lib/comment-reply.js
module.exports = ({
  userName, topicTitle, reply, comment, url
}, {
  lang
}) => emailTemplate({
  body: html`
    <p>Hello <strong>${userName}</strong>,</p>
    <p>User <strong>${reply.author.fullName}</strong> replied a coment in <strong>${topicTitle}</strong>.</p>
    <p>Original comment by <strong>${comment.author.fullName}</strong>:</p>
    <div style='padding:15px;padding-top:10px;border-radius: 5px;'><i>${comment.text}</i></div>
    <br />
    <p>Reply by <strong>${reply.author.fullName}</strong>:</p>
    <div style='padding:15px;padding-top:10px;border-radius: 5px;'><i>${reply.text}</i></div>
    <br />
    ${buttonTemplate({
      url: url,
      text: 'See response'
    })}
    <p><br /><strong>${config.organizationName}</strong></p>
    <p style='font-size:12px'><i>If the "See response" button doesnt work, copy and paste this link in your browser: <a href="${url}" target="_blank">${url}</a></i></p>
  `
})
