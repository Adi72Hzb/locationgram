import React from "react";

import Input from "../../shared/components/FormElements/Input";
import Button from "../../shared/components/FormElements/Button";
import { 
    VALIDATOR_MINLENGTH, 
    VALIDATOR_REQUIRE 
} from "../../shared/util/validators";
import { useForm } from "../../shared/hooks/form-hook";
import './PlaceForm.css';

const NewPlace = () =>{
    const [formState , inputHandler ] = useForm(
        {
        title: {
            value: '',
            isValid: false
        },
        description: {
            value: '',
            isValid: false
        },
        address: {
            value: '',
            isValid: false
        }
    },
    false
    );

    const placeSubmitHandler = event => {
        event.preventDefault();
        console.log(formState.inputs);//SEND THIS TO THE BACKEND.
    };
    
    return (
        <form className="place-form" onSubmit={placeSubmitHandler}>
            <Input 
            id="title"
            element="input" 
            type="text" 
            label="Title" 
            validators={[VALIDATOR_REQUIRE()]}  
            errorText="Please Enter a Valid Title."
            onInput={inputHandler}
            />
            <Input 
            id="description"
            element="textarea"  
            label="Description" 
            validators={[VALIDATOR_MINLENGTH(5)]}  
            errorText="Please Enter a Valid Description(Atleast 5 Characters)."
            onInput={inputHandler} 
            />
            <Input 
            id="address"
            element="input"  
            label="Address" 
            validators={[VALIDATOR_REQUIRE()]}  
            errorText="Please Enter a address."
            onInput={inputHandler} 
            />
        <Button type="submit" disabled={!formState.isValid}>
            ADD PLACE 
        </Button>
        </form>
    );
}

export default NewPlace;