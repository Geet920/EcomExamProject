import { BrowserRouter, Route, Routes } from "react-router-dom";
import Cart from "./Ecommerce/pages/Cart";
import Home from "./Ecommerce/pages/Home";
import Login from "./Ecommerce/pages/Login";
import Product from "./Ecommerce/pages/Product";
import ProductList from "./Ecommerce/pages/ProductList";
import Register from "./Ecommerce/pages/Register";
import Categories from "./Ecommerce/components/Categories";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route exact path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/cart" element={<Cart />} />
        <Route path="/categories" element={<Categories />} />
        <Route path="/register" element={<Register />} />
        <Route path="/product" element={<Product />} />
        <Route path="/productlist" element={<ProductList />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
