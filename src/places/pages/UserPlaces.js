import React from "react";
import { useParams } from "react-router-dom";

import PlaceList from "../components/PlaceList";

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
]
const UserPlaces = () =>{
    const userId = useParams().userId;
    const loadedPlace = DUMMY_PLACES.filter(place => place.creator === userId);
    return <PlaceList items={loadedPlace}/>
};

export default UserPlaces;