import defaultAuthData from "@/api/defaultAuthData";
import pb from "@/api/pocketbase";
import { comma, insertLast, setStorage } from "kind-tiger";

if (!localStorage.getItem("auth")) {
  setStorage("auth", defaultAuthData);
}

async function renderProductItem() {
  const productData = await pb.collection("products").getFullList({
    sort: "-created",
  }); // SDK

  console.log(productData);

  productData.forEach((item) => {
    const template = `
      <li class="product-item">
        <span class="price">${comma(item.cost)}원</span>
      </li>
    `;
    insertLast(".container > ul", template);
  });
}

renderProductItem();
