import styles from "./EditPost.module.css";

import { useState, useContext, useEffect } from 'react';
import { useParams, useNavigate } from "react-router-dom";

import * as postService from '../../services/postService';
import { PostContext } from "../../contexts/PostContext";

const EditPost = ({ setIsBeingEdited }) => {
    const [currentPost, setCurrentPost] = useState({});
    const { postEdit } = useContext(PostContext);
    const { postId } = useParams();
    const navigate = useNavigate();
    
    useEffect(() => {
        postService.getOne(postId)
            .then(postData => {
                setCurrentPost(postData);
            })
    }, []);


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

                    <div className='edit-delete'>
                        <button
                            type='submit'
                            className='mr-2 btn btn-outline-success ms-1 '
                        >
                            Save
                        </button>
                        <button
                            onClick={cancelHandler}
                            type='button'
                            className='btn btn-outline-danger ms-1 '>
                            Cancel
                        </button>
                    </div>
                </div>
            </form>
        </section>
    );
}

export default EditPost;