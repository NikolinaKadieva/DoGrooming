import styles from './Home.module.css';

import { PostCard } from "../PostCard/PostCard";
import { useContext } from 'react';
import { PostContext } from '../../contexts/PostContext';

export const Home = () => {
    const {posts} = useContext(PostContext);
    return (
        <div className="container pt-5">
            <div className="d-flex flex-column text-center mb-5">
                <h4 className="text-secondary mb-3">Pet Blog</h4>
                <h1 className="display-4 m-0">
                    <span className="text-primary">Последни</span> статии
                </h1>
            </div>
            <div className="row pb-3">
                {posts.length > 0
                    ? posts.map(x => <PostCard key={x._id} post={x}/>)
                    : <p className={styles['no-articles']}>Няма добавени статии</p>
                }
            </div>
        </div>
    );
}; 