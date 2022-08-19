import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import Cart from "./pages/Cart";
import Home from "./pages/Home";
import Login from "./pages/Login";
import Product from "./pages/Product";
import ProductList from "./pages/ProductList";
import Register from "./pages/Register";
import Order from "./pages/Order";
import Orders from "./pages/Orders";
import Categories from "./components/Categories";
import Pay from "./reactStripe/Pay";
import Success from "./reactStripe/Success";
import { useSelector } from "react-redux";
import Account from "./pages/Account";
import Wishlist from "./pages/Wishlist";

function App() {
  const user = useSelector((state) => state.user.currentUser);
  return (
    <BrowserRouter>
      <Routes>
        <Route exact path="/" element={<Home />} />
        <Route path="/cart" element={<Cart />} />
        <Route path="/categories" element={<Categories />} />
        <Route path="/product/:id" element={<Product />} />
        <Route path="/products/:category" element={<ProductList />} />
        <Route path="/wishlist" element={<Wishlist />} />
        <Route path="/login" element={user ? <Navigate to="/" /> : <Login />} />
        <Route
          path="/register"
          element={user ? <Navigate to="/" /> : <Register />}
        />
        <Route
          path="/account"
          element={user === null ? <Navigate to="/" /> : <Account />}
        />
        <Route
          path="/orders"
          element={user === null ? <Navigate to="/login" /> : <Orders />}
        />
        <Route
          path="/order/:id"
          element={user === null ? <Navigate to="/login" /> : <Order />}
        />
        <Route path="/pay" element={<Pay />} />
        <Route path="/success" element={<Success />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
