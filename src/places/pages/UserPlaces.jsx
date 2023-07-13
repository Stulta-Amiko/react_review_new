import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'

import { useHttpClient } from '../../shared/hooks/http-hook'
import ErrorModal from '../../shared/components/UIElements/ErrorModal'
import LoadingSpinner from '../../shared/components/UIElements/LoadingSpinner'
import PlacesList from '../components/PlacesList'

const UserPlaces = (props) => {
  const [loadedPlaces, setLodedPlaces] = useState()
  const { isLoding, error, sendRequest, clearError } = useHttpClient()
  const userId = useParams().userId

  useEffect(() => {
    const fetchPlaces = async () => {
      try {
        const responseData = await sendRequest(
          `http://localhost:8000/api/places/user/${userId}`
        )
        setLodedPlaces(responseData.places)
      } catch (err) {}
    }
    fetchPlaces()
  }, [sendRequest, userId])

  const placeDeletedHandler = (deletedPlaceId) => {
    setLodedPlaces((prevPlaces) =>
      prevPlaces.filter((place) => place.id !== deletedPlaceId)
    )
  }

  return (
    <React.Fragment>
      <ErrorModal error={error} onClear={clearError} />
      {isLoding && (
        <div className='center'>
          <LoadingSpinner />
        </div>
      )}
      {!isLoding && loadedPlaces && (
        <PlacesList items={loadedPlaces} onDeletePlace={placeDeletedHandler} />
      )}
    </React.Fragment>
  )
}

export default UserPlaces
