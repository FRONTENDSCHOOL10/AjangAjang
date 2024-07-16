import PocketBase from 'pocketbase';
import { getNode } from 'kind-tiger';

const pb = new PocketBase('https://ajangajang.pockethost.io');

getNode('#emailCheckBtn').addEventListener('click', async () => {
  const email = getNode('#userEmail').value;

  const result = await pb.collection('users').getList(1, 1, {
    filter: `email = '${email}'`,
  });

  if (result.totalItems > 0) {
    alert('이미 사용 중인 이메일입니다.');
    return;
  } else {
    alert('사용 가능한 이메일입니다.');
  }
});

getNode('#registerBtn').addEventListener('click', async () => {
  const email = getNode('#userEmail').value;
  const password = getNode('#userPassword').value;
  const passwordConfirm = getNode('#userPasswordCheck').value;
  const name = getNode('#nameField').value;
  const userAddress = getNode('#addressField').value;
  const userBirth = new Date(getNode('#birthField').value).toISOString();
  const userPhone = getNode('#phoneField').value;
  const userGender = getNode('input[name="gender"]:checked').value;

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

  console.log('Data to be sent:', data);

  try {
    const record = await pb.collection('users').create(data);
    console.log('User created:', record);

    // 이메일 인증 요청
    await pb.collection('users').requestVerification(data.email);
    console.log('Verification email sent.');

    // 페이지 리다이렉션
    window.location.href = `verify.html?email=${encodeURIComponent(data.email)}`;
  } catch (error) {
    console.error('Error creating user:', error);
  }
});
