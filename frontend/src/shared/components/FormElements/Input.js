// import React, { useReducer, useEffect } from "react";

// import { validate } from "../../util/validator";
// import "./Input.css";

// const inputReducer = (state, action) => {
//   switch (action.type) {
//     case "CHANGE":
//       return {
//         ...state,
//         value: action.val,
//         isValid: validate(action.val, action.validators),
//       };
//     case "TOUCH":
//       return {
//         ...state,
//         isTouched: true,
//       };
//     default:
//       return state;
//   }
// };

// const Input = (props) => {
//   const [inputState, dispatch] = useReducer(inputReducer, {
//     value: props.value || "",
//     isTouched: false,
//     isValid: props.isValid || false,
//   });

//   const { id, onInput } = props;
//   const { value, isValid } = inputState;

//   useEffect(() => {
//     onInput(id, value, isValid);
//   }, [id, value, isValid, onInput]);

//   const changeHandler = (event) => {
//     dispatch({
//       type: "CHANGE",
//       val: event.target.value,
//       validators: props.validators,
//     });
//   };

//   const touchHandler = () => {
//     dispatch({
//       type: "TOUCH",
//     });
//   };

//   const element =
//     props.element === "input" ? (
//       <input
//         id={props.id}
//         type={props.type}
//         placeholder={props.placeholder}
//         onChange={changeHandler}
//         onBlur={touchHandler}
//         value={inputState.value}
//       />
//     ) : (
//       <textarea
//         id={props.id}
//         rows={props.rows || 3}
//         onChange={changeHandler}
//         onBlur={touchHandler}
//         value={inputState.value}
//       />
//     );

//   return (
//     <div
//       className={`form-control ${
//         !inputState.isValid && inputState.isTouched && "form-control--invalid"
//       }`}
//     >
//       <label htmlFor={props.id}>{props.label}</label>
//       {element}
//       {!inputState.isValid && inputState.isTouched && <p>{props.errorText}</p>}
//     </div>
//   );
// };

// export default Input;

// import React, { useReducer, useEffect } from "react";
// import { Input as AntdInput } from "antd"; // Import Antd Input
// import { validate } from "../../util/validator";
// import "./Input.css";

// const inputReducer = (state, action) => {
//   switch (action.type) {
//     case "CHANGE":
//       return {
//         ...state,
//         value: action.val,
//         isValid: validate(action.val, action.validators),
//       };
//     case "TOUCH":
//       return {
//         ...state,
//         isTouched: true,
//       };
//     default:
//       return state;
//   }
// };

// const Input = (props) => {
//   const [inputState, dispatch] = useReducer(inputReducer, {
//     value: props.value || "",
//     isTouched: false,
//     isValid: props.isValid || false,
//   });

//   const { id, onInput, onChange } = props;
//   const { value, isValid } = inputState;

//   useEffect(() => {
//     if (typeof onInput === "function") {
//       onInput(id, value, isValid);
//     }
//   }, [id, value, isValid, onInput]);

//   const changeHandler = (event) => {
//     dispatch({
//       type: "CHANGE",
//       val: event.target.value,
//       validators: props.validators,
//     });

//     if (onChange) onChange(event);
//   };

//   const touchHandler = () => {
//     dispatch({ type: "TOUCH" });
//   };

//   const element =
//     props.element === "textarea" ? (
//       <AntdInput.TextArea
//         id={props.id}
//         rows={props.rows || 3}
//         onChange={changeHandler}
//         onBlur={touchHandler}
//         value={inputState.value}
//         placeholder={props.placeholder}
//       />
//     ) : (
//       <AntdInput
//         id={props.id}
//         type={props.type}
//         onChange={changeHandler}
//         onBlur={touchHandler}
//         value={inputState.value}
//         placeholder={props.placeholder}
//       />
//     );

//   return (
//     <div className="custom-input-container">
//       <label htmlFor={props.id}>{props.label}</label>
//       {element}
//       {!inputState.isValid && inputState.isTouched && (
//         <p className="error-text">{props.errorText}</p>
//       )}
//     </div>
//   );
// };

// export default Input;

// import React, { useReducer, useEffect } from "react";
// import { Input as AntdInput, Form } from "antd"; // Import Antd Input and Form
// import { validate } from "../../util/validator";
// import "./Input.css";

// const inputReducer = (state, action) => {
//   switch (action.type) {
//     case "CHANGE":
//       return {
//         ...state,
//         value: action.val,
//         isValid: validate(action.val, action.validators),
//       };
//     case "TOUCH":
//       return {
//         ...state,
//         isTouched: true,
//       };
//     default:
//       return state;
//   }
// };

// const Input = (props) => {
//   const [inputState, dispatch] = useReducer(inputReducer, {
//     value: props.value || "",
//     isTouched: false,
//     isValid: props.isValid || false,
//   });

//   const { id, onInput, onChange, label, placeholder, errorText, validators } =
//     props;
//   const { value, isValid } = inputState;

//   useEffect(() => {
//     if (typeof onInput === "function") {
//       onInput(id, value, isValid);
//     }
//   }, [id, value, isValid, onInput]);

//   const changeHandler = (event) => {
//     dispatch({
//       type: "CHANGE",
//       val: event.target.value,
//       validators: validators,
//     });

//     if (onChange) onChange(event);
//   };

//   const touchHandler = () => {
//     dispatch({ type: "TOUCH" });
//   };

//   const element =
//     props.element === "textarea" ? (
//       <AntdInput.TextArea
//         id={props.id}
//         rows={props.rows || 3}
//         onChange={changeHandler}
//         onBlur={touchHandler}
//         value={inputState.value}
//         placeholder={props.placeholder}
//       />
//     ) : (
//       <AntdInput
//         id={props.id}
//         type={props.type}
//         onChange={changeHandler}
//         onBlur={touchHandler}
//         value={inputState.value}
//         placeholder={props.placeholder}
//       />
//     );

//   return (
//     <Form.Item
//       label={label}
//       htmlFor={props.id}
//       validateStatus={
//         inputState.isTouched && !inputState.isValid ? "error" : ""
//       }
//       help={inputState.isTouched && !inputState.isValid ? errorText : ""}
//     >
//       {element}
//     </Form.Item>
//   );
// };

// export default Input;

// import React, { useReducer, useEffect } from "react";
// import { Input as AntdInput, Form } from "antd"; // Import Antd Input and Form
// import { validate } from "../../util/validator"; // Assuming your custom validate function
// import "./Input.css";

// const inputReducer = (state, action) => {
//   switch (action.type) {
//     case "CHANGE":
//       return {
//         ...state,
//         value: action.val,
//         isValid: validate(action.val, action.validators),
//       };
//     case "TOUCH":
//       return {
//         ...state,
//         isTouched: true,
//       };
//     case "RESET":
//       return {
//         value: "",
//         isTouched: false,
//         isValid: false,
//       };
//     default:
//       return state;
//   }
// };

// const Input = (props) => {
//   const [inputState, dispatch] = useReducer(inputReducer, {
//     value: props.value || "",
//     isTouched: false,
//     isValid: props.isValid || false,
//   });

//   const {
//     id,
//     onInput,
//     onChange,
//     label,
//     placeholder,
//     errorText,
//     validators,
//     resetOnModalOpen,
//   } = props;
//   const { value, isValid } = inputState;

//   // Reset the field when the modal is opened (when resetOnModalOpen changes)
//   useEffect(() => {
//     if (resetOnModalOpen) {
//       dispatch({ type: "RESET" });
//     }
//   }, [resetOnModalOpen]); // dependency on the modal open state or prop

//   useEffect(() => {
//     if (typeof onInput === "function") {
//       onInput(id, value, isValid);
//     }
//   }, [id, value, isValid, onInput]);

//   const changeHandler = (event) => {
//     dispatch({
//       type: "CHANGE",
//       val: event.target.value,
//       validators: validators,
//     });

//     if (onChange) onChange(event);
//   };

//   const touchHandler = () => {
//     dispatch({ type: "TOUCH" });
//   };

//   const element =
//     props.element === "textarea" ? (
//       <AntdInput.TextArea
//         id={props.id}
//         rows={props.rows || 3}
//         onChange={changeHandler}
//         onBlur={touchHandler}
//         value={inputState.value}
//         placeholder={props.placeholder}
//       />
//     ) : (
//       <AntdInput
//         id={props.id}
//         type={props.type}
//         onChange={changeHandler}
//         onBlur={touchHandler}
//         value={inputState.value}
//         placeholder={props.placeholder}
//       />
//     );

//   return (
//     <Form.Item
//       label={label}
//       htmlFor={props.id}
//       validateStatus={
//         inputState.isTouched && !inputState.isValid ? "error" : ""
//       }
//       help={inputState.isTouched && !inputState.isValid ? errorText : ""}
//     >
//       {element}
//     </Form.Item>
//   );
// };

// export default Input;
import React from "react";
import { Input as AntdInput, Form } from "antd"; // Import Antd Input and Form
import { useInput } from "../../../hooks/useInput"; // Import custom hook
import "./Input.css";

const Input = ({
  id,
  label,
  placeholder,
  errorText,
  validators,
  resetOnModalOpen,
  element,
  rows,
}) => {
  const { value, isValid, isTouched, changeHandler, touchHandler } = useInput(
    "",
    validators,
    resetOnModalOpen
  );

  return (
    <Form.Item
      label={label}
      htmlFor={id}
      validateStatus={isTouched && !isValid ? "error" : ""}
      help={isTouched && !isValid ? errorText : ""}
    >
      {element === "textarea" ? (
        <AntdInput.TextArea
          id={id}
          rows={rows || 3}
          onChange={changeHandler}
          onBlur={touchHandler}
          value={value}
          placeholder={placeholder}
        />
      ) : (
        <AntdInput
          id={id}
          type="text"
          onChange={changeHandler}
          onBlur={touchHandler}
          value={value}
          placeholder={placeholder}
        />
      )}
    </Form.Item>
  );
};

export default Input;
