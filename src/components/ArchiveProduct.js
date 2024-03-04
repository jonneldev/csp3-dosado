import { Button } from "react-bootstrap";
import Swal from "sweetalert2";

export default function ArchiveProduct({ product, isActive, fetchData }) {
  const archiveToggle = (productId) => {
    fetch(`${process.env.REACT_APP_API_URL}/products/${productId}/archive`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
    })
      .then((res) => res.json())
      .then((data) => {
        if (data === true) {
          Swal.fire({
            title: "Success",
            icon: "success",
            text: "Product successfully disabled",
          });
          fetchData();
        } else {
          Swal.fire({
            title: "Something went wrong",
            icon: "error",
            text: "Please Try Again",
          });
          fetchData();
        }
      });
  };

  const activateToggle = (productId) => {
    fetch(`${process.env.REACT_APP_API_URL}/b1/products/${productId}/activate`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
    })
      .then((res) => res.json())
      .then((data) => {
        if (data === true) {
          Swal.fire({
            title: "Success",
            icon: "success",
            text: "Product successfully enabled",
          });
          fetchData();
        } else {
          Swal.fire({
            title: "Something went wrong",
            icon: "error",
            text: "Please Try Again",
          });
          fetchData();
        }
      });
  };

  return (
    <>
      {isActive ? (
        <Button
          variant="danger"
          size="sm"
          onClick={() => archiveToggle(product._id)}
        >
          Archive
        </Button>
      ) : (
        <Button
          variant="success"
          size="sm"
          onClick={() => activateToggle(product._id)}
        >
          Activate
        </Button>
      )}
    </>
  );
}
