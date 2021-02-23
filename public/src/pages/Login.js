import React, { useContext, useEffect, useState } from 'react';
import { AuthContext } from '../context/Auth/AuthContext';
import useFetch from '../hooks/useFetch';
import useForm from '../hooks/useForm';
import isValidLogin from '../helpers/isValidLogin';
import '../components/Auth/index.css';
import ErrorForm from '../components/Auth/ErrorForm';
import InputForm from '../components/Auth/InputForm';
import RedirectForm from '../components/Auth/RedirectForm';
import SubmitButton from '../components/Auth/SubmitButton';
import TitleForm from '../components/Auth/TitleForm';

const Login = () => {
    const { startLogin } = useContext( AuthContext ); 

    const [ formValues, handleChange, reset ] = useForm( { email: '', password: '' } );
    const { email, password } = formValues;

    const [ error, setError ] = useState( '' );

    const [ body, setBody ] = useState( null );
    const { dataAPI, loadingAPI, errorAPI } = useFetch( '/auth', body );

    useEffect( () => {
        if( dataAPI ) {
            startLogin( dataAPI );
        }
    }, [ dataAPI, startLogin ] );

    const handleSubmit = ( event ) => {
        event.preventDefault();
        setBody( null );

        const { isValid, errorLogin, emailValidator, passwordValidator } = isValidLogin( email, password );
        setError( errorLogin );

        if( isValid ) {
            setBody( {
                email: emailValidator,
                password: passwordValidator
            } );

            reset();
        }
    };

    return (
        <div className="container-login-register" style={ { backgroundImage: `url( /assets/images/login-register.jpg )` } }>
            <div className="card shadow-lg login-register-box animate__animated animate__fadeIn">
                <div className="card-body p-0">
                    <form autoComplete="off" className="login-register" onSubmit={ handleSubmit }>
                        <TitleForm title="Login" />

                        { errorAPI && <ErrorForm error={ errorAPI } /> }

                        { error && <ErrorForm error={ error } /> }

                        <InputForm
                            icon="fa-envelope"
                            name="email"
                            placeholder="Email"
                            type="text"
                            error={ error }
                            handleChange={ handleChange }
                            value={ email }
                        />

                        <InputForm
                            icon="fa-key"
                            name="password"
                            placeholder="Password"
                            type="password"
                            error={ error }
                            handleChange={ handleChange }
                            value={ password }
                        />

                        <SubmitButton
                            loading={ loadingAPI }
                            text="Sign In"
                        />

                        <RedirectForm
                            text="Don't have an account?"
                            to="/auth/register"
                            toText="Sign up"
                        />
                    </form>
                </div>
            </div>
        </div>
    );
};

export default Login;
