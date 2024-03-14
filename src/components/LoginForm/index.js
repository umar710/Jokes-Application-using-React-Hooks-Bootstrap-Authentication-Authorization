import {Component} from 'react'

import {Button} from 'react-bootstrap'

import Cookies from 'js-cookie'
import {Redirect} from 'react-router-dom'

import './index.css'

class LoginPage extends Component {
  state = {username: '', password: '', showSubmitError: false, errorMsg: ''}

  onSubmitSuccess = jwtToken => {
    Cookies.set('jwt_token', jwtToken, {
      expires: 30,
    })
    const {history} = this.props
    history.replace('/')
  }

  onSubmitFaluire = errorMsg => {
    console.log(errorMsg)
    this.setState({
      showSubmitError: true,
      errorMsg,
    })
  }

  onSubmitLogin = async event => {
    event.preventDefault()
    const {username, password} = this.state
    const userDetails = {username, password}
    const url = 'https://apis.ccbp.in/login'
    const options = {
      method: 'POST',
      body: JSON.stringify(userDetails),
    }
    const response = await fetch(url, options)
    const data = await response.json()
    console.log(data)
    if (response.ok === true) {
      this.onSubmitSuccess(data.jwt_token)
    } else {
      this.onSubmitFaluire(data.error_msg)
    }
  }

  onChangeuserName = event => {
    this.setState({
      username: event.target.value,
    })
  }

  onChangePassword = event => {
    this.setState({
      password: event.target.value,
    })
  }

  render() {
    const {username, password, showSubmitError, errorMsg} = this.state
    const jwtToken = Cookies.get('jwt_token')
    if (jwtToken !== undefined) {
      return <Redirect to="/" />
    }

    return (
      <div className="login-page-container">
        <div className="login-details-card">
          <h4 className="text-primary">Login Details</h4>
          <p>username: rahul</p>
          <p>password: rahul@2021</p>
        </div>
        <div className="login-card">
          <div>
            <img
              src="https://tse3.mm.bing.net/th?id=OIP.-5IMC19PiID85AQmKOpbrQAAAA&pid=Api&P=0&h=220"
              alt="logo"
            />
          </div>
          <form onSubmit={this.onSubmitLogin}>
            <label htmlFor="username">UserName</label>
            <br />
            <input
              type="text"
              id="username"
              value={username}
              onChange={this.onChangeuserName}
            />
            <br />
            <label htmlFor="password">Password</label>
            <br />
            <input
              type="password"
              id="password"
              value={password}
              onChange={this.onChangePassword}
            />
            <br />
            <Button className="btn-primary login-btn" type="submit">
              Login
            </Button>
          </form>
          {showSubmitError && <p>*{errorMsg}</p>}
        </div>
      </div>
    )
  }
}

export default LoginPage
