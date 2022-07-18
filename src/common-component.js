import styled from "styled-components";

export const SignupForm = styled.div`
    width: fit-content;
    height: 50%;
    background-color: white;
    display: flex;
    align-items: center;
    flex-direction: column;
`;

export const Form = styled.div`
    height: 590px;
    width: 400px;
    background-color: white;
    position: absolute;
    transform: translate(-50%, -50%);
    top: 50%;
    left: 50%;
    border-radius: 10px;
    backdrop-filter: blur(10px);
    border: 2px solid rgba(255, 255, 255, 0.1);
    box-shadow: 0 0 40px rgba(8, 7, 16, 0.6);
    padding: 50px 35px;
    label {
        font-family: "Poppins", sans-serif;
        font-size: 18px;
        font-weight: 600;
        letter-spacing: 0.5px;
        outline: none;
        border: none;
    }
    h3 {
        font-size: 32px;
        font-weight: 500;
        line-height: 42px;
        text-align: center;
    }
    input {
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
    button {
        margin-top: 50px;
        width: 100%;
        background-color: #ffffff;
        color: #080710;
        padding: 15px 0;
        font-size: 18px;
        font-weight: 600;
        border-radius: 8px;
        cursor: grab;
        margin-bottom: 50px;
        &:hover {
            background: blueviolet;
            color: white;
        }
    }
    span {
        font-size: 18px;
        font-weight: 600;
    }
`;
