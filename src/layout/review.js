import "@/sass/main.scss";
//import gsap from "gsap";
import { insertLast, setDocumentTitle } from "kind-tiger";
import pb from "@/api/pocketbase";

setDocumentTitle("컬리 / 상품리뷰");

async function renderReviewItem() {
  const reviewData = await pb.collection("reviews").getFullList({
    sort: "-created",
    expand: "review_user,review_product",
  });

  reviewData.forEach((item) => {
    const reviewUser = item.expand.review_user.name;
    const reviewProduct = item.expand.review_product.title;
    const maskName = reviewUser.slice(0, 1) + "*".repeat(reviewUser.length - 2) + reviewUser.slice(-1);

    if (item.notice) {
      const template2 = `
      <details>
      <summary><span class="notice-badge">공지</span> ${item.review_title}</summary>
      <div class="review-notice">
        ${item.review_text}
      </div>
    </details>
      `;
      insertLast(".review-list", template2);
    } else {
      const dete = item.updated.slice(0, 10);
      const template = `
      <div class="review-member-list">
      <ul class="review-member">
      <li class="badge best-badge">베스트</li>
      <li class="badge class-badge">퍼플</li>
      <li class="user-name">${maskName}</li>
    </ul>
    <ul class="review-product">
      <li class="review-product-name">${reviewProduct}</li>
      <li class="review-text">${item.review_text}</li>
      <li class="review-write-data">${dete}</li>
    </ul>
       </div>
      `;
      insertLast(".review-wrap", template);
    }
  });
}

renderReviewItem();
