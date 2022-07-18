import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import {SignupForm, Form} from './common-component';

const Signup = (props) => {
    const [userName, setUserName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [conPassword, setConPassword] = useState('');

    const registerForm = async () => {
        if (userName && email && (password === conPassword) && password) {
            const params = new URLSearchParams();
            params.append('userName', userName);
            params.append('email', email);
            params.append('password', password);
            params.append('isAdmin', false);
           await axios.post('http://localhost:3001/add', params);
            props.history.push("/login");
            window.location.reload(false);
        }
    }
    return (
        <div>
            <SignupForm>
                <Form>
                    <h3> Signup</h3>
                    <label>User Name</label>
                    <input type="text"
                        placeholder='Enter User Name'
                        onChange={(e) => setUserName(e.target.value)}
                        value={userName} />
                    <label>Email</label>
                    <input type="email"
                        placeholder='Enter Email'
                        value={email}
                        onChange={(e) => setEmail(e.target.value)} />
                    <label>Password</label>
                    <input type="password"
                        placeholder='Enter Password'
                        value={password}
                        onChange={(e) => setPassword(e.target.value)} />
                    <label>Confirm Password</label>
                    <input type="password"
                        placeholder='Enter Confirm Password'
                        value={conPassword}
                        onChange={(e) => setConPassword(e.target.value)} />
                    <button onClick={registerForm}>SignUp</button>
                    <center>
                    <span className="login-header">
                        Already have an account? Login
                        <Link to="/login"> Here</Link>
                    </span>
                </center>
                </Form>
            </SignupForm>
        </div>
    )
}
export default Signup;