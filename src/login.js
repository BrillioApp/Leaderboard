import { useState } from 'react';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import './login.css';
import File from './file'
import { Provider } from 'react-redux';
import store from './store'
const user = {
    userId: 'master',
    password: '1234'
}

const Login = () => {
    const [loginUser, setLoginUser] = useState({ userId: '', password: '' })
    const [flag, setFlag] = useState(false);
    const [isLoggedIn, setIsLoggedIn] = useState(false);

    const handleChange = e => {
        const { name, value } = e.target;
        setLoginUser(prevState => ({
            ...prevState,
            [name]: value
        }));
        console.log(loginUser)
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        if (loginUser.userId === user.userId && loginUser.password === user.password) {
            setFlag(false);
            setIsLoggedIn(true)

        } else { setFlag(true) }
    }

    return (
    
        <div>
            {isLoggedIn?<Provider store={store}><File/></Provider>:<div className='login'>
            {flag && <span className='error'>Wrong credentials</span>}

            <Form className="loginRegister">
                <Form.Group className="mb-3" controlId="formBasicName">
            
                    <Form.Control
                        type="text"
                        placeholder="Enter Username"
                        value={loginUser.userId}
                        name='userId'
                        onChange={handleChange}
                    />
                </Form.Group>
                <Form.Group className="mb-3" controlId="formBasicPassword">
                
                    <Form.Control type="password" placeholder="Password" value={loginUser.password} name='password'
                        onChange={handleChange} />
                </Form.Group>
                
                <div className="d-grid">
                    <Button
                        type="submit"
                        variant="primary"
                        size="md"
                        onClick={handleSubmit}
                    >
                        Login
                    </Button>
                </div>
            </Form>

        </div>}
        </div>
    )
}

export default Login;