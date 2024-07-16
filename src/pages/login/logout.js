import { getNode, setStorage, insertLast, getStorage } from "kind-tiger";
import pb from "@/api/pocketbase.js";
import defaultAuthData from "@/api/defaultAuthData.js";

export async function logout() {
  if (localStorage.getItem("auth")) {
    const { isAuth, user } = await getStorage("auth");

    console.log(isAuth);

    if (isAuth) {
      const template = `
  <div style="font-size: var.$font-size-sm;">
    <span class="username" style="font-size: 12px;">${user.name}님</span>&nbsp;
    <span aria-hidden="true" style="color: #d9d9d9; font-size: 12px">&#124;</span>
    <button type="button" class="logout" style="background: none; border: none; color: #5f0080; font-size: 12px; cursor: pointer;" >로그아웃</button>&nbsp;
  </div>
`;
      insertLast(".login-toggle", template);

      // 로그인 시 숨길 요소들 처리
      const loginHidden = document.querySelectorAll(".login-hidden");
      loginHidden.forEach((el) => (el.style.display = "none"));
    }

    const logout = getNode(".logout");

    function handleLogout() {
      if (confirm("정말 로그아웃 하실겁니까?")) {
        pb.authStore.clear();
        setStorage("auth", defaultAuthData);
        location.reload();
      }
    }

    logout.addEventListener("click", handleLogout);
  }
}

logout();
