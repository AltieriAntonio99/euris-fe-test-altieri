import { Button } from "@mui/material";
import React, { useEffect, useState } from "react";
import TransitionsModal from "../commons/transitionsModal/TransitionsModal";
import "./CrudModal.scss";
import { productAPI } from "../helpers/api/api";
import TabPanel from "@mui/lab/TabPanel";
import Box from "@mui/material/Box";
import Tab from "@mui/material/Tab";
import TabContext from "@mui/lab/TabContext";
import TabList from "@mui/lab/TabList";
import TextFieldWithSkeleton from "../commons/textFieldWithSkeleton/TextFieldWithSkeleton";

const CrudModal = (props) => {
  const [tabIndex, setTabIndex] = useState("product");
  const [isLoading, setIsLoading] = useState(false);
  const [data, setData] = useState({
    category: "",
    description: "",
    employee: "",
    price: 0,
    title: "",
    reviews: "",
  });

  const [dataValidation, setDataValidation] = useState({
    category: false,
    price: false,
    title: false,
  });

  const getProduct = async () => {
    setIsLoading(true);
    const result = await productAPI.get(
      "ijpxNJLM732vm8AeajMR",
      props.productId
    );
    setData(result.data);
    setIsLoading(false);
  };

  const postProduct = async () => {
    let reviews = [];
    if (data.reviews) reviews.push(data.reviews);
    let object = {
      category: data.category,
      description: data.description,
      employee: data.employee,
      price: data.price,
      title: data.title,
      reviews: reviews,
    };
    const result = await productAPI.post("ijpxNJLM732vm8AeajMR", object);
    return result.status;
  };

  const deleteProduct = async () => {
    const result = await productAPI.delete(
      "ijpxNJLM732vm8AeajMR",
      props.productId
    );
    return result.status;
  };

  useEffect(() => {
    if (props.productId) {
      getProduct();
    }
  }, []);

  const handleSaveClick = async () => {
    setIsLoading(true);
    try {
      var result = await postProduct();
      if (result === 200) props.setClose();
    } catch (error) {
      setIsLoading(false);
    }
  };

  const handleDeleteClick = async () => {
    setIsLoading(true);
    var result = await deleteProduct();
    if (result === 200) props.setClose();

    setIsLoading(false);
  };

  const handleChangeData = (value, field) => {
    let updatedValue = { [field]: value };
    let updatedValidation = { [field]: false };
    if (!value || value === undefined || value === "")
      updatedValidation = { [field]: true };

    setData((data) => ({
      ...data,
      ...updatedValue,
    }));

    setDataValidation((data) => ({
      ...data,
      ...updatedValidation,
    }));
  };

  const handleTabChange = (event, value) => {
    setTabIndex(value);
  };

  //#region reviewForm
  const reviewForm = (
    <>
      <TextFieldWithSkeleton
        className="ce-inputText"
        size="small"
        id="review"
        label="Review"
        variant="outlined"
        multiline
        rows={5}
        value={data.reviews}
        onChange={(e) => handleChangeData(e.target.value, "reviews")}
        InputProps={{
          readOnly: props.isDelete || props.isView || false,
        }}
        isLoading={isLoading}
      />
    </>
  );
  //#endregion

  //#region productForm
  const productForm = (
    <>
      <TextFieldWithSkeleton
        className="ce-inputText"
        size="small"
        id="title"
        label="Title"
        variant="outlined"
        value={data.title}
        onChange={(e) => handleChangeData(e.target.value, "title")}
        InputProps={{
          readOnly: props.isDelete || props.isView || false,
        }}
        error={dataValidation.title}
        required
        helperText={dataValidation.title ? "Title is mandatory" : ""}
        isLoading={isLoading}
      />
      <TextFieldWithSkeleton
        className="ce-inputText"
        size="small"
        id="description"
        label="Description"
        variant="outlined"
        multiline
        rows={2}
        value={data.description}
        onChange={(e) => handleChangeData(e.target.value, "description")}
        InputProps={{
          readOnly: props.isDelete || props.isView || false,
        }}
        isLoading={isLoading}
      />
      <TextFieldWithSkeleton
        className="ce-inputText"
        size="small"
        id="category"
        label="Category"
        variant="outlined"
        value={data.category}
        onChange={(e) => handleChangeData(e.target.value, "category")}
        InputProps={{
          readOnly: props.isDelete || props.isView || false,
        }}
        error={dataValidation.category}
        required
        helperText={dataValidation.category ? "Category is mandatory" : ""}
        isLoading={isLoading}
      />
      <TextFieldWithSkeleton
        className="ce-inputText"
        size="small"
        id="employee"
        label="Employee"
        variant="outlined"
        value={data.employee}
        onChange={(e) => handleChangeData(e.target.value, "employee")}
        InputProps={{
          readOnly: props.isDelete || props.isView || false,
        }}
        isLoading={isLoading}
      />
      <TextFieldWithSkeleton
        className="ce-inputText"
        size="small"
        id="price"
        label="Price"
        type="number"
        inputProps={{ min: 0 }}
        InputLabelProps={{
          shrink: true,
        }}
        value={data.price}
        onChange={(e) => handleChangeData(e.target.value, "price")}
        InputProps={{
          readOnly: props.isDelete || props.isView || false,
        }}
        error={dataValidation.price}
        required
        helperText={dataValidation.price ? "Price is mandatory" : ""}
        isLoading={isLoading}
      />
    </>
  );
  //#endregion

  return (
    <div>
      <TransitionsModal open={props.open} setClose={props.setClose}>
        <Box
          component="form"
          noValidate
          autoComplete="off"
          className="ce-crudModal"
        >
          <h1 className="ce-headerLabel">{props.headerModalLabel}</h1>
          <TabContext value={tabIndex}>
            <Box sx={{ borderBottom: 1, borderColor: "divider" }}>
              <TabList onChange={handleTabChange}>
                <Tab label="Product" value="product" />
                <Tab label="Reviews" value="reviews" />
              </TabList>
            </Box>
            <TabPanel value="product" className="ce-tabPanel">
              <div className="ce-tabPanelContainer">{productForm}</div>
            </TabPanel>
            <TabPanel value="reviews" className="ce-tabPanel">
              <div className="ce-tabPanelContainer">{reviewForm}</div>
            </TabPanel>
          </TabContext>
          {!props.isView && (
            <div className="ce-buttonGroup">
              <Button
                className="ce-cancelButton"
                variant="outlined"
                onClick={props.setClose}
                disabled={isLoading}
              >
                Cancel
              </Button>
              {props.isDelete ? (
                <Button
                  className="ce-saveButton"
                  color="error"
                  variant="contained"
                  onClick={handleDeleteClick}
                  disabled={isLoading}
                >
                  Delete
                </Button>
              ) : (
                <Button
                  className="ce-saveButton"
                  variant="contained"
                  onClick={handleSaveClick}
                  disabled={
                    !data.title ||
                    !data.category ||
                    data.price === null ||
                    data.price === undefined ||
                    data.price === "" ||
                    isLoading
                  }
                >
                  Save
                </Button>
              )}
            </div>
          )}
        </Box>
      </TransitionsModal>
    </div>
  );
};

export default CrudModal;
