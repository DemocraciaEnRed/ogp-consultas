const config = require('lib/config')
const utils = require('lib/backend/utils')

const html = require('es6-string-html-template').html
// para inline-ar estilos css - https://github.com/Automattic/juice
const juice = require('juice');

const emailTemplate = require('ext/lib/notifier/responsive-html-email-template');
const buttonTemplate = require('ext/lib/notifier/responsize-email-button-template');

const baseUrl = utils.buildUrl(config)

module.exports = ({
  userName, resetPasswordUrl
}, {
  lang
}) => emailTemplate({
  body: html`
    <p>Hello <strong>${userName}</strong>,</p>
    <p>We received a password change request. click here to finish the proccess:</p>
    ${buttonTemplate({
      url: resetPasswordUrl,
      text: 'Reset password'
    })}
    <p><br /><strong>${config.organizationName}</strong></p>
    <p style='font-size:12px'><i>PD: If you didnt request a password change ignore this email.</i></p>
    <p style='font-size:12px'><i>if the "Reset password" doesnt work, copy and paste this address in your browser <a href="${resetPasswordUrl}" target="_blank">${resetPasswordUrl}</a></i></p>
  `
})
