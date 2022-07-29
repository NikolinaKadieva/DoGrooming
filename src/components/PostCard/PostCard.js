import { Link } from "react-router-dom";

export const PostCard = (post) => {
    return (
        <div className="col-lg-4 mb-4">
            <div className="card border-0 mb-2">
                <img className="card-img-top" src="img/blog-2.jpg" alt="" />
                <div className="card-body bg-light p-4">
                    <h4 className="card-title text-truncate">Diam amet eos at no eos</h4>
                    <div className="d-flex mb-3">
                        <small className="mr-2">
                            <i className="fa fa-user text-muted" /> Admin
                        </small>
                        <small className="mr-2">
                            <i className="fa fa-folder text-muted" /> Web Design
                        </small>
                        <small className="mr-2">
                            <i className="fa fa-comments text-muted" /> 15
                        </small>
                    </div>
                    <p>
                        Diam amet eos at no eos sit lorem, amet rebum ipsum clita stet, diam
                        sea est diam eos, rebum sit vero stet justo
                    </p>
                    <Link className="font-weight-bold" to="#">
                        Read More
                    </Link>
                </div>
            </div>
        </div>
    );
};