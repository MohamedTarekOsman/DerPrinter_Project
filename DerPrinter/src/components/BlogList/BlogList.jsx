import React, { useState, useEffect } from "react";
import BlogCard from "../BlogCard/BlogCard";
import { fetchHomeOrBlogsData } from "../../Utils/GetApi";

const BlogList = ({ title, id }) => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function loadHomeData() {
      const data = await fetchHomeOrBlogsData("blogs");

      // استبعاد المنتج الذي يحتوي على نفس _id
      const filteredProducts = data.filter((product) => product._id !== id);
      setProducts(filteredProducts);

      setLoading(false);
      ;
    }
    loadHomeData();
  }, [id]); // إضافة `id` كاعتماد لإعادة تحميل البيانات عند تغييره

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
      )}
    </div>
  );
};

export default BlogList;
