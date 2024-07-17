import { comma, insertFirst, insertLast, getStorage, setStorage } from "kind-tiger";
import pb from "@/api/pocketbase";
import getPbImageURL from "@/api/getPbImageURL";
import defaultAuthData from "@/api/defaultAuthData";

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
            ${item.badge ? `<div class="product-card-badges"></div>` : ``}
          </a>

          <div class="product-card-thumb">
            <button
              type="button"
              aria-label="장바구니 담기"
              class="product-card-button-icon-cart"
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
    insertFirst(".product-swiper-recomd > .swiper-wrapper", template);
    insertFirst(".product-swiper-sale > .swiper-wrapper", template);

    badddge.forEach((badge) => {
      const templateBadge = `
        <span class="product-card-badge">${badge}</span>
      `;

      if (badge) {
        insertLast(".product-swiper-recomd .product-card-badges", templateBadge);
        insertLast(".product-swiper-sale .product-card-badges", templateBadge);
        if (badge.includes("Karly Only")) {
          const badgeSpan = document.querySelectorAll(".product-card-badge");

          badgeSpan.forEach((badgeElement) => {
            if (badgeElement.textContent.trim() === "Karly Only") {
              badgeElement.classList.add("badges-primary");
            }
          });
        }
      }
    });
  });
}

renderProductItemRecomd();
