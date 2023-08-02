import React, {Fragment} from "react";
import ReactDOM from "react-dom";

import styles from "./Modal.module.css";
// import Button from "../Button/Button";
import Card from "./Card";

const Backdrop = (props) => {
  return <div className={styles.backdrop} onClick={props.onClose}></div>; 
};

const ModalOverlay = (props) => {
  return <Card className={styles.modal}>
    {props.children}</Card>;
};

const portalElement = document.getElementById('overlays');

const Modal = (props) => (
  <Fragment>
    {ReactDOM.createPortal(
      <Backdrop onClose={props.onClose} />,
      portalElement
    )}
    {ReactDOM.createPortal(
      <ModalOverlay
        // title={props.title}
        // message={props.message}
        onConfirm={props.onConfirm}
      >
        {props.children}
      </ModalOverlay>,
      portalElement
    )}
  </  Fragment>
);

export default Modal;
