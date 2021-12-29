import React from "react";
import UsersList from "../components/UsersList";

const Users = () =>{
    const USERS = [
        {
            id: 'u1',
            name: 'Aditya Malik',
            image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSDmNZJSzdqEIMq4mFCF6WqqVm3fhvrROHdV2RCPtWVW1y6589u2UdvnlJIxjA29ge8UgA&usqp=CAU',
            places: 7
        }
    ];

    return <UsersList items={USERS}></UsersList>
}

export default Users; 