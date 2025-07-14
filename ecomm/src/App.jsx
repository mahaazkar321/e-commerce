import { 
  Route, 
  createBrowserRouter, 
  createRoutesFromElements, 
  RouterProvider,
  ScrollRestoration
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
import ErrorPage from './pages/ErrorPage'; // Create this new component

const router = createBrowserRouter(
  createRoutesFromElements(
    <Route 
      path="/" 
      element={<MainLayout />}
      errorElement={<ErrorPage />} // Add error boundary
    >
      <Route index element={<HomePage />} />
      <Route path='contact' element={<Contact />} />
      <Route path='about' element={<About />} />
      <Route path='sign-up' element={<SignUp />} />
      <Route path='log-in' element={<LogIn/>}/> 
      <Route path='wish-list' element={<WishList/>}/> 
      <Route path='cart' element={<Cart/>}/> 
      <Route path='check-out' element={<CheckOut/>}/> 
      <Route path='product-details' element={<ProductDetails/>}/> 

    </Route>
  )
);

function App() {
  return <RouterProvider router={router} />;
}

export default App;