import pb from "@/api/pocketbase";

export async function fetchProductData() {
  const params = new URLSearchParams(location.search);
  const productId = params.get("product");
  const data = await pb.collection("products").getOne(productId);
  const reviewData = await pb.collection("reviews").getFullList({
    sort: "created",
  });
  const inquiryData = await pb.collection("inquiry").getFullList({
    sort: "created",
  });

  return { params, productId, data, reviewData, inquiryData };
}
