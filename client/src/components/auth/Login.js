import React, { useState, useReducer } from 'react';
import axios from 'axios';

const initialState = {
  email: '',
  password: '',
  loginError: '',
  isLoading: ''
}

//loginReducer(s,a) takes in current state, and an action
function loginReducer (state, action) {
  switch (action.type) {
    case 'login': {
      return {
        ...state, // return copy of current state
        isLoading: true,
        loginError: ''
      };
    }
    case 'success': {
      return {
        ...state,
        isLoading: false
      };
    }
    case 'error': {
      return {
        ...state,
        error: 'Incorrect email or password'
      }
    }
    default:
      break;
  }
}

export default function Login(props) {
  //returns state and dispatch, takes in customreducer, and initState
  const [state, dispatch] = useReducer(loginReducer, initialState);
  const { email, password, isLoading, error, user } = state;

  const onSubmit = async e => {
    e.preventDefault();

    dispatch({type: 'login'});

    try {
      axios.post("http://localhost:3001/sessions",
        {
          user: {
            email: email,
            password: password
          }
        }
      )
      .then(response => {
        if(response.data.logged_in) {
          this.props.handleSuccessfulAuth(response.data);
        }
      })
      .then(
        dispatch({type: 'success'})
      );
    }
    catch(error) {
      dispatch({type: 'error'})
    }
  }

    return (<div>
      <form className='ui form' onSubmit= {this.handleSubmit}>
      <div className='field'>
        <label>
          Email:
          <input
            type='email'
            name='email'
            placeholder='Email'
            value={this.state.email}
            onChange={this.handleChange}
            required
          />
        </label>
      </div>
      <div className='field'>
        <label>
          Password:
          <input
            type='password'
            name='password'
            placeholder='Password'
            value={this.state.password}
            onChange={this.handleChange}
            required
          />
        </label>
      </div>
        <button className="ui button right floated" type='login'>Login</button>
      </form>
    </div>
  );
}
