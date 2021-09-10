import React, { Component } from 'react'
import { Link } from 'react-router'
import bus from 'bus'
import t from 't-component'
import ReCAPTCHA from 'react-google-recaptcha'
import config from 'lib/config'
import randomWords from './randomwords'
import FormAsync from 'lib/frontend/site/form-async'

export default class SignUp extends Component {
  constructor (props) {
    super(props)
    this.state = {
      loading: false,
      active: null,
      errors: null,
      name: '',
      lastName: '',
      email: '',
      pass: '',
      captchaKey: '',
      country: '',
      area: ''
    }
    this.onSuccess = this.onSuccess.bind(this)
    this.onFail = this.onFail.bind(this)
    this.onSubmit = this.onSubmit.bind(this)
    this.saveName = this.saveName.bind(this)
    this.saveLastName = this.saveLastName.bind(this)
    this.saveEmail = this.saveEmail.bind(this)
    this.savePass = this.savePass.bind(this)
    this.saveArea = this.saveArea.bind(this)
    this.saveCountry = this.saveCountry.bind(this)
    this.checkPassLength = this.checkPassLength.bind(this)
    this.onCaptchaChange = this.onCaptchaChange.bind(this)
    this.onSubmitClick = this.onSubmitClick.bind(this)
    this.createRandomString = this.createRandomString.bind(this)
    this.anotherUser = this.anotherUser.bind(this)
  }

  componentWillMount () {
    bus.emit('user-form:load', 'signup')
    this.setState({ active: 'form' })
  }

  componentWillUnmount () {
    bus.emit('user-form:load', '')
  }

  onSubmit () {
    this.setState({ loading: true, errors: null })
  }

  onSuccess (res) {
    this.setState({
      loading: false,
      active: 'congrats',
      errors: null,
      captchaKey: ''
    })
  }

  onFail (err) {
    this.setState({ loading: false, errors: err, captchaKey: '' })
  }

  saveName (e) {
    this.setState({ name: e.target.value })
  }

  saveLastName (e) {
    this.setState({ lastName: e.target.value })
  }

  saveEmail (e) {
    this.setState({ email: e.target.value })
  }

  savePass (e) {
    this.setState({ pass: e.target.value })
  }

  saveArea(e) {
    this.setState({ area: e.target.value })
  }

  saveCountry(e) {
    this.setState({ country: e.target.value })
  }
  
  anotherUser () {
    this.setState({
      loading: false,
      active: 'form',
      errors: null,
      name: '',
      lastName: '',
      email: '',
      pass: '',
      captchaKey: '',
      country: '',
      area: ''
    })
  }

  checkPassLength (e) {
    const passLength = e.target.value

    if (passLength.length < 6) {
      e.target.setCustomValidity(t('validators.min-length.plural', { n: 6 }))
    } else {
      if (e.target.name === 're_password' && e.target.value !== this.state.pass) {
        e.target.setCustomValidity(t('common.pass-match-error'))
      } else {
        e.target.setCustomValidity('')
      }
    }
  }

  createRandomString (e) {
    if(!config.allowPublicSignUp){
      let pickRandomAdjective = randomWords.adjective[Math.floor(Math.random() * randomWords.adjective.length)]
      let picRandomNoun = randomWords.adjective[Math.floor(Math.random() * randomWords.adjective.length)]
      let thePassword = `${pickRandomAdjective}${picRandomNoun.charAt(0).toUpperCase() + picRandomNoun.slice(1)}`
      document.getElementById('signup-pass').value = thePassword
      this.setState({ pass: thePassword }, () => {
        document.getElementById('signup-pass').focus()
      })
    }
  }

  onCaptchaChange (key) {
    this.setState({ captchaKey: key })
    this.refs.submitBtn.click()
  }

  onSubmitClick (e) {
    if (config.recaptchaSite && !this.state.captchaKey) {
      this.captcha.execute()
      e.preventDefault()
    }
  }

  render () {
    return (
      <div className='center-container'>
        {
          this.state.active === 'form' &&
          (
            <div id='signup-form'>
              <div className='title-page'>
                <div className='circle'>
                  <i className='icon-user' />
                </div>
                { config.allowPublicSignUp ?
                <h1>{t('signup.with-email')}</h1>
                : <h1>Register User</h1>
                }
              </div>
              <FormAsync
                action='/api/signup'
                onSubmit={this.onSubmit}
                onSuccess={this.onSuccess}
                onFail={this.onFail}>
                {config.recaptchaSite && (
                  <ReCAPTCHA
                    ref={(el) => { this.captcha = el }}
                    size='invisible'
                    sitekey={config.recaptchaSite}
                    onChange={this.onCaptchaChange} />
                )}
                <input
                  type='hidden'
                  name='reference'
                  value={this.props.location.query.ref} />
                <ul
                  className={this.state.errors ? 'form-errors' : 'hide'}>
                  {
                    this.state.errors && this.state.errors
                      .map((error, key) => (<li key={key}>{error}</li>))
                  }
                </ul>
                <div className='form-group'>
                  <label htmlFor=''>{t('signup.email')}</label>
                  <input
                    type='email'
                    className='form-control'
                    name='email'
                    maxLength='200'
                    onChange={this.saveEmail}
                    placeholder={t('forgot.mail.example')}
                    required />
                </div>
                <div className='form-group'>
                  <label htmlFor=''>Your fullname or alias</label>
                  <input
                    type='text'
                    className='form-control'
                    id='firstName'
                    name='firstName'
                    maxLength='100'
                    placeholder='Fullname or Alias'
                    onChange={this.saveName}
                    required />
                    <input
                    type='hidden'
                    className='form-control'
                    id='lastName'
                    name='lastName'
                    value='' />
                </div>
                {/* <div className='form-group'>
                  <label htmlFor=''>{t('signup.your-lastname')}</label>
                  <input
                    type='text'
                    className='form-control'
                    id='lastName'
                    name='lastName'
                    maxLength='100'
                    onChange={this.saveLastName}
                    placeholder={t('signup.lastname')}
                    required />
                </div> */}
                { config.allowPublicSignUp ?
                <div className='form-group'>
                  <label htmlFor=''>{t('password')}</label>
                  <input
                    id='signup-pass'
                    className='form-control'
                    name='password'
                    type='password'
                    maxLength='200'
                    onChange={this.savePass}
                    onBlur={this.checkPassLength}
                    placeholder={t('password')}
                    required />
                </div>
                : <div className='form-group'>
                  <label htmlFor=''>{t('password')}</label>
                  <input
                    id='signup-pass'
                    className='form-control'
                    name='password'
                    type='text'
                    maxLength='200'
                    onChange={this.savePass}
                    onBlur={this.checkPassLength}
                    placeholder={t('password')}
                    required />
                    <a className="btn btn-sm btn-secondary btn-block" onClick={this.createRandomString}>Create random password</a>
                </div>
                }
                { config.allowPublicSignUp ?

                <div className='form-group'>
                  <label htmlFor=''>{t('signup.retype-password')}</label>
                  <input
                    type='password'
                    className='form-control'
                    name='re_password'
                    onBlur={this.checkPassLength}
                    required />
                </div> :
                <hr/>
                }
                <div className='form-group'>
                  <label htmlFor=''>Country</label>
                  <select id='country' name='country' className='form-control form-control-lg' onChange={this.saveCountry}>
                    <option value='' disabled selected>- Select your country -</option>
                    <option value='AF'>Afghanistan</option>
                    <option value='AX'>&Aring;land Islands</option>
                    <option value='AL'>Albania</option>
                    <option value='DZ'>Algeria</option>
                    <option value='AS'>American Samoa</option>
                    <option value='AD'>Andorra</option>
                    <option value='AO'>Angola</option>
                    <option value='AI'>Anguilla</option>
                    <option value='AQ'>Antarctica</option>
                    <option value='AG'>Antigua &amp; Barbuda</option>
                    <option value='AR'>Argentina</option>
                    <option value='AM'>Armenia</option>
                    <option value='AW'>Aruba</option>
                    <option value='AU'>Australia</option>
                    <option value='AT'>Austria</option>
                    <option value='AZ'>Azerbaijan</option>
                    <option value='BS'>Bahamas</option>
                    <option value='BH'>Bahrain</option>
                    <option value='BD'>Bangladesh</option>
                    <option value='BB'>Barbados</option>
                    <option value='BY'>Belarus</option>
                    <option value='BE'>Belgium</option>
                    <option value='BZ'>Belize</option>
                    <option value='BJ'>Benin</option>
                    <option value='BM'>Bermuda</option>
                    <option value='BT'>Bhutan</option>
                    <option value='BO'>Bolivia</option>
                    <option value='BA'>Bosnia &amp; Herzegovina</option>
                    <option value='BW'>Botswana</option>
                    <option value='BV'>Bouvet Island</option>
                    <option value='BR'>Brazil</option>
                    <option value='IO'>British Indian Ocean Territory</option>
                    <option value='VG'>British Virgin Islands</option>
                    <option value='BN'>Brunei</option>
                    <option value='BG'>Bulgaria</option>
                    <option value='BF'>Burkina Faso</option>
                    <option value='BI'>Burundi</option>
                    <option value='KH'>Cambodia</option>
                    <option value='CM'>Cameroon</option>
                    <option value='CA'>Canada</option>
                    <option value='CV'>Cape Verde</option>
                    <option value='BQ'>Caribbean Netherlands</option>
                    <option value='KY'>Cayman Islands</option>
                    <option value='CF'>Central African Republic</option>
                    <option value='TD'>Chad</option>
                    <option value='CL'>Chile</option>
                    <option value='CN'>China</option>
                    <option value='CX'>Christmas Island</option>
                    <option value='CC'>Cocos (Keeling) Islands</option>
                    <option value='CO'>Colombia</option>
                    <option value='KM'>Comoros</option>
                    <option value='CG'>Congo - Brazzaville</option>
                    <option value='CD'>Congo - Kinshasa</option>
                    <option value='CK'>Cook Islands</option>
                    <option value='CR'>Costa Rica</option>
                    <option value='CI'>C&ocirc;te d&rsquo;Ivoire</option>
                    <option value='HR'>Croatia</option>
                    <option value='CU'>Cuba</option>
                    <option value='CW'>Cura&ccedil;ao</option>
                    <option value='CY'>Cyprus</option>
                    <option value='CZ'>Czechia</option>
                    <option value='DK'>Denmark</option>
                    <option value='DJ'>Djibouti</option>
                    <option value='DM'>Dominica</option>
                    <option value='DO'>Dominican Republic</option>
                    <option value='EC'>Ecuador</option>
                    <option value='EG'>Egypt</option>
                    <option value='SV'>El Salvador</option>
                    <option value='GQ'>Equatorial Guinea</option>
                    <option value='ER'>Eritrea</option>
                    <option value='EE'>Estonia</option>
                    <option value='SZ'>Eswatini</option>
                    <option value='ET'>Ethiopia</option>
                    <option value='FK'>Falkland Islands</option>
                    <option value='FO'>Faroe Islands</option>
                    <option value='FJ'>Fiji</option>
                    <option value='FI'>Finland</option>
                    <option value='FR'>France</option>
                    <option value='GF'>French Guiana</option>
                    <option value='PF'>French Polynesia</option>
                    <option value='TF'>French Southern Territories</option>
                    <option value='GA'>Gabon</option>
                    <option value='GM'>Gambia</option>
                    <option value='GE'>Georgia</option>
                    <option value='DE'>Germany</option>
                    <option value='GH'>Ghana</option>
                    <option value='GI'>Gibraltar</option>
                    <option value='GR'>Greece</option>
                    <option value='GL'>Greenland</option>
                    <option value='GD'>Grenada</option>
                    <option value='GP'>Guadeloupe</option>
                    <option value='GU'>Guam</option>
                    <option value='GT'>Guatemala</option>
                    <option value='GG'>Guernsey</option>
                    <option value='GN'>Guinea</option>
                    <option value='GW'>Guinea-Bissau</option>
                    <option value='GY'>Guyana</option>
                    <option value='HT'>Haiti</option>
                    <option value='HM'>Heard &amp; McDonald Islands</option>
                    <option value='HN'>Honduras</option>
                    <option value='HK'>Hong Kong SAR China</option>
                    <option value='HU'>Hungary</option>
                    <option value='IS'>Iceland</option>
                    <option value='IN'>India</option>
                    <option value='ID'>Indonesia</option>
                    <option value='IR'>Iran</option>
                    <option value='IQ'>Iraq</option>
                    <option value='IE'>Ireland</option>
                    <option value='IM'>Isle of Man</option>
                    <option value='IL'>Israel</option>
                    <option value='IT'>Italy</option>
                    <option value='JM'>Jamaica</option>
                    <option value='JP'>Japan</option>
                    <option value='JE'>Jersey</option>
                    <option value='JO'>Jordan</option>
                    <option value='KZ'>Kazakhstan</option>
                    <option value='KE'>Kenya</option>
                    <option value='KI'>Kiribati</option>
                    <option value='KW'>Kuwait</option>
                    <option value='KG'>Kyrgyzstan</option>
                    <option value='LA'>Laos</option>
                    <option value='LV'>Latvia</option>
                    <option value='LB'>Lebanon</option>
                    <option value='LS'>Lesotho</option>
                    <option value='LR'>Liberia</option>
                    <option value='LY'>Libya</option>
                    <option value='LI'>Liechtenstein</option>
                    <option value='LT'>Lithuania</option>
                    <option value='LU'>Luxembourg</option>
                    <option value='MO'>Macao SAR China</option>
                    <option value='MG'>Madagascar</option>
                    <option value='MW'>Malawi</option>
                    <option value='MY'>Malaysia</option>
                    <option value='MV'>Maldives</option>
                    <option value='ML'>Mali</option>
                    <option value='MT'>Malta</option>
                    <option value='MH'>Marshall Islands</option>
                    <option value='MQ'>Martinique</option>
                    <option value='MR'>Mauritania</option>
                    <option value='MU'>Mauritius</option>
                    <option value='YT'>Mayotte</option>
                    <option value='MX'>Mexico</option>
                    <option value='FM'>Micronesia</option>
                    <option value='MD'>Moldova</option>
                    <option value='MC'>Monaco</option>
                    <option value='MN'>Mongolia</option>
                    <option value='ME'>Montenegro</option>
                    <option value='MS'>Montserrat</option>
                    <option value='MA'>Morocco</option>
                    <option value='MZ'>Mozambique</option>
                    <option value='MM'>Myanmar (Burma)</option>
                    <option value='NA'>Namibia</option>
                    <option value='NR'>Nauru</option>
                    <option value='NP'>Nepal</option>
                    <option value='NL'>Netherlands</option>
                    <option value='NC'>New Caledonia</option>
                    <option value='NZ'>New Zealand</option>
                    <option value='NI'>Nicaragua</option>
                    <option value='NE'>Niger</option>
                    <option value='NG'>Nigeria</option>
                    <option value='NU'>Niue</option>
                    <option value='NF'>Norfolk Island</option>
                    <option value='KP'>North Korea</option>
                    <option value='MK'>North Macedonia</option>
                    <option value='MP'>Northern Mariana Islands</option>
                    <option value='NO'>Norway</option>
                    <option value='OM'>Oman</option>
                    <option value='PK'>Pakistan</option>
                    <option value='PW'>Palau</option>
                    <option value='PS'>Palestinian Territories</option>
                    <option value='PA'>Panama</option>
                    <option value='PG'>Papua New Guinea</option>
                    <option value='PY'>Paraguay</option>
                    <option value='PE'>Peru</option>
                    <option value='PH'>Philippines</option>
                    <option value='PN'>Pitcairn Islands</option>
                    <option value='PL'>Poland</option>
                    <option value='PT'>Portugal</option>
                    <option value='PR'>Puerto Rico</option>
                    <option value='QA'>Qatar</option>
                    <option value='RE'>R&eacute;union</option>
                    <option value='RO'>Romania</option>
                    <option value='RU'>Russia</option>
                    <option value='RW'>Rwanda</option>
                    <option value='WS'>Samoa</option>
                    <option value='SM'>San Marino</option>
                    <option value='ST'>S&atilde;o Tom&eacute; &amp; Pr&iacute;ncipe</option>
                    <option value='SA'>Saudi Arabia</option>
                    <option value='SN'>Senegal</option>
                    <option value='RS'>Serbia</option>
                    <option value='SC'>Seychelles</option>
                    <option value='SL'>Sierra Leone</option>
                    <option value='SG'>Singapore</option>
                    <option value='SX'>Sint Maarten</option>
                    <option value='SK'>Slovakia</option>
                    <option value='SI'>Slovenia</option>
                    <option value='SB'>Solomon Islands</option>
                    <option value='SO'>Somalia</option>
                    <option value='ZA'>South Africa</option>
                    <option value='GS'>South Georgia &amp; South Sandwich Islands</option>
                    <option value='KR'>South Korea</option>
                    <option value='SS'>South Sudan</option>
                    <option value='ES'>Spain</option>
                    <option value='LK'>Sri Lanka</option>
                    <option value='BL'>St. Barth&eacute;lemy</option>
                    <option value='SH'>St. Helena</option>
                    <option value='KN'>St. Kitts &amp; Nevis</option>
                    <option value='LC'>St. Lucia</option>
                    <option value='MF'>St. Martin</option>
                    <option value='PM'>St. Pierre &amp; Miquelon</option>
                    <option value='VC'>St. Vincent &amp; Grenadines</option>
                    <option value='SD'>Sudan</option>
                    <option value='SR'>Suriname</option>
                    <option value='SJ'>Svalbard &amp; Jan Mayen</option>
                    <option value='SE'>Sweden</option>
                    <option value='CH'>Switzerland</option>
                    <option value='SY'>Syria</option>
                    <option value='TW'>Taiwan</option>
                    <option value='TJ'>Tajikistan</option>
                    <option value='TZ'>Tanzania</option>
                    <option value='TH'>Thailand</option>
                    <option value='TL'>Timor-Leste</option>
                    <option value='TG'>Togo</option>
                    <option value='TK'>Tokelau</option>
                    <option value='TO'>Tonga</option>
                    <option value='TT'>Trinidad &amp; Tobago</option>
                    <option value='TN'>Tunisia</option>
                    <option value='TR'>Turkey</option>
                    <option value='TM'>Turkmenistan</option>
                    <option value='TC'>Turks &amp; Caicos Islands</option>
                    <option value='TV'>Tuvalu</option>
                    <option value='UM'>U.S. Outlying Islands</option>
                    <option value='VI'>U.S. Virgin Islands</option>
                    <option value='UG'>Uganda</option>
                    <option value='UA'>Ukraine</option>
                    <option value='AE'>United Arab Emirates</option>
                    <option value='GB'>United Kingdom</option>
                    <option value='US'>United States</option>
                    <option value='UY'>Uruguay</option>
                    <option value='UZ'>Uzbekistan</option>
                    <option value='VU'>Vanuatu</option>
                    <option value='VA'>Vatican City</option>
                    <option value='VE'>Venezuela</option>
                    <option value='VN'>Vietnam</option>
                    <option value='WF'>Wallis &amp; Futuna</option>
                    <option value='EH'>Western Sahara</option>
                    <option value='YE'>Yemen</option>
                    <option value='ZM'>Zambia</option>
                    <option value='ZW'>Zimbabwe</option>
                  </select>
                </div>
                <div className='form-group'>
                  <label htmlFor=''>Sector</label>
                  <select id='area' name='area' className='form-control form-control-lg' onChange={this.saveArea}>
                    <option value='' disabled selected>- Select your sector -</option>
                    <option value='National government'>National government</option>
                    <option value='Local government'>Local government</option>
                    <option value='Civil society organization - domestic'>Civil society organization - domestic</option>
                    <option value='Civil society organization - international'>Civil society organization - international</option>
                    <option value='Multilateral or other international organization'>Multilateral or other international organization</option>
                    <option value='Academia'>Academia</option>
                    <option value='Private sector'>Private sector</option>
                    <option value='Media/journalist'>Media/journalist</option>
                    <option value='Private citizen'>Private citizen</option>
                    <option value='Other'>Other</option>
                    </select>
                </div>
                <div className='form-group'>
                  { config.allowPublicSignUp ?
                    <button
                      ref='submitBtn'
                      onClick={this.onSubmitClick}
                      className={!this.state.loading ? 'btn btn-block btn-success btn-lg' : 'hide'}
                      type='submit'>
                      {t('signup.now')}
                    </button>
                  : <button
                      ref='submitBtn'
                      onClick={this.onSubmitClick}
                      className={!this.state.loading ? 'btn btn-block btn-success' : 'hide'}
                      type='submit'>
                      {t('signup.now')}
                    </button>
                  }
                  <button
                    className={this.state.loading ? 'loader-btn btn btn-block btn-default btn-lg' : 'hide'}>
                    <div className='loader' />
                    {t('signup.now')}
                  </button>
                </div>
                {
                    (!!config.termsOfService || !!config.privacyPolicy) &&
                    (
                      <div className='form-group accepting'>
                        <p className='help-block text-center'>
                          {t('signup.accepting')}
                        </p>
                        {
                          !!config.termsOfService &&
                          (
                            <Link
                              to='/help/terms-of-service'>
                              {t('help.tos.title')}
                            </Link>
                          )
                        }
                        {
                          !!config.privacyPolicy &&
                          (
                            <Link
                              to='/help/privacy-policy'>
                              {t('help.pp.title')}
                            </Link>
                          )
                        }
                      </div>
                    )
                  }
              </FormAsync>
            </div>
          )
        }
        {
          this.state.active === 'congrats' &&
          (
            config.allowPublicSignUp ?
            <div id='signup-message'>
              <h1>{t('signup.welcome', { name: this.state.name + ' ' + this.state.lastName })}</h1>
              <p className='lead'>{t('signup.received')}</p>
              <p className='lead'>{t('signup.check-email')}</p>
              <Link
                to='/signup/resend-validation-email'>
                {t('signup.resend-validation-email')}
              </Link>
            </div>
            : <div id='signup-message'>
              <h1>Your sign up information was received. {this.state.name + ' ' + this.state.lastName}</h1>
              <p className='lead'>We sent you an email so you can validate your email address.</p>
              <p className='lead'>Please check your email (remember to check your spam folder too) and click on the link supplied on the email.</p>
              <a
                className="btn btn-warning btn-sm"
                onClick={this.anotherUser}>
                Create other user
              </a>
            </div>
          )
        }
      </div>
    )
  }
}
