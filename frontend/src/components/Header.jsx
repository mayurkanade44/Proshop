import { Navbar, Nav, Container, Badge } from "react-bootstrap";
import { FaShoppingCart, FaUser } from "react-icons/fa";
import logo from "../assets/styles/logo.png";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";

const Header = () => {
  const { cartItems } = useSelector((store) => store.cart);
  return (
    <header>
      <Navbar bg="dark" variant="dark" expand="md" collapseOnSelect>
        <Container>
          <Link to="/">
            <Navbar.Brand>
              <img src={logo} alt="proshop" />
              ProShop
            </Navbar.Brand>
          </Link>
          <Navbar.Toggle aria-controls="basic-navbar-nav" />
          <Navbar.Collapse id="basic-navbar-nav">
            <Nav className="ms-auto">
              <Nav.Link className="mx-2">
                <Link to="/cart">
                  <FaShoppingCart
                    style={{ width: 19, height: 19, marginRight: 10 }}
                  />
                  Cart
                  {cartItems.length > 0 && (
                    <Badge pill bg="success" style={{ marginLeft: "5px" }}>
                      {cartItems.reduce((a, c) => a + c.qty, 0)}
                    </Badge>
                  )}
                </Link>
              </Nav.Link>
              <Link to="/login">
                <Nav.Link>
                  <FaUser /> Sign In
                </Nav.Link>
              </Link>
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>
    </header>
  );
};
export default Header;
