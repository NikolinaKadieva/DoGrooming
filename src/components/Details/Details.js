import { useContext, useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { PostContext } from "../../contexts/PostContext";
import { useAuthContext } from "../../contexts/AuthContext";

import Modal from "../Modal/Modal";


import * as postService from "../../services/postService";
import * as commentService from "../../services/commentService";

import styles from "./Details.module.css";
import EditPost from "../EditPost/EditPost";

const Details = () => {
    const DetailsBox = () => {
        const { addComment, fetchPostDetails, selectPost, postRemove } = useContext(PostContext);
        const { user } = useAuthContext();
        const { postId } = useParams();
        const navigate = useNavigate();
        const [isBeingEdited, setIsBeingEdited] = useState(false);
        const currentPost = selectPost(postId);

        const isOwner = currentPost._ownerId === user._id;

        const [modal, setModal] = useState(false);

        useEffect(() => {
            (async () => {
                const postDetails = await postService.getOne(postId);
                const postComments = await commentService.getByPostId(postId);

                fetchPostDetails(postId, { ...postDetails, comments: postComments.map(x => `${x.user.email}: ${x.text}`) });
            })();
        }, [])

        const addCommentHandler = (e) => {
            e.preventDefault();

            const formData = new FormData(e.target);

            const comment = formData.get('comment');

            commentService.create(postId, comment)
                .then(result => {
                    addComment(postId, comment);
                });

        };

        const editHandler = () => {
            setIsBeingEdited((oldIsBeingEdit) => !oldIsBeingEdit);
        };

        const postDeleteHandler = () => {
            // const confirmation = window.confirm('Сигурни ли сте, че искате да изтриете статията?');

            // if (confirmation) {
            postService.remove(postId)
                .then(() => {
                    postRemove(postId);
                    navigate('/catalog');
                })
            // }
        }

        const toggleModal = () => {
            setModal(!modal);
        };

        if (!isBeingEdited) {
            return (

                <section className={styles['postDetails']}>
                    <div className={styles['info']}>
                        <div className={styles['header']}>
                            <img className={styles['postImg']} src={currentPost.imageUrl} alt={currentPost.title} />
                            <h1>{currentPost.title}</h1>
                            <p className={styles['type']}>{currentPost.category}</p>
                        </div>
                        <p className={styles['text']}>
                            {currentPost.content}
                        </p>

                        <h2>Коментари:</h2>
                        <div className={styles['detailsComments']}>
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
                        {isOwner &&
                            <div className='row justify-content-md-center'>

                                <div className='col-sm-3 profile-control'>
                                    <button
                                        type='button'
                                        onClick={editHandler}
                                        className='btn btn-outline-primary ms-1 '>
                                        Промени статия
                                    </button>
                                </div>

                                <div className='col-sm-3 profile-control'>
                                    <button
                                        style={{ padding: '8px 20px' }}
                                        type='button'
                                        onClick={toggleModal}
                                        className='btn btn-outline-danger ms-1 '>
                                        Изтрий
                                    </button>
                                    <Modal
                                        show={modal}
                                        close={toggleModal}
                                        title='Сигурни ли сте, че искате да изтриете статията?'
                                        message='След потвърждение, статията не може да бъде възстановена!'
                                        buttonText='Delete'
                                        type='danger'
                                        callback={postDeleteHandler}
                                    />
                                </div>
                            </div>
                        }
                    </div>

                    {user.email && <article className={styles['create-comment']}>
                        <label>Add new comment:</label>
                        <form className="form" onSubmit={addCommentHandler}>

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
                    </article>}
                </section>
            );
        } else {
            return (
                <EditPost
                    currentPost
                    setIsBeingEdited={editHandler}
                />
            );
        }
    }

    return (
        <DetailsBox />
    );
};

export default Details;