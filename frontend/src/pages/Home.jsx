import { Row, Col } from "react-bootstrap";
import { Product } from "../components";
import products from "../product";

const Home = () => {
  return (
    <div>
      <h1 className="text-center mb-4">Welcome to ProShop</h1>
      <h2 >Latest Products</h2>
      <Row>
        {products.map((product) => (
          <Col key={product._id} sm={12} md={6} lg={4} xl={3}>
            <Product product={product} />
          </Col>
        ))}
      </Row>
    </div>
  );
};
export default Home;
