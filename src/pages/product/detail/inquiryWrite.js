import { getNode as $, insertLast, getStorage } from "kind-tiger";
import { fetchProductData } from "/src/pages/product/detail/database.js";
import pb from "@/api/pocketbase";
import getPbImageURL from "@/api/getPbImageURL";

const inquiryWrite = $(".inquiry-write");

function writePopupOpen() {
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
    const { data } = await fetchProductData();

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

inquiryWrite.addEventListener("click", writePopupOpen);
