Reactive Blog
Reactive Blog is a web blog application.

Public Part (Accessible without authentication) - access control
The public part of the project is visible without authentication
Home page
Navigation menu: Giving access only to the pages, intended for users with free access - home page, blog, user login and registration
Blog: Showing all blog posts and their content
Access to detailed information about each listing - image, description, category and comments.

Private Part (Available for Registered Users) - access control
Registered users have personal areas in the web application accessible after their successful login:
Profile page containing information about the current user:
Access to post details page
Create new post.

Technologies
React.JS, NodeJS, ExpressJS, MongoDB, JavaScript, CSS, HTML

Implementation
Data structure
Collections
Users
{
    email: String,
    password: String,
}

Blog Post
{
    title: String,
    category: Array,
    imageUrl: String,
    dateOfCreation: Date,
    content: String, //(This keeps the blog body as a String of HTML that is parsed to HTML on the Client Side)
    comments: Array, //Comment structure can be found below

}

Comment
{
    author: Pointer<User>,
    comment: String, //(The comment body)
}
  
  Additional functionality
Dynamic Form Validation
Demonstrates use of programming concepts - React Hooks, Context API
Integration of the following APIs:
Good UI and UX (Fully responsive)
  
Todos
Add notifciation on the //TODOs
Implement change password funtionality
Implement e-mail confirmation funtionality
Implement e-mail change functionality
