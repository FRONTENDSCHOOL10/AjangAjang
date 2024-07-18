import pb from "@/api/pocketbase";

async function productData() {
  const params = new URLSearchParams(location.search);
  const productId = params.get("product");
  const data = await pb.collection("products").getOne(productId);
  const reviewData = await pb.collection("reviews").getFullList({
    sort: "created",
  });
  const inquiryData = await pb.collection("inquiry").getFullList({
    sort: "created",
  });

  return { data, reviewData, inquiryData };
}

export default productData;
