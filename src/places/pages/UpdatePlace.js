import React ,{ useEffect ,useState} from "react";
import { useParams } from "react-router-dom";

import Input from "../../shared/components/FormElements/Input";  
import Button from "../../shared/components/FormElements/Button";
import Card from "../../shared/components/UIElements/Card";
import { VALIDATOR_MINLENGTH, VALIDATOR_REQUIRE } from "../../shared/util/validators";
import { useForm } from "../../shared/hooks/form-hook";
import './PlaceForm.css';

const DUMMY_PLACES = [
    {
        id: 'p1',
        title: 'Nit Rourkela',
        description: 'My college',
        imageUrl: 'https://www.thestatesman.com/wp-content/uploads/2019/06/nit.jpg',
        address: 'Bisra Rd, National Institute of Technology, Jindal Colony, Udit Nagar, Rourkela, Odisha 769001',
        location: {
            lat:22.2546516,
            lng:84.8983824
        },
        creator: 'u1'
    }
];

const UpdatePlace = () => {

    const [isLoading , setIsLoading] = useState(true);

    const placeId = useParams().placeId;

    const [formState,inputHandler,setFormData] = useForm({
        title: {
            value: '',
            isValid: false
        },
        description: {
            value: '',
            isValid: false
        }
    } , false);

    const identifiedPlace = DUMMY_PLACES.find(place => place.id === placeId); 

    useEffect(()=>{
        if(identifiedPlace){
            setFormData({
                title: {
                    value: identifiedPlace.title,
                    isValid: true
                },
                description: {
                    value: identifiedPlace.description,
                    isValid: true
                }
            },true);  
        }
        setIsLoading(false);
    },[setFormData , identifiedPlace]);

    
    const placeUpdateSubmitHandler = event => {
        event.preventDefault();
        console.log(formState.inputs);
    };

    if(!identifiedPlace){
        return (
           
            <div className="center">
                <Card>
                    <h2>Could Not FIND place!</h2>
                </Card> 
            </div>  
             
        )
    }

    if(isLoading){
        return (
            <div className="center">
                <h2>Loading.....</h2>
            </div>   
        )
    }
    return (
        <form className="place-form" onSubmit={placeUpdateSubmitHandler}>
            <Input id="title" 
            element="input" 
            type="text" 
            label="Title" 
            validators={[VALIDATOR_REQUIRE()]}
            errorText="Please Enter a valid title."
            onInput={inputHandler}
            initialValue={formState.inputs.title.value}
            initialValid={formState.inputs.title.isValid}
            />
            <Input id="description" 
            element="textarea" 
            label="Description" 
            validators={[VALIDATOR_MINLENGTH(5)]}
            errorText="Please Enter a valid Description(Minimum 5 Characters)."
            onInput={inputHandler}
            initialValue={formState.inputs.description.value}
            initialValid={formState.inputs.description.isValid}
            />
            <Button type="submit" disabled={!formState.isValid}>
                UPDATE PLACE
            </Button>
        </form>
    );
};

export default UpdatePlace;
