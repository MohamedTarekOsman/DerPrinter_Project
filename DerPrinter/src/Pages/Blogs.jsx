import React from 'react';
import BlogHero from "../components/BlogHero/BlogHero";
import BlogList from "../components/BlogList/BlogList";

const Blogs = () => {
  return (
    <>
        <h1 className='text-center blog-title'>Blogs</h1>
        <BlogHero />
        <BlogList />
    </>
  )
}

export default Blogs