import React, { useEffect, useState } from "react";
import { Table, ButtonGroup, Row, Col, Pagination } from "react-bootstrap";
import EditProduct from "./EditProduct";
import ArchiveProduct from "./ArchiveProduct";
import AddProduct from "./AddProduct";

export default function AdminView({ productsData, fetchData }) {
  const [products, setProducts] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const productsPerPage = 10;

  useEffect(() => {
    const startIndex = (currentPage - 1) * productsPerPage;
    const endIndex = startIndex + productsPerPage;
    const slicedProducts = productsData.slice(startIndex, endIndex);

    const productsArr = slicedProducts.map((product) => (
      <tr key={product._id}>
        <td>{product.name}</td>
        <td>{product.description}</td>
        <td style={{ textAlign: 'right' }}>${product.price.toLocaleString()}</td>
        <td>{product.stock}</td>
        <td className={product.isActive ? "text-success" : "text-danger"}>
          {product.isActive ? "Available" : "Unavailable"}
        </td>
        <td>
          <ButtonGroup>
            <EditProduct product={product._id} fetchData={fetchData} />
            <ArchiveProduct
              product={product._id}
              isActive={product.isActive}
              fetchData={fetchData}
            />
          </ButtonGroup>
        </td>
      </tr>
    ));

    setProducts(productsArr);
  }, [productsData, currentPage, fetchData]);  

  const totalPages = Math.ceil(productsData.length / productsPerPage);

  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  return (
    <div className="admin-view">
      <h1 className="text-center my-4">Admin Dashboard</h1>
      <Row className="justify-content-center mb-3">
        <Col xs="auto">
          <ButtonGroup>
            <AddProduct fetchData={fetchData} />
          </ButtonGroup>
        </Col>
      </Row>
      <Table striped bordered hover responsive className="admin-table">
        <thead>
          <tr className="text-center">
            <th>Name</th>
            <th>Description</th>
            <th>Price</th>
            <th>Stock</th>
            <th>Availability</th>
            <th colSpan="2">Actions</th>
          </tr>
        </thead>
        <tbody>{products}</tbody>
      </Table>

      {/* Pagination */}
      <Row className="justify-content-center mt-1">
        <Col xs="auto">
          <Pagination>
            <Pagination.Prev disabled={currentPage === 1} onClick={() => handlePageChange(currentPage - 1)} />
            {Array.from({ length: totalPages }).map((_, index) => (
              <Pagination.Item
                key={index + 1}
                active={index + 1 === currentPage}
                onClick={() => handlePageChange(index + 1)}
              >
                {index + 1}
              </Pagination.Item>
            ))}
            <Pagination.Next disabled={currentPage === totalPages} onClick={() => handlePageChange(currentPage + 1)} />
          </Pagination>
        </Col>
      </Row>
    </div>
  );
}
