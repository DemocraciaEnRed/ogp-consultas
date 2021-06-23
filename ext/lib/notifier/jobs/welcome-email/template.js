const config = require('lib/config')
const utils = require('lib/backend/utils')

const html = require('es6-string-html-template').html
const raw = require('es6-string-html-template').raw
// para inline-ar estilos css - https://github.com/Automattic/juice
const juice = require('juice');

const emailTemplate = require('ext/lib/notifier/responsive-html-email-template');
const buttonTemplate = require('ext/lib/notifier/responsize-email-button-template');

const baseUrl = utils.buildUrl(config)

module.exports = ({
  userName,
  validateUrl
}) => emailTemplate({
  body: html`
    <p>Hello <strong>${userName}</strong>,</p>
    <p>You started a registration proccess in <strong>${config.organizationName}</strong>. validate your user and finish registration here:</p>
    ${buttonTemplate({
      url: validateUrl,
      text: 'Validate account'
    })}
    <p>Thank you!</p>
    <p style='font-size:12px'><i>if the "Validate account" button doesnt work, copy and paste the validation url in a new browser tab: <a href="${validateUrl}" target="_blank">${validateUrl}</a></i></p>
    <p style='font-size:12px'><i>PD: If you didnt create an account in <a href="${baseUrl}" target="_blank">${baseUrl}</a>. this action is not required.</i></p>
  `
})
