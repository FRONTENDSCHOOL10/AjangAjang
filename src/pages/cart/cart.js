import { getNode as $, insertLast, getStorage } from "kind-tiger";
import pb from "@/api/pocketbase";
import getPbImageURL from "@/api/getPbImageURL";

async function renderCartItem() {
  const { user } = await getStorage("auth");
  // const params = new URLSearchParams(location.search);
  // const productId = params.get("product");
  //const data = await pb.collection("products").getOne(productId);
  //const { title } = data;
  const cartData = await pb.collection("cart").getFullList({});
  const productData = await pb.collection("products").getFullList({});

  console.log(cartData);

  // cartData.forEach((item) => {
  //   const cartList = item.item;

  //   cartList.forEach((item) => {

  //     productData.forEach((a) => {

  //       if (item === a.id) {
  //         console.log("같음");
  //       } else {
  //         console.log("다름");
  //       }
  //     });
  //   });
  // });
}

renderCartItem();
