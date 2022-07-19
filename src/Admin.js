import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import axios from 'axios';

const Root = styled.div`
    background: white;
    table {
        font-family: arial, sans-serif;
        border-collapse: collapse;
        width: 100%;
    }
    td,
    th {
        border: 1px solid #dddddd;
        text-align: left;
        padding: 8px;
    }
    tr:nth-child(even) {
        background-color: #dddddd;
    }
    button{
        cursor: pointer;
    }
`;

const Header = styled.div`
    display: flex;
    height: 100px;
    padding: 0 20px;
    align-items: center;
    background: lightpink;
    h1 {
        color: white;
    }
`;

const LogButton = styled.button`
    margin-top: 50px;
    width: 10%;
    background-color: #ffffff;
    color: #080710;
    padding: 10px 0;
    font-size: 18px;
    font-weight: 600;
    border-radius: 5px;
    cursor: pointer;
    margin-bottom: 50px;
    display: block;
    margin-left: auto;
    margin-right: 0;
    &:hover {
        background: blueviolet;
        color: white;
    }
`;



const AdminPage = (props) => {
    const [getDetails, setDetails] = useState({}); // all user details stored here

    useEffect(() => {
        getWriteDetails();
    }, []);

    // displaying all user writeups in admin page
    const getWriteDetails = async () => {
        const adminData = await axios.get('http://localhost:3001/get-writeup');
        setDetails(adminData.data.data);
    }

    // delete particular user 
    const deleteUser = async (id) => {
        const params = new URLSearchParams();
        params.append('writeupId', id);
        const response = await axios.post('http://localhost:3001/delete-write', params);
        console.log("dele", response);
        if (response.data.data.acknowledged) {
            getWriteDetails();
        }
    }

    // disable user in admin page
    const disableUser = async (disable, id) => {
        const params = new URLSearchParams();
        params.append('writeupId', id);
        params.append('disable', disable);
        const response = await axios.post('http://localhost:3001/disable-write', params);
        if (response.data.data.acknowledged) {
            getWriteDetails();
        }
    }

    const logout = () => {
        props.history.push("/login");
        window.location.reload(false);
    }

    return (
        <Root>
            <Header>
                <h1>Admin Page</h1>
                <LogButton onClick={logout}>LogOut</LogButton>
            </Header>
            <table>
                <tr>
                    <th>Email</th>
                    <th>Name</th>
                    <th>Description</th>
                    <th>Delete Option</th>
                    <th>Disable</th>
                </tr>
                {getDetails?.length > 0 && getDetails.map((i, index) => (
                    <tr key={index}>
                        <td >{i.email}</td>
                        <td >{i.name}</td>
                        <td >{i.description}</td>
                        <td><button
                            disabled={i?.disable} onClick={() => deleteUser(i._id)}>Delete</button></td>
                        <td><button
                            onClick={() => disableUser(!i?.disable, i._id)}
                        >{i?.disable ? 'Enable' : 'Disable'}</button></td>
                    </tr>
                ))}
            </table>
        </Root>
    )
}
export default AdminPage;