import './Catalog.css';

import { useState, useEffect, Suspense, lazy, useContext } from 'react';
import * as postService from '../../services/postService';

import {PostCard} from '../PostCard/PostCard';
// import { PostContext } from '../../contexts/PostContext';

const Catalog = () => {
  // const { posts } = useContext(PostContext);

  const [posts, setPosts] = useState([]);
  const [search, setSearch] = useState(false);
  const [nothingFound, setNothingFound] = useState(false);

  useEffect(() => {
    if (posts.length === 0 && !nothingFound) {
      postService.getAll().then((newPosts) => {
        setPosts((oldPosts) => [...oldPosts, ...newPosts]);
      });
    }
  }, [nothingFound, posts.length, search]);

  const filterPosts = (e) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    const { query } = Object.fromEntries(formData);
    console.log(query);
    postService.getAll(query).then((newPosts) => {
      if (newPosts.length !== 0) {
        setPosts((oldPosts) => [newPosts]);
        setSearch((oldSearch) => !oldSearch);
        setNothingFound(false);
      } else {
        setNothingFound(true);
      }
      setSearch((oldSearch) => !oldSearch);
    });
  };

  return (
      <div className='page-section'>
        <div className='container wow fadeInLeft'>
          <div className='row'>
            <div className='col-sm-10'>
              <form
                method='GET'
                onSubmit={filterPosts}
                className='form-search-blog'>
                <div className='input-group'>
                  <input
                    type='text'
                    className='form-control'
                    placeholder='Enter keyword..'
                    name='query'
                  />
                </div>
                <div className='col-sm-2 text-sm-right'>
                  <button type='submit' className='btn btn-primary'>
                    Search
                  </button>
                </div>
              </form>
            </div>
          </div>
          {nothingFound ? (
            <h1 className='nothing-found'>Няма намерени статии по зададените критерии.</h1>
          ) : (
            <div className='row my-5'>
              {posts.map((post) => (
                <PostCard key={post._id} post={post} />
              ))
              }

              {console.log(posts)}
            </div>
          )}
        </div>
      </div>
  );
}

export default Catalog;
