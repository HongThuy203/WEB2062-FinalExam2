import "bootstrap/dist/css/bootstrap.min.css"
import "bootstrap/dist/js/bootstrap.js"
import { router, render } from "./lib";
import products from "./admin/products"
import productsAdd from "./admin/products-add";
import productsEdit from "./admin/products-edit";

const app = document.querySelector("#app")

router.on("/", () => render(products, app))
router.on("/add", () => render(productsAdd, app))
router.on("/products/:id/edit", ({ data }) => render(productsEdit(data), app))

router.resolve();