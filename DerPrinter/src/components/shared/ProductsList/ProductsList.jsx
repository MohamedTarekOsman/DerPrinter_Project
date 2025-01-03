/* eslint-disable react/prop-types */
import { useEffect, useState } from "react";
import ProductCard from "../ProductCard/ProductCard";
import { fetchData } from "../../../Utils/GetApi";

const ProductList = ({ categoryProducts, title, subTitle }) => {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    async function loadProducts() {
      const data = await fetchData("categories");
      setProducts(data);
    }

    loadProducts();
  }, []);

  return (
    <div className="bg-gray-100 py-5" id="Products">
      <div className="tex text-center prod-list-title">
        <h2>{title}</h2>
        {subTitle&&<p>{subTitle}</p>}
      </div>
      <div className="flex items-center justify-center bg-gray-100 p-4">
        <div className="grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm_gap-1">
          {categoryProducts ? (
            categoryProducts.length !== 0 ? (
              categoryProducts.map((product, index) => (
                <ProductCard
                  key={index}
                  product={product}
                  link={`customizations`}
                />
              ))
            ) : (
              <p>Hi Please Wait...</p>
            )
          ) : products.length > 0 ? (
            products.map((product, index) => (
              <ProductCard key={index} product={product} />
            ))
          ) : (
            <p>Loading...</p>
          )}
        </div>
      </div>
    </ div>
  );
};

export default ProductList;
