import React, { useState, useContext } from 'react'

import Card from '../../shared/components/UIElements/Card'
import Button from '../../shared/components/FormElements/Button'
import Modal from '../../shared/components/UIElements/Modal'
import Map from '../../shared/components/UIElements/Map'
import AuthContext from '../../context/auth-context'
import './PlaceItem.css'

const PlaceItem = (props) => {
  const auth = useContext(AuthContext)
  const [showMap, setShowMap] = useState(false)
  const [showConfirmModal, setShowComfirmModal] = useState(false)

  const openMapHandler = () => setShowMap(true)
  const closeMapHandler = () => setShowMap(false)

  const showDeleteWarningHandler = () => {
    setShowComfirmModal(true)
  }
  const cancelDeleteHandler = () => {
    setShowComfirmModal(false)
  }

  const confirmDeleteHandler = () => {
    setShowComfirmModal(false)
    console.log('DELETE...')
  }

  return (
    <React.Fragment>
      <Modal
        show={showMap}
        onCancel={closeMapHandler}
        header={props.address}
        contentClass='place-item__modal-content'
        footerClass='place-item__modal-actions'
        footer={<Button onClick={closeMapHandler}>CLOSE</Button>}
      >
        <div className='map-container'>
          <Map center={props.coordinates} zoom={16} />
        </div>
      </Modal>
      <Modal
        show={showConfirmModal}
        onCancel={cancelDeleteHandler}
        header='are you sure?'
        footerClass='place-item__modal-actions'
        footer={
          <React.Fragment>
            <Button inverse onClick={confirmDeleteHandler}>
              PROCEED
            </Button>
            <Button danger onClick={cancelDeleteHandler}>
              CANCEL
            </Button>
          </React.Fragment>
        }
      >
        <p>
          Do you want proceed and delete this place? Please note that it can't
          be undone thereafter
        </p>
      </Modal>
      <li className='place-item'>
        <Card className='place-item__content'>
          <div className='place-item__image'>
            <img src={props.image} />
          </div>
          <div className='place-item__info'>
            <h2>{props.title}</h2>
            <h3>{props.address}</h3>
            <p>{props.description}</p>
          </div>
          <div className='place-item__actions'>
            <Button inverse onClick={openMapHandler}>
              VIEW ON MAP
            </Button>
            {auth.isLoggedin && (
              <Button to={`/places/${props.id}`}>EDIT</Button>
            )}
            {auth.isLoggedin && (
              <Button danger onClick={showDeleteWarningHandler}>
                DELETE
              </Button>
            )}
          </div>
        </Card>
      </li>
    </React.Fragment>
  )
}

export default PlaceItem
