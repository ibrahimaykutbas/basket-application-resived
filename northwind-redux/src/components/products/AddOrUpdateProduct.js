import React, { useEffect, useState } from "react";
import { connect } from "react-redux";
import { getCategories } from "../../redux/actions/categoryActions";
import { saveProduct } from "../../redux/actions/productActions";
import ProductDetail from "./ProductDetail";

function AddOrUpdateProduct({
  products,
  categories,
  getProducts,
  getCategories,
  saveProduct,
  history,
  ...props
}) {
  const [product, setProduct] = useState({ ...props.product });
  const [errors, setErrors] = useState({});

  useEffect(() => {
    if (categories.length === 0) {
      getCategories();
    }
    setProduct({ ...props.product });
  }, [props.product]);

  function handleChange(event) {
    const { name, value } = event.target;
    setProduct((previousProduct) => ({
      ...previousProduct,
      [name]: name === "categoryId" ? parseInt(value, 10) : value,
    }));

    validate(name, value);
  }

  function validate(name, value) {
    if (name === "productName" && value === "") {
      setErrors((previousErrors) => ({
        ...previousErrors,
        productName: "It must be the product name!",
      }));
    } else if (name === "categoryId" && value === "") {
      setErrors((previousErrors) => ({
        ...previousErrors,
        categoryId: "It must be the category!",
      }));
    } else if (name === "unitPrice" && value === "") {
      setErrors((previousErrors) => ({
        ...previousErrors,
        unitPrice: "It must be the unit price!",
      }));
    } else if (name === "quantityPerUnit" && value === "") {
      setErrors((previousErrors) => ({
        ...previousErrors,
        quantityPerUnit: "It must be the quantity per unit!",
      }));
    } else if (name === "unitsInStock" && value === "") {
      setErrors((previousErrors) => ({
        ...previousErrors,
        unitsInStock: "It must be the units in stock!",
      }));
    } else {
      setErrors((previousErrors) => ({
        ...previousErrors,
        productName: "",
        categoryId: "",
        unitPrice: "",
        quantityPerUnit: "",
        unitsInStock: "",
      }));
    }
  }

  function handleSave(event) {
    event.preventDefault();
    saveProduct(product).then(() => {
      history.push("/");
    });
  }

  return (
    <ProductDetail
      product={product}
      categories={categories}
      onChange={handleChange}
      onSave={handleSave}
      errors={errors}
    />
  );
}

export function getProductById(products, productId) {
  let product = products.find((product) => product.id == productId) || null;
  return product;
}

function mapStateToProps(state, ownProps) {
  const productId = ownProps.match.params.productId;
  const product =
    productId && state.productListReducer.length > 0
      ? getProductById(state.productListReducer, productId)
      : {};
  return {
    product,
    products: state.productListReducer,
    categories: state.categoryListReducer,
  };
}

const mapDispatchToProps = {
  getCategories,
  saveProduct,
};

export default connect(mapStateToProps, mapDispatchToProps)(AddOrUpdateProduct);
