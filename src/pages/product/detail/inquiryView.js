import { getStorage, insertAfter, insertFirst } from "kind-tiger";
import { fetchProductData } from "/src/pages/product/detail/database.js";

async function renderInquiryItem() {
  const auth = await getStorage("auth");
  const user = auth ? auth.user : null; // user 객체가 없을 경우를 대비
  if (!user) {
    console.error("사용자가 인증되지 않았습니다");
    return;
  }
  const { data, inquiryData } = await fetchProductData();

  const { title } = data;

  inquiryData.forEach((item) => {
    const inquiryUser = item.inquiry_user;
    const maskName =
      inquiryUser.slice(0, 1) +
      "*".repeat(inquiryUser.length - 2) +
      inquiryUser.slice(-1);
    const dete = item.updated.slice(0, 10);

    if (item.notice) {
      const noticeTemplate = `
      <details>
          <summary>
            <div class="inquiry-notice">
              <span class="notice-badge">공지</span>
              <span> ${item.inquiry_title}</span>
            </div>
            <div class="inquiry-status">
              <span class="writer">${item.inquiry_user}</span>
              <span class="date">${dete}</span>
              <span class="status">${item.status}</span>
            </div>
          </summary>
          <div class="inquiry-text">
            <div >
              ${item.inquiry_text}
            </div>
          </div>
        </details>
      `;
      insertAfter(".inquiry-head", noticeTemplate);
    } else if (
      user.name === inquiryUser &&
      title === item.inquiry_product &&
      !item.secret
    ) {
      const openTemplate = `
      <details class="inquiry-member">
          <summary>
            <div class="inquiry-list-title">
              <b>${item.inquiry_title}</b>
            </div>
            <div class="inquiry-status">
              <span class="writer">${maskName}</span>
              <span class="date">${dete}</span>
              <span class="status">${item.status}</span>
            </div>
          </summary>
          <div class="inquiry-text">
            <div class="question">
            ${item.inquiry_text}
            </div>
            <div class="answer">
            ${item.inquiry_answer}
            </div>
          </div>
        </details>
      `;
      insertFirst(".inquiry-data", openTemplate);
    } else if (user.name === item.inquiry_user && item.secret) {
      const userSecretTemplate = `
        <details class="inquiry-member" >
        <summary class="secret-text">
        <div class="inquiry-list-title">
          <b>${item.inquiry_title}</b>
        </div>
        <div class="inquiry-status">
          <span class="writer">${maskName}</span>
          <span class="date">${dete}</span>
          <span class="status">${item.status}</span>
        </div>
        </summary>
        <div class="inquiry-text">
            <div class="question">
            ${item.inquiry_text}
            </div>
            <div class="answer">
            ${item.inquiry_answer}
            </div>
          </div>
      </details>
      `;
      insertFirst(".inquiry-data", userSecretTemplate);
    } else if (user.name !== item.inquiry_user && item.secret) {
      const secretTemplate = `
        <details class="inquiry-member" open>
        <summary class="secret-text">
        <div class="inquiry-list-title">
          <b>비밀글입니다.</b>
        </div>
        </summary>
      </details>
      `;
      insertFirst(".inquiry-data", secretTemplate);
    } else {
      return;
    }
  });
}

renderInquiryItem();
