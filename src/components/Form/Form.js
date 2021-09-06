import { Modal, Button } from "react-bootstrap";
import React, { useState } from "react";
import './Form.css';
import {emailRegex, indianNumberRegex} from '../Regexp/Ragexp';

const Form = () => {
  const [show, setShow] = useState(false);
  const [inputError, setInputError] = useState({});
  const [regInfo, setRegInfo] = useState({});

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);


  const handleInputValidation = e => {
    const inputName = e.target.name;
    const inputValue = e.target.value;
    const info = {...regInfo};
    if(inputName === 'email'){
        if(!emailRegex.test(inputValue)){
            setInputError({name: inputName, errorMessage: 'Please enter a Valid e-mail !'})
            info[inputName] = null;
            setRegInfo(info)
        }else{
            setInputError(null);
            info[inputName] = inputValue;
            setRegInfo(info)
        };
    };
    if(inputName === 'number'){
        if(!indianNumberRegex.test(inputValue)){
            setInputError({name: inputName, errorMessage: 'Please enter a Valid number !'})
            info[inputName] = null;
            setRegInfo(info)
        }
        else{
            setInputError(null)
            info[inputName] = inputValue;
            setRegInfo(info)
        }
    };
};
  return (
    <div>
      <Button variant="info" className="font-weight-bold" onClick={handleShow}>
        We're Listening
      </Button>

     <div>
        <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Thank you so much for taking the time!</Modal.Title>
        </Modal.Header>
        <p className="ms-4">Please provide the below details!</p>
        <Modal.Body>
          <form>
            <h6>First Name:</h6>
            <input type="text" />
            <h6>Last Name:</h6>
            <input type="text" />
            <h6>Address:</h6>
            <textarea rows="5" cols="30"></textarea>
            <h6>Country</h6>
            <input type="text" />
            <h6>Email ID:</h6>
            <input
              type="email"
              name="email"
              onChange={handleInputValidation}
              id="email"
              placeholder="Name@example.com"
            />
            {inputError?.name === "email" && (
              <p className="text-danger text-center">
                {inputError?.errorMessage}
              </p>
            )}
            <h6>Phone Number:</h6>
            <input
              type="number"
              onChange={handleInputValidation}
              name="number"
              id="mobile"
              placeholder="10 Digit Mobile Number"
            />
            {inputError?.name === "number" && (
              <p className="text-danger text-center">
                {inputError?.errorMessage}
              </p>
            )}
            <br />
            <br />
            <Button variant="primary">Submit Feedback</Button>
          </form>
        </Modal.Body>
      </Modal>
     </div>

    </div>
  );
};

export default Form;
