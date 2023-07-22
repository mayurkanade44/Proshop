import { Footer, Header } from "./components";
import { Container } from "react-bootstrap";
import { Home, ProductDetails } from "./pages";
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
        <Route path="/product/:id" element={<ProductDetails />} />
      </Route>
    )
  );

  return <RouterProvider router={router} />;
};
export default App;
