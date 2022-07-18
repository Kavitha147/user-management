import React from 'react';
import { BrowserRouter as Router, Route ,Routes} from "react-router-dom";
import { createBrowserHistory } from "history";
import LogIn from './Login';
import Signup from './Signup';
import Dashboard from './Dashboard';
import AdminPage from './Admin';

const Home = () => {
    const history = createBrowserHistory();

    return (
        <>
            <Router>
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