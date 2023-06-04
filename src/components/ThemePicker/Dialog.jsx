
import React, { useState, useEffect } from 'react';
import styled, { keyframes } from "styled-components";


const Modal = styled.dialog`
    position: fixed; /* Stay in place */
    z-index: 1; /* Sit on top */
    padding-top: 100px; /* Location of the box */
    left: 0;
    top: 0;
    width: 100%; /* Full width */
    height: 100%; /* Full height */
    overflow: auto; /* Enable scroll if needed */
    
    backdrop-filter: blur(100px);
    position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.5); /* Adjust the opacity as needed */
  backdrop-filter: blur(5px); /* Add the blur effect */
  z-index: 999; /* Ensure the overlay is on top of other elements */
 
    
`;

const animatetop = keyframes`
    from {
        top:-300px; 
        opacity:0
    } 
    to {
        top:0; 
        opacity:1
    }
`;

const ModalContent = styled.div`
 position: relative;
  background-color: #fefefe;
  margin: auto;
  padding: 0;
  border: 1px solid #888;
  border-radius: 18px;
  width: 60%;
  box-shadow: 0 4px 8px 0 rgba(0,0,0,0.2),0 6px 20px 0 rgba(0,0,0,0.19);
  animation-name: ${animatetop};
  animation-duration: 0.4s;
`;

const ModalHeader = styled.div`
    padding: 2px 16px;
    border-radius: 8px 8px 0 0;
    background-color: ${({ theme }) => theme.colors.body};
    color: ${({ theme }) => theme.colors.text};
`;

const Close = styled.span`
    color: ${({ theme }) => theme.colors.text};
    float: right;
    font-size: 28px;
    font-weight: bold;
    cursor: pointer;
`;

const ModalBody = styled.div`
    padding: 2px 16px;
`;

const Dialog = props => {
    const [show, setShow] = useState(false);

    useEffect(() => {
        setShow(props.open);
    }, [props.open]);

    const closeDialog = () => {
        setShow(false);
        props.callback()
    }

    return(
        <Modal open={show}>
            <ModalContent>
                <ModalHeader>
                    <Close onClick={ closeDialog }>&times;</Close>
                    <h2>{ props.header }</h2>
                </ModalHeader>
                <ModalBody>
                    { props.body }
                </ModalBody>
            </ModalContent>
        </Modal>
    )
}

export default Dialog;