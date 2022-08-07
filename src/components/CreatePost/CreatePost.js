import './CreatePost.css';
import { useContext } from 'react';

import { PostContext } from '../../contexts/PostContext';
import * as postService from "../../services/postService";

const CreatePost = () => {
    const { postAdd } = useContext(PostContext);

    const onSubmit = (e) => {
        e.preventDefault();

        const postData = Object.fromEntries(new FormData(e.target));

        console.log(postData);

        postService.create(postData)
            .then(result => {
                postAdd(result);
            });
    }

    return (
        <div className='row'>
            <div className='col-sm-12 offset-lg-2 col-lg-8 offset-xl-3 col-xl-6'>
                <h2 className='header-margin text-center text-primary'>Създай статия</h2>
                <form method='POST' onSubmit={onSubmit}>
                    <div className='form-group'>
                        <label className='label' htmlFor='title'>Заглавие</ label>
                        <input
                            className='form-control'
                            name='title'
                            placeholder='Groomig за начинаещи...'
                        />
                    </div>
                    <div className='form-group'>
                        <label className='label' htmlFor='category'>Категория</ label>
                        <input
                            className='form-control'
                            name='category'
                            placeholder='Хигиена, здраве, обучение...'
                        />
                    </div>
                    <div className='form-group'>
                        <label className='label' htmlFor='imageUrl'>Снимка</label>
                        <input
                            name='imageUrl'
                            className='form-control'
                            placeholder='Your URL here...'
                        />
                    </div>
                    <div className='form-group'>
                        <label className='label' htmlFor='content'>Съдържание</label>
                        <textarea
                            name='content'
                            rows={4}
                            className="form-control"
                            placeholder="Подстригването на кучета се отнася както до хигиенните грижи и почистването на кучето, така и до процес, чрез който физическият външен вид на кучето се подобрява за показване или други видове състезания."
                            defaultValue={''}
                        />
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