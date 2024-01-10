import React, { useState } from "react";
import { Modal, ModalHeader, ModalBody, ModalFooter, Button } from "reactstrap";
import { useForm } from "react-hook-form";
import { useDispatch, useSelector } from "react-redux";

import { addProduct } from "../../store/Product/Product.action";

const AddProduct = (props) => {
  const { isAddModalOpen, toggleAdd } = props;

  const dispatch = useDispatch();
  const [error, setError] = useState("");
  const { productInfo } = useSelector((state) => state.product);
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const AddProductHandle = async (data) => {
    let name;
    if (productInfo) {
      name = productInfo.filter((product) =>
        product.name.toLowerCase().includes(data.name.toLowerCase())
      );
    }
    if (name === undefined || name.length === 0) {
      setError("");
      const addData = {
        name: data.name.trim(),
        description: data.description.trim(),
        price: data.price.trim(),
      };
      await dispatch(addProduct(addData));
      toggleAdd();
    } else {
      setError("Product Name is already exits!");
    }
  };

  return (
    <>
      <Modal
        isOpen={isAddModalOpen}
        toggle={toggleAdd}
        centered
        scrollable
        className="common-modal"
      >
        <ModalHeader toggle={toggleAdd}>Add Product</ModalHeader>
        <form onSubmit={handleSubmit(AddProductHandle)}>
          <ModalBody>
            {error && <p style={{ color: "red" }}>{error}</p>}
            <div className="page-content" style={{ height: "100%" }}>
              <div className="card">
                <div className="card-body">
                  <div className="form-group row">
                    <label className="col-form-label col-lg-3">
                      Name <span className="text-danger">*</span>
                    </label>
                    <div className="col-lg-9">
                      <input
                        className="form-control"
                        type="text"
                        name="name"
                        {...register("name", {
                          required: true,
                          validate: (value) => {
                            return !!value.trim();
                          },
                        })}
                      />
                      {errors.name && (
                        <p style={{ color: "red" }}>name is required</p>
                      )}
                    </div>
                  </div>
                  <div className="form-group row">
                    <label className="col-form-label col-lg-3 d-flex">
                      Description <span className="text-danger">*</span>
                    </label>
                    <div className="col-lg-9">
                      <input
                        className="form-control"
                        type="text"
                        name="Description"
                        {...register("description", {
                          required: true,
                          validate: (value) => {
                            return !!value.trim();
                          },
                        })}
                      />
                      {errors.description && (
                        <p style={{ color: "red" }}>description is required</p>
                      )}
                    </div>
                  </div>
                  <div className="form-group row">
                    <label className="col-form-label col-lg-3 d-flex">
                      Price <span className="text-danger">*</span>
                    </label>
                    <div className="col-lg-9">
                      <input
                        name="price"
                        type="number"
                        className="form-control"
                        aria-invalid="true"
                        {...register("price", {
                          required: true,
                          validate: (value) => {
                            return !!value.trim();
                          },
                        })}
                        required
                      />
                      {errors.price && (
                        <p style={{ color: "red" }}>price is required</p>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </ModalBody>
          <ModalFooter>
            <div className="d-flex align-items-center justify-content-between w-100">
              <div className="d-flex align-items-center">
                <Button type="submit" className="primary-btn">
                  Add
                </Button>
              </div>
            </div>
          </ModalFooter>
        </form>
      </Modal>
    </>
  );
};

export default AddProduct;
