const config = require('lib/config')
const utils = require('lib/backend/utils')

const html = require('es6-string-html-template').html
const raw = require('es6-string-html-template').raw
// para inline-ar estilos css - https://github.com/Automattic/juice
const juice = require('juice')

const emailTemplate = require('ext/lib/notifier/responsive-html-email-template');
const buttonTemplate = require('ext/lib/notifier/responsize-email-button-template');

const baseUrl = utils.buildUrl(config)

module.exports = ({
  userName,
  userEmail,
  password
}) => emailTemplate({
  body: html`
    <p>Hello <strong>${userName}</strong>,</p>
    <p>Welcome to <strong>${config.organizationName}</strong>. you can now participate in the platform</p>
    <p>You can acces the plataform with: email (<strong>${userEmail}</strong>) and password <strong>${password}</strong></p>
    ${buttonTemplate({
      url: baseUrl,
      text: 'Access platform'
    })}
    <p style='font-size:16px'><strong>¡Please change the password on your profile!</strong></p>
    <p>Thank you!</p>
    <p style='font-size:12px'><i> if "Access platform" doesnt work, copy this link in your browser's search: <a href="${baseUrl}" target="_blank">${baseUrl}</a></i></p>
  `
})
