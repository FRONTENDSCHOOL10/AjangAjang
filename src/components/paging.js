import {
  comma,
  getStorage,
  setStorage,
} from "kind-tiger";
import pb from "@/api/pocketbase";
import getPbImageURL from "@/api/getPbImageURL";
import defaultAuthData from "@/api/defaultAuthData";

if (!localStorage.getItem("auth")) {
  setStorage("auth", defaultAuthData);
}

let data = [];

async function fetchData() {
  const productData = await pb.collection("products").getFullList({ sort: "-created" });
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
    isAuth
  }));

  setPageButtons();
  setPageOf(currentPage);
}

const COUNT_PER_PAGE = 12;
const PAGE_BUTTON_LIMIT = 3;
const pageNumberWrapper = document.querySelector('.page-number-wrapper');
const ul = document.querySelector('.product-card-list');
const prevBtn_3page = document.querySelector('.prev-btn-3page');
const prevBtn = document.querySelector('.prev-btn');
const nextBtn = document.querySelector('.next-btn');
const nextBtn_3page = document.querySelector('.next-btn-3page');

let currentPage = getCurrentPageFromURL();

function getCurrentPageFromURL() {
  const params = new URLSearchParams(window.location.search);
  return parseInt(params.get('page')) || 1;
}

function updateURL(pageNumber) {
  const params = new URLSearchParams(window.location.search);
  params.set('page', pageNumber);
  history.pushState({}, '', `${window.location.pathname}?${params}`);
}

// 페이지 수 관여
function getTotalPageCount() {
  return Math.ceil(data.length * 20 / COUNT_PER_PAGE);
}

function setPageButtons() {
  pageNumberWrapper.innerHTML = '';
  const totalPageCount = getTotalPageCount();
  const startPage = Math.floor((currentPage - 1) / PAGE_BUTTON_LIMIT) * PAGE_BUTTON_LIMIT + 1;
  const endPage = Math.min(startPage + PAGE_BUTTON_LIMIT - 1, totalPageCount);

  for (let i = startPage; i <= endPage; i++) {
    pageNumberWrapper.innerHTML += `<span class="page-number-btn" data-page="${i}"> ${i} </span>`;
  }

  document.querySelectorAll('.page-number-btn').forEach((btn) => {
    if (parseInt(btn.dataset.page) === currentPage) {
      btn.classList.add('selected');
    }
    btn.addEventListener('click', (e) => {
      currentPage = parseInt(e.target.dataset.page);
      updatePage();
    });
  });
}

function setPageOf(pageNumber) {
  ul.innerHTML = '';
  for (let i = COUNT_PER_PAGE * (pageNumber - 1) + 1; i <= COUNT_PER_PAGE * (pageNumber - 1) + COUNT_PER_PAGE; i++) {
    const item = data[(i - 1) % data.length];
    const discount = item.price - item.price * (item.sale * 0.01);
    const template = `
      <li class="product-card">
        <a href="${item.isAuth ? `/src/pages/detail/index.html?product=${item.pageNumber}` : "/src/pages/login/"}" aria-label="${item.title} 상품링크" class="product-card-link">
          <b class="product-card-title">${item.title}</b>
          ${item.early_delivery ? `<p class="product-card-early-delivery">샛별배송</p>` : ``}
          ${item.description ? `<p class="product-card-description">${item.description}</p>` : ``}
          <div class="product-card-info-price">
            ${item.sale ? `<span class="product-cart-sale">${item.sale}%</span>` : ``}
            <span class="product-cart-price">${!item.sale ? comma(item.price) : comma(discount)} 원</span>
          </div>
          ${item.sale ? `<div class="product-card-cost">${comma(item.price)} 원</div>` : ``}
          <div class="product-card-badges">
            ${item.badge.map(badge => `<span class="product-card-badge${badge.includes('Karly Only') ? ' badges-primary' : ''}">${badge}</span>`).join('')}
          </div>
        </a>
        <div class="product-card-thumb">
          <button type="button" aria-label="장바구니 담기" class="product-card-button-icon-cart">
            <img src="/src/assets/icon-cart.png" alt="장바구니 담기" class="product-card-icon-cart"/>
          </button>
          <a href="/src/components/detail.html" tabindex="-1" aria-hidden="true">
            <img src="${item.thumbnail}" alt="${item.title} 썸네일" class="product-card-thumb-img"/>
          </a>
        </div>
      </li>
    `;
    ul.insertAdjacentHTML('beforeend', template);
  }
}

function updatePage() {
  setPageOf(currentPage);
  setPageButtons();
  updateURL(currentPage);
}

prevBtn_3page.addEventListener('click', () => {
  if (currentPage > 3) {
    currentPage = Math.max(1, currentPage - 3);
    updatePage();
  }
});

prevBtn.addEventListener('click', () => {
  if (currentPage > 1) {
    currentPage -= 1;
    updatePage();
  }
});

nextBtn.addEventListener('click', () => {
  const totalPageCount = getTotalPageCount();
  if (currentPage < totalPageCount) {
    currentPage += 1;
    updatePage();
  }
});

nextBtn_3page.addEventListener('click', () => {
  const totalPageCount = getTotalPageCount();
  if (currentPage < totalPageCount) {
    currentPage = Math.min(totalPageCount, currentPage + 3);
    updatePage();
  }
});

// 데이터 가져오기 및 초기 페이지 설정
fetchData();
