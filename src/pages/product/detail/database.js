import pb from "@/api/pocketbase";

export const params = new URLSearchParams(location.search);
export const productId = params.get("product");
export const data = await pb.collection("products").getOne(productId);
export const reviewData = await pb.collection("reviews").getFullList({
  sort: "created",
});
export const inquiryData = await pb.collection("inquiry").getFullList({
  sort: "created",
});
