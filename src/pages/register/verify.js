import PocketBase from 'pocketbase';
import { getNode } from 'kind-tiger';
const pb = new PocketBase('https://ajangajang.pockethost.io');

document.addEventListener('DOMContentLoaded', async () => {
  const urlParams = new URLSearchParams(window.location.search);
  const email = urlParams.get('email');

  const messageElement = getNode('#message');

  if (!email) {
    messageElement.textContent = '이메일이 제공되지 않았습니다.';
    return;
  }

  const checkVerificationStatus = async () => {
    try {
      const result = await pb.collection('users').getList(1, 1, {
        filter: `email = '${email}'`,
      });

      if (result.items.length > 0 && result.items[0].verified) {
        messageElement.textContent = '이메일 인증이 완료되었습니다.';
        clearInterval(intervalId);
        window.location.href = '/';
      } else {
        messageElement.textContent = '이메일 인증 중...';
      }
    } catch (error) {
      console.error('Error checking verification status:', error);
      messageElement.textContent =
        '이메일 인증 상태를 확인하는 중 오류가 발생했습니다.';
    }
  };

  // 주기적으로 인증 상태를 확인
  const intervalId = setInterval(checkVerificationStatus, 3000);

  // 처음 한 번 실행
  checkVerificationStatus();
});
