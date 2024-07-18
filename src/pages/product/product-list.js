import defaultAuthData from "@/api/defaultAuthData";
import getPbImageURL from "@/api/getPbImageURL";
import pb from "@/api/pocketbase";
import { comma, getNode, getStorage, setStorage } from "kind-tiger";
import { Footer } from "/src/components/footer.js";
import { Header, headerCategory } from "/src/components/header.js";

if (!localStorage.getItem("auth")) {
  setStorage("auth", defaultAuthData);
}

let data = [];
let filteredData = [];

async function fetchData() {
  const productData = await pb.collection("products").getFullList({
    sort: "-created",
  });
  const auth = await getStorage("auth");
  const isAuth = auth.isAuth;

  data = productData.map((item) => ({
    title: item.title,
    pageNumber: item.id,
    description: item.description,
    sale: item.sale,
    price: item.price,
    badge: item.badge,
    thumbnail: getPbImageURL(item, "thumbnail"),
    early_delivery: item.early_delivery,
    isAuth,
  }));

  filteredData = [...data]; // 초기에는 모든 데이터를 필터링된 데이터로 설정

  updateTotalCount(); // 총 상품 건수 업데이트
  setPageButtons();
  setPageOf(currentPage);
}

const COUNT_PER_PAGE = 6;
const PAGE_BUTTON_LIMIT = 3;
const pageNumberWrapper = getNode(".page-number-wrapper");
const ul = getNode(".product-card-list");
const totalCountNode = getNode(".product-list-product-total"); // 총 상품 건수 노드
const prevBtn_3page = getNode(".prev-btn-3page");
const prevBtn = getNode(".prev-btn");
const nextBtn = getNode(".next-btn");
const nextBtn_3page = getNode(".next-btn-3page");

let currentPage = getCurrentPageFromURL();

function getCurrentPageFromURL() {
  const params = new URLSearchParams(window.location.search);
  return parseInt(params.get("page")) || 1;
}

function updateURL(pageNumber) {
  const params = new URLSearchParams(window.location.search);
  params.set("page", pageNumber);
  history.pushState({}, "", `${window.location.pathname}?${params}`);
}

// 총 상품 건수 업데이트 함수
function updateTotalCount() {
  totalCountNode.textContent = `총 ${filteredData.length}건`;
}

// 페이지 수 관여
function getTotalPageCount() {
  return Math.ceil(filteredData.length / COUNT_PER_PAGE);
}

function setPageButtons() {
  pageNumberWrapper.innerHTML = "";
  const totalPageCount = getTotalPageCount();
  const startPage = Math.floor((currentPage - 1) / PAGE_BUTTON_LIMIT) * PAGE_BUTTON_LIMIT + 1;
  const endPage = Math.min(startPage + PAGE_BUTTON_LIMIT - 1, totalPageCount);

  for (let i = startPage; i <= endPage; i++) {
    pageNumberWrapper.innerHTML += `<span class="page-number-btn" data-page="${i}"> ${i} </span>`;
  }

  document.querySelectorAll(".page-number-btn").forEach((btn) => {
    if (parseInt(btn.dataset.page) === currentPage) {
      btn.classList.add("selected");
    }
    btn.addEventListener("click", (e) => {
      currentPage = parseInt(e.target.dataset.page);
      updatePage();
    });
  });
}

function setPageOf(pageNumber) {
  ul.innerHTML = "";
  const startIndex = COUNT_PER_PAGE * (pageNumber - 1);
  const endIndex = Math.min(startIndex + COUNT_PER_PAGE, filteredData.length);
  for (let i = startIndex; i < endIndex; i++) {
    const item = filteredData[i];
    const discount = item.price - item.price * (item.sale * 0.01);
    const template = `
      <li class="product-card">
        <a href="${item.isAuth ? `/src/pages/product/detail/product-detail.html?product=${item.pageNumber}` : "/src/pages/login/"}" aria-label="${item.title} 상품링크" class="product-card-link">
          <b class="product-card-title">${item.title}</b>
          ${item.early_delivery ? `<p class="product-card-early-delivery">샛별배송</p>` : ``}
          ${item.description ? `<p class="product-card-description">${item.description}</p>` : ``}
          <div class="product-card-info-price">
            ${item.sale ? `<span class="product-cart-sale">${item.sale}%</span>` : ``}
            <span class="product-cart-price">${!item.sale ? comma(item.price) : comma(discount)} 원</span>
          </div>
          ${item.sale ? `<div class="product-card-cost">${comma(item.price)} 원</div>` : ``}
          <div class="product-card-badges">
            ${item.badge.map((badge) => `<span class="product-card-badge${badge.includes("Karly Only") ? " badges-primary" : ""}">${badge}</span>`).join("")}
          </div>
        </a>
        <div class="product-card-thumb">
          <button type="button" aria-label="장바구니 담기" class="product-card-button-icon-cart"></button>
          <a href="/src/pages/product/detail/product-detail.html?product=${item.pageNumber}" tabindex="-1" aria-hidden="true">
            <img src="${item.thumbnail}" alt="${item.title} 썸네일" class="product-card-thumb-img"/>
          </a>
        </div>
      </li>
    `;
    ul.insertAdjacentHTML("beforeend", template);
  }
}

function updatePage() {
  setPageOf(currentPage);
  setPageButtons();
  updateURL(currentPage);
}

prevBtn_3page.addEventListener("click", () => {
  if (currentPage > 3) {
    currentPage = Math.max(1, currentPage - 3);
    updatePage();
  }
});

prevBtn.addEventListener("click", () => {
  if (currentPage > 1) {
    currentPage -= 1;
    updatePage();
  }
});

nextBtn.addEventListener("click", () => {
  const totalPageCount = getTotalPageCount();
  if (currentPage < totalPageCount) {
    currentPage += 1;
    updatePage();
  }
});

nextBtn_3page.addEventListener("click", () => {
  const totalPageCount = getTotalPageCount();
  if (currentPage < totalPageCount) {
    currentPage = Math.min(totalPageCount, currentPage + 3);
    updatePage();
  }
});

// 가격 필터링 로직 추가
function filterByPrice(minPrice, maxPrice) {
  filteredData = data.filter((item) => {
    const price = item.sale ? item.price - item.price * (item.sale * 0.01) : item.price;
    return price >= minPrice && price <= maxPrice;
  });
  currentPage = 1; // 필터링 후 첫 페이지로 이동
  updateTotalCount(); // 필터링된 데이터로 총 상품 건수 업데이트
  updatePage();
}

document.querySelectorAll(".radio-button").forEach((radio) => {
  radio.addEventListener("change", () => {
    switch (radio.id) {
      case "price1":
        filterByPrice(0, 6890);
        break;
      case "price2":
        filterByPrice(6890, 10000);
        break;
      case "price3":
        filterByPrice(10000, 14900);
        break;
      case "price4":
        filterByPrice(14900, Infinity);
        break;
    }
  });
});

// 데이터 가져오기 및 초기 페이지 설정
fetchData();
