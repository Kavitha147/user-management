import React, { useState } from 'react';
import axios from 'axios';
import { Link } from "react-router-dom";
import { SignupForm, Form } from './common-component';

const LogIn = (props) => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    // submit login form redirecting to the admin or user dashboard depends on logged in details
    const loginForm = async () => {
        if (email && password) {
            const params = new URLSearchParams();
            params.append('email', email);
            params.append('password', password);
            const response = await axios.post('http://localhost:3001/login', params);
            const adminData = await axios.get('http://localhost:3001/admin-login');
            const adminEmail = adminData.data.data.email;
            const adminPassword = adminData.data.data.password;
            if (response.data.data.length > 0) {
                props.history.push('/dashboard');
                window.location.reload(false);
                localStorage.setItem('email', response.data.data[0].email);
            }
            else if (adminEmail === email && adminPassword === password) {
                props.history.push('/admin');
                window.location.reload(false);
            }
            else {
                alert('Incorrect email or password');
            }
        }
    }
    return (
        <div>
            <SignupForm>
                <Form style={{ height: '480px' }}>
                    <h3>LogIn</h3>
                    <label>Email</label>
                    <input type="text"
                        placeholder='Enter Email'
                        value={email}
                        onChange={(e) => setEmail(e.target.value)} />
                    <label>Password</label>
                    <input type="password"
                        placeholder='Enter Password'
                        value={password}
                        onChange={(e) => setPassword(e.target.value)} />
                    <button onClick={loginForm}>LogIn</button>
                    <center>
                        <span>
                            Don't have an account? Register
                            <Link to="/"> Here</Link>
                        </span>
                    </center>
                </Form>
            </SignupForm>
        </div>
    )
}
export default LogIn;