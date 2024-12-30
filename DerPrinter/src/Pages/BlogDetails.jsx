import { useEffect, useState } from 'react';
import AOS from 'aos';
import 'aos/dist/aos.css';
import HeaderSection from '../components/shared/BlogDetailsComponents/HeaderSection';
import DetailsSection from '../components/shared/BlogDetailsComponents/DetailsSection';
import { useParams } from 'react-router-dom';
import { fetchSingleBlogProduct } from '../Utils/GetApi';

const PlogDetails = () => {
  const {id} = useParams();
  const [product, setProduct] = useState({})
  const [loading, setLoading] = useState(true)
  useEffect(() => {
    AOS.init({ duration: 1000 });

    async function getBlog(){
      const data = await fetchSingleBlogProduct(`blogs/${id}`);
      
      setProduct(data);
      
      setLoading(false);
    }

    getBlog()
  }, [id]);


  

  return (
    <>
      <HeaderSection />
      {
        loading?<div className="container"><h1>Loading ....</h1></div>:
        <>
        <div className="container">
        <DetailsSection
          image1={product.image1}
          image2={product.image2}
          description1={product.description1}
          description2={product.description2}
          description3={product.description3}
          title={product.title}
          name={product.name}
          date={product.createdAt}
          categories={product.category.split(",")}
        />
      </div>
      </>
      }
    </>
  );
};

export default PlogDetails;

/* Add this CSS to your stylesheet */

