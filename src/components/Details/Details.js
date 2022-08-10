import { useContext, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { PostContext } from "../../contexts/PostContext";

import * as postService from "../../services/postService";
import * as commentService from "../../services/commentService";

import styles from "./Details.module.css";

const Details = () => {
    const { addComment, fetchPostDetails, selectPost } = useContext(PostContext);
    const { postId } = useParams();

    const currentPost = selectPost(postId);
    // const [error, setError] = useState({
    //     username: '',
    //     comment: ''
    // });

    useEffect(() => {
        (async () => {
            const postDetails = await postService.getOne(postId);
            const postComments = await commentService.getByPostId(postId);

            fetchPostDetails(postId, {...postDetails, comments: postComments.map(x => `${x.user.email}: ${x.text}`)});
        })();
    }, [])

    const addCommentHandler = (e) => {
        e.preventDefault();

        const formData = new FormData(e.target);

        const comment = formData.get('comment');
        console.log(comment);
        console.log(postId);

        commentService.create(postId, comment)
            .then(result => {
                addComment(postId, comment);
            });

    }


    // const validateUsername = (e) => {
    //     const username = e.target.value;
    //     let errorMessage = '';

    //     if (username.length < 4) {
    //         errorMessage = 'Username must be longer than 4 characters.';
    //     } else if (username.length > 10) {
    //         errorMessage = 'Username must be shorter than 10 characters.';
    //     }

    //     setError(state => ({
    //         ...state,
    //         [e.target.name]: errorMessage
    //     }));
    // }

    return (

        <section className={styles['postDetails']}>
            <h1>Post Details</h1>
            <div className={styles['info']}>
                <div className={styles['header']}>
                    <img className={styles['postImg']} src={currentPost.imageUrl} alt={currentPost.title} />
                    <h1>{currentPost.title}</h1>
                    <p className={styles['type']}>{currentPost.category}</p>
                </div>
                <p className={styles['text']}>
                    {currentPost.content}
                </p>

                <div className={styles['detailsComments']}>
                    <h2>Коментари:</h2>
                    <ul>
                        {currentPost.comments?.map(x =>
                            <li key={x} className={styles['comment']}>
                                <p>{x}</p>
                            </li>
                        )}
                    </ul>
                    {!currentPost.comments &&
                        <p className="no-comment">No comments.</p>
                    }
                </div>
              
            </div>

            <article className={styles['create-comment']}>
                <label>Add new comment:</label>
                <form className="form" onSubmit={addCommentHandler}>
                    {/* <input
                        type="text"
                        name="username"
                        placeholder="JD"
                        onChange={onChange}
                        onBlur={validateUsername}
                        value={comment.username}
                    />

                    {error.username &&
                        <div style={{ color: 'red' }}>{error.username}</div>
                    } */}

                    <textarea
                        className={styles['textarea-comment']}
                        name="comment"
                        placeholder="Comment......"
                    />

                    <input
                        className={styles['submitBtn']}
                        type="submit"
                        value="Add Comment"
                    />
                </form>
            </article>
        </section>

    );
};

export default Details;