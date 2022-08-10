import './UserProfile.css';

import { useState, useContext, useEffect } from 'react';
import { useNavigate } from "react-router-dom";
import * as userService from "../../services/userService";

import Modal from "../Modal/Modal";
import { EditProfile } from './EditPost';

import { AuthContext } from "../../contexts/AuthContext";
import * as authService from "../../services/authService";

export const UserProfile = () => {
    const ProfileBox = () => {
        const navigate = useNavigate();
        const [modal, setModal] = useState(false);
        const { user, userLogout } = useContext(AuthContext);
        const [isBeingEdited, setIsBeingEdited] = useState(false);

        const [userInfo, setUserInfo] = useState(user.accessToken);

        const editHandler = () => {
            setIsBeingEdited((oldIsBeingEdit) => !oldIsBeingEdit);
          };

        const deleteHandler = () => {
            const id = user._id;

            console.log(id);

            userService
                .deleteProfile(id)

            authService.logout(user.accessToken)
                .then(() => {
                    userLogout();
                    navigate('/');
                })
                .catch(() => {
                    navigate('/');
                }
                )
        };

        const toggleModal = () => {
            setModal(!modal);
        };
        if (!isBeingEdited) {
        return (
            <div className='col-lg-8'>
                <div className='card mb-4'>
                    <div className='card-body'>
                        <div className='row'>
                            <div className='col-sm-3'>
                                <p className='mb-0'>First Name</p>
                            </div>
                            <div className='col-sm-9'>
                            <p className='text-muted mb-0'>{userInfo.firstName}</p>
                            </div>
                        </div>
                        <hr />

                        <div className='row'>
                            <div className='col-sm-3'>
                                <p className='mb-0'>Last Name</p>
                            </div>
                            <div className='col-sm-9'>
                                <p className='text-muted mb-0'>LastName</p>
                            </div>
                        </div>
                        <hr />
                        <div className='row'>
                            <div className='col-sm-3'>
                                <p className='mb-0'>Aritcles posted</p>
                            </div>
                            <div className='col-sm-9'>
                                <p className='text-muted mb-0'>posts</p>
                            </div>
                        </div>
                        <hr />
                        <div className='row'>
                            <div className='col-sm-3'>
                                <p className='mb-0'>Top Post</p>
                            </div>
                            <div className='col-sm-9'>
                                {/* <p className='text-muted mb-0'>
                                        {topPost ? (
                                            <Link to={`/blog/${topPost._id}`}>{topPost.title}</Link>
                                        ) : (
                                            <span>You have no posts yet :(</span>
                                        )}
                                    </p> */}
                            </div>
                        </div>
                        <hr />

                        <div className='row justify-content-md-center'>
                            <div className='col-sm-3 profile-control'>
                                <button
                                    type='button'
                                    onClick={editHandler}
                                    className='btn btn-outline-primary ms-1 '>
                                    Edit Profile
                                </button>
                            </div>
                            <div className='col-sm-3 profile-control'>
                                <button
                                    style={{ padding: '8px 20px' }}
                                    type='button'
                                    onClick={toggleModal}
                                    className='btn btn-outline-danger ms-1 '>
                                    Delete Profile
                                </button>
                                <Modal
                                    show={modal}
                                    close={toggleModal}
                                    title='Are you sure you want to delete your profile?'
                                    message='Delete message'
                                    buttonText='Delete'
                                    type='danger'
                                    callback={deleteHandler}
                                />
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        );
        } else {
            return (
                <EditProfile
                    // user={user}
                    // setIsBeingEdited={editHandler}
                    // userInfo={userInfo}
                    // topPost={topPost}
                />
            );
        }
    };

    // if (myPosts.isLoading || topPost?.isLoading || userInfo?.isLoading) {
    //     return <Loading />;
    // } else {
    return (
        // <Suspense fallback={<Loading />}>
        <section style={{ backgroundColor: '#eee' }}>
            <div className='container py-5'>
                <div className='row'>
                    {<ProfileBox />}
                </div>
                <div className='row'>
                    {/* <h5 className='col-md-12 my-3' style={{ textAlign: 'center' }}>
                            {myPosts.length === 0 ? '' : 'My Posts'}
                        </h5> */}
                </div>
                {/* <div className='row'>
                            {myPosts
                                ? myPosts.map((post) => <PostCard key={post._id} post={post} />)
                                : ''}
                        </div> */}
            </div>
        </section>
        /* </Suspense> */
    );
    // }

}