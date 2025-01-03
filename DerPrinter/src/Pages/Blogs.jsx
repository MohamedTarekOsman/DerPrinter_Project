import React from 'react';
import BlogList from "../components/BlogList/BlogList";

const Blogs = () => {
  return (
    <>
        <h1 className='text-center blog-title'>Blogs</h1>
        <BlogList blogsPage={true}/>
    </>
  )
}

export default Blogs