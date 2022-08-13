import styles from './CreatePost.module.css';

import { useContext, useState } from 'react';

import { PostContext } from '../../contexts/PostContext';
import * as postService from "../../services/postService";

import { types, NotificationContext } from '../../contexts/NotificationContext';

const CreatePost = () => {
    const { postAdd } = useContext(PostContext);
    const { showNotification } = useContext(NotificationContext);
    const [isValid, setIsValid] = useState({ fields: {}, errors: {} });

    const onSubmit = (e) => {
        e.preventDefault();

      if (handleValidation()) {
        const postData = Object.fromEntries(new FormData(e.target));

        console.log(postData);

        postService.create(postData)
            .then(result => {
                showNotification(
                `Successfully created post: ${postData.title} !`,
                types.success
              );
                postAdd(result);
            });
      } else {
        showNotification(`Post could not be created!`, types.error);
      }
    };

    const handleValidation = () => {
        const fields = isValid.fields;
        const errors = {};
        let formIsValid = true;
    
        if (!fields['title']) {
          formIsValid = false;
          errors['title'] = 'Post Title is required!';
        }
    
        if (!fields['imageUrl']) {
          formIsValid = false;
          errors['imageUrl'] = 'Post Image is required!';
        }
    
        if (!fields['category']) {
          formIsValid = false;
          errors['category'] = 'Category firld is required!';
        }
    
        if (!fields['content']) {
          formIsValid = false;
          errors['content'] = 'Content should be updated from the inital value!';
        }
    
        setIsValid((oldIsValid) => {
          return { ...oldIsValid, ...{ errors: errors } };
        });
        return formIsValid;
      };

      const onTitleChangeHandler = (e) => {
        let errors = {};
        if (e.target.value.length < 9) {
          errors['title'] = 'Post Title should be at least 9 characters long!';
          setIsValid((oldIsValid) => {
            return { ...oldIsValid, ...{ errors: errors } };
          });
        } else {
          const fields = isValid.fields;
          fields[e.target.name] = e.target.name;
          errors['title'] = null;
          setIsValid((oldIsValid) => {
            return { ...oldIsValid, ...{ errors: errors }, ...fields };
          });
        }
      };

      const onImageChangeHandler = (e) => {
        let errors = {};
        let regExp = new RegExp(
          /https?:\/\/(?:www\.|(?!www))[a-zA-Z0-9][a-zA-Z0-9-]+[a-zA-Z0-9]\.[^\s]{2,}|www\.[a-zA-Z0-9][a-zA-Z0-9-]+[a-zA-Z0-9]\.[^\s]{2,}|https?:\/\/(?:www\.|(?!www))[a-zA-Z0-9]+\.[^\s]{2,}|www\.[a-zA-Z0-9]+\.[^\s]{2,}/
        );
        if (!regExp.test(e.target.value)) {
          errors['imageUrl'] = 'Post Image should be a valid URL Address!';
          setIsValid((oldIsValid) => {
            return { ...oldIsValid, ...{ errors: errors } };
          });
        } else {
          const fields = isValid.fields;
          fields[e.target.name] = e.target.name;
          errors['imageUrl'] = null;
          setIsValid((oldIsValid) => {
            return { ...oldIsValid, ...{ errors: errors }, ...fields };
          });
        }
      };

      const onCategoryChangeHandler = (e) => {
        let errors = {};
        if (e.target.value.length < 5) {
          errors['category'] = 'Category should be at least 5 characters long!';
          setIsValid((oldIsValid) => {
            return { ...oldIsValid, ...{ errors: errors } };
          });
        } else {
          const fields = isValid.fields;
          fields[e.target.name] = e.target.name;
          errors['category'] = null;
          setIsValid((oldIsValid) => {
            return { ...oldIsValid, ...{ errors: errors }, ...fields };
          });
        }
      };

      const onContentChangeHandler = (e) => {
        let errors = {};
        if (e.target.value.length < 75) {
          errors['content'] = 'Content should be at least 75 characters long!';
          setIsValid((oldIsValid) => {
            return { ...oldIsValid, ...{ errors: errors } };
          });
        } else {
          const fields = isValid.fields;
          fields[e.target.name] = e.target.name;
          errors['content'] = null;
          setIsValid((oldIsValid) => {
            return { ...oldIsValid, ...{ errors: errors }, ...fields };
          });
        }
      };

    return (
        <div className='row'>
            <div className='col-sm-12 offset-lg-2 col-lg-8 offset-xl-3 col-xl-6'>
                <h2 className='header-margin text-center text-primary'>Създай статия</h2>
                <form method='POST' onSubmit={onSubmit}>
                    <div className='form-group'>
                        <label className={styles['label']} htmlFor='title'>Заглавие</ label>
                        <input
                            className={
                                isValid.errors['postTitle']
                                  ? 'form-control notValid'
                                  : 'form-control'
                              }
                            name='title'
                            placeholder='Groomig за начинаещи...'
                            onChange={onTitleChangeHandler}
                        />
                         {isValid.errors['title'] && (
                          <p
                            className='ml-3 error-message'
                            style={{ color: 'red' }}>
                            {isValid.errors['title']}
                          </p>
                        )}
                    </div>
                    <div className='form-group'>
                        <label className={styles['label']} htmlFor='category'>Категория</ label>
                        <input
                             className={
                                isValid.errors['category']
                                  ? 'form-control notValid'
                                  : 'form-control'
                              }
                            name='category'
                            placeholder='Хигиена, здраве, обучение...'
                            onChange={onCategoryChangeHandler}
                        />
                         {isValid.errors['category'] && (
                          <p
                            className='ml-3 error-message'
                            style={{ color: 'red' }}>
                            {isValid.errors['category']}
                          </p>
                        )}
                    </div>
                    <div className='form-group'>
                        <label className={styles['label']} htmlFor='imageUrl'>Снимка</label>
                        <input
                            name='imageUrl'
                            className={
                                isValid.errors
                                  ? isValid.errors['imageUrl']
                                    ? 'form-control notValid'
                                    : 'form-control'
                                  : 'form-control'
                              }
                            placeholder='Your URL here...'
                            onChange={onImageChangeHandler}
                        />
                         {isValid.errors['imageUrl'] && (
                          <p
                            className='ml-3 error-message'
                            style={{ color: 'red' }}>
                            {isValid.errors['imageUrl']}
                          </p>
                        )}
                    </div>
                    <div className='form-group'>
                        <label className={styles['label']} htmlFor='content'>Съдържание</label>
                        <textarea
                            name='content'
                            rows={4}
                            className={
                                isValid.errors
                                  ? isValid.errors['content']
                                    ? 'form-control notValid'
                                    : 'form-control'
                                  : 'form-control'
                              }
                            placeholder="Подстригването на кучета се отнася както до хигиенните грижи и почистването на кучето, така и до процес, чрез който физическият външен вид на кучето се подобрява за показване или други видове състезания."
                            defaultValue={''}
                            onChange={onContentChangeHandler}
                        />
                           {isValid.errors['content'] && (
                          <p
                            className='ml-3 error-message'
                            style={{ color: 'red' }}>
                            {isValid.errors['content']}
                          </p>
                        )}
                    </div>
                    <button type='submit' className='btn btn-primary float-right mt-3'>
                        Create Post
                    </button>
                </form>
            </div>
        </div>
    );
};
export default CreatePost;