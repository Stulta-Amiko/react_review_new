import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'

import Input from '../../shared/components/FormElements/Input'
import {
  VALIDATOR_REQUIRE,
  VALIDATOR_MINLENGTH,
} from '../../shared/util/validators'
import { useForm } from '../../shared/hooks/form-hook'
import Button from '../../shared/components/FormElements/Button'
import './PlaceForm.css'

const DUMMY_PLACES = [
  {
    id: 'p1',
    title: 'Empire State Building',
    description: 'One of the most famous sky scrapers in the world',
    imageUrl:
      'https://www.kkday.com/ko/blog/wp-content/uploads/%EB%89%B4%EC%9A%95-3%EB%8C%80-%EC%A0%84%EB%A7%9D%EB%8C%80-%EC%97%A0%ED%8C%8C%EC%9D%B4%EC%96%B4-%EC%8A%A4%ED%85%8C%EC%9D%B4%ED%8A%B8-%EB%B9%8C%EB%94%A9-%EC%99%B8%EA%B4%80.jpg',
    address: '20 W 34th St., New York, NY 10001, United States',
    location: {
      lat: 40.7484405,
      lng: -73.9878531,
    },
    creator: 'u1',
  },
  {
    id: 'p2',
    title: 'Empire State Building',
    description: 'One of the most famous sky scrapers in the world',
    imageUrl:
      'https://i.namu.wiki/i/-VFr5YMPL3SvWiVggrL7_r8suboiaw8DZ49R7PvsVG1IysNFtYExYnBT2ZKVi4EWGUEj8lkf_LXSdbulSCTfT3fdIewfNYPVrFer3moyK0I8gj6lQTL1qvAts7paQEJHXZ_vbHWnJwcBXb5rsFdbeA.webp',
    address: '20 W 34th St., New York, NY 10001, United States',
    location: {
      lat: 40.7484405,
      lng: -73.9878531,
    },
    creator: 'u2',
  },
]

const UpdatePlace = () => {
  const placeId = useParams().placeId
  const [isLoading, setIsLoading] = useState(true)

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

  const identifiedPlace = DUMMY_PLACES.find((p) => p.id === placeId)

  useEffect(() => {
    if (identifiedPlace) {
      setFormData(
        {
          title: {
            value: identifiedPlace.title,
            isValid: true,
          },
          description: {
            value: identifiedPlace.description,
            isValid: true,
          },
          address: {
            value: identifiedPlace.address,
            isValid: true,
          },
        },
        true
      )
    }

    setIsLoading(false)
  }, [setFormData, identifiedPlace])

  const placeUpdateSubmitHandler = (event) => {
    event.preventDefault()
    console.log(formState.inputs)
  }

  if (!identifiedPlace) {
    return (
      <div className='center'>
        <h2>Could not find place</h2>
      </div>
    )
  }

  if (isLoading) {
    return (
      <div className='center'>
        <h2>Loading...</h2>
      </div>
    )
  }

  return (
    <form className='place-form' onSubmit={placeUpdateSubmitHandler}>
      <Input
        id='title'
        element='input'
        type='text'
        label='Title'
        validators={[VALIDATOR_REQUIRE()]}
        errorText='Please enter a valid title'
        onInput={inputHandler}
        initialValue={formState.inputs.title.value}
        initialValid={formState.inputs.title.isValid}
      />
      <Input
        id='description'
        element='textarea'
        label='Description'
        validators={[VALIDATOR_MINLENGTH(5)]}
        errorText='Please enter a valid Description (at least 5 charaters)'
        onInput={inputHandler}
        initialValue={formState.inputs.description.value}
        initialValid={formState.inputs.description.isValid}
      />
      <Input
        id='address'
        element='input'
        type='text'
        label='Address'
        validators={[VALIDATOR_REQUIRE]}
        errorText='Please enter a valid address'
        onInput={inputHandler}
        initialValue={formState.inputs.address.value}
        initialValid={formState.inputs.address.isValid}
      />
      <Button type='submit' disabled={!formState.isValid}>
        UPDATE PLACE
      </Button>
    </form>
  )
}

export default UpdatePlace
