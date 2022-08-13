import styles from "./Register.module.css"

import { useState, useContext } from "react";
import { useNavigate } from "react-router-dom";

import * as authService from "../../services/authService";
import { AuthContext } from "../../contexts/AuthContext";
import { types, NotificationContext } from '../../contexts/NotificationContext';

import Modal from '../Modal/Modal';
import TermsOfService from './TermsOfService';

const Register = () => {
    const { userLogin } = useContext(AuthContext);
   
    const [isValid, setIsValid] = useState({ fields: {}, errors: {} });
    const { showNotification } = useContext(NotificationContext);
    const [modal, setModal] = useState(false);
    const navigate = useNavigate();

    const toggleModal = () => {
        setModal(!modal);
    };

    const onSubmit = (e) => {
        e.preventDefault();

        const formData = new FormData(e.target);

        const email = formData.get('email');
        const password = formData.get('password');
        const confirmPassword = formData.get('confirmPassword');

        if (password !== confirmPassword) {
            return;
        }

        if (handleValidation(password, confirmPassword)) {
            authService.register(email, password)
                .then(authData => {
                    showNotification('Account created successfully!', types.success);
                    userLogin(authData);
                    navigate('/');
                })
                .catch((error) => {
                    return showNotification(error.message, types.error);
                });
        }
    };

    const handleValidation = (password, confirmPassword) => {
        const fields = isValid.fields;
        const errors = {};
        let formIsValid = true;

        if (!fields['email']) {
            formIsValid = false;
            errors['email'] = 'E-mail address is required!';
        }

        if (!fields['password']) {
            formIsValid = false;
            errors['password'] = 'Password is required!';
        }

        if (!fields['confirmPassword']) {
            formIsValid = false;
            errors['confirmPassword'] = 'Confirm Password field is required!';
        }

        if (!fields['terms']) {
            formIsValid = false;
            errors['terms'] =
                'You need to agree with the Terms & Conditions to register!';
        }

        var passWordRegExp = new RegExp(
            /^(((?=.*[a-z])(?=.*[A-Z]))|((?=.*[a-z])(?=.*[0-9]))|((?=.*[A-Z])(?=.*[0-9])))/
        );

        if (password.length < 8) {
            formIsValid = false;
            errors['password'] = 'Password should be at least 8 symbols long!';
        }

        if (!passWordRegExp.test(password)) {
            formIsValid = false;
            errors['password'] =
                'Password should contain at least 1: Lowercase letter, Uppercase letter, Numeric character, Special character';
        }

        if (password !== confirmPassword) {
            formIsValid = false;
            errors['confirmPassword'] = 'Password and Confirm Password should match!';
        }

        setIsValid((oldIsValid) => {
            return { ...oldIsValid, ...{ errors: errors } };
        });

        return formIsValid;
    };

    const onEmailChangeHandler = (e) => {
        const emailRegExp = new RegExp(/^[^\s@]+@[^\s@]+\.[^\s@]+$/);
        let errors = {};

        if (!emailRegExp.test(e.target.value)) {
            errors['email'] = 'Please enter a valid e-mail address!';
            setIsValid((oldIsValid) => {
                return { ...oldIsValid, ...{ errors: errors } };
            });
        } else {
            const fields = isValid.fields;
            fields[e.target.name] = e.target.name;
            errors['email'] = null;
            setIsValid((oldIsValid) => {
                return { ...oldIsValid, ...{ errors: errors }, ...fields };
            });
        }
    };

    const onChangeHandler = (e) => {
        const fields = isValid.fields;
        fields[e.target.name] = e.target.name;
        setIsValid((oldIsValid) => {
            return { ...oldIsValid, ...fields };
        });
    };

    return (
        <div className='container register-container wow fadeInLeft'>
            <div className='row d-flex justify-content-center align-items-center h-100'>
                <div className='col-lg-12 col-xl-11'>
                    <div className='text-black'>
                        <div className='card-body p-md-5'>
                            <div className='row justify-content-center'>
                                <div className='col-md-10 col-lg-6 col-xl-5 order-2 order-lg-1'>
                                    <p className='text-center h1 fw-bold mb-5 mx-1 mx-md-4 mt-4'>
                                        Sign up
                                    </p>

                                    <form
                                        method='POST'
                                        className='mx-1 mx-md-4'
                                        onSubmit={onSubmit}>


                                        <div className='d-flex flex-row align-items-center mb-4'>
                                            <i className='fas fa-envelope fa-lg me-3 fa-fw'></i>
                                            <div className='form-outline flex-fill mb-0'>
                                                <label className='form-label ml-3' htmlFor='email'>
                                                    Your Email
                                                </label>
                                                <input
                                                    type='email'
                                                    id='email'
                                                    name='email'
                                                    onChange={onEmailChangeHandler}
                                                    className={
                                                        isValid.errors['email']
                                                            ? 'form-control notValid'
                                                            : 'form-control'
                                                    }
                                                />
                                                {isValid.errors['email'] && (
                                                    <p
                                                        className='ml-3 error-message'
                                                        style={{ color: 'red' }}>
                                                        {isValid.errors['email']}
                                                    </p>
                                                )}
                                            </div>
                                        </div>

                                        <div className='d-flex flex-row align-items-center mb-4'>
                                            <i className='fas fa-lock fa-lg me-3 fa-fw'></i>
                                            <div className='form-outline flex-fill mb-0'>
                                                <label className='form-label ml-3' htmlFor='password'>
                                                    Password
                                                </label>
                                                <input
                                                    type='password'
                                                    id='password'
                                                    name='password'
                                                    onChange={onChangeHandler}
                                                    className={
                                                        isValid.errors['password']
                                                            ? 'form-control notValid'
                                                            : 'form-control'
                                                    }
                                                />
                                                {isValid.errors['password'] && (
                                                    <p
                                                        className='ml-3 error-message'
                                                        style={{ color: 'red' }}>
                                                        {isValid.errors['password']}
                                                    </p>
                                                )}
                                            </div>
                                        </div>

                                        <div className='d-flex flex-row align-items-center mb-4'>
                                            <i className='fas fa-key fa-lg me-3 fa-fw'></i>
                                            <div className='form-outline flex-fill mb-0'>
                                                <label className='form-label ml-3' htmlFor='confirmPassword'>
                                                    Repeat your password
                                                </label>
                                                <input
                                                    type='password'
                                                    id='confirmPassword'
                                                    name='confirmPassword'
                                                    onChange={onChangeHandler}
                                                    className={
                                                        isValid.errors['confirmPassword']
                                                            ? 'form-control notValid'
                                                            : 'form-control'
                                                    }
                                                />
                                                {isValid.errors['confirmPassword'] && (
                                                    <p
                                                        className='ml-3 error-message'
                                                        style={{ color: 'red' }}>
                                                        {isValid.errors['confirmPassword']}
                                                    </p>
                                                )}
                                            </div>
                                        </div>

                                        <div className='form-check justify-content-left mb-5'>
                                            <input
                                                className='form-check-input me-2'
                                                type='checkbox'
                                                value={true}
                                                id='terms'
                                                name='terms'
                                                onChange={onChangeHandler}

                                            />
                                            <span className='form-check-label' htmlFor='terms'>
                                                I agree all statements in&nbsp;
                                            </span>
                                            <span onClick={toggleModal} className={styles['termsTrigger']}>
                                                Terms of service
                                            </span>
                                            <Modal
                                                show={modal}
                                                close={toggleModal}
                                                title='Terms of Service'
                                                buttonText='Test'
                                                type='info'
                                                footerless={true}>
                                                <TermsOfService />
                                            </Modal>
                                            {isValid.errors['terms'] && (
                                                <p
                                                    className='ml-3 error-message'
                                                    style={{ color: 'red' }}>
                                                    {isValid.errors['terms']}
                                                </p>
                                            )}
                                        </div>

                                        <div className='d-flex justify-content-center mx-4 mb-3 mb-lg-4'>
                                            <button type='submit' className='btn btn-primary btn-lg'>
                                                Register
                                            </button>
                                        </div>
                                    </form>
                                </div>
                                <div className='col-md-10 col-lg-6 col-xl-7 d-flex align-items-center order-1 order-lg-2'>
                                    <img
                                        src='https://mdbcdn.b-cdn.net/img/Photos/new-templates/bootstrap-registration/draw1.webp'
                                        className='img-fluid'
                                        alt='register_img'
                                    />
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Register;
