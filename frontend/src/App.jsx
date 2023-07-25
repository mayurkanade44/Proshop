import { Footer, Header } from "./components";
import { Container } from "react-bootstrap";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { Cart, Home, Login, ProductDetails, Register } from "./pages";
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
        <ToastContainer />
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
        <Route path="/cart" element={<Cart />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/product/:id" element={<ProductDetails />} />
      </Route>
    )
  );

  return <RouterProvider router={router} />;
};
export default App;
