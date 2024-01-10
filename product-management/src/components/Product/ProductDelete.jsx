import React from "react";
import { Button, Modal, ModalHeader, ModalBody, ModalFooter } from "reactstrap";
import "./ProductList.css";
import { useDispatch } from "react-redux";
import { deleteProduct } from "../../store/Product/Product.action";

const ProductDelete = (props) =>{
  let { isDeleteModalOpen, toggleDelete, product } = props;
  const dispatch = useDispatch();
  
  const remove = async (id) => {
    await dispatch(deleteProduct({ id }));
    toggleDelete(product);
  };

  return (
    <Modal isOpen={isDeleteModalOpen} toggle={toggleDelete} centered>
      <ModalHeader toggle={toggleDelete}>Delete Product</ModalHeader>
      <ModalBody>
        <div>
          Are you sure to delete <b>{product.name}</b>?
        </div>
      </ModalBody>
      <ModalFooter>
        <div className="d-flex align-items-center justify-content-between w-100">
          <div></div>
          <div className="d-flex align-items-center">
            <Button
              className="secondary-btn mr-3"
              onClick={() => toggleDelete(product)}
            >
              No
            </Button>
            <Button
              type="submit"
              className="primary-btn"
              onClick={() => remove(product._id)}
            >
              Yes
            </Button>
          </div>
        </div>
      </ModalFooter>
    </Modal>
  );
}
export default ProductDelete;
