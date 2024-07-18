import abstractsStyle from "/src/sass/abstracts/_index.scss?inline";
import baseStyle from "/src/sass/base/_index.scss?inline";
import headerStyle from "/src/sass/layout/_header.scss?inline"; // css 파일 inline 가져오기

import { getStorage, setStorage, getNode } from "kind-tiger";
import pb from "../api/pocketbase";
import defaultAuthData from "@/api/defaultAuthData";

if (!localStorage.getItem("auth")) {
  setStorage("auth", defaultAuthData);
}

const { isAuth, user } = await getStorage("auth");

class Header extends HTMLElement {
  constructor() {
    super();
    this.attachShadow({ mode: "open" });

    this.shadowRoot.innerHTML = `
    <style>
      ${abstractsStyle},
      ${baseStyle},
      ${headerStyle}
    </style>
    <header class="content-center">
    <div class="header-list-member">
      <ul>
        ${
          isAuth
            ? `
            <li class="login-toggle">
              <div style="font-size: var.$font-size-sm;">
                <span class="username" style="font-size: 12px;">${user.name}님</span>&nbsp;
                <span aria-hidden="true" style="color: #d9d9d9; font-size: 12px">&#124;</span>
                <button type="button" class="logout" style="background: none; border: none; color: #5f0080; font-size: 12px; cursor: pointer;" >로그아웃</button>&nbsp;
              </div>
            </li>
            `
            : `
            <li class="login-hidden">
              <a href="/src/pages/register/register.html" class="join">회원가입</a>
            </li>
            <li class="login-hidden">
              <span aria-hidden="true">&#124;</span><a href="/src/pages/login/login.html">로그인</a>
            </li>
            `
        }
        <li>
          <span aria-hidden="true">&#124;</span><a href="/">고객센터</a>
        </li>
      </ul>
    </div>
    <div class="header-wrap">
      <h1>
        <a href="/"><img src="/logo.svg" alt="마켓칼리" /></a>
      </h1>
      <div class="header-input-search">
        <label for="inputSearch" class="sr-only">검색어를 입력해주세요</label>
        <input type="text" id="inputSearch" placeholder="검색어를 입력해주세요" />
        <button type="button" aria-label="검색하기">
        </button>
      </div>
      <ul class="header-list-other">
        <li>
          <a href="/" aria-label="배송지 설정">
            <svg role="img" class="svg-icon">
              <use href="/icon/stack.svg#location" />
            </svg>
          </a>
        </li>
        <li>
          <a href="/" aria-label="찜한 상품 보기">
            <svg role="img" class="svg-icon">
              <use href="/icon/stack.svg#heart" />
            </svg>
          </a>
        </li>
        <li>
          <a href="/src/pages/cart/cart.html" aria-label="장바구니">
            <svg role="img" class="svg-icon">
              <use href="/icon/stack.svg#cart-1" />
            </svg>
          </a>
        </li>
      </ul>
    </div>
  </header>
  <div class="header-category-wrap">
    <div class="header-category content-center">
      <nav>
        <div class="header-btn-category" tabindex="0">
          <svg role="img" aria-label="카테고리" class="svg-icon">
            <use href="/icon/stack.svg#hamburger" />
          </svg>
          카테고리
        </div>
        <div class="header-category-detail">
        <ul>
            <li>
              <a href="/" aria-label="선물하기" >
                <svg role="img" class="svg-icon">
                  <use href="/icon/stack.svg#menu-gift" />
                </svg>
                선물하기
              </a>
            </li>
            <li>
              <a href="/" aria-label="채소">
                <svg role="img" class="svg-icon">
                  <use href="/icon/stack.svg#menu-vegetable" />
                </svg>
                채소
              </a>
            </li>
            <li>
              <a href="/" aria-label="과일, 견과, 쌀">
                <svg role="img" class="svg-icon">
                  <use href="/icon/stack.svg#menu-fruit" />
                </svg>
                과일 &middot; 견과 &middot; 쌀
              </a>
            </li>
            <li>
              <a href="/" aria-label="수산, 해산, 건어물">
                <svg role="img" class="svg-icon">
                  <use href="/icon/stack.svg#menu-sea-food" />
                </svg>  
                수산 &middot; 해산 &middot; 건어물
              </a>
            </li>
            <li>
              <a href="/" aria-label="정육, 계란">
                <svg role="img" class="svg-icon">
                  <use href="/icon/stack.svg#menu-meet" />
                </svg>
                정육 &middot; 계란
              </a>
            </li>
            <li>
              <a href="/" aria-label="국, 반찬, 메인요리">
                <svg role="img" class="svg-icon">
                  <use href="/icon/stack.svg#menu-cook" />
                </svg>
                국 &middot; 반찬 &middot; 메인요리
              </a>
            </li>
            <li>
              <a href="/" aria-label="샐러드, 간편식">
                <svg role="img" class="svg-icon">
                  <use href="/icon/stack.svg#menu-salad" />
                </svg>  
                샐러드 &middot; 간편식
              </a>
            </li>
            <li>
              <a href="/" aria-label="면, 양념, 오일">
                <svg role="img" class="svg-icon">
                  <use href="/icon/stack.svg#menu-oil" />
                </svg>
                면 &middot; 양념 &middot; 오일
              </a>
            </li>
            <li>
              <a href="/" aria-label="생수, 음료, 우유, 커피">
                <svg role="img" class="svg-icon">
                  <use href="/icon/stack.svg#menu-coffee" />
                </svg>
                생수 &middot; 음료 &middot; 우유 &middot; 커피
              </a>
            </li>
            <li>
              <a href="/" aria-label="간식, 과자, 떡">
                <svg role="img" class="svg-icon">
                  <use href="/icon/stack.svg#menu-snack" />
                </svg>
                간식 &middot; 과자 &middot; 떡
              </a>
            </li>
            <li>
              <a href="/" aria-label="베이커리, 치즈, 델리">
                <svg role="img" class="svg-icon">
                  <use href="/icon/stack.svg#menu-bread" />
                </svg>
                베이커리 &middot; 치즈 &middot; 델리
              </a>
            </li>
            <li>
              <a href="/" aria-label="건강식품">
                <svg role="img" class="svg-icon">
                  <use href="/icon/stack.svg#menu-health" />
                </svg>
                건강식품
              </a>
            </li>
            <li>
              <a href="/" aria-label="와인">
                <svg role="img" class="svg-icon">
                  <use href="/icon/stack.svg#menu-wine" />
                </svg>
                와인
              </a>
            </li>
            <li>
              <a href="/" aria-label="전통주">
                <svg role="img" class="svg-icon">
                  <use href="/icon/stack.svg#menu-traditional-liquor" />
                </svg>
                전통주
              </a>
            </li>
            <li>
              <a href="/" aria-label="생활용품, 리빙, 캠핑">
                <svg role="img" class="svg-icon">
                  <use href="/icon/stack.svg#menu-detergent" />
                </svg>
                생활용품 &middot; 리빙 &middot; 캠핑
              </a>
            </li>
            <li>
              <a href="/" aria-label="스킨케어, 메이크업">
                <svg role="img" class="svg-icon">
                  <use href="/icon/stack.svg#menu-cosmetics" />
                </svg>
                스킨케어 &middot; 메이크업
              </a>
            </li>
            <li>
              <a href="/" aria-label="헤어,바디,구강">
                <svg role="img" class="svg-icon">
                  <use href="/icon/stack.svg#menu-shampoo" />
                </svg>
                헤어 &middot; 바디 &middot; 구강
              </a>
            </li>
            <li>
              <a href="/" aria-label="주방용품">
                <svg role="img" class="svg-icon">
                  <use href="/icon/stack.svg#menu-food" />
                </svg>
                주방용품
              </a>
            </li>
            <li>
              <a href="/" aria-label="가전제품">
                <svg role="img" class="svg-icon">
                  <use href="/icon/stack.svg#menu-home-appliances" />
                </svg>
                가전제품
              </a>
            </li>
            <li>
              <a href="/" aria-label="반려동물">
                <svg role="img" class="svg-icon">
                  <use href="/icon/stack.svg#menu-dog" />
                </svg>
                반려동물
              </a>
            </li>
            <li>
              <a href="/" aria-label="베이비, 키즈, 완구">
                <svg role="img" class="svg-icon">
                  <use href="/icon/stack.svg#menu-baby" />
                </svg>
                베이비 &middot; 키즈 &middot; 완구
              </a>
            </li>
            <li>
              <a href="/" aria-label="여행, 티켓">
                <svg role="img" class="svg-icon">
                  <use href="/icon/stack.svg#menu-travel" />
                </svg>
                여행 &middot; 티켓
              </a>
            </li>
          </ul>
        </div>
      </nav>
      <ul class="header-list-title">
        <li><a href="/src/pages/product/product-list.html">신상품</a></li>
        <li><a href="/src/pages/product/product-list.html">베스트</a></li>
        <li><a href="/src/pages/product/product-list.html">알뜰쇼핑</a></li>
        <li><a href="/src/pages/product/product-list.html">특가/혜택</a></li>
      </ul>
      <div class="header-button-delivery">
        <a href="/"><span>샛별&middot;낮</span> 배송안내</a>
      </div>
    </div>
  </div>
  `;

    this.logout = this.shadowRoot.querySelector(".logout");
  }

  connectedCallback() {
    if (this.logout) {
      this.logout.addEventListener("click", this.logOut.bind(this));
    }
  }

  logOut(e) {
    e.preventDefault();

    if (confirm("로그아웃 하시겠습니까?")) {
      pb.authStore.clear();
      setStorage("auth", defaultAuthData);

      location.reload();
    }
  }
}

customElements.define("c-header", Header);

function headerCategory() {
  const cHeader = getNode("c-header");
  const btnCategory = cHeader.shadowRoot.querySelector(".header-btn-category");
  const detailCategory = cHeader.shadowRoot.querySelector(
    ".header-category-detail"
  );
  const detailCategoryLastA = cHeader.shadowRoot.querySelector(
    ".header-category-detail li:last-child a"
  );

  function categoryOpen() {
    detailCategory.classList.add("is-active");
  }

  function categoryClose() {
    detailCategory.classList.remove("is-active");
  }

  btnCategory.addEventListener("mouseenter", categoryOpen);
  detailCategory.addEventListener("mouseleave", categoryClose);
  btnCategory.addEventListener("keydown", (event) => {
    if (event.keyCode == 13) {
      categoryOpen();
    }
  });
  detailCategoryLastA.addEventListener("focusout", categoryClose);
}

document.addEventListener("DOMContentLoaded", headerCategory);

export { Header, headerCategory };
