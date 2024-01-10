import React, { useEffect, useState } from "react";
import {
  Button,
  Card,
  CardBody,
  CardText,
  CardTitle,
  Spinner,
} from "reactstrap";
import { useDispatch, useSelector } from "react-redux";
import { allProduct } from "../../store/Product/Product.action";
import "./ProductList.css";

import AddProduct from "./AddProduct";
import ProductDelete from "./ProductDelete";
import EditProduct from "./EditProduct";
import Header from "../Header/Header";

const Product = () => {
  const dispatch = useDispatch();
  const { productInfo } = useSelector((state) => state.product);

  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);

  const { role } = useSelector((state) => state.login);
  const [product, setProduct] = useState({});
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    setIsLoading(true);
    dispatch(allProduct());
    setIsLoading(false);
  }, []);

  const toggleDelete = (data) => {
    setProduct(data);
    setIsDeleteModalOpen(!isDeleteModalOpen);
    isDeleteModalOpen && dispatch(allProduct());
  };

  const toggleEdit = (data) => {
    setProduct(data);
    setIsEditModalOpen(!isEditModalOpen);
    isEditModalOpen && dispatch(allProduct());
  };

  const toggleAdd = () => {
    setIsAddModalOpen(!isAddModalOpen);
    isAddModalOpen && dispatch(allProduct());
  };


  let data = null;
  data = productInfo?.map((m) => {
    data = (
      <div className="col-12 col-sm-12 col-md-6 col-lg-4 my-4" key={m._id}>
        <Card className="product-card">
          <CardBody className="text-center">
            <CardTitle tag="h4">
              <b>
                <p onClick={() => {}} style={{ color: "#FD886E" }}>
                  {m.name}
                </p>
              </b>
            </CardTitle>
            <CardText>
              <div>
                <div className="font-weight-bold">{m.name}</div>
                <div className="text-secondary">{m.description}</div>
                <div className="text-secondary">{m.price}</div>
              </div>
            </CardText>
            {role === "Admin" && (
              <div>
                <Button
                  className="mr-3 primary-btn"
                  onClick={() => {
                    toggleEdit(m);
                  }}
                >
                  Edit
                </Button>
                <Button
                  className="secondary-btn"
                  onClick={() => {
                    toggleDelete(m);
                  }}
                >
                  Delete
                </Button>
              </div>
            )}
          </CardBody>
        </Card>
      </div>
    );
    return data;
  });

  return (
    <>
      <Header />
     
      {isLoading ? (
        <div className="text-center">
          <Spinner className="phone-spinner" />
        </div>
      ) : (
        <div className="page-content container">
          <div className="d-flex align-items-center header justify-content-between">
            <div className="bg-custom" />
            <h2>Product List</h2>
            {role === "Admin" && (
              <Button
                className="secondary-btn"
                onClick={() => {
                  setIsAddModalOpen(true);
                }}
              >
                Add +
              </Button>
            )}
          </div>
          <div className="row list-body">{data?data:"No data found!"}</div>
        </div>
      )}

      {isAddModalOpen && (
        <AddProduct isAddModalOpen={isAddModalOpen} toggleAdd={toggleAdd} />
      )}
      {isEditModalOpen && (
        <EditProduct
          isEditModalOpen={isEditModalOpen}
          toggleEdit={toggleEdit}
          product={product}
        />
      )}

      <ProductDelete
        isDeleteModalOpen={isDeleteModalOpen}
        toggleDelete={toggleDelete}
        product={product}
      />
    </>
  );
};

export default Product;
