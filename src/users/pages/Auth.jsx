import React, { useState, useContext } from 'react'

import Card from '../../shared/components/UIElements/Card'
import Input from '../../shared/components/FormElements/Input'
import {
  VALIDATOR_EMAIL,
  VALIDATOR_MINLENGTH,
  VALIDATOR_REQUIRE,
} from '../../shared/util/validators'
import { useForm } from '../../shared/hooks/form-hook'
import Button from '../../shared/components/FormElements/Button'
import AuthContext from '../../context/auth-context'
import './Auth.css'

const Auth = () => {
  const auth = useContext(AuthContext)
  const [isLoginMode, setIsLoginMode] = useState(true)
  const [formState, inputHandler, setFormData] = useForm(
    {
      email: {
        value: '',
        isValid: false,
      },
      password: {
        value: '',
        isValid: false,
      },
    },
    false
  )

  const switchModeHandler = () => {
    if (!isLoginMode) {
      setFormData(
        {
          ...formState.inputs,
          name: undefined,
        },
        formState.inputs.email.isValid && formState.inputs.password.isValid
      )
    } else {
      setFormData(
        {
          ...formState.inputs,
          name: {
            value: '',
            isValid: false,
          },
        },
        false
      )
    }
    setIsLoginMode((prevMode) => !prevMode)
  }

  const loginSubmitHandler = (event) => {
    event.preventDefault()
    console.log(formState.inputs)
    auth.login()
  }
  return (
    <Card className='authentication'>
      <h2>Login required</h2>
      <hr />
      <form onSubmit={loginSubmitHandler}>
        {!isLoginMode && (
          <Input
            element='input'
            id='name'
            type='text'
            label='Name'
            validators={[VALIDATOR_REQUIRE()]}
            errorText='Please enter valid Name'
            onInput={inputHandler}
          />
        )}
        <Input
          element='input'
          id='email'
          type='email'
          label='E-mail'
          validators={[VALIDATOR_EMAIL()]}
          errorText='Please enter valid E-mail address'
          onInput={inputHandler}
        />
        <Input
          element='input'
          id='password'
          type='password'
          label='Password'
          validators={[VALIDATOR_MINLENGTH(5)]}
          errorText='Please enter valid password at least 5 characters'
          onInput={inputHandler}
        />
        <Button type='submit' disabled={!formState.isValid}>
          {isLoginMode ? 'LOGIN' : 'SIGN UP'}
        </Button>
        <Button inverse onClick={switchModeHandler}>
          {isLoginMode ? 'SIGN UP' : 'LOGIN'}
        </Button>
      </form>
    </Card>
  )
}

export default Auth
