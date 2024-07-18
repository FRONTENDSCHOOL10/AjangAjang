import {
  getNode,
  comma,
  insertFirst,
  insertLast,
  getStorage,
  setStorage,
} from "kind-tiger";
import pb from "@/api/pocketbase";
import getPbImageURL from "@/api/getPbImageURL";
import defaultAuthData from "@/api/defaultAuthData";
import { cartPopup } from "/src/components/cart-popup.js";

if (!localStorage.getItem("auth")) {
  setStorage("auth", defaultAuthData);
}

async function renderProductItemRecomd() {
  const productData = await pb.collection("products").getFullList({
    sort: "-created",
  });

  const { isAuth } = await getStorage("auth");

  productData.forEach((item) => {
    const discount = item.price - item.price * (item.sale * 0.01);
    const badddge = item.badge;
    const showMain = item.show_main;
    const template = `
      <div class="swiper-slide">
        <div class="product-card">
          <a
            href="${isAuth ? `/src/pages/product/product-detail.html?product=${item.id}` : "/src/pages/login/login.html"}"
            aria-label="${item.title} 상품링크"
            class="product-card-link"
          >
            <b class="product-card-title">
              ${item.title}
            </b>
            ${item.early_delivery ? `<p class="product-card-early-delivery">샛별배송</p>` : ``}
            ${item.description ? `<p class="product-card-description">${item.description}</p>` : ``}
            <div class="product-card-info-price">
              ${item.sale ? `<span class="product-cart-sale">${item.sale}%</span>` : ``}
              <span class="product-cart-price">${!item.sale ? comma(item.price) : comma(discount)} 원</span>
            </div>
            ${item.sale ? `<div class="product-card-cost">${comma(item.price)} 원</div>` : ``}
            ${item.badge.length >= 1 ? `<div class="product-card-badges"></div>` : ``}
          </a>

          <div class="product-card-thumb">
            <button
              type="button"
              aria-label="장바구니 담기"
              aria-haspopup="dialog"
              class="product-card-button-icon-cart product-card-button-popup"
              data-pd-id="${item.id}"
            ></button>
            <a
              href="${isAuth ? `/src/pages/product/product-detail.html?product=${item.id}` : "/src/pages/login/login.html"}"
              tabindex="-1"
              aria-hidden="true"
            >
              <img
                src="${getPbImageURL(item, "thumbnail")}"
                alt="${item.title} 썸네일"
                class="product-card-thumb-img"
              />
            </a>
          </div>
        </div>
      </div>
    `;
    if (showMain == "추천") {
      insertFirst(".product-swiper-recomd > .swiper-wrapper", template);

      badddge.forEach((badge) => {
        const recomBadge = getNode(
          ".product-swiper-recomd .product-card-badges"
        );
        const templateBadge = `
        <span class="product-card-badge">${badge}</span>
      `;

        insertLast(recomBadge, templateBadge);

        if (badge.includes("Karly Only")) {
          const badgeSpan = document.querySelectorAll(".product-card-badge");

          badgeSpan.forEach((badgeElement) => {
            if (badgeElement.textContent.trim() === "Karly Only") {
              badgeElement.classList.add("badges-primary");
            }
          });
        }
      });
    } else if (showMain == "세일") {
      insertFirst(".product-swiper-sale > .swiper-wrapper", template);

      badddge.forEach((badge) => {
        const saleBadge = getNode(".product-swiper-sale .product-card-badges");
        const templateBadge = `
        <span class="product-card-badge">${badge}</span>
      `;

        insertLast(saleBadge, templateBadge);

        if (badge.includes("Karly Only")) {
          const badgeSpan = document.querySelectorAll(".product-card-badge");

          badgeSpan.forEach((badgeElement) => {
            if (badgeElement.textContent.trim() === "Karly Only") {
              badgeElement.classList.add("badges-primary");
            }
          });
        }
      });
    } else {
      return;
    }
  });

  cartPopup();
}

renderProductItemRecomd();
