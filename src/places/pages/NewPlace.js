import React , { useContext } from "react";
import { useNavigate } from 'react-router-dom';

import Input from "../../shared/components/FormElements/Input";
import Button from "../../shared/components/FormElements/Button";
import ErrorModal from "../../shared/components/UIElements/ErrorModal";
import LoadingSpinner from "../../shared/components/UIElements/LoadingSpinner";
import ImageUpload  from "../../shared/components/FormElements/ImageUpload";
import { 
    VALIDATOR_MINLENGTH, 
    VALIDATOR_REQUIRE 
} from "../../shared/util/validators";
import { useForm } from "../../shared/hooks/form-hook";
import { useHttpClient } from "../../shared/hooks/http-hook";
import { AuthContext } from "../../shared/context/auth-context";
import './PlaceForm.css';

const NewPlace = () =>{
    const auth = useContext(AuthContext);
    const {isLoading , error , sendRequest , clearError } = useHttpClient();
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
        },
        image: {
            value: null,
            isValid: false
        }
    },
    false
    );

    const navigate = useNavigate();

    const placeSubmitHandler = async event => {
        event.preventDefault();
        try{
            const formData = new FormData();
            formData.append('title', formState.inputs.title.value);
            formData.append('description', formState.inputs.description.value);
            formData.append('address', formState.inputs.address.value);
            formData.append('creator', auth.userId);
            formData.append('image', formState.inputs.image.value);

            await sendRequest('http://localhost:5000/api/places' , 'POST' , formData , {
                Authorization : 'Bearer ' + auth.token
            });

            //Redirect The User To a different Page.
            navigate('/');
        }catch (err){}
        
    };
    
    return (
        <>
            <ErrorModal error={error} onClear={clearError} />

            <form className="place-form" onSubmit={placeSubmitHandler}>
                {isLoading && <LoadingSpinner asOverlay />}
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
                <ImageUpload id="image" onInput={inputHandler} errorText="Please Insert An Image"/>

                <Button type="submit" disabled={!formState.isValid}>
                    ADD PLACE 
                </Button>
            </form>
        </>    
    );
}

export default NewPlace;