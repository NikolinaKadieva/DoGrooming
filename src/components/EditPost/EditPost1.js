import styles from "./EditPost.module.css"

import { useContext, useEffect, useState } from "react";
import { useParams, useNavigate} from "react-router-dom";

import * as postService from '../../services/postService';
import { PostContext } from "../../contexts/PostContext";

const EditPost = () => {
    const [currentPost, setCurrentPost] = useState({});
    const { postEdit} = useContext(PostContext);
    const { postId } = useParams();
    const navigate = useNavigate();

    useEffect(() => {
        postService.getOne(postId)
            .then(postData => {
                setCurrentPost(postData);
            })
    }, []);

    const onSubmit = (e) => {
        e.preventDefault();

        const postData = Object.fromEntries(new FormData(e.target));

        console.log(postData);

        postService.edit(postId, postData)
            .then(result => {
                postEdit(postId, result);
                console.log(result);
                navigate(`/catalog/${postId}`);
            });
    }


    return (
        <section className={["edit-page", "auth"]}>
            <form id="edit" onSubmit={onSubmit}>
                <div className={["container"]}>
                    <h1>Промени статия</h1>
                    <label htmlFor="title">Заглавие:</label>
                    <input type="text" id="title" name="title" defaultValue={currentPost.title} />
                    <label htmlFor="category">Категория:</label>
                    <input type="text" id="category" name="category" defaultValue={currentPost.category} />
                    <label htmlFor="imageUrl">Снимка:</label>
                    <input type="text" id="imageUrl" name="imageUrl" defaultValue={currentPost.imageUrl} />
                    <label htmlFor="summary">Съдържание:</label>
                    <textarea name="summary" id="summary" defaultValue={currentPost.content} />
                    <input className={styles['submitBtn']} type="submit" defaultValue="Edit Post" />
                </div>
            </form>
        </section>
    );
}

export default EditPost;