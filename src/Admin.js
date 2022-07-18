import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import axios from 'axios';

const Root = styled.div`
h1{
    color: white;
}
table {
    font-family: arial, sans-serif;
    border-collapse: collapse;
    width: 100%;
    color: white;
  }
  
  td, th {
    border: 1px solid #dddddd;
    text-align: left;
    padding: 8px;
  }
`;
const AdminPage = (props) => {
    const [getDetails, setDetails] = useState({});

    useEffect(() => {
        getWriteDetails();
    }, []);

    const getWriteDetails = async () => {
        const adminData = await axios.get('http://localhost:3001/get-writeup');
        setDetails(adminData.data.data);
    }

    const deleteUser = async (id) => {
        const params = new URLSearchParams();
        params.append('writeupId', id);
        const response = await axios.post('http://localhost:3001/delete-write', params);
        console.log("dele", response);
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
            <h1>Admin Page</h1>
            <button onClick={logout}>LogOut</button>
            <table>
                <tr>
                    <th>Email</th>
                    <th>Name</th>
                    <th>Description</th>
                    <th>Delete Option</th>
                    <th>Disable</th>
                </tr>
                {getDetails?.length > 0 && getDetails.map((i, index) => (
                    <tr>
                        <td >{i.email}</td>
                        <td >{i.name}</td>
                        <td >{i.description}</td>
                        <td><button onClick={() => deleteUser(i._id)}>Delete</button></td>
                        <td><button >Disable</button></td>
                    </tr>
                ))}
            </table>
        </Root>
    )
}
export default AdminPage;