import axios from "axios";
import { useEffect, useState } from "../lib"

const projects = () => {
  const [products, setProducts] = useState([]);
  useEffect(() => {
    axios.get("http://localhost:3000/products")
      .then(({ data }) => setProducts(data));
  }, [])
  useEffect(() => {
    const btns = document.querySelectorAll(".btn-remove")
    for (let btn of btns) {
      btn.addEventListener("click", async function () {
        const id = this.dataset.id;
        if (confirm("Ban co chac chan muon xoa ?")) {
          try {
            await axios.delete(`http://localhost:3000/products/${id}`)
            const newProducts = products.filter((product) => product.id !== +id);
            setProducts(newProducts);
          } catch (error) {
            console.log(error);
          }
        }
      })
    }
  })



  return `
  <div class="container">
  <h1>Danh sach san pham </h1> 
  <table class="table table-border table-danger">
    <thead>
      <th>STT</th>
      <th>Name</th>
      <th>Image</th>
      <th>Thao tac</th>
    </thead>

    ${products.map((product, index) => `
    <tbody>
      <tr>
        <td>${index + 1}</td>
        <td>${product.productName}</td>
        <td><img src="${product.image}" width="200"></td>
        <td>
        <a href="/products/${product.id}/edit"><button class="btn btn-warning">Edit</button></a>
        <button data-id =${product.id} class="btn btn-danger btn-remove">Delete</button>
        </td>
      </tr>
    </tbody>
    
    `).join("")}
    
  </table>
  <a href="/add"><button class="btn btn-primary">Add Product</button></a>
</div>
  `
}

export default projects