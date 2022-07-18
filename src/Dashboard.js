import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import axios from 'axios';
import WriteupForm from './WriteupForm';

const Container = styled.div`
    margin: 0 auto;
    height: 900px;
    width: 85%;
    display: flex;
    flex-direction: column;
    box-shadow: 0 0 20px 0 rgba(0, 0, 0, 0.2);
    background-color: white;
`;

const Header = styled.div`
    display: flex;
    height: 100px;
    padding: 0 20px;
    align-items: center;
    background: lightpink;
    button {
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
        float: right;
        &:hover {
            background: blueviolet;
            color: white;
        }
    }
`;
const Content = styled.div`
    flex: 1;
    display: flex;
    .main {
        flex: 1;
        padding: 0 20px;
        background: snow;
    }
    .aside {
        width: 300px;
        padding: 0 20px;
        background: papayawhip;
    }
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
`;



const Dashboard = (props) => {
  const [desName, setDesName] = useState('');
  const [description, setDescription] = useState('');
  const [edit, setEdit] = useState(false);
  const [writeupList, setList] = useState([]);
  const [editDetails, setEditDetails] = useState({});

  const logout = () => {
    props.history.push("/login");
    window.location.reload(false);
  }

  const getWriteupList = async () => {
    const params = new URLSearchParams();
    params.append('email', localStorage.getItem('email'));
    const getList = await axios.post('http://localhost:3001/get-user-writeup', params);
    setList(getList.data.data);
  }

  const addAddWriteup = async (e) => {
    if (description && desName) {
      const params = new URLSearchParams();
      params.append('description', description);
      params.append('name', desName);
      params.append('email', localStorage.getItem('email'));
      const response = await axios.post('http://localhost:3001/add-write', params)
      if (response.data.data.length > 0) {
        getWriteupList();
      }
      setDesName('');
      setDescription('');
    }
  }

  useEffect(() => {
    getWriteupList();
  }, []);

  const editWriteup = async (data) => {
    setEdit(true);
    setEditDetails(data);
  }

  return (
    <Container>
      <Header>
        <h1>Welcome User</h1>
        <button onClick={logout}>LogOut</button>
      </Header>
      <Content>
        <div className="main">
          <h2>Main Content</h2>
          <table>
            <tr>
              <th>Email</th>
              <th>Name</th>
              <th>Description</th>
              <th>Edit Option</th>
            </tr>
            {writeupList?.length > 0 && writeupList.map((i) => (
              <tr key={i._id}>
                <td >{i.email}</td>
                <td >{i.name}</td>
                <td >{i.description}</td>
                <td><button onClick={() => editWriteup(i)}>Edit</button></td>
              </tr>
            ))}
          </table>
        </div>
        <div className="aside">
          <h3>Add wiriteUp</h3>
          <label>Name</label>
          <br /><br />
          <input type='text' value={desName} onChange={(e) => setDesName(e.target.value)} />
          <br /><br />
          <label>Description</label>
          <br /><br />
          <textarea
            value={description}
            onChange={(e) => setDescription(e.target.value)}
          />
          <br /><br />
          <button onClick={addAddWriteup}>Add</button>
        </div>
      </Content>
      {edit &&
        <WriteupForm isOpen={true} editDetails={editDetails} getWriteupList={getWriteupList} />
      }
    </Container>
  )
}

export default Dashboard;