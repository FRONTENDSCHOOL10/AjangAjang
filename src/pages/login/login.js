import pb from '@/api/pocketbase';
import { getNode, getStorage, setStorage, setDocumentTitle } from 'kind-tiger';

setDocumentTitle('마켓칼리 / 로그인');

const $emailInput = getNode('#userEmail');
const $passwordInput = getNode('#userPassword');
const $loginBtn = getNode('.btn-login');
const $errorPopup = getNode('#errorPopup');
const $loginError = getNode('#loginError');
const $closePopup = getNode('#closePopup');

let emailCheckPass = false;
let pwCheckPass = false;

export function emailReg(text) {
  const re =
    /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  return re.test(String(text).toLowerCase());
}

export function pwReg(text) {
  const re = /^(?=.*[a-zA-Z])(?=.*[0-9])(?=.*[!@#$%^*+=-]).{6,16}$/;
  return re.test(String(text));
}

export function handleEmailCheck() {
  const value = this.value;
  if (emailReg(value)) {
    this.classList.remove('is--invalid');
    emailCheckPass = true;
  } else {
    this.classList.add('is--invalid');
    emailCheckPass = false;
  }
}

export function handlePasswordCheck() {
  const value = this.value;
  if (pwReg(value)) {
    this.classList.remove('is--invalid');
    pwCheckPass = true;
  } else {
    this.classList.add('is--invalid');
    pwCheckPass = false;
  }
}

function showErrorPopup(message) {
  $loginError.textContent = message;
  $errorPopup.style.display = 'flex';
}

function closeErrorPopup() {
  $errorPopup.style.display = 'none';
}

async function handleLogin(e) {
  e.preventDefault();

  if (emailCheckPass && pwCheckPass) {
    try {
      const id = $emailInput.value;
      const pw = $passwordInput.value;

      // PocketBase에서 사용자 인증하기
      const authData = await pb.collection('users').authWithPassword(id, pw);

      console.log('Authentication successful:', authData);
      console.log('Is valid:', pb.authStore.isValid);
      console.log('Auth token:', pb.authStore.token);
      console.log('User ID:', pb.authStore.model.id);

      // 인증 성공 시 페이지 이동
      const { model, token } = await getStorage('pocketbase_auth');

      setStorage('auth', {
        isAuth: !!model,
        user: model,
        token,
      });

      // alert('로그인 완료! 메인페이지로 이동합니다.');
      location.href = '/index.html';
    } catch (error) {
      console.error('Login error:', error);
      showErrorPopup('아이디 혹은 비밀번호가 잘못되었습니다.');
    }
  } else {
    showErrorPopup('아이디 혹은 비밀번호가 올바르지 않습니다.');
  }
}

// 요소가 존재하는지 확인
if ($emailInput && $passwordInput && $loginBtn) {
  $emailInput.addEventListener('input', handleEmailCheck);
  $passwordInput.addEventListener('input', handlePasswordCheck);
  $loginBtn.addEventListener('click', handleLogin);
  if ($closePopup) {
    $closePopup.addEventListener('click', closeErrorPopup);
  }
}
