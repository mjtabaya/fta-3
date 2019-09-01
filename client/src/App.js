import React, { Component } from 'react';
import axios from 'axios'
import 'semantic-ui-css/semantic.css'
import Login from './components/auth/Login'

class App extends Component {
  constructor() {
    super();
    this.state = {
      loggedInStatus: 'NOT_LOGGED_IN',
      user: null,
      error: ''
    };

    this.handleLogin = this.handleLogin.bind(this);
    this.handleLogout = this.handleLogout.bind(this);
  }

  checkLoginStatus() {
    axios.get('http://localhost:3001/users/sign_in', { withCredentials: true })
         .then(response => {
           if (response.data.logged_in && this.state.loggedInStatus === 'NOT_LOGGED_IN') {
             this.setState({
               loggedInStatus: 'LOGGED_IN',
               user: response.data.user
             })
           } else if (!response.data.logged_in && this.state.loggedInStatus === 'LOGGED_IN') {
             this.setState({
               loggedInStatus: 'NOT_LOGGED_IN',
               user: {}
             })
           }
         }).catch(error => {
           console.log("check login error", error);
    })
  }

  componentDidMount() {
    this.checkLoginStatus();
  }

  handleLogin(data) {
    this.setState({
      loggedInStatus: 'LOGGED_IN',
      user: data.user
    })
  }

  handleLogout() {
    this.setState({
      loggedInStatus: 'NOT_LOGGED_IN',
      user: {}
    })
  }

  loginForm() {
    return (
      <Login
        {...this.state}
        handleLogin={this.handleLogin}
        handleLogout={this.handleLogout}
        loggedInStatus={this.state.loggedInStatus}
        user={this.state.user}
        handleSuccessfulAuth={this.handleSuccessfulAuth}
      />
    )
  }

  dashboard() {
    return (
      <p>Conditional for role</p>
    )
  }

  employeeView() {
    return (
      <p>Employee View</p>
    )
  }

  managerView() {
    return (
      <p>Manager View</p>
    )
  }

  render(){
    return (
      <div className='app'>
      {
        this.props.loggedInStatus === "NOT_LOGGED_IN" && this.managerView()
      }
      {
        this.props.loggedInStatus === "LOGGED_IN" && this.dashboard()
      }
      </div>
    )
  }

}

export default App;
