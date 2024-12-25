import {
  Route,
  createBrowserRouter,
  createRoutesFromElements,
} from "react-router-dom";
import RootLayout from "../Pages/Layout";
import Home from "../Pages/Home";
import Customizations from "../Pages/product_customizations/Customizations";
import Login from "../Pages/Auth/Login";
import Signup from "../Pages/Auth/Signup";
import Cart from "../Pages/Cart/Cart";
import Blogs from "../Pages/Blogs";
import ContactUs from "../Pages/ContactUs";
import OrderOverview from "../Pages/Orders/OrderOverview";
import AddressBook from "../Pages/Address/AddressBook";
import AuthUser from "../middleware/AuthUser";
import AdminUser from "../middleware/AdminUser";
import AdminDashBoard from "../Pages/Admin/AdminDashBoard";
import Overview from "../components/Overview";
import SinglCategory from "../Pages/SinglCategory";
import PaymentMethod from "../Pages/paymentMethod/paymentMethod";
// import Index from "../Pages/Admin/slider/Index";
// import AdminSlider from "../Pages/Admin/slider/AdminSlider";
import UpdateSlider from "../Pages/Admin/slider/UpdatedSlider";
import AGB from "../Pages/privacy pages/AGB";
import Datenschutz from "../Pages/privacy pages/Datenschutz";
import Impressum from "../Pages/privacy pages/Impressum";
import UserAddress from "../Pages/Address/UserAddress";
import BlogDetails from "../Pages/BlogDetails";
import AboutUsPage from "../Pages/AboutUs";
import CreateBlog from "../Pages/Admin/blog/CreateBlog";
import UpdateBlog from "../Pages/Admin/blog/UpdateBlog";
import Index from "../Pages/Admin/blog/Index";

const Router = createBrowserRouter(
  createRoutesFromElements(
    <>
      <Route path="/" element={<RootLayout />}>
        <Route index element={<Home />} />
        <Route path="/customizations/:id" element={<Customizations />} />
        <Route path="/cart" element={<Cart />} />
        <Route path="/OrderOverview" element={<OrderOverview />} />
        <Route path="/AddressBook" element={<AddressBook />} />
        <Route path="/address" element={<UserAddress />} />
        <Route path="/PaymentMethod" element={<PaymentMethod />} />

        <Route path="/AGB" element={<AGB />} />
        <Route path="/Datenschutz" element={<Datenschutz />} />
        <Route path="/Impressum" element={<Impressum />} />

        <Route
          path="/login"
          element={
            <AuthUser>
              <Login />
            </AuthUser>
          }
        />

        <Route path="/blogs" element={<Blogs />} />
        <Route path="/contact-us" element={<ContactUs />} />
        <Route path="/Category/:id" element={<SinglCategory />} />
        <Route path="/about-us" element={<AboutUsPage />} />
        <Route path="/Category/:id" element={<SinglCategory />} />
        <Route path="/blogDetails/:id" element={<BlogDetails />} />

        <Route
          path="/signup"
          element={
            <AuthUser>
              <Signup />
            </AuthUser>
          }
        />
        <Route
          path="/dashboard"
          element={
            <AdminUser>
              <AdminDashBoard />
            </AdminUser>
          }
        >
          <Route path="" element={<Overview />} />
          <Route path="slider/:_id" element={<UpdateSlider />} />

          {/* Blog */}
          <Route path="blog">
            <Route index element={<Index />} />
            <Route path="create" element={<CreateBlog />} />
            <Route path=":_id" element={<UpdateBlog />} />
          </Route>
        </Route>
      </Route>
    </>
  )
);

export default Router;
