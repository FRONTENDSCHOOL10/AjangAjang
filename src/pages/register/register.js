import "@/sass/main.scss";
import pb from "@/api/pocketbase";
import { getNode, setDocumentTitle } from "kind-tiger";
import { handleEmailCheck, handlePasswordCheck } from "@/pages/login/login.js";
import agreeAllCheckBox from "@/components/input-checkbox";

setDocumentTitle("회원가입 - 칼리");

const $emailInput = getNode("#userEmail");
const $passwordInput = getNode("#userPassword");
const $passwordCheckInput = getNode("#userPasswordCheck");
const $passwordCheckError = getNode("#userPasswordCheckError");
const $phoneInput = getNode("#phoneField");
const $verifyPhoneBtn = getNode("#verifyPhoneBtn");

let emailCheckPerformed = false;

// phoneInput 값이 존재할 때만 인증번호 받기 버튼 활성화 및 숫자 입력 검증
$phoneInput.addEventListener("input", () => {
  const phoneValue = $phoneInput.value.trim();

  // 입력 값이 숫자인지 검증
  if (/^\d*$/.test(phoneValue)) {
    $verifyPhoneBtn.disabled = phoneValue === "";
  } else {
    alert("휴대폰 번호는 숫자만 입력 가능합니다.");
    $phoneInput.value = phoneValue.replace(/\D/g, ""); // 숫자가 아닌 문자는 제거
    $verifyPhoneBtn.disabled = $phoneInput.value.trim() === "";
  }
});

$verifyPhoneBtn.addEventListener("click", () => {
  const verificationCode = Math.floor(
    100000 + Math.random() * 900000
  ).toString();
  const userCode = prompt(`인증 번호를 입력하세요: ${verificationCode}`);

  if (userCode === verificationCode) {
    alert("인증이 성공적으로 완료되었습니다.");
  } else {
    alert("인증 번호가 올바르지 않습니다.");
  }
});

getNode("#emailCheckBtn").addEventListener("click", async () => {
  const email = getNode("#userEmail").value;

  const result = await pb.collection("users").getList(1, 1, {
    filter: `email = '${email}'`,
  });

  if (result.totalItems > 0) {
    alert("이미 사용 중인 이메일입니다.");
    return;
  } else {
    alert("사용 가능한 이메일입니다.");
    emailCheckPerformed = true;
  }
});

// 비밀번호 확인 검증
$passwordCheckInput.addEventListener("input", () => {
  if ($passwordInput.value !== $passwordCheckInput.value) {
    $passwordCheckError.style.display = "block";
  } else {
    $passwordCheckError.style.display = "none";
  }
});

getNode("#registerBtn").addEventListener("click", async () => {
  if (!emailCheckPerformed) {
    alert("이메일 중복확인을 진행해 주세요.");
    return;
  }

  if ($passwordInput.value !== $passwordCheckInput.value) {
    $passwordCheckError.style.display = "block";
    return;
  }

  const email = getNode("#userEmail").value;
  const password = getNode("#userPassword").value;
  const passwordConfirm = getNode("#userPasswordCheck").value;
  const name = getNode("#nameField").value;
  const userAddress = getNode("#addressField").value;
  const userBirth = getNode("#birthField").value
    ? new Date(getNode("#birthField").value).toISOString()
    : null;
  const userPhone = getNode("#phoneField").value;
  const selectedGenderInput = getNode('input[name="gender"]:checked');
  const userGender = selectedGenderInput
    ? selectedGenderInput.nextElementSibling.textContent
    : null;

  // 필수 이용약관 체크 여부 확인
  const requiredAgreements = document.querySelectorAll(".required-agreement");
  for (let i = 0; i < requiredAgreements.length; i++) {
    if (!requiredAgreements[i].checked) {
      alert("필수 이용약관에 동의해야 합니다.");
      return;
    }
  }

  const data = {
    email,
    emailVisibility: true,
    password,
    passwordConfirm,
    name,
    userAddress,
    userBirth,
    userPhone,
    userGender,
  };

  console.log("Data to be sent:", data);

  try {
    const record = await pb.collection("users").create(data);
    console.log("User created:", record);

    // 이메일 인증 요청
    await pb.collection("users").requestVerification(data.email);
    console.log("Verification email sent.");

    // 페이지 리다이렉션
    window.location.href = `verify.html?email=${encodeURIComponent(data.email)}`;
  } catch (error) {
    console.error("Error creating user:", error);
  }
});

$emailInput.addEventListener("input", handleEmailCheck);
$passwordInput.addEventListener("input", handlePasswordCheck);

// 초기 버튼 상태 설정
$verifyPhoneBtn.disabled = true;
