import pb from '@/api/pocketbase';
import { getNode } from 'kind-tiger';

const $emailInput = getNode('#userEmail');
const $passwordInput = getNode('#userPassword');
const $loginBtn = getNode('.btn-login');

let emailCheckPass = false;
let pwCheckPass = false;

function emailReg(text) {
  const re =
    /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  return re.test(String(text).toLowerCase());
}

function pwReg(text) {
  const re = /^(?=.*[a-zA-Z])(?=.*[0-9])(?=.*[!@#$%^*+=-]).{6,16}$/;
  return re.test(String(text));
}

function handleEmailCheck() {
  const value = this.value;
  if (emailReg(value)) {
    this.classList.remove('is--invalid');
    emailCheckPass = true;
  } else {
    this.classList.add('is--invalid');
    emailCheckPass = false;
  }
}

function handlePasswordCheck() {
  const value = this.value;
  if (pwReg(value)) {
    this.classList.remove('is--invalid');
    pwCheckPass = true;
  } else {
    this.classList.add('is--invalid');
    pwCheckPass = false;
  }
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
      location.href = 'index.html';
      console.log('로그인에 성공했습니다.');
    } catch (error) {
      console.error('Login error:', error);
      alert('아이디 혹은 비밀번호가 잘못되었습니다.');
    }
  }
}

$emailInput.addEventListener('input', handleEmailCheck);
$passwordInput.addEventListener('input', handlePasswordCheck);
$loginBtn.addEventListener('click', handleLogin);