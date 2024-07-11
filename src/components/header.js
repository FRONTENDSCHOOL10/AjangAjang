

function headerCategory(){
  const header = document.querySelector("header");
  const btnCategory = document.querySelector(".header-btn-category");
  const detailCategory = document.querySelector(".header-category-detail");
  const detailCategoryLastA = document.querySelector(".header-category-detail li:last-child a");
  
  function categoryOpen(){
    detailCategory.classList.add("is-active")
  }
  
  function categoryClose(){
    detailCategory.classList.remove("is-active")
  }
  
  btnCategory.addEventListener("mouseenter",categoryOpen);
  detailCategory.addEventListener("mouseleave",categoryClose);
  btnCategory.addEventListener("keydown", (event) => {
    if(event.keyCode == 13){
      categoryOpen();
    }
  });
  detailCategoryLastA.addEventListener("focusout", categoryClose);
}

headerCategory();