import pb from "@/api/pocketbase";
import { getNodes, getNode, insertLast, comma } from "kind-tiger";

export function cartPopup() {
  const addCartPopupButtons = getNodes(".product-card-button-popup");

  addCartPopupButtons.forEach((button) => {
    button.addEventListener("click", async () => {
      const productId = `${button.dataset.pdId}`;
      console.log("상품 아이디 " + productId);

      try {
        const data = await pb.collection("products").getOne(productId);
        const { title, sale, price } = data;
        const discount = price - price * (sale * 0.01);

        const cartPopDialog = getNode(".cart-popup-wrapper");
        const template = `
          <section class="cart-popup-wrap">
            <b>${title}</b>
            <div class="cart-detail-wrap">


              <div class="cart-price">
                <div class="price-wrap">
                  ${sale ? `<span class="sale-price">${sale}%</span>` : ``}
                  <span class="calculated-price">${!sale ? comma(price) : comma(discount)} 원</span>
                </div>

                <div class="product-number" role="group">
                  <button class="minus-btn">-</button>
                  <input type="number" value="1" />
                  <button class="plus-btn">+</button>
                </div>
              </div>
              <div class="cost-price">${comma(price)} 원</div>

              <div class="cart-price-total">
                <span>합계</span>
                <span class="price-total">${comma(price)} 원</span>
              </div>
              <div class="cart-point">
                <span class="point-label">할인상품</span>
                <span class="point-detail">구매 시 ${Math.round((price * sale) / 100)}원 혜택!</span>
              </div>
            </div>
            <form method="dialog" class="button-wrap">
              <button type="button" class="btn btn-line btn-small close-cart-popup-button">취소</button>
              <button type="button" data-product-id="${button.dataset.pdId}" class="btn btn-fill btn-small add-cart-popup-button">장바구니 담기</button>
            </form>
          </section>
        `;
        insertLast(cartPopDialog, template);

        cartPopDialog.showModal();

        const addCart = getNode(".add-cart-popup-button");
        const closePopupButton = getNode(".close-cart-popup-button");
        const removeEl = getNode(".cart-popup-wrap");

        // 장바구니 팝업에서 담기 버튼 클릭시
        function addCartProduct() {
          const productIdCode = this.dataset.productId;

          // 로컬 스토리지에 productId 저장
          let cartStorage = localStorage.getItem("cart");
          if (cartStorage) {
            cartStorage = JSON.parse(cartStorage);
          } else {
            cartStorage = [];
          }
          if (!cartStorage.includes(productIdCode)) {
            cartStorage.push(productIdCode);
            localStorage.setItem("cart", JSON.stringify(cartStorage));
          }
        }
        addCart.addEventListener("click", addCartProduct);

        // 장바구니 팝업에서 취소 버튼 클릭시
        closePopupButton.addEventListener("click", () => {
          cartPopDialog.close();
          removeEl.remove();
        });
      } catch (error) {
        //console.error("상품 정보를 가져오는 중 오류 발생:", error);
      }
    });
  });
}

// function handleCartButtonClick(e) {
//   const button = e.target.closest(".productBox__cart-button");
//   if (!button) {
//     return;
//   } else {
//     e.preventDefault();

//     // 해당 product의 id 가져오기
//     const productIdIndex = e.target.closest("a").href.indexOf("#") + 1;
//     const productId = e.target.closest("a").href.slice(productIdIndex);

//     // 장바구니 팝업 그리기
//     drawCartPopup(productId);
//     addCartPopup.showModal();
//     return;
//   }
// }

//const swiperProductDiv = getNode(".swiper-product");
//swiperProductDiv.addEventListener("click", handleCartButtonClick);

/*

1. 장바구니 버튼 클릭시 팝업창 웹컴포넌트가 생성되고
2. 장바구니 팝업창에서 [취소] 버튼 클릭시 팝업창 닫히고 웹컴포넌트도 삭제
3. 장바구니 버튼 클릭시 해당 상품의 id를 콘솔에 뿌려보기
4. 장바구니 팝업창에서 [담기] 버튼 클릭시 상품의 id를 로컬스토리지에 저장하기
5. 장바구니 팝업창에서 [담기] 버튼 클릭시 헤더의 장바구니 아이콘 아래에 토스트 팝업이 뜨게 하기
https://github.com/FRONTENDSCHOOL8/pocket-karly/blob/develop/main.js
 */
