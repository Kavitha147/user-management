import React, { useState } from 'react';
import Modal from 'react-modal';
import styled from 'styled-components';
import axios from 'axios';

const customStyles = {
  content: {
    top: '50%',
    left: '50%',
    right: 'auto',
    bottom: 'auto',
    marginRight: '-50%',
    transform: 'translate(-50%, -50%)',
    width: '30%',
    height: '37%',
    borderRadius: '8px'
  },
  overlay: {
    background: "none"
  }
};

const ModalElements = styled.div`
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    align-items: center;

    textarea {
        display: block;
        height: 50px;
        width: 94%;
        background-color: white;
        border-radius: 10px;
        padding: 0 10px;
        margin-top: 8px;
        font-size: 14px;
        font-weight: 300;
    }
`;
const Button = styled.button`
    width: 50%;
    background-color: #ffffff;
    color: #080710;
     padding: 10px 0;
    font-size: 18px;
    font-weight: 600;
    border-radius: 5px;
    cursor: pointer;
    &:hover {
        background: blueviolet;
        color: white;
    }
`;


const WriteupForm = (props) => {
  const { isOpen, editDetails, getWriteupList, closeEdit } = props;
  const [desName, setDesName] = useState(editDetails.name);
  const [description, setDescription] = useState(editDetails.description);

  // submit edited form 
  const submitEdit = async () => {
    if (description && desName) {
      const params = new URLSearchParams();
      params.append('description', description);
      params.append('name', desName);
      params.append('writeupId', editDetails._id);
      const response = await axios.post('http://localhost:3001/edit-write', params)
      if (response.data.data.acknowledged) {
        getWriteupList();
      }
    }
  }

  return (
    <div>
      <Modal
        isOpen={isOpen}
        style={customStyles}
      >
        <ModalElements>
          <Button onClick={closeEdit}>close</Button>
          <form>
            <h3>Edit Writeup</h3>
            <label>Name</label><br /> <br />
            <input type='text' value={desName}
              onChange={(e) => setDesName(e.target.value)} /><br /><br />
            <label>Description</label><br /><br />
            <textarea
              value={description}
              onChange={(e) => setDescription(e.target.value)}
            />
            <br />
            <Button onClick={submitEdit}>Submit</Button>
          </form>
        </ModalElements>
      </Modal>
    </div>
  )
}

export default WriteupForm;