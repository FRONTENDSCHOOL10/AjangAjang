import "@/sass/main.scss";
import gsap from "gsap";
import { comma, insertLast, setDocumentTitle, getStorage, setStorage } from "kind-tiger";
import pb from "@/api/pocketbase";
import getPbImageURL from "@/api/getPbImageURL";
import defaultAuthData from "@/api/defaultAuthData";

setDocumentTitle("컬리 / 상품리뷰");

if (!localStorage.getItem("auth")) {
  setStorage("auth", defaultAuthData);
}

async function renderProductItem() {
  const reviewData = await pb.collection("reviews").getFullList({
    sort: "-created",
  });

  //const response = await tiger.get(`${import.meta.env.VITE_PB_API}/collections/products/records`);
  //const productsData = response.data.items;
  console.log(reviewData);

  const { isAuth } = await getStorage("auth");

  reviewData.forEach((item) => {
    const template = `
    <div class="review-member-list">
    <ul class="review-member">
    <li class="badge best-badge">베스트</li>
    <li class="badge class-badge">퍼플</li>
    <li class="user-name">${item.review_user}</li>
  </ul>
  <ul class="review-product">
    <li class="review-product-name">${item.review_product}</li>
    <li class="review-text">${item.review_text}</li>
    <li class="review-write-data">${item.updated}</li>
  </ul>
     </div>
    `;
    insertLast(".review-wrap", template);
  });

  gsap.from(".review-wrap", { y: 30, opacity: 0, stagger: 0.1 });
}

renderProductItem();
