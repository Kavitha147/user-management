import React from 'react';
import styled from 'styled-components'
import { BrowserRouter as Router, Route ,Routes} from "react-router-dom";
import { createBrowserHistory } from "history";
import LogIn from './Login';
import Signup from './Signup';
import Dashboard from './Dashboard';
import AdminPage from './Admin';

const Root = styled.div`
    width: 430px;
    height: 520px;
    position: absolute;
    transform: translate(-50%,-50%);
    left: 50%;
    top: 50%;
`;
const Shape = styled.div`
height: 200px;
width: 200px;
position: absolute;
border-radius: 50%;
&:nth-child(1){
    background: linear-gradient(
        #1845ad,
        #23a2f6
    );
    left: -115px;
    top: -118px;
}
&:nth-child(2){
    background: linear-gradient(
        to right,
        #ff512f,
        #f09819
    );
    right: -96px;
    bottom: -115px;
}
`;
const Home = () => {
    const history = createBrowserHistory();

    return (
        <>
            <Router>
                {/* <Root>
                    <Shape />
                    <Shape />
                </Root> */}
                <Routes>
                    <Route path="/" element={<Signup history={history} />} />
                    <Route path="/login" element={<LogIn history={history}/>} />
                    <Route path='/dashboard' element={<Dashboard  history={history}/>} />
                    <Route path='/admin' element={<AdminPage history={history}/>}  />
                </Routes>
            </Router>
        </>
    )
}
export default Home;