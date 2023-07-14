import React, { useEffect, useState, useContext } from 'react'
import { useParams, useHistory } from 'react-router-dom'

import Input from '../../shared/components/FormElements/Input'
import {
  VALIDATOR_REQUIRE,
  VALIDATOR_MINLENGTH,
} from '../../shared/util/validators'
import { AuthContext } from '../../context/auth-context'
import { useForm } from '../../shared/hooks/form-hook'
import { useHttpClient } from '../../shared/hooks/http-hook'
import ErrorModal from '../../shared/components/UIElements/ErrorModal'
import LoadingSpinner from '../../shared/components/UIElements/LoadingSpinner'
import Button from '../../shared/components/FormElements/Button'
import Card from '../../shared/components/UIElements/Card'
import './PlaceForm.css'

const UpdatePlace = () => {
  const auth = useContext(AuthContext)
  const placeId = useParams().placeId
  const { isLoading, error, clearError, sendRequest } = useHttpClient()
  const [loadedPlaces, setLodedPlaces] = useState()
  const history = useHistory()

  const [formState, inputHandler, setFormData] = useForm(
    {
      title: {
        value: '',
        isValid: false,
      },
      description: {
        value: '',
        isValid: false,
      },
      address: {
        value: '',
        isValid: false,
      },
    },
    false
  )

  useEffect(() => {
    const fetchPlace = async () => {
      try {
        const responseData = await sendRequest(
          `http://localhost:8000/api/places/${placeId}`
        )
        setLodedPlaces(responseData.place)
        setFormData(
          {
            title: {
              value: responseData.place.title,
              isValid: true,
            },
            description: {
              value: responseData.place.description,
              isValid: true,
            },
            address: {
              value: responseData.place.address,
              isValid: true,
            },
          },
          true
        )
      } catch (err) {}
    }
    fetchPlace()
  }, [sendRequest, placeId, setFormData])

  const placeUpdateSubmitHandler = async (event) => {
    event.preventDefault()

    try {
      await sendRequest(
        `http://localhost:8000/api/places/${placeId}`,
        'PATCH',
        JSON.stringify({
          title: formState.inputs.title.value,
          description: formState.inputs.description.value,
          address: formState.inputs.address.value,
        }),
        {
          'Content-Type': 'application/json',
          Authorization: 'Bearer ' + auth.token,
        }
      )
      history.push('/' + auth.userId + '/places')
    } catch (err) {}
  }

  if (isLoading) {
    return (
      <div className='center'>
        <LoadingSpinner />
      </div>
    )
  }

  if (!loadedPlaces && !error) {
    return (
      <div className='center'>
        <Card>
          <h2>Could not find place</h2>
        </Card>
      </div>
    )
  }

  return (
    <React.Fragment>
      <ErrorModal error={error} onClear={clearError} />
      {!isLoading && loadedPlaces && (
        <form className='place-form' onSubmit={placeUpdateSubmitHandler}>
          <Input
            id='title'
            element='input'
            type='text'
            label='Title'
            validators={[VALIDATOR_REQUIRE()]}
            errorText='Please enter a valid title'
            onInput={inputHandler}
            initialValue={loadedPlaces.title}
            initialValid={true}
          />
          <Input
            id='description'
            element='textarea'
            label='Description'
            validators={[VALIDATOR_MINLENGTH(5)]}
            errorText='Please enter a valid Description (at least 5 charaters)'
            onInput={inputHandler}
            initialValue={loadedPlaces.description}
            initialValid={true}
          />
          <Input
            id='address'
            element='input'
            type='text'
            label='Address'
            validators={[VALIDATOR_REQUIRE]}
            errorText='Please enter a valid address'
            onInput={inputHandler}
            initialValue={loadedPlaces.address}
            initialValid={true}
          />
          <Button type='submit' disabled={!formState.isValid}>
            UPDATE PLACE
          </Button>
        </form>
      )}
    </React.Fragment>
  )
}

export default UpdatePlace
