import { Table, Button } from "react-bootstrap";
import { FaTimes } from "react-icons/fa";
import { useGetAllOrdersQuery } from "../slices/orderApiSlice";
import { Loading, Message } from "../components";
import { Link } from "react-router-dom";

const OrderList = () => {
  const { data: orders, isLoading, error } = useGetAllOrdersQuery();
  return (
    <>
      {" "}
      <h1>Orders</h1>
      {isLoading ? (
        <Loading />
      ) : error ? (
        <Message variant="danger">
          {error?.data?.message || error.error}
        </Message>
      ) : (
        <Table striped bordered hover responsive className="table-sm">
          <thead>
            <tr>
              <th>ID</th>
              <th>USER</th>
              <th>DATE</th>
              <th>TOTAL</th>
              <th>PAID</th>
              <th>DELIVERED</th>
              <th></th>
            </tr>
          </thead>
          <tbody>
            {orders.map((order) => (
              <tr key={order._id}>
                <td>{order._id}</td>
                <td>{order.user && order.user.name}</td>
                <td>{order.createdAt.substring(0, 10)}</td>
                <td>${order.totalPrice}</td>
                <td>
                  {order.isPaid ? (
                    order.paidAt.substring(0, 10)
                  ) : (
                    <FaTimes style={{ color: "red" }} />
                  )}
                </td>
                <td>
                  {order.isDelivered ? (
                    order.deliveredAt.substring(0, 10)
                  ) : (
                    <FaTimes style={{ color: "red" }} />
                  )}
                </td>
                <td>
                  <Button variant="light" className="btn-sm">
                    <Link to={`/order/${order._id}`}>Details</Link>
                  </Button>
                </td>
              </tr>
            ))}
          </tbody>
        </Table>
      )}
    </>
  );
};
export default OrderList;
