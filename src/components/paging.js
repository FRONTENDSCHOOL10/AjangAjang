const COUNT_PER_PAGE = 5;
const PAGE_BUTTON_LIMIT = 3; // 한 번에 표시할 페이지 버튼의 수
const pageNumberWrapper = document.querySelector('.page-number-wrapper');
const ul = document.querySelector('ul');
const prevBtn_5page = document.querySelector('.prev-btn-5page');
const prevBtn = document.querySelector('.prev-btn');
const nextBtn = document.querySelector('.next-btn');
const nextBtn_5page = document.querySelector('.next-btn-5page');
let pageNumberBtns;

let currentPage = getCurrentPageFromURL();

function getCurrentPageFromURL() {
  const params = new URLSearchParams(window.location.search);
  return parseInt(params.get('page')) || 1;
}

const updateURL = (pageNumber) => {
  const params = new URLSearchParams(window.location.search);
  params.set('page', pageNumber);
  history.pushState({}, '', `${window.location.pathname}?${params}`);
};

const getTotalPageCount = () => {
  return Math.ceil(data.length / COUNT_PER_PAGE);
};

const setPageButtons = () => {
  pageNumberWrapper.innerHTML = '';
  const totalPageCount = getTotalPageCount();

  // 현재 페이지가 속하는 페이지 그룹의 시작 페이지와 끝 페이지를 계산합니다.
  const startPage = Math.floor((currentPage - 1) / PAGE_BUTTON_LIMIT) * PAGE_BUTTON_LIMIT + 1;
  const endPage = Math.min(startPage + PAGE_BUTTON_LIMIT - 1, totalPageCount);

  for (let i = startPage; i <= endPage; i++) {
    pageNumberWrapper.innerHTML += `<span class="page-number-btn"> ${i} </span>`;
  }

  pageNumberBtns = document.querySelectorAll('.page-number-btn');

  // 현재 페이지 버튼에 'selected' 클래스 추가
  pageNumberBtns.forEach((btn) => {
    if (parseInt(btn.textContent.trim()) === currentPage) {
      btn.classList.add('selected');
    }
  });

  addPageButtonListeners();
};

const setPageOf = (pageNumber) => {
  ul.innerHTML = '';

  for (
    let i = COUNT_PER_PAGE * (pageNumber - 1) + 1;
    i <= COUNT_PER_PAGE * (pageNumber - 1) + COUNT_PER_PAGE && i <= data.length;
    i++
  ) {
    const li = document.createElement('li');

    // 컨테이너
    const pageContainer = document.createElement('div');
    pageContainer.className = 'page-container';

    // 글 번호
    const pageNumber = document.createElement('p');
    pageNumber.className = 'page-number';

    // 글 제목
    const pageTitle = document.createElement('p');
    pageTitle.className = 'page-title';

    pageNumber.textContent = data[i - 1].pageNumber;
    pageTitle.textContent = data[i - 1].title;

    pageContainer.append(pageNumber, pageTitle);
    li.append(pageContainer);
    ul.append(li);
  }
};

/**
 * 페이지 이동에 따른 css 클래스 적용
 */
const moveSelectedPageHighlight = () => {
  const pageNumberBtns = document.querySelectorAll('.page-number-btn'); // 페이지 버튼들

  pageNumberBtns.forEach((numberButton) => {
    if (numberButton.classList.contains('selected')) {
      numberButton.classList.remove('selected');
    }
  });

  pageNumberBtns[currentPage - 1].classList.add('selected');
};

const addPageButtonListeners = () => {
  pageNumberBtns.forEach((numberButton) => {
    numberButton.addEventListener('click', (e) => {
      currentPage = +e.target.innerHTML;
      console.log(currentPage);
      setPageOf(currentPage);
      setPageButtons(); // 페이지 버튼 업데이트
      updateURL(currentPage); // URL 업데이트
    });
  });
};

setPageButtons();
setPageOf(currentPage);

/**
 * 3개 이전 버튼 클릭 리스너
 */
prevBtn_5page.addEventListener('click', () => {
  if (currentPage > 3) {
    currentPage = Math.max(1, currentPage - 3);
    setPageOf(currentPage);
    setPageButtons();
    updateURL(currentPage); // URL 업데이트
  }
});

/**
 * 이전 버튼 클릭 리스너
 */
prevBtn.addEventListener('click', () => {
  if (currentPage > 1) {
    currentPage -= 1;
    setPageOf(currentPage);
    setPageButtons();
    updateURL(currentPage); // URL 업데이트
  }
});

/**
 * 이후 버튼 클릭 리스너
 */
nextBtn.addEventListener('click', () => {
  if (currentPage < getTotalPageCount()) {
    currentPage += 1;
    setPageOf(currentPage);
    setPageButtons();
    updateURL(currentPage); // URL 업데이트
  }
});

/**
 * 3개 이후 버튼 클릭 리스너
 */
nextBtn_5page.addEventListener('click', () => {
  const totalPageCount = getTotalPageCount();
  if (currentPage < totalPageCount) {
    currentPage = Math.min(totalPageCount, currentPage + 3);
    setPageOf(currentPage);
    setPageButtons();
    updateURL(currentPage); // URL 업데이트
  }
});
