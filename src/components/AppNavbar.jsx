import { Link } from "react-router-dom";
import React, { useState, useEffect } from "react";
import Button from "react-bootstrap/Button";
import "bootstrap/dist/css/bootstrap.min.css";

const AppNavbar = ({ products, carts, setToken }) => {
  const [active, setActive] = useState("home");

  // เมื่อโหลดหน้า → ตั้ง active ให้ตรงกับ URL ปัจจุบัน
  useEffect(() => {
    const current = window.location.pathname.replace("/", "");
    if (current) setActive(current);
  }, []);

  return (
    <div className="d-flex justify-content-center gap-3">
      <Link to="home" onClick={() => setActive("home")}>
        <Button variant={active === "home" ? "primary" : "outline-primary"}>
          Home
        </Button>
      </Link>

      <Link to="calculator" onClick={() => setActive("calculator")}>
        <Button
          variant={active === "calculator" ? "primary" : "outline-primary"}
        >
          Calculator
        </Button>
      </Link>

      <Link to="animation" onClick={() => setActive("animation")}>
        <Button
          variant={active === "animation" ? "primary" : "outline-primary"}
        >
          Animation
        </Button>
      </Link>

      <Link to="components" onClick={() => setActive("components")}>
        <Button
          variant={active === "components" ? "primary" : "outline-primary"}
        >
          Components
        </Button>
      </Link>

      <Link to="todos" onClick={() => setActive("todos")}>
        <Button variant={active === "todos" ? "primary" : "outline-primary"}>
          Todos
        </Button>
      </Link>

      <Link to="products" onClick={() => setActive("products")}>
        <Button variant={active === "products" ? "primary" : "outline-primary"}>
          Products ({products.length})
        </Button>
      </Link>

      <Link to="carts" onClick={() => setActive("carts")}>
        <Button
          className="position-relative"
          variant={active === "carts" ? "primary" : "outline-primary"}
        >
          Carts
          {carts.length > 0 && (
            <span class="position-absolute top-0 start-100 translate-middle badge rounded-pill bg-danger">
              {carts.length < 10 ? carts.length : '9+'}
              <span class="visually-hidden">unread messages</span>
            </span>
          )}
        </Button>
      </Link>
      <button className="btn btn-outline-danger" onClick={()=>{setToken('')}}>
        Logout
      </button>
    </div>
  );
};

export default AppNavbar;
