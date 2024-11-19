// import React from "react";
// import ReactDOM from "react-dom";
// import { CSSTransition } from "react-transition-group";
// import Backdrop from "./Backdrop";
// import "./Modal.css";
// const ModalOverlay = (props) => {
//   const content = (
//     <div className={`modal ${props.className}`} style={props.style}>
//       <header className={`modal__header ${props.headerClass}`}>
//         <h2>{props.header}</h2>
//       </header>
//       <form
//         onSubmit={
//           props.onSubmit ? props.onSubmit : (event) => event.preventDefault()
//         }
//       >
//         <div className={`modal__content ${props.contentClass}`}>
//           {props.children}
//         </div>
//         <footer className={`modal__footer ${props.footerClass}`}>
//           {props.footer}
//         </footer>
//       </form>
//     </div>
//   );
//   return ReactDOM.createPortal(content, document.getElementById("modal-hook"));
// };
// const Modal = (props) => {
//   return (
//     <React.Fragment>
//       {props.show && <Backdrop onClick={props.onCancel} />}
//       <CSSTransition
//         in={props.show}
//         mountOnEnter
//         unmountOnExit
//         timeout={200}
//         classNames="modal"
//       >
//         <ModalOverlay {...props} />
//       </CSSTransition>
//     </React.Fragment>
//   );
// };
// export default Modal;
// import React, { useEffect, useRef } from "react";
// import ReactDOM from "react-dom";
// import { CSSTransition } from "react-transition-group";
// import Backdrop from "./Backdrop";
// import "./Modal.css";

// const ModalOverlay = (props) => {
//   const modalContentRef = useRef();

//   // Focus management: when modal opens, focus on the modal content
//   useEffect(() => {
//     if (props.show) {
//       modalContentRef.current.focus();
//     }
//   }, [props.show]);

//   const content = (
//     <div
//       className={`modal ${props.className}`}
//       style={props.style}
//       ref={modalContentRef}
//       tabIndex="-1" // To make it focusable
//       aria-modal="true"
//       aria-labelledby="modal-header"
//     >
//       <header className={`modal__header ${props.headerClass}`}>
//         <h2 id="modal-header">{props.header}</h2>
//       </header>
//       <form
//         onSubmit={
//           props.onSubmit ? props.onSubmit : (event) => event.preventDefault()
//         }
//       >
//         <div className={`modal__content ${props.contentClass}`}>
//           {props.children}
//         </div>
//         <footer className={`modal__footer ${props.footerClass}`}>
//           {props.footer}
//         </footer>
//       </form>
//     </div>
//   );

//   return ReactDOM.createPortal(content, document.getElementById("modal-hook"));
// };

// const Modal = (props) => {
//   return (
//     <React.Fragment>
//       {props.show && <Backdrop onClick={props.onCancel} />}
//       <CSSTransition
//         in={props.show}
//         mountOnEnter
//         unmountOnExit
//         timeout={200}
//         classNames="modal"
//       >
//         <ModalOverlay {...props} />
//       </CSSTransition>
//     </React.Fragment>
//   );
// };

// export default Modal;

import React, { useEffect, useRef } from "react";
import ReactDOM from "react-dom";
import { CSSTransition } from "react-transition-group";
import Backdrop from "./Backdrop";
import "./Modal.css";

const ModalOverlay = (props) => {
  const modalContentRef = useRef();

  // Focus management: when modal opens, focus on the modal content
  useEffect(() => {
    if (props.show) {
      modalContentRef.current.focus();
      // Trigger the resetForm function when modal opens
      if (props.resetForm) {
        props.resetForm();
      }
    }
  }, [props.show, props.resetForm]); // Only run this effect when modal visibility changes

  const content = (
    <div
      className={`modal ${props.className}`}
      style={props.style}
      ref={modalContentRef}
      tabIndex="-1" // To make it focusable
      aria-modal="true"
      aria-labelledby="modal-header"
    >
      <header className={`modal__header ${props.headerClass}`}>
        <h2 id="modal-header">{props.header}</h2>
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
  );

  return ReactDOM.createPortal(content, document.getElementById("modal-hook"));
};

const Modal = (props) => {
  return (
    <React.Fragment>
      {props.show && <Backdrop onClick={props.onCancel} />}
      <CSSTransition
        in={props.show}
        mountOnEnter
        unmountOnExit
        timeout={200}
        classNames="modal"
      >
        <ModalOverlay {...props} />
      </CSSTransition>
    </React.Fragment>
  );
};

export default Modal;
