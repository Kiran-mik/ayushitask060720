import React from 'react';
import GoogleLogin from 'react-google-login';
const Login = ({ ...props }) => {
    const responseGoogle = (response) => {
        if (response) {
            localStorage.setItem('token', response.tokenId)
        }
        props.history.push('/dashboard')
    }

    return (
        <React.Fragment>
            <section className="login-outer">
                <GoogleLogin
                    clientId="763524147378-pqp4nl3cpmngo33r46rcp55kgr9v1hke.apps.googleusercontent.com"
                    buttonText="Google"
                    onSuccess={responseGoogle}
                    cookiePolicy={'single_host_origin'}
                />
            </section>
        </React.Fragment>
    );
};

export default Login
