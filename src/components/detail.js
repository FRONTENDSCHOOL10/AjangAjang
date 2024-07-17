import { comma, insertFirst, insertLast, getStorage, setStorage } from "kind-tiger";
import pb from "@/api/pocketbase";
import getPbImageURL from "@/api/getPbImageURL";
import defaultAuthData from "@/api/defaultAuthData";

if (!localStorage.getItem("auth")) {
  setStorage("auth", defaultAuthData);
}

async function renderProductItemRecomd() {
  // pocketbase API를 사용하여 상품 데이터를 비동기적으로 가져옵니다.
  const productData = await pb.collection("products").getFullList({
    sort: "-created",
  });