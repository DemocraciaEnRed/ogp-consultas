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
    <p>Hi <strong>${userName}</strong>,</p>
    <p>Your request to register to participate in <strong>${config.organizationName}</strong> has been received. Click on the link below to verify your account in order to comment on the Standards:</p>
    ${buttonTemplate({
      url: validateUrl,
      text: 'Verify my account'
    })}
    <p>Thank you, we look forward to your input!</p>
    <p style='font-size:12px'><i>If the button “verify my account” is not working, please copy and paste the following link in your browser: <a href="${validateUrl}" target="_blank">${validateUrl}</a></i></p>
    <p style='font-size:12px'><i>N.b. If you have not created an account at <a href="${baseUrl}" target="_blank">${baseUrl}</a>, no further action is needed.</i></p>
  `
})
