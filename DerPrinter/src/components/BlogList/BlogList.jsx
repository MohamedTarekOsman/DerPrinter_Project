import React, { useState, useEffect } from "react";
import BlogCard from "../BlogCard/BlogCard";
import { fetchHomeOrBlogsData } from "../../Utils/GetApi";
import BlogHero from "../BlogHero/BlogHero";

const BlogList = ({ title, id, blogsPage }) => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function loadHomeData() {
      const data = await fetchHomeOrBlogsData("blogs");

      const filteredProducts = data.filter((product) => product._id !== id);
      setProducts(filteredProducts);

      setLoading(false);
      ;
    }
    loadHomeData();
  }, [id]); 

  return (
    <div className="container mx-auto px-4 py-8">
      {title && (
        <h2 className="text-center text-2xl font-semibold mb-6">
          Unsere Produkt Highlights
        </h2>
      )}
      {loading ? (
        <p>Loading ...</p>
      ) : (
        <>
        {blogsPage ?
        <>
        <BlogHero
              image={products[0].image1}
              category={products[0].category}
              title={products[0].title}
              description={products[0].description1}
              id={products[0]._id}            
            />
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {products.map((product, index) => (
            <div key={index} className="w-full sm:w-1/1">
              <BlogCard
                image={product.image1}
                category={product.category}
                title={product.title}
                description={product.description1}
                id={product._id}
              />
            </div>
          ))}
        </div>
           </> : <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {products.map((product, index) => (
            <div key={index} className="w-full sm:w-1/1">
              <BlogCard
                image={product.image1}
                category={product.category}
                title={product.title}
                description={product.description1}
                id={product._id}
              />
            </div>
          ))}
        </div>
          }
        
        </>
      )}
    </div>
  );
};

export default BlogList;
