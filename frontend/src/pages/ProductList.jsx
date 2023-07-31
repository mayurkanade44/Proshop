import { Table, Button, Row, Col } from "react-bootstrap";
import { FaEdit, FaPlus, FaTrash } from "react-icons/fa";
import {
  useCreateOrderMutation,
  useGetAllOrdersQuery,
} from "../slices/orderApiSlice";
import { Loading, Message } from "../components";
import { Link, useParams } from "react-router-dom";
import { toast } from "react-toastify";
import {
  useCreateProductMutation,
  useDeleteProductMutation,
  useGetProductsQuery,
} from "../slices/productsApiSlice";

const ProductList = () => {
  const { page } = useParams();

  const { data, isLoading, error, refetch } = useGetProductsQuery({ page });
  const [deleteProduct, { isLoading: loadingDelete }] =
    useDeleteProductMutation();
  const [createProduct, { isLoading: loadingCreate }] =
    useCreateProductMutation();

  const createProductHandler = async () => {
    try {
      await createProduct().unwrap();
      refetch();
      toast.success("Sample product created");
    } catch (error) {
      console.log(error);
      toast.error(error?.data?.message || error.error);
    }
  };

  const deleteHandler = async (productId) => {
    try {
      const res = await deleteProduct(productId).unwrap();
      refetch();
      toast.success(res.message);
    } catch (error) {
      console.log(error);
      toast.error(error?.data?.message || error.error);
    }
  };

  return (
    <>
      <Row className="align-items-center">
        <Col>
          <h1>Products</h1>
        </Col>
        <Col className="text-end">
          <Button className="my-3" onClick={createProductHandler}>
            <FaPlus /> Create Product
          </Button>
        </Col>
      </Row>
      {(loadingCreate || loadingDelete) && <Loading />}
      {isLoading ? (
        <Loading />
      ) : error ? (
        <Message variant="danger">{error.data.message}</Message>
      ) : (
        <>
          <Table striped bordered hover responsive className="table-sm">
            <thead>
              <tr>
                <th>ID</th>
                <th>NAME</th>
                <th>PRICE</th>
                <th>CATEGORY</th>
                <th>BRAND</th>
                <th></th>
              </tr>
            </thead>
            <tbody>
              {data.products.map((product) => (
                <tr key={product._id}>
                  <td>{product._id}</td>
                  <td>{product.name}</td>
                  <td>${product.price}</td>
                  <td>{product.category}</td>
                  <td>{product.brand}</td>
                  <td>
                    <Link
                      className="btn-sm mx-3"
                      to={`/admin/product/edit/${product._id}`}
                    >
                      <FaEdit />
                    </Link>
                    <Button
                      variant="danger"
                      className="btn btn-sm"
                      onClick={() => deleteHandler(product._id)}
                    >
                      <FaTrash style={{ color: "white" }} />
                    </Button>
                  </td>
                </tr>
              ))}
            </tbody>
          </Table>
        </>
      )}
    </>
  );
};
export default ProductList;
