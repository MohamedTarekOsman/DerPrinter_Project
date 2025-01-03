import React from "react";

const BlogHero = ({ image, category, title, description, id }) => {
  return (
    <>
      <div className="pb-20 blog-hero-container">
        <div className="blog-hero flex flex-col md:flex-row items-center bg-gray-100 rounded-xl shadow-lg">
          {/* النصوص */}
          <div className="flex-1 blog-hero-text p-12">
            <p className="text-sm text-red-600 font-semibold uppercase">
              {category}
            </p>
            <h2 className="text-xl font-bold mt-2">{title}</h2>
            <p className="text-gray-600 mt-4 pb-4">{description}</p>
            <a
              href={`/blogDetails/${id}`}
              className="mt-6 px-4 py-2 bg-black text-white rounded-md hover:bg-gray-800"
            >
              Lesen
            </a>
          </div>
          <div className="flex-1 blog-hero-img">
            <img
              src={image}
              alt="Visitenkarten"
              className="rounded-xl w-full h-auto"
            />
          </div>
        </div>
      </div>
    </>
  );
};

export default BlogHero;
