import {Component} from 'react'
import Cookies from 'js-cookie'

import {Redirect} from 'react-router-dom'

import './index.css'

class Login extends Component {
  state = {username: '', password: '', showErrMsg: false, showPassword: false}

  onChangeUsername = event => {
    this.setState({username: event.target.value})
  }

  onChangePassword = event => {
    this.setState({password: event.target.value})
  }

  submitLoginForm = async event => {
    event.preventDefault()
    const {username, password} = this.state

    const userDetails = {username, password}

    const loginApi = 'https://apis.ccbp.in/login'

    const options = {
      method: 'POST',
      body: JSON.stringify(userDetails),
    }

    const response = await fetch(loginApi, options)
    const data = await response.json()
    if (response.ok === true) {
      const jwtToken = data.jwt_token
      Cookies.set('jwt_token', jwtToken, {expires: 30})

      const {history} = this.props

      history.replace('/')
      this.setState({username: '', password: ''})
    } else {
      this.setState({showErrMsg: true, errorMsg: data.error_msg})
    }
  }

  showHidePassword = () => {
    this.setState(prevState => ({showPassword: !prevState.showPassword}))
  }

  render() {
    const {username, password, showErrMsg, errorMsg, showPassword} = this.state
    const jwtToken = Cookies.get('jwt_token')
    if (jwtToken !== undefined) {
      return <Redirect to="/" />
    }

    const inputType = showPassword ? 'text' : 'password'
    const showHideBtnText = showPassword ? 'Hide' : 'Show'

    return (
      <div className="app-container">
        <div className="login-container">
          <div className="logo-container">
            <img
              src="https://assets.ccbp.in/frontend/react-js/logo-img.png"
              alt="website logo"
              className="login-website-logo"
            />
          </div>
          <form
            className="form-container"
            onSubmit={this.submitLoginForm}
            id="loginForm"
          >
            <label htmlFor="username" className="label-el">
              USERNAME
            </label>
            <input
              type="text"
              className="input-el"
              placeholder="Username"
              id="username"
              value={username}
              onChange={this.onChangeUsername}
            />
            <label htmlFor="password" className="label-el">
              PASSWORD
            </label>
            <div className="password-container">
              <input
                type={inputType}
                className="password-input"
                placeholder="Password"
                id="password"
                value={password}
                onChange={this.onChangePassword}
              />
              <button
                type="button"
                className="password-show-hide-btn"
                onClick={this.showHidePassword}
              >
                {showHideBtnText}
              </button>
            </div>
            <p className="password-hint">Username : rahul</p>
            <p className="password-hint">Password : rahul@2021</p>

            <button type="submit" className="login-button">
              Login
            </button>
            {showErrMsg && <p className="error-msg">{errorMsg}</p>}
          </form>
        </div>
      </div>
    )
  }
}

export default Login
