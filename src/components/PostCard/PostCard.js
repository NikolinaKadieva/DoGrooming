import { Link } from "react-router-dom";

export const PostCard = ({
    post
}) => {
    return (
        <div className="col-lg-4 mb-4">
            <div className="card border-0 mb-2">
                <img className="card-img-top" src={post.imageUrl} alt="" />
                <div className="card-body bg-light p-4">
                    <h4 className="card-title text-truncate">{post.title}</h4>
                    <div className="d-flex mb-3">
                        <small className="mr-2">
                            <i className="fa fa-user text-muted" /> {post._ownerId}
                        </small>
                        <small className="mr-2">
                            <i className="fa fa-folder text-muted" /> {post.category}
                        </small>
                        <small className="mr-2">
                            <i className="fa fa-comments text-muted" /> {post.comments ? post.comments.length : -''}
                        </small>
                    </div>
                    <p>
                        {post.content.substring(0, 100)}...
                    </p>
                    <Link className="font-weight-bold" to={`/catalog/${post._id}`}>
                        Read More
                    </Link>

                    <Link className="font-weight-bold" to={`/posts/${post._id}/edit`}>
                        Edit
                    </Link>
                </div>
            </div>
        </div>
    );
};