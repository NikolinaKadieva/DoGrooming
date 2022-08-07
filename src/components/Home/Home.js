import { useEffect, useState } from "react";
import { PostCard } from "../PostCard/PostCard";

import * as postService from '../../services/postService';

export const Home = () => {
    const [posts, setPosts] = useState([]);

    useEffect(() => {
        postService.getAll()
        .then(result => {
            setPosts(result);
        })
    }, []);

    return (
        <div className="container pt-5">
            <div className="d-flex flex-column text-center mb-5">
                <h4 className="text-secondary mb-3">Pet Blog</h4>
                <h1 className="display-4 m-0">
                    <span className="text-primary">Updates</span> From Blog
                </h1>
            </div>
            <div className="row pb-3">
                {posts.map(x => <PostCard key={x._id} post={x}/>)}
            </div>
        </div>
    );
}; 