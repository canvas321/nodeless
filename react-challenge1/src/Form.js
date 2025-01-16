import React from 'react';
import Button from './Button';
import './index.css';

const Form = ({reqType, setReqType}) => {
  return (
    <form >
        <Button 
        buttonText = "users"
        reqType={reqType}
        setReqType={setReqType}
        />
        <Button 
        buttonText = "posts"
        reqType={reqType}
        setReqType={setReqType}
        />
        <Button 
        buttonText = "comments"
        reqType={reqType}
        setReqType={setReqType}
        />
    </form>
  )
}

export default Form