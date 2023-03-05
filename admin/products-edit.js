import axios from "axios";
import { router, useEffect, useState } from "../lib"
import { string, object } from "yup"
const productSchema = object({
  productName: string().required("Ten khong duoc de trong"),
  image: string().required("anh khong duoc de trong")
})
const productsEdit = () => {
  const [products, setProducts] = useState([]);
  useEffect(() => {
    axios.get(`http://localhost:3000/products/${id}`)
      .then(({ data }) => setProducts(data))
  }, [])
  useEffect(() => {
    const form = document.getElementById("form-add")
    const name = document.getElementById("product-name")
    const image = document.getElementById("product-image")
    form.addEventListener("submit", function (e) {
      e.preventDefault();
      const formData = {
        productName: name.value,
        image: image.value
      }
      productSchema
        .validate(formData, { abortEarly: false })
        .then(() => {
          axios.put(`http://localhost:3000/products/${id}`, formData)
            .then(() => confirm("Them thanh cong"))
            .then(() => router.navigate("/"))
        })
        .catch((error) => {
          const formErrorEl = document.querySelectorAll(".form-error")
          formErrorEl.forEach((element, index) => {
            element.innerHTML = error.errors[index];
          })
        })
    })
  })


  return `
    <div class="container">
      <h1>Cap nhat san pham </h1> 
      <form action="" id="form-add">
        <div>
          <label for="" >Name</label>
          <input type="text" class="form-control" id="product-name" value="${products.productName}">
          <div class="form-error text-danger"></div>
        </div>
        <div>
          <label for="" >Image</label>
          <input type="file" class="form-control" id="product-image" value="${products.image}">
          <div class="form-error text-danger"></div>
        </div>
        <br>
        <button class="btn btn-primary">Edit Product</button>
      </form>
     </div> 

  `
}

export default productsEdit