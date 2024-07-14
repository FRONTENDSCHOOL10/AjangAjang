import PocketBase from 'pocketbase';
import { getNode } from 'kind-tiger';

// PocketBase 클라이언트 설정
const pb = new PocketBase('http://127.0.0.1:8090'); // PocketBase 서버 URL

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

      // PocketBase에서 사용자 정보 가져오기
      const userRecords = await pb.collection('users').getFullList({
        filter: `email = "${id}"`,
      });

      if (userRecords.length === 0) {
        throw new Error('User not found');
      }

      const user = userRecords[0]; // 첫 번째 사용자 정보 가져오기
      
      if (user.email === id && user.password === pw) {
        location.href = 'welcome.html';
      } else {
        throw new Error('Invalid credentials');
      }
    } catch (error) {
      alert('이메일 혹은 비밀번호가 잘못되었습니다.');
    }
  }
}

$emailInput.addEventListener('input', handleEmailCheck);
$passwordInput.addEventListener('input', handlePasswordCheck);
$loginBtn.addEventListener('click', handleLogin);