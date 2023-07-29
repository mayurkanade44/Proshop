import { Table, Button } from "react-bootstrap";
import { FaTrash, FaEdit, FaCheck, FaTimes } from "react-icons/fa";
import { toast } from "react-toastify";
import { Link } from "react-router-dom";
import { Loading, Message } from "../components";
import {
  useDeleteUserMutation,
  useGetUsersQuery,
} from "../slices/usersApiSlice";

const UserList = () => {
  const { data: users, refetch, isLoading, error } = useGetUsersQuery();
  const [deleteUser, { isLoading: loadingDelete }] = useDeleteUserMutation();

  const deleteHandler = async (userId) => {
    try {
      const res = await deleteUser(userId).unwrap();
      toast.success(res.message);
      refetch();
    } catch (error) {
      console.log(error);
      toast.error(error?.data?.message || error.error);
    }
  };

  return (
    <>
      <h1>Users</h1>
      {loadingDelete && <Loading />}
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
              <th>NAME</th>
              <th>EMAIL</th>
              <th>ADMIN</th>
              <th></th>
            </tr>
          </thead>
          <tbody>
            {users.map((user) => (
              <tr key={user._id}>
                <td>{user._id}</td>
                <td>{user.name}</td>
                <td>
                  <a href={`mailto:${user.email}`}>{user.email}</a>
                </td>
                <td>
                  {user.isAdmin ? (
                    <FaCheck style={{ color: "green" }} />
                  ) : (
                    <FaTimes style={{ color: "red" }} />
                  )}
                </td>
                <td>
                  {!user.isAdmin && (
                    <>
                      <Link
                        to={`/admin/user/edit/${user._id}`}
                        style={{ marginRight: "10px" }}
                      >
                        <FaEdit />
                      </Link>
                      <Button
                        variant="danger"
                        className="btn-sm"
                        onClick={() => deleteHandler(user._id)}
                      >
                        <FaTrash style={{ color: "white" }} />
                      </Button>
                    </>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </Table>
      )}
    </>
  );
};
export default UserList;
