import {
  comma,
  insertFirst,
  insertLast,
  getStorage,
  setStorage,
} from "kind-tiger";
import pb from "@/api/pocketbase";
import getPbImageURL from "@/api/getPbImageURL";
import defaultAuthData from "@/api/defaultAuthData";

if (!localStorage.getItem("auth")) {
  setStorage("auth", defaultAuthData);
}

let data = []; // 데이터를 저장할 변수

async function fetchData() {
  const productData = await pb.collection("products").getFullList({
    sort: "-created",
  });

  const auth = await getStorage("auth");
  const isAuth = auth.isAuth;

  data = productData.map((item) => ({
    title: item.title,
    pageNumber: item.id, // pageNumber 대신 id 사용
    description: item.description,
    sale: item.sale,
    price: item.price,
    badge: item.badge,
    thumbnail: getPbImageURL(item, "thumbnail"),
    early_delivery: item.early_delivery,
    isAuth: isAuth // 수정된 부분
  }));

  setPageButtons();
  setPageOf(currentPage);
}

const COUNT_PER_PAGE = 5;
const PAGE_BUTTON_LIMIT = 3; // 한 번에 표시할 페이지 버튼의 수
const pageNumberWrapper = document.querySelector('.page-number-wrapper');
const ul = document.querySelector('.product-card-list');
const prevBtn_5page = document.querySelector('.prev-btn-5page');
const prevBtn = document.querySelector('.prev-btn');
const nextBtn = document.querySelector('.next-btn');
const nextBtn_5page = document.querySelector('.next-btn-5page');
let pageNumberBtns;

let currentPage = getCurrentPageFromURL();

function getCurrentPageFromURL() {
  const params = new URLSearchParams(window.location.search);
  return parseInt(params.get('page')) || 1;
}

const updateURL = (pageNumber) => {
  const params = new URLSearchParams(window.location.search);
  params.set('page', pageNumber);
  history.pushState({}, '', `${window.location.pathname}?${params}`);
};

const getTotalPageCount = () => {
  return Math.ceil(data.length / COUNT_PER_PAGE);
};

const setPageButtons = () => {
  pageNumberWrapper.innerHTML = '';
  const totalPageCount = getTotalPageCount();

  // 현재 페이지가 속하는 페이지 그룹의 시작 페이지와 끝 페이지를 계산합니다.
  const startPage = Math.floor((currentPage - 1) / PAGE_BUTTON_LIMIT) * PAGE_BUTTON_LIMIT + 1;
  const endPage = Math.min(startPage + PAGE_BUTTON_LIMIT - 1, totalPageCount);

  for (let i = startPage; i <= endPage; i++) {
    pageNumberWrapper.innerHTML += `<span class="page-number-btn"> ${i} </span>`;
  }

  pageNumberBtns = document.querySelectorAll('.page-number-btn');

  // 현재 페이지 버튼에 'selected' 클래스 추가
  pageNumberBtns.forEach((btn) => {
    if (parseInt(btn.textContent.trim()) === currentPage) {
      btn.classList.add('selected');
    }
  });

  addPageButtonListeners();
};

const setPageOf = (pageNumber) => {
  ul.innerHTML = '';

  for (
    let i = COUNT_PER_PAGE * (pageNumber - 1) + 1;
    i <= COUNT_PER_PAGE * (pageNumber - 1) + COUNT_PER_PAGE && i <= data.length;
    i++
  ) {
    const item = data[i - 1];
    const discount = item.price - item.price * (item.sale * 0.01);

    const template = `
      <li class="product-card">
        <a
          href="${item.isAuth ? `/src/pages/detail/index.html?product=${item.pageNumber}` : "/src/pages/login/"}"
          aria-label="${item.title} 상품링크"
          class="product-card-link"
        >
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
};

/**
 * 페이지 이동에 따른 css 클래스 적용
 */
const moveSelectedPageHighlight = () => {
  const pageNumberBtns = document.querySelectorAll('.page-number-btn'); // 페이지 버튼들

  pageNumberBtns.forEach((numberButton) => {
    if (numberButton.classList.contains('selected')) {
      numberButton.classList.remove('selected');
    }
  });

  pageNumberBtns[currentPage - 1].classList.add('selected');
};

const addPageButtonListeners = () => {
  pageNumberBtns.forEach((numberButton) => {
    numberButton.addEventListener('click', (e) => {
      currentPage = +e.target.innerHTML;
      console.log(currentPage);
      setPageOf(currentPage);
      setPageButtons(); // 페이지 버튼 업데이트
      updateURL(currentPage); // URL 업데이트
    });
  });
};

/**
 * 3개 이전 버튼 클릭 리스너
 */
prevBtn_5page.addEventListener('click', () => {
  if (currentPage > 3) {
    currentPage = Math.max(1, currentPage - 3);
    setPageOf(currentPage);
    setPageButtons();
    updateURL(currentPage); // URL 업데이트
  }
});

/**
 * 이전 버튼 클릭 리스너
 */
prevBtn.addEventListener('click', () => {
  if (currentPage > 1) {
    currentPage -= 1;
    setPageOf(currentPage);
    setPageButtons();
    updateURL(currentPage); // URL 업데이트
  }
});

/**
 * 이후 버튼 클릭 리스너
 */
nextBtn.addEventListener('click', () => {
  if (currentPage < getTotalPageCount()) {
    currentPage += 1;
    setPageOf(currentPage);
    setPageButtons();
    updateURL(currentPage); // URL 업데이트
  }
});

/**
 * 3개 이후 버튼 클릭 리스너
 */
nextBtn_5page.addEventListener('click', () => {
  const totalPageCount = getTotalPageCount();
  if (currentPage < totalPageCount) {
    currentPage = Math.min(totalPageCount, currentPage + 3);
    setPageOf(currentPage);
    setPageButtons();
    updateURL(currentPage); // URL 업데이트
  }
});

// 데이터 가져오기 및 초기 페이지 설정
fetchData();
