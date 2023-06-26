import React from 'react'
import ReactDOM from 'react-dom'
import { CSSTransition } from 'react-transition-group'

import Backdrop from './Backdrop'
import './Modal.css'

const ModalOverlay = (props) => {
  const content = (
    <div className={`modal ${props.className}`} style={props.style}>
      <header className={`modal__header ${props.headerClass}`}>
        <h2>{props.header}</h2>
      </header>
      <form
        onSubmit={
          props.onSubmit ? props.onSubmit : (event) => event.preventDefault()
        }
      >
        <div className={`modal__content ${props.contentClass}`}>
          {props.children}
        </div>
        <footer className={`modal__footer ${props.footerClass}`}>
          {props.footer}
        </footer>
      </form>
    </div>
  )
  return ReactDOM.createPortal(content, document.getElementById('modal-hook')) // createPortal의 장점 컴포넌트를 호출할때 그곳에 생성되는것이 아닌 index에 설정된 곳에 따로 생성할 수 있는 장점 존재
}

const Modal = (props) => {
  return (
    <React.Fragment>
      {props.show && <Backdrop onClick={props.onCancel} />}
      <CSSTransition
        in={props.show}
        mountOnEnter
        unmountOnExit
        timeout={200}
        classNames='modal'
      >
        <ModalOverlay {...props} />
      </CSSTransition>
    </React.Fragment>
  )
}

export default Modal
