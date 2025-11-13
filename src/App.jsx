import { BrowserRouter, Route, Routes } from "react-router-dom";
import { useState } from "react";
import { useEffect } from "react";
import Components from "./pages/components";
import "./App.css";
import Home from "./pages/Home";
import Calculator from "./pages/Calculator";
import Animation from "./pages/Animation";
import ForwardToHome from "./pages/ForwardToHome";
import AppLayout from "./layouts/AppLayout";
import Todos from "./pages/Todos";
import { fetchProducts } from "./data/products";
import Carts from "./pages/carts";
import Products from "./pages/Products";
import Login from "./pages/Login";

function App() {
  const [token, setToken] = useState("");
  const [role,setRole] = useState("")
  const [products, setProducts] = useState([]);
  const [carts, setCarts] = useState([]);

  useEffect(() => setProducts(fetchProducts()), []);

  useEffect(() => console.log(products), [products]);

  if (token === "") {
    return <Login setToken={setToken} setRole={setRole}/>;
  } else {
    return (
      <BrowserRouter basename="/csi205/">
        <Routes>
          <Route element={<AppLayout products={products} carts={carts} setToken={setToken}/>}>
            <Route path="home" element={<Home />} />
            <Route path="calculator" element={<Calculator />} />
            <Route path="animation" element={<Animation />} />
            <Route path="components" element={<Components />} />
            <Route path="*" element={<ForwardToHome />} />
            <Route path="todos" element={<Todos />} />
            <Route
              path="products"
              element={
                <Products
                  products={products}
                  carts={carts}
                  setCarts={setCarts}
                />
              }
            />
            <Route
              path="carts"
              element={<Carts carts={carts} setCarts={setCarts} />}
            />
          </Route>
        </Routes>
      </BrowserRouter>
    );
  }
}

export default App;
