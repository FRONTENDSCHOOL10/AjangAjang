//import totalStyle from "/src/sass/main.scss?inline";
import { getNode } from "kind-tiger";

console.log("담아보자");

document.addEventListener("DOMContentLoaded", function () {
  const addCartPopup = getNode(".product-card-button-popup");
  console.log(addCartPopup);
  console.log("이건 나오나");
});

//addCartPopup.addEventListener("click", console.log("장바구니 담기 눌렀다"));

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

//swiperProductDiv.addEventListener("click", handleCartButtonClick);

/*

1. 장바구니 버튼 클릭시 팝업창 웹컴포넌트가 생성되고
2. 장바구니 팝업창에서 [취소] 버튼 클릭시 팝업창 닫히고 웹컴포넌트도 삭제
3. 장바구니 버튼 클릭시 해당 상품의 id를 콘솔에 뿌려보기
4. 장바구니 팝업창에서 [담기] 버튼 클릭시 상품의 id를 로컬스토리지에 저장하기
5. 장바구니 팝업창에서 [담기] 버튼 클릭시 헤더의 장바구니 아이콘 아래에 토스트 팝업이 뜨게 하기
https://github.com/FRONTENDSCHOOL8/pocket-karly/blob/develop/main.js
 */
