import { useParams } from "react-router-dom";

const Details = ({posts}) => {
    const { postId} = useParams();

    const post = posts.find(x => x._id === postId);
    return(

<section className="py-5">
  <div className="container">
    <h1 style={{ margin: "2%", textAlign: "center" }}>{post.title}</h1>
    <div>
      <div className="form-group text-center">
        <img
          src={post.imageUrl}
          width={600}
          height={300}
          className="img-fluid"
        />
      </div>
      <div className="form-group">
        <label htmlFor="typeOfConstruction">Type of construction</label>
        <input
          type="text"
          readOnly=""
          className="form-control"
          id="typeOfConstruction"
          name="TypeOfConstruction"
          defaultValue="@Model.TypeOfConstruction"
        />
      </div>
      <div className="form-group">
        <label htmlFor="categoryName">Category</label>
        <input
          type="text"
          readOnly=""
          className="form-control"
          id="categoryName"
          defaultValue={post.category}
        />
      </div>
      <div className="form-group">
        <label htmlFor="description">Description</label>
        <input
          type="text"
          readOnly=""
          className="form-control"
          id="description"
          name="Description"
          defaultValue={post.content}
        />
      </div>
    </div>
  </div>
</section>


    //     <>
    //     <div className='header'>
    //       <div className='post-thumb'>
    //         <img src={post.imageUrl} alt='' />
    //       </div>
    //       <div className='meta-header'>
    //         {/* <div className='post-author'>
    //           <div className='avatar'>
    //             <img src={post.author?.avatar} alt='' />
    //           </div>
    //           <Link to={`/public-profile/${post.author?._id}`}>
    //             {post.author?.firstName} {post.author?.lastName}
    //           </Link>
    //         </div> */}
    //         {/* {user.userId === post._ownerId ? (
    //           <div className='d-flex edit-delete'>
    //             <button
    //               onClick={editHandler}
    //               type='button'
    //               className='mr-2 btn btn-outline-primary ms-1 '>
    //               Edit
    //             </button>
    //             <button
    //               onClick={toggleDeleteModal}
    //               type='button'
    //               className='btn btn-outline-danger ms-1 '>
    //               Delete
    //             </button>
    //           </div>
    //         ) : null} */}
    //       </div>
    //     </div>
    //     <h1 className='post-title'>
    //         {post.title}
    //     </h1>

    //     <div className='post-meta'>
    //       <div className='post-date'>
    //         <span className='icon'>
    //           <span className='mai-time-outline'></span>
    //         </span>{' '}
    //         {/* {post.dateOfCreation.substring(0, 10)} */}
    //       </div>
    //       <div className='post-comment-count ml-2'>
    //         <span className='icon'>
    //           <span className='mai-chatbubbles-outline'></span>
    //         </span>{' '}
    //         {/* {post.comments.length} Comments */}
    //       </div>
    //     </div>
    //     <div className='post-content'>
    //         {post.content}
    //         {/* {parse(post.description)} */}
    //         </div>
    //   </>
    );   
};

export default Details;