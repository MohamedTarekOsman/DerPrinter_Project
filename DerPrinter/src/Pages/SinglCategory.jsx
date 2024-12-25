import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { fetchSingleProduct } from '../Utils/GetApi';
import Hero from '../components/shared/hero/Hero';
import ProductList from '../components/shared/ProductsList/ProductsList';
import ProductSlider from '../components/shared/ProductsSlider/ProductsSlider';
import AboutUs from '../components/shared/AboutSection/AboutSection';
import { useDispatch, useSelector } from 'react-redux';
import {  getAllProducts } from "../Redux/actions/productsAction";
const SinglCategory = () => {
    const { id } = useParams();
    const [category, setCategory] = useState({});
    const [categoryProducts, setCategoryProducts] = useState([]);
    // const [homeData, setHomeData] = useState();
    const [loading, setLoading] = useState(true)
    const allProducts = useSelector((state) => state.products.allProducts);
    const dispatch=useDispatch()
    useEffect(() => {
      const run = async () => {
        await dispatch(getAllProducts());
        // const data = await fetchHomeOrBlogsData("homePage");
        // setHomeData(data);
      };
      run();
    }, []);
    useEffect(() => {
        async function getCategoryAndProducts() {
          try {
            const fetchedCategory = await fetchSingleProduct(`categories/${id}`);
            setCategory(fetchedCategory);
            setLoading(true);
            if (allProducts.data){
              setCategoryProducts(allProducts.data.filter((product)=>product.categoryId==id))
            }
            setLoading(false);
          } catch (error) {
            console.error("Error fetching category or products:", error);
          }
        }
      
        getCategoryAndProducts();
      }, [id,allProducts]);
      

  return (
    <>
        <Hero 
            data={category}
            className='category-hero'
        />
        {
            loading?<p>Loading</p>:categoryProducts?.length!==0?
            <ProductList 
            title={`${category.name} Produkte`}
            subTitle={"Unsere Drucklösungen für jeden Bedarf"}
            categoryProducts={categoryProducts}
            />:
            <p>No Products On THis Category</p>
        }
        <ProductSlider />
        <AboutUs 
            img={category.image}
            desc1={category.description1}
            desc2={category.description2}
            title={category.title}
            subtitle={" "}
        />
        {/* {!loading?<AboutUs  data={homeData[0]?.AboutSection}/>:<p>Loading</p>} */}
    </>
  )
}

export default SinglCategory