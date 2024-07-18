import defaultAuthData from "@/api/defaultAuthData";
import { setStorage } from "kind-tiger";

if (!localStorage.getItem("auth")) {
  setStorage("auth", defaultAuthData);
}

// async function renderProductItemRecomd() {
// const productData = await pb.collection("products").getFullList({
//   sort: "-created",
// });
// }
