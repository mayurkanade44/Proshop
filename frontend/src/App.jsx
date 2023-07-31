import { Footer, Header, PrivateRoute, AdminRoute } from "./components";
import { Container } from "react-bootstrap";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import {
  Cart,
  Home,
  Login,
  Order,
  Payment,
  PlaceOrder,
  ProductDetails,
  Profile,
  Register,
  Shipping,
  OrderList,
  ProductList,
  ProductEdit,
  UserList,
  UserEdit,
} from "./pages";
import {
  Outlet,
  Route,
  createBrowserRouter,
  createRoutesFromElements,
  RouterProvider,
} from "react-router-dom";

const App = () => {
  const Layout = () => {
    return (
      <>
        <ToastContainer autoClose="2000" />
        <Header />
        <main className="py-3">
          <Container>
            <Outlet />
          </Container>
        </main>
        <Footer />
      </>
    );
  };

  const router = createBrowserRouter(
    createRoutesFromElements(
      <Route path="/" element={<Layout />}>
        <Route index={true} path="/" element={<Home />} />
        <Route path="/search/:keyword" element={<Home />} />
        <Route path="/page/:page" element={<Home />} />
        <Route path="/search/:keyword/page/:page" element={<Home />} />
        <Route path="/cart" element={<Cart />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/product/:id" element={<ProductDetails />} />

        <Route path="" element={<PrivateRoute />}>
          <Route path="/shipping" element={<Shipping />} />
          <Route path="/payment" element={<Payment />} />
          <Route path="/placeorder" element={<PlaceOrder />} />
          <Route path="/order/:id" element={<Order />} />
          <Route path="/profile" element={<Profile />} />
        </Route>

        <Route path="" element={<AdminRoute />}>
          <Route path="/admin/orderList" element={<OrderList />} />
          <Route path="/admin/productList" element={<ProductList />} />
          <Route path="/admin/product/edit/:id" element={<ProductEdit />} />
          <Route path="/admin/userList" element={<UserList />} />
          <Route path="/admin/user/edit/:id" element={<UserEdit />} />
        </Route>
      </Route>
    )
  );

  return <RouterProvider router={router} />;
};
export default App;
