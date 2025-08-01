import {
  Route,
  createBrowserRouter,
  createRoutesFromElements,
  RouterProvider
} from 'react-router-dom';
import MainLayout from './components/MainLayout';
import HomePage from './pages/HomePage';
import Contact from './pages/Contact';
import About from './pages/About';
import SignUp from './pages/SignUp';
import LogIn from './pages/LogIn';
import WishList from './pages/WishList';
import Cart from './pages/Cart';
import CheckOut from './pages/CheckOut';
import ProductDetails from './pages/ProductDetails';
import ProdCat from './pages/ProdCat';
import BestSellingProd from './components/Home/BestSellingProd';
import FlashSalesAll from './pages/FlashSalesAll';
import ErrorPage from './pages/ErrorPage';
import { Toaster } from 'react-hot-toast';

const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path="/" element={<MainLayout />} errorElement={<ErrorPage />}>
      <Route index element={<HomePage />} />
      <Route path="contact" element={<Contact />} />
      <Route path="about" element={<About />} />
      <Route path="sign-up" element={<SignUp />} />
      <Route path="log-in" element={<LogIn />} />
      <Route path="wish-list" element={<WishList />} />
      <Route path="cart" element={<Cart />} />
      <Route path="check-out" element={<CheckOut />} />
      <Route path="product-details" element={<ProductDetails />} />
      <Route path="flash-sales-all" element={<FlashSalesAll />} />
      <Route path="/category/:categoryName" element={<ProdCat />} />
      <Route path="/products/:categoryName/:productId" element={<ProductDetails />} />
      <Route path="/products/:categoryName" element={<BestSellingProd />} />
    </Route>
  )
);

function App() {
  return (
    <>
      <Toaster position="bottom-center" toastOptions={{ duration: 2000 }} />
      <RouterProvider router={router} />
    </>
  );
}

export default App;
