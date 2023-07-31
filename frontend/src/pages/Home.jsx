import { Row, Col } from "react-bootstrap";
import {
  Loading,
  Message,
  Meta,
  Paginate,
  Product,
  ProductCarousel,
} from "../components";
import { useGetProductsQuery } from "../slices/productsApiSlice";
import { Link, useParams } from "react-router-dom";

const Home = () => {
  const { page, keyword } = useParams();
  const { data, isLoading, error } = useGetProductsQuery({ page, keyword });

  return (
    <>
      {keyword ? (
        <Link to="/" className="btn btn-secondary">
          Back
        </Link>
      ) : (
        <ProductCarousel />
      )}
      {isLoading ? (
        <Loading />
      ) : error ? (
        <Message variant="danger">
          {error?.data?.message || error.error}
        </Message>
      ) : (
        <>
          <Meta />
          <h1 className="text-center mb-4">Welcome To ProShop</h1>
          <h2>Latest Products</h2>
          <Row>
            {data.products?.map((product) => (
              <Col key={product._id} sm={12} md={6} lg={4} xl={3}>
                <Product product={product} />
              </Col>
            ))}
          </Row>
          <Paginate pages={data.pages} page={data.page} />
        </>
      )}
    </>
  );
};
export default Home;
