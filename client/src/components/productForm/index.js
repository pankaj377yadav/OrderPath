import React from "react";
import { Formik, Form, Field } from "formik";
import * as Yup from "yup";
import { useState } from "react";
import { useToast } from "@chakra-ui/react";
import styles from "../../styles/form.module.css";
import { Modal, Upload } from "antd";
import { PlusOutlined } from "@ant-design/icons";
const getBase64 = (file) =>
  new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => resolve(reader.result);
    reader.onerror = (error) => reject(error);
  });
const SignupSchema = Yup.object().shape({
  productName: Yup.string().required("Required"),
  productPrice: Yup.string().required("Required"),
  productCategory: Yup.string(),
  productDescription: Yup.string(),
});

const ProductForm = (props) => {
  const toast = useToast();
  const [file, setFile] = useState(null);
  const [productList, setProductList] = useState([]);
  const [fileList, setFileList] = useState([]);
  const [previewTitle, setPreviewTitle] = useState("");
  const [previewOpen, setPreviewOpen] = useState(false);
  const [previewImage, setPreviewImage] = useState("");

  const handleRegister = async (values) => {
    // debugger;
    const formData = new FormData();
    for (let item in values) {
      formData.append(item, values[item]);
    }
    // const { name } = fileList[0];
    // setFile(name);
    formData.append("productImage", fileList[0].name);
    console.log(formData);
    const res = await fetch("http://localhost:3005/product", {
      method: "POST",
      body: formData,
    });
    const data = await res.json();
    console.log(data);
    toast({
      title: data.msg,
      status: res.status == 409 ? "warning" : "success",
      isClosable: true,
    });
  };

  // product Img

  const handleCancel = () => setPreviewOpen(false);
  const handlePreview = async (file) => {
    if (!file.url && !file.preview) {
      file.preview = await getBase64(file.originFileObj);
    }
    setPreviewImage(file.url || file.preview);
    setPreviewOpen(true);
    setPreviewTitle(
      file.name || file.url.substring(file.url.lastIndexOf("/") + 1)
    );
  };
  const handleChange = ({ fileList: newFileList }) => {
    // const {name} =newFileList[0]
    console.log(newFileList, "this is list");
    setFileList(newFileList);
    //  console.log(name)
    //  setFile(name)
  };
  const uploadButton = (
    <div>
      <PlusOutlined />
      <div className={styles.img}>Upload image</div>
    </div>
  );

  return (
    <div className={styles.productForm}>
      <Formik
        initialValues={{
          productName: "",
          productPrice: "",
          productCategory: "",
          productDescription: "",
        }}
        validationSchema={SignupSchema}
        onSubmit={(values, { resetForm }) => {
          // same shape as initial values
          handleRegister(values);
          resetForm();
          // console.log(values);
        }}
      >
        {({ errors, touched }) => (
          <div className={styles.pickup}>
            <Form className={styles.form}>
              <h1 className={styles.title}> Product Details </h1>
              <Field
                className={styles.input}
                name="productName"
                placeholder="Produnct Name"
              />
              {errors.productName && touched.productName ? (
                <div>{errors.productName}</div>
              ) : null}{" "}
              <br />
              <Field
                className={styles.input}
                name="productPrice"
                placeholder="Product Price"
              />
              {errors.productPrice && touched.productPrice ? (
                <div>{errors.productPrice}</div>
              ) : null}
              <br />
              <Field
                className={styles.input}
                name="productCategory"
                placeholder="Product Category"
              />
              {errors.productCategory && touched.productCategory ? (
                <div>{errors.productCategory}</div>
              ) : null}{" "}
              <br />
              <Field
                className={styles.input}
                name="productDescription"
                placeholder=" Product Description"
              />
              {errors.productDescription && touched.productDescription ? (
                <div>{errors.productDescription}</div>
              ) : null}{" "}
              <br />
              <br />
              <>
                <Upload
                  action="https://run.mocky.io/v3/435e224c-44fb-4773-9faf-380c5e6a2188"
                  listType="picture-card"
                  fileList={fileList}
                  onPreview={handlePreview}
                  onChange={handleChange}
                >
                  {fileList.length >= 8 ? null : uploadButton}
                </Upload>
                <Modal
                  open={previewOpen}
                  title={previewTitle}
                  footer={null}
                  onCancel={handleCancel}
                >
                  <img
                    type="file"
                    alt="example"
                    style={{
                      width: "100%",
                    }}
                    src={previewImage}
                  />
                </Modal>
              </>
              <br />
              <button
                onClick={props.setclose(false)}
                type="submit"
                className={styles.submit}
              >
                Submit Request
              </button>
              <br />
            </Form>
          </div>
        )}
      </Formik>
    </div>
  );
};

export default ProductForm;
