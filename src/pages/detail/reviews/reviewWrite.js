import { getNode as $, insertLast, getStorage } from "kind-tiger";
import pb from "@/api/pocketbase";
import getPbImageURL from "@/api/getPbImageURL";

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

    const titleField = $("#reviewTitle");
    const detailField = $("#reviewText");
    const registerButton = $(".btn-register");

    const params = new URLSearchParams(location.search);
    const productId = params.get("product");
    const data = await pb.collection("products").getOne(productId);
    const { title } = data;

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
          location.href = "/src/components/review.html";
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
