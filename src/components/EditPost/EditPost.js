import styles from "./EditPost.module.css"

import * as postService from '../../services/postService';

import { PostContext } from "../../contexts/PostContext";
import { useParams, useNavigate } from "react-router-dom";


import { useState, useContext, useEffect, useRef } from 'react';


import Modal from '../Modal/Modal';

const EditPost = ({ setIsBeingEdited }) => {
    const [currentPost, setCurrentPost] = useState({});
    const { postEdit } = useContext(PostContext);
    const { postId } = useParams();
    const navigate = useNavigate();
    const submitEl = useRef(null);
    const [submit, setSubmit] = useState(false);
    const [modal, setModal] = useState(false);
    useEffect(() => {
        postService.getOne(postId)
            .then(postData => {
                setCurrentPost(postData);
            })
    }, []);


    console.log(currentPost);
    console.log(postId);
    console.log(setIsBeingEdited);
    


    useEffect(() => {
        if (submit) {
            submitEl.current.click();
        }
    }, [submit]);

    const submitHandler = (e) => {
        e.preventDefault();

        const postData = Object.fromEntries(new FormData(e.target));

        console.log(postData);

        postService.edit(currentPost._id, postData)
            .then(result => {
                postEdit(currentPost._id, result);
                console.log(result);
                setIsBeingEdited((oldIsBeingEdit) => !oldIsBeingEdit);

                navigate(`/catalog/${currentPost._id}`);
            });

    };

    const toggleModal = () => {
        setModal(!modal);
    };

    const cancelHandler = () => {
        setIsBeingEdited((oldIsBeingEdit) => !oldIsBeingEdit);
    };

    return (
        <section className={["edit-page", "auth"]}>
            <form id="edit" onSubmit={submitHandler}>
                <div className={["container"]}>
                    <h1>Промени статия</h1>
                    <label htmlFor="title">Заглавие:</label>
                    <input type="text" id="title" name="title" defaultValue={currentPost.title} />
                    <label htmlFor="category">Категория:</label>
                    <input type="text" id="category" name="category" defaultValue={currentPost.category} />
                    <label htmlFor="imageUrl">Снимка:</label>
                    <input type="text" id="imageUrl" name="imageUrl" defaultValue={currentPost.imageUrl} />
                    <label htmlFor="content">Съдържание:</label>
                    <textarea name="content" id="content" defaultValue={currentPost.content} />
                    <input className={styles['submitBtn']} type="submit" defaultValue="Edit Post" />

                    <div className='row justify-content-md-center'>
                        <div className='col-sm-3 profile-control'>
                            <button
                                style={{ padding: '8px 20px' }}
                                type='button'
                                onClick={cancelHandler}
                                className='btn btn-outline-danger ms-1 '>
                                Cancel
                            </button>
                        </div>
                        <div className='col-sm-3'>
                            <button
                                type='submit'
                                // onClick={toggleModal}
                                style={{ padding: '8px 20px' }}
                                className='btn btn-outline-primary ms-1'>
                                Save Changes
                            </button>
                            <button
                                ref={submitEl}
                                type='submit'
                                style={{ display: 'none' }}
                                aria-hidden='true'></button>
                            <Modal
                                show={modal}
                                close={toggleModal}
                                title='Are you sure you want to save these changes?'
                                message='Save changes message'
                                buttonText='Save Changes'
                                type='success'
                                callback={() => setSubmit((oldSubmit) => !oldSubmit)}
                            />
                        </div>
                    </div>
                </div>
            </form>
        </section>
    );
}

export default EditPost;