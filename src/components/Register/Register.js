import styles from "./Register.module.css"

import { useState, useContext } from "react";
import { useNavigate } from "react-router-dom";

import * as authService from "../../services/authService";
import { AuthContext } from "../../contexts/AuthContext";

import Modal from '../Modal/Modal';
import TermsOfService from './TermsOfService';

const Register = () => {
    const { userLogin } = useContext(AuthContext);
    const navigate = useNavigate();
  const [modal, setModal] = useState(false);


    const toggleModal = () => {
        setModal(!modal);
      };

    const onSubmit = (e) => {
        e.preventDefault();

        const formData = new FormData(e.target);

        // const firstName = formData.get('firstName');
        // const lastName = formData.get('lastName');
        const email = formData.get('email');
        const password = formData.get('password');
        const confirmPassword = formData.get('rePassword');

        if (password !== confirmPassword) {
            return;
        }

        console.log(email);
        console.log(password);
        console.log(confirmPassword);


        authService.register(email, password)
            .then(authData => {
                userLogin(authData);
                navigate('/');
            });
    }

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
                                        {/* <div className='d-flex flex-row align-items-center mb-4'>
                                            <i className='fas fa-user fa-lg me-3 fa-fw'></i>
                                            <div className='form-outline flex-fill mb-0'>
                                                <label className='form-label ml-3' htmlFor='firstName'>
                                                    First Name
                                                </label>
                                                <input
                                                    type='text'
                                                    id='firstName'
                                                    name='firstName'

                                                />

                                            </div>
                                        </div> */}
                                        {/* <div className='d-flex flex-row align-items-center mb-4'>
                                            <i className='fas fa-user fa-lg me-3 fa-fw'></i>
                                            <div className='form-outline flex-fill mb-0'>
                                                <label className='form-label ml-3' htmlFor='lastName'>
                                                    Last Name
                                                </label>
                                                <input
                                                    type='text'
                                                    id='lastName'
                                                    name='lastName'
                                                />
                                            </div>
                                        </div> */}

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
                                                />
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
                                                />
                                            </div>
                                        </div>

                                        <div className='d-flex flex-row align-items-center mb-4'>
                                            <i className='fas fa-key fa-lg me-3 fa-fw'></i>
                                            <div className='form-outline flex-fill mb-0'>
                                                <label className='form-label ml-3' htmlFor='rePassword'>
                                                    Repeat your password
                                                </label>
                                                <input
                                                    type='password'
                                                    id='rePassword'
                                                    name='rePassword'
                                                />
                                            </div>
                                        </div>

                                        <div className='form-check d-flex justify-content-left mb-5'>
                                            <input
                                                className='form-check-input me-2'
                                                type='checkbox'
                                                value={true}
                                                id='terms'
                                                name='terms'
                                            />
                                            <label className='form-check-label' htmlFor='terms'>
                                                I agree all statements in&nbsp;
                                            </label>
                                            <span onClick={toggleModal} className={styles['terms-trigger']}>
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
