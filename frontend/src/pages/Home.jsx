import { Row, Col } from "react-bootstrap";
import { Loading, Message, Product } from "../components";
import { useGetProductsQuery } from "../slices/productsApiSlice";

const Home = () => {
  const { data: products, isLoading, error } = useGetProductsQuery();

  return (
    <>
      {isLoading ? (
        <Loading />
      ) : error ? (
        <Message variant="danger">
          {error?.data?.message || error.error}
        </Message>
      ) : (
        <>
          <h1 className="text-center mb-4">Welcome To ProShop</h1>
          <h2>Latest Products</h2>
          <Row>
            {products?.map((product) => (
              <Col key={product._id} sm={12} md={6} lg={4} xl={3}>
                <Product product={product} />
              </Col>
            ))}
          </Row>
        </>
      )}
    </>
  );
};
export default Home;
