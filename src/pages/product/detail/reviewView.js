import { getNode as $, insertLast, insertFirst } from "kind-tiger";
import { params, productId, data, reviewData } from "./database.js";

async function renderReviewItem() {
  params;
  productId;
  data;
  reviewData;
  const { title } = data;

  reviewData.forEach((item) => {
    const reviewUser = item.review_user;
    const maskName = reviewUser.slice(0, 1) + "*".repeat(reviewUser.length - 2) + reviewUser.slice(-1);

    if (item.notice) {
      const noticeTemplate = `
      <details>
        <summary><span class="notice-badge">공지</span> ${item.review_title}</summary>
        <div class="review-notice">
          ${item.review_text}
        </div>
      </details>
      `;
      insertFirst(".review-notice", noticeTemplate);
    } else if (title === item.review_product && item.best_review) {
      const dete = item.updated.slice(0, 10);
      const bestTemplate = `
      <div class="review-member-list">
        <ul class="review-member">
          <li class="badge best-badge">베스트</li>
          <li class="user-name">${maskName}</li>
        </ul>
        <ul class="review-product">
          <li class="review-product-name">${item.review_product}</li>
          <li class="review-text">${item.review_text}</li>
          <li class="review-write-data">${dete}</li>
        </ul>
       </div>
      `;
      insertFirst(".best-review", bestTemplate);
    } else if (title === item.review_product) {
      const dete = item.updated.slice(0, 10);
      const reviewTamplate = `
      <div class="review-member-list">
        <ul class="review-member">
          <li class="user-name">${maskName}</li>
        </ul>
        <ul class="review-product">
          <li class="review-product-name">${item.review_product}</li>
          <li class="review-text"><b>${item.review_title}</b>${item.review_text}</li>
          <li class="review-write-data">${dete}</li>
        </ul>
       </div>
      `;
      insertFirst(".basic-review", reviewTamplate);
    } else {
      return;
    }
  });

  const reviewCount = document.querySelectorAll(".review-member-list");
  const countTemplate = `
    <span class="review-count">총 ${reviewCount.length}개</span>
     `;
  insertFirst(".review-list", countTemplate);
}

renderReviewItem();
