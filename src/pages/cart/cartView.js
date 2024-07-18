import { getNode as $, insertLast, getStorage, comma } from "kind-tiger";
import pb from "@/api/pocketbase";
import getPbImageURL from "@/api/getPbImageURL";

async function renderCartItem() {
  const { user } = await getStorage("auth");
  const record = await pb.collection("users").getOne(user.id, {
    expand: "cart",
  });

  const cartData = record.expand.cart;
  cartData.forEach((item) => {
    //console.log(item.title);

    const template = `
      <div role="group" class="cart-product">
        <div class="cart-product-list">
          <label for="productChecked1" aria-label="개별 선택" class="porduct-check"></label>
          <input type="checkbox" name="" id="productChecked1" />
          <img src="${getPbImageURL(item, "thumbnail")}" alt="" />
          <b>${item.title}</b>
        </div>
        <div role="group" class="product-count">
          <label for="itemCount" class="sr-only">상품의 수량을 버튼을 통해 설정할 수 있습니다.</label>
          <button class="minus-btn" aria-label="수량 빼기">-</button>
          <input type="number" value="1" id="itemCount" aria-label="현재 수량 " />
          <button class="plus-btn" aria-label="수량 더하기">+</button>
        </div>
        <div class="product-price-delete">
        <span class="default-price">${comma(item.price)}</span>
        <button type="button"><img src="/src/assets/icon/Cancel.png" alt="삭제" /></button>
      </div>
      </div>
    `;

    insertLast(".cart-product-container", template);
  });
}

renderCartItem();
