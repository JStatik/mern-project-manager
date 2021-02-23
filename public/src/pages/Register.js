import React, { useContext, useEffect, useState } from 'react';
import { AuthContext } from '../context/Auth/AuthContext';
import useFetch from '../hooks/useFetch';
import useForm from '../hooks/useForm';
import isValidRegister from '../helpers/isValidRegister';
import '../components/Auth/index.css';
import ErrorForm from '../components/Auth/ErrorForm';
import InputForm from '../components/Auth/InputForm';
import RedirectForm from '../components/Auth/RedirectForm';
import SubmitButton from '../components/Auth/SubmitButton';
import TitleForm from '../components/Auth/TitleForm';

const Register = () => {
    const { startRegister } = useContext( AuthContext );

    const [ formValues, handleChange, reset ] = useForm( { name: '', surname: '', email: '', password: '', password2: '' } );
    const { name, surname, email, password, password2 } = formValues;
    
    const [ errors, setErrors ] = useState( { errorName: '', errorSurname: '', errorEmail: '', errorPassword: '' } );
    const { errorName, errorSurname, errorEmail, errorPassword } = errors;

    const [ body, setBody ] = useState( null );
    const { dataAPI, loadingAPI, errorAPI } = useFetch( '/auth/register', body );

    useEffect( () => {
        if( dataAPI ) {
            startRegister( dataAPI );
        }
    }, [ dataAPI, startRegister ] );

    const handleSubmit = ( event ) => {
        event.preventDefault();
        setBody( null );

        const validation = isValidRegister( name, surname, email, password, password2 );
        const { isValid, nameValidator, surnameValidator, emailValidator, passwordValidator, errorsValidator } = validation;

        setErrors( errorsValidator );

        if( isValid ) {
            setBody( {
                name: nameValidator,
                surname: surnameValidator,
                email: emailValidator,
                password: passwordValidator
            } );

            reset();
        }
    };

    return (
        <div className="container-login-register"  style={ { backgroundImage: `url( /assets/images/login-register.jpg )` } }>
            <div className="card shadow-lg login-register-box animate__animated animate__fadeIn">
                <div className="card-body p-0">
                    <form autoComplete="off" className="login-register" onSubmit={ handleSubmit }>
                        <TitleForm title="Register" />

                        { errorAPI && <ErrorForm error={ errorAPI } /> }

                        {
                            Object.values( errors ).map( error => {
                                if( error ) {
                                    return <ErrorForm key={ error } error={ error } />
                                }

                                return null;
                            } )
                        }

                        <InputForm
                            icon="fa-user"
                            name="name"
                            placeholder="Name"
                            type="text"
                            error={ errorName }
                            handleChange={ handleChange }
                            value={ name }
                        />

                        <InputForm
                            icon="fa-user"
                            name="surname"
                            placeholder="Surname"
                            type="text"
                            error={ errorSurname }
                            handleChange={ handleChange }
                            value={ surname }
                        />

                        <InputForm
                            icon="fa-envelope"
                            name="email"
                            placeholder="Email"
                            type="text"
                            error={ errorEmail }
                            handleChange={ handleChange }
                            value={ email }
                        />

                        <InputForm
                            icon="fa-key"
                            name="password"
                            placeholder="Password"
                            type="password"
                            error={ errorPassword }
                            handleChange={ handleChange }
                            value={ password }
                        />

                        <InputForm
                            icon="fa-key"
                            name="password2"
                            placeholder="Repeat password"
                            type="password"
                            error={ errorPassword }
                            handleChange={ handleChange }
                            value={ password2 }
                        />

                        <SubmitButton
                            loading={ loadingAPI }
                            text="Sign Up"
                        />

                        <RedirectForm
                            text="Already registered?"
                            to="/auth/login"
                            toText="Sign in"
                        />
                    </form>
                </div>
            </div>
        </div>
    );
};

export default Register;
