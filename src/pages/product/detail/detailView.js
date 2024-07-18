import { getNode as $, insertLast, comma } from "kind-tiger";
import productData from "./database.js";
import getPbImageURL from "@/api/getPbImageURL";

async function renderProductItem() {
  const { data } = await productData();
  const prodImg = data.detail;

  const productTemplate = `
    <div class="product-detail-image">
    <img class="product-thumbnail" src="${getPbImageURL(data, "thumbnail")}" alt="${data.title}" />
        </div>
     <section aria-labelledby="detail-page-heading" class="detail-container">
        <div class="detail-info-delivery" id="product-delivery" aria-label="배송 정보">${data.early_delivery ? "샛별배송" : "일반배송"}</div>
        <div class="detail-product-name">
          <h1 id="product-title">${data.title}</h1>
          <p class="detail-product-description" id="product-description">${data.description}</p>
        </div>
        <h2 class="detail-info-price" aria-label="상품 가격">
          <span class="detail-info-price-off" aria-hidden="true"></span>
          <span class="detail-info-price-number">${comma(data.price)}</span>
          <span class="detail-info-price-won">원</span>
        </h2>
        <ul class="detail-info-content-fontColor1 detail-info-ul">
          <li>
            <dt>배송</dt>
            <dd>
              <p>${data.early_delivery ? "샛별배송" : "일반배송"}</p>
              <p class="detail-info-content-fontColor2">
              ${data.early_delivery ? "23시 전 주문 시 내일 아침 7시 전 도착" : "다음날 도착"}
             
              </p>
              <p class="detail-info-content-fontColor2">
              ${data.early_delivery ? "(대구 부산 울산 샛별배송 운영시간 별도 확인)" : ""}
                
              </p>
            </dd>
          </li>
          <li>
            <dt>판매자</dt>
            <dd>
              <p>${data.seller}</p>
            </dd>
          </li>
          <li>
            <dt>포장타입</dt>
            <dd>
              <p>${data.packaging}</p>
              <p class="detail-info-content-fontColor2">
                텍배배송은 에코 포장이 스티포롬으로 대체됩니다.
              </p>
            </dd>
          </li>
          <li>
            <dt>판매단위</dt>
            <dd>
              <p>${data.unit}</p>
            </dd>
          </li>
          <li>
            <dt>중량/용량</dt>
            <dd>
              <p>${data.weight_capacity}</p>
            </dd>
          </li>
          <li>
            <dt>원산지</dt>
            <dd>
              <p>${data.made_in}</p>
            </dd>
          </li>
          <li>
            <dt>알레르기정보</dt>
            <dd class="detail-info-allergy">
            ${data.allergy}
              </p>
            </dd>
          </li>
        </ul>
        <div>
          <li class="detail-info-choice">
            <dt class="detail-info-content-fontColor1">상품선택</dt>
            <dd class="detail-container-conuter-small">
              <div class="detail-info-content-fontColor1">
                <p id="product-choice"></p>
              </div>
              <div class="detail-container-counter-medium" aria-label="수량 선택">
                <div class="detail-info-counter">
                  <button class="detail-counter-button" id="decrease" aria-label="수량 감소">-</button>
                  <input type="number" class="detail-counter-number" id="counter" value="1"/>
                  <button class="detail-counter-button" id="increase" aria-label="수량 증가">+</button>
                </div>
                <div class="detail-info-totalPrice-small"><span id="total-price" aria-label="총 가격">${comma(data.price)}</span>원</div>
              </div>
            </dd>
          </li>
          <!-- 총 상품금액 -->
          <div class="totalPrice-section">
            <div class="detail-info-totalPrice">
              <span>총 상품금액:</span>
              <span id="total-product-price">${comma(data.price)}</span>
              <span>원</span>
            </div>
            <!--<div class="detail-loggedOut-benefit-message2" aria-label="적립 혜택 안내">
              <div class="detail-loggedOut-benefit-circle">
                <span class="detail-loggedOut-benefit-message2-text">적립</span>
              </div>
              <span class="detail-loggedOut-benefit-message2-text">로그인 후, 적립 혜택 제공</span>
            </div>-->
            <div class="detail-container-service-btn">
              <button type="button" class="detail-btn-wishlist" aria-label="찜하기">
                <span><img src="/src/assets/detail-heartIcon.png" alt="찜하기" /></span>
              </button>
              <button type="button" class="detail-btn-bell" aria-label="알림받기">
                <span><img src="/src/assets/detail-bell-icon.png" alt="알림받기" /></span>
              </button>
              <div class="detail-container-cart-btn">
                <button type="submit" tabindex="0"><span>장바구니 담기</span></button>
              </div>
            </div>
          </div>
        </div>
      </section>
  `;

  insertLast(".detail-main", productTemplate);

  prodImg.forEach((img) => {
    function getPbDetailImgURL() {
      return `${import.meta.env.VITE_PB_API}/files/${data.collectionId}/${data.id}/${img}`;
    }

    const prodImgTemplate = `
      <div>
       <img class="product-detail" src="${getPbDetailImgURL()}" alt="${data.title}" />
      </div>
      `;

    insertLast(".product-detail-content", prodImgTemplate);
  });
}

renderProductItem();
