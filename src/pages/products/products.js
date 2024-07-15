
import gsap from "gsap";
import { comma, insertLast, setDocumentTitle, getStorage, setStorage } from "kind-tiger";
import pb from "@/api/pocketbase";
import getPbImageURL from "@/api/getPbImageURL";
import defaultAuthData from "@/api/defaultAuthData";

setDocumentTitle("29CM / 상품목록");

if (!localStorage.getItem("auth")) {
  setStorage("auth", defaultAuthData);
}

async function renderProductItem() {
  const productData = await pb.collection("products").getFullList({
    sort: "-created",
  });

  //const response = await tiger.get(`${import.meta.env.VITE_PB_API}/collections/products/records`);
  //const productsData = response.data.items;

  const { isAuth } = await getStorage("auth");

  console.log(productData);
  productData.forEach((item) => {
    const discount = item.price - item.price * (item.ratio * 0.01);
    const template = `
     <li class="product-item">
        
     <span class="desc">${item.description}</span>
     </li>
    `;
    insertLast(".container > ul", template);
  });

  gsap.from(".product-item", { y: 30, opacity: 0, stagger: 0.1 });
}

renderProductItem();