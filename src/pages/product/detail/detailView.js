import { getNode as $, insertLast, insertFirst, insertAfter, comma, getStorage, setDocumentTitle } from "kind-tiger";
import getPbImageURL from "@/api/getPbImageURL";
import pb from "@/api/pocketbase";

async function renderProductItem() {
  const params = new URLSearchParams(location.search);
  const productId = params.get("product");
  const data = await pb.collection("products").getOne(productId);
  const prodImg = data.detail;
  const reviewData = await pb.collection("reviews").getFullList({
    sort: "created",
  });
  const inquiryData = await pb.collection("inquiry").getFullList({
    sort: "created",
  });

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
              <svg role="img" class="svg-icon">
              <use href="/icon/stack.svg#heart-2" />
            </svg>
              </button>
              <button type="button" class="detail-btn-bell" aria-label="알림받기">
              <svg role="img"  class="svg-icon">
              <use href="/icon/stack.svg#bell" />
            </svg>
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
    } else if (data.title === item.review_product && item.best_review) {
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
    } else if (data.title === item.review_product) {
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

  /*리뷰쓰기 */

  const reviewWrite = $(".review-write");

  function writePopupOpen() {
    const dimTemplate = `
    <div class=dim></div>
    <section class="popup-wrap">
      <div class="popup-title">
        <h3>후기 작성</h3>
        <button type="button" class="close-button" aria-label="창 닫기"></button>
      </div>
      <div class="product-info"></div>
      <div class="review_guide">
      <b tabindex = "0">리뷰작성 주의사항 </b>
        <span class="guide" tabindex = "0" >
        컬리는 믿을 수 있는 후기문화를 함께 만들어가고자 합니다.<br>식품 등의 표시광고에 대한 법률을 준수하고자 다음과 같은 부당한 상품평에 대해서는 별도 고지 없이 임시 대처, 비공개 전환, 삭제, 적립금 회수 등의 필요한 조치가 취해 질 수 있습니다.<br><br> 후기 작성 시 유의사항<br> 개인의 주관적인 의견으로 인해 상품의 기능 및 효과에 대하여 오해의 소지가 있는 내용 식품/건강기능식품과 관련하여 질병의 예방 및 치료, 체중감량(다이어트)에 효능효과가 있다는 내용<br> 일반 화장품을 기능성화장품의 효능효과가 있다는 내용을 통한 오인 표현<br> 의약외품을 의약품으로 오인하게 하는 표현<br> 생활화학제품을 본래 용도와 다르게 사용하는 내용 및 효능효과를 과장하는 내용<br> 욕설, 폭력성, 음란성, 상업성 등의 게시물 또는 구매 상품과 무관하거나 반복되는 동일 단어나 문장을 사용하여 판매자나 다른 이용자의 후기 이용을 방해한다고 판단되는 경우<br> 구매한 상품이 아닌 캡쳐 사진, 타인 사진 도용, 포장 박스, 퍼플박스, 구매 상품을 구분할 수 없는 전체 사진 등 상품과 관련 없는 이미지, 동영상을 사용한 경우<br> 본인 또는 타인의 주민등록번호, (휴대)전화번호, 이메일 등 개인정보가 포함된 경우<br> 그 밖에 상품평으로 인해 다른 회원 또는 제3자에게 피해가 가해질 내용<br> 작성된 글과 첨부된 멀티미디어 파일 등으로 이루어진 각 상품평은 개인의 의견을 반영하므로, 게시된 내용에 대한 모든 책임은 작성자에게 있습니다. 또한 비정상적인 방법을 통해 후기를 작성하고 적립금을 취득한 경우 작성자에 법적 책임의 소지가 있음을 알려드립니다.</span>
      </div>
      <div class="write-wrap" role="group">
        <div class="write-title">
          <label for="reviewTitle">제목</label>
          <input type="text" id="reviewTitle" placeholder="제목을 입력해 주세요" aria-required required />
        </div>
        <div class="write-text">
          <label for="reviewText">내용</label>
          <textarea
            name=""
            id="reviewText"
            aria-required
            required
            placeholder="내용을 입력해 주세요."></textarea>
        </div>
        <div class="secret-inquiry" role="group">
          <input type="checkbox" name="" id="secretInquiry" aria-checked="false" />
        </div>
      </div>

      <div class="popup-btn" role="group">
        <button type="button" class="btn-cancel close-button">취소</button>
        <button type="button" class="btn-register">등록</button>
      </div>
    </section>
  `;
    insertLast("body", dimTemplate);

    async function wirteReview() {
      const { user } = await getStorage("auth");

      const { title } = data;
      const titleField = $("#reviewTitle");
      const detailField = $("#reviewText");
      const registerButton = $(".btn-register");

      const template = `
      <img src="${getPbImageURL(data, "thumbnail")}" alt="" />
      <b>${title}</b>
      `;

      insertLast(".product-info", template);

      registerButton.addEventListener("click", () => {
        const reviewTitle = titleField.value;
        const reviewText = detailField.value;
        const userId = user.name;

        pb.collection("reviews")
          .create({
            review_title: reviewTitle,
            review_text: reviewText,
            review_user: userId,
            review_product: title,
          })
          .then(() => {
            alert("리뷰가 등록되었습니다.");
            location.href = window.location.href;
          })
          .catch(() => {
            alert("리뷰가 등록되지 않았습니다.");
          });
      });
    }

    wirteReview();

    const writeClose = document.querySelectorAll(".close-button");

    function writePopupClose() {
      const popupDim = $(".dim");
      const closeButton = $(".popup-wrap");

      popupDim.remove();
      closeButton.remove();
    }

    writeClose.forEach((button) => {
      button.addEventListener("click", writePopupClose);
    });
  }

  reviewWrite.addEventListener("click", writePopupOpen);

  /*문의 보기 */
  async function renderInquiryItem() {
    const { user } = await getStorage("auth");

    const { title } = data;

    inquiryData.forEach((item) => {
      const inquiryUser = item.inquiry_user;
      const maskName = inquiryUser.slice(0, 1) + "*".repeat(inquiryUser.length - 2) + inquiryUser.slice(-1);
      const dete = item.updated.slice(0, 10);

      if (item.notice) {
        const noticeTemplate = `
        <details>
            <summary>
              <div class="inquiry-notice">
                <span class="notice-badge">공지</span>
                <span> ${item.inquiry_title}</span>
              </div>
              <div class="inquiry-status">
                <span class="writer">${item.inquiry_user}</span>
                <span class="date">${dete}</span>
                <span class="status">${item.status}</span>
              </div>
            </summary>
            <div class="inquiry-text">
              <div >
                ${item.inquiry_text}
              </div>
            </div>
          </details>
        `;
        insertAfter(".inquiry-head", noticeTemplate);
      } else if (user.name === inquiryUser && title === item.inquiry_product && !item.secret) {
        const openTemplate = `
        <details class="inquiry-member">
            <summary>
              <div class="inquiry-list-title">
                <b>${item.inquiry_title}</b>
              </div>
              <div class="inquiry-status">
                <span class="writer">${maskName}</span>
                <span class="date">${dete}</span>
                <span class="status">${item.status}</span>
              </div>
            </summary>
            <div class="inquiry-text">
              <div class="question">
              ${item.inquiry_text}
              </div>
              <div class="answer">
              ${item.inquiry_answer}
              </div>
            </div>
          </details>
        `;
        insertFirst(".inquiry-data", openTemplate);
      } else if (user.name === item.inquiry_user && item.secret) {
        const userSecretTemplate = `
          <details class="inquiry-member" >
          <summary class="secret-text">
          <div class="inquiry-list-title">
            <b>${item.inquiry_title}</b>
          </div>
          <div class="inquiry-status">
            <span class="writer">${maskName}</span>
            <span class="date">${dete}</span>
            <span class="status">${item.status}</span>
          </div>
          </summary>
          <div class="inquiry-text">
              <div class="question">
              ${item.inquiry_text}
              </div>
              <div class="answer">
              ${item.inquiry_answer}
              </div>
            </div>
        </details>
        `;
        insertFirst(".inquiry-data", userSecretTemplate);
      } else if (user.name !== item.inquiry_user && item.secret) {
        const secretTemplate = `
          <details class="inquiry-member" open>
          <summary class="secret-text">
          <div class="inquiry-list-title">
            <b>비밀글입니다.</b>
          </div>
          </summary>
        </details>
        `;
        insertFirst(".inquiry-data", secretTemplate);
      } else {
        return;
      }
    });
  }

  renderInquiryItem();

  const inquiryWrite = $(".inquiry-write");

  function writeInquiryPopupOpen() {
    const dimTemplate = `
    <div class=dim></div>
    <section class="popup-wrap">
      <div class="popup-title">
        <h3>상품 문의하기</h3>
        <button type="button" class="close-button" aria-label="창 닫기"></button>
      </div>
      <div class="product-info"></div>
      <div class="review_guide">
      <b tabindex = "0">상품문의 작성 전 확인해 주세요</b>
        <span class="guide" tabindex = "0" >
        답변은 영업일 기준 2~3일 소요됩니다. <br />해당 게시판의 성격과 다른 글은 사전동의 없이 담당 게시판으로 이동될 수 있습니다.<br />배송관련, 주문(취소/교환/환불)관련 문의 및 요청사항은 마이칼리 내 1:1 문의에 남겨주세요. <br /><b>제품</b><br />입고일 : 품절 상품 입고 일이 확정된 경우, 섬네일에 기재되어 있습니다. (종 모양을 클릭하여, 재입고 알림 설정 가능)<br />제품 상세정보 : 영양성분 및 함량, 용량, 보관 및 취급 방법 등 제품 정보는 상세이미지 또는 상세정보에서 확인 가능합니다.</span>
      </div>
      <div class="write-wrap" role="group">
        <div class="write-title">
          <label for="reviewTitle">제목</label>
          <input type="text" id="reviewTitle" placeholder="제목을 입력해 주세요" aria-required required />
        </div>
        <div class="write-text">
          <label for="reviewText">내용</label>
          <textarea
            name=""
            id="reviewText"
            aria-required
            required
            placeholder="내용을 입력해 주세요."></textarea>
        </div>       
        <div class="secret-inquiry" role="group">
          <input type="checkbox" name="" id="secretInquiry" aria-checked="false" />
          <label for="secretInquiry">비밀글로 문의하기</label>
        </div>
      </div>
      
      <div class="popup-btn" role="group">
        <button type="button" class="btn-cancel close-button">취소</button>
        <button type="button" class="btn-register">등록</button>
      </div>
    </section>
  `;
    insertLast("body", dimTemplate);

    async function wirteInquiry() {
      const { user } = await getStorage("auth");
      const titleField = $("#reviewTitle");
      const detailField = $("#reviewText");
      const registerButton = $(".btn-register");

      const { title } = data;

      const template = `
      <img src="${getPbImageURL(data, "thumbnail")}" alt="" />
      <b>${title}</b>
      `;

      insertLast(".product-info", template);

      let isChecked = false;
      const checkbox = document.getElementById("secretInquiry");

      checkbox.addEventListener("change", () => {
        isChecked = checkbox.checked;
        inquiryData.secret = isChecked;
      });

      registerButton.addEventListener("click", () => {
        const inquiryTitle = titleField.value;
        const inquiryText = detailField.value;
        const userId = user.name;

        pb.collection("inquiry")
          .create({
            inquiry_title: inquiryTitle,
            inquiry_text: inquiryText,
            inquiry_user: userId,
            inquiry_product: title,
            status: "답변대기",
            secret: isChecked,
          })
          .then(() => {
            alert("문의가 등록되었습니다.");
            location.href = window.location.href;
          })
          .catch(() => {
            alert("문의가 등록되지 않았습니다.");
          });
      });
    }

    wirteInquiry();

    const writeClose = document.querySelectorAll(".close-button");

    function writePopupClose() {
      const popupDim = $(".dim");
      const closeButton = $(".popup-wrap");

      popupDim.remove();
      closeButton.remove();
    }

    writeClose.forEach((button) => {
      button.addEventListener("click", writePopupClose);
    });
  }

  inquiryWrite.addEventListener("click", writeInquiryPopupOpen);
}

renderProductItem();
