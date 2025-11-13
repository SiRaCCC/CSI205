import { Outlet } from "react-router-dom";

import AppHeader from "../components/AppHeader";
import AppNavbar from "../components/AppNavbar";
import AppFooter from "../components/AppFooter";
// set web layout
const AppLayout = ( {products,carts,setToken}) => {
  return (
    <div className="rounded-3 p-3 mx-auto m-3">
      <AppHeader />
      <AppNavbar products={products} carts={carts} setToken={setToken}/>
      <div className="m-2" style={{minHeight:'300px'}}>
      <Outlet/>
      </div>
      <AppFooter/>
    </div>
  );
};

export default AppLayout;
