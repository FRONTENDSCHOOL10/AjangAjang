import { insertLast } from "kind-tiger";

const footerTemp = /* html */ `
<footer>
  <div class="footer-info content-center">
    <div class="footer-info-cs">
      <h2>고객행복센터</h2>
      <div class="footer-info-cs-number">
        <a href="tel:1644-1107" class="footer-info-cs-bignumber"
          ><span class="sr-only">전화번호</span>1644-1107</a
        ><span class="sr-only">운영시간</span>
        <span>월~토요일 오전 7시 - 오후 6시</span>
      </div>

      <div class="footer-info-inquiry">
        <button type="button" class="footer-info-inquiry-title">
          카카오톡 문의
        </button>
        <span class="footer-info-inquiry-desc">
          월~토요일<span aria-hidden="true" class="symbol-distinguished"
            >&#124;</span
          >오전 7시 - 오후 6시
          <br />
          일/공휴일<span aria-hidden="true" class="symbol-distinguished"
            >&#124;</span
          >오전 7시 - 오후 1시
        </span>
      </div>

      <div class="footer-info-inquiry">
        <button type="button" class="footer-info-inquiry-title">
          1:1 문의
        </button>
        <span class="footer-info-inquiry-desc">
          365일
          <br />
          고객센터 운영시간에 순차적으로 답변드리겠습니다.
        </span>
      </div>

      <div class="footer-info-inquiry">
        <button type="button" class="footer-info-inquiry-title">
          대량주문 문의
        </button>
        <span class="footer-info-inquiry-desc">
          월~금요일<span aria-hidden="true" class="symbol-distinguished"
            >&#124;</span
          >오전 9시 - 오후 6시
          <br />
          점심시간<span aria-hidden="true" class="symbol-distinguished"
            >&#124;</span
          >낮 12시 - 오후 1시
        </span>
      </div>

      <div class="footer-info-inquiry-etc">
        비회원 문의 :
        <a href="mailto:help@karlycorp.com" aria-label="비회원 문의하기"
          >help@karlycorp.com</a
        >
        <br />
        비회원 대량주문 문의 :
        <a
          href="mailto:help@karlycorp.com"
          aria-label="비회원 대량주문 문의하기"
          >help@karlycorp.com</a
        >
      </div>
    </div>

    <ul class="footer-info-link-menu">
      <li><a href="#">칼리소개</a></li>
      <li><a href="#">칼리소개영상</a></li>
      <li><a href="#">인재채용</a></li>
      <li><a href="#">이용약관</a></li>
      <li><a href="#">개인정보처리방침</a></li>
      <li><a href="#">이용안내</a></li>
    </ul>

    <address class="footer-info-company">
      <span>법인명 (상호) : 주식회사 컬리</span
      ><span aria-hidden="true" class="symbol-distinguished">&#124;</span
      ><span>사업자등록번호 : 261-81-23567</span
      ><span aria-hidden="true" class="symbol-distinguished">&#124;</span
      ><span><a href="mailto:help@karlycorp.com">사업자정보 확인</a></span>
      <br />
      <span>통신판매업 : 제 2018-서울강남-01646 호</span
      ><span aria-hidden="true" class="symbol-distinguished">&#124;</span
      ><span>개인정보보호책임자 : 이원준</span>
      <br />
      <span>주소 : 서울특별시 강남구 테헤란로 133, 18층(역삼동)</span
      ><span aria-hidden="true" class="symbol-distinguished">&#124;</span
      ><span>대표이사 : 김슬아</span>
      <br />
      <span>입점문의 : 입정문의하기</span>
      <br />
      <span
        >제휴문의 :
        <a href="mailto:help@karlycorp.com" aria-label="제휴 문의하기"
          >business@karlycorp.com</a
        ></span
      >
      <br />
      <span
        >채용문의 :
        <a href="mailto:help@karlycorp.com" aria-label="채용 문의하기"
          >recruit@karlycorp.com</a
        ></span
      >
      <br />
      <span>팩스 : 070 - 7500 - 6098</span>
    </address>

    <div class="footer-info-link-sns">
      <ul>
        <li>
          <a href="#" aria-label="네이버 블로그 바로가기"
            ><img src="/src/assets/icon/Blog.png" alt="네이버 블로그"
          /></a>
        </li>
        <li>
          <a href="#" aria-label="페이스북 바로가기"
            ><img src="/src/assets/icon/FaceBook.png" alt="페이스북"
          /></a>
        </li>
        <li>
          <a href="#" aria-label="인스타그램 바로가기"
            ><img src="/src/assets/icon/Instagram.png" alt="인스타그램"
          /></a>
        </li>
        <li>
          <a href="#" aria-label="네이버 포스트 바로가기"
            ><img src="/src/assets/icon/NaverPost.png" alt="네이버 포스트"
          /></a>
        </li>
        <li>
          <a href="#" aria-label="유튜브 바로가기"
            ><img src="/src/assets/icon/Youtube.png" alt="유튜브"
          /></a>
        </li>
      </ul>
    </div>
  </div>
  <div class="footer-member content-center">
    <ul>
      <li>
        <p class="footer-member-name">
          <img
            src="/src/assets/icon/Arrow-1.png"
            alt="화살표 기호"
            aria-hidden="true"
          />
          이아영
        </p>
        <p>
          Github :
          <a
            href="https://github.com/otwaylee"
            aria-label="이아영 깃허브 프로필 보기"
            class="footer-member-link"
            >otwaylee</a
          >
        </p>
        <p>
          e-mail :
          <a
            href="mailto:ahyeong858@gmail.com"
            aria-label="이아영에게 메일보내기"
            class="footer-member-link"
            >ahyeong858@gmail.com</a
          >
        </p>
      </li>
      <li>
        <p class="footer-member-name">
          <img
            src="/src/assets/icon/Arrow-1.png"
            alt="화살표 기호"
            aria-hidden="true"
          />
          김민지
        </p>
        <p>
          Github :
          <a
            href="https://github.com/siyo0723"
            aria-label="김민지 깃허브 프로필 보기"
            class="footer-member-link"
            >siyo0723</a
          >
        </p>
        <p>
          e-mail :
          <a
            href="mailto:junior0723@naver.com"
            aria-label="김민지에게 메일보내기"
            class="footer-member-link"
            >junior0723@naver.com</a
          >
        </p>
      </li>
      <li>
        <p class="footer-member-name">
          <img
            src="/src/assets/icon/Arrow-1.png"
            alt="화살표 기호"
            aria-hidden="true"
          />
          여주원
        </p>
        <p>
          Github :
          <a
            href="https://github.com/JUWON-YEO"
            aria-label="여주원 깃허브 프로필 보기"
            class="footer-member-link"
            >JUWON-YEO</a
          >
        </p>
        <p>
          e-mail :
          <a
            href="mailto:juwon0481@gmail.com"
            aria-label="여주원에게 메일보내기"
            class="footer-member-link"
            >juwon0481@gmail.com</a
          >
        </p>
      </li>
      <li>
        <p class="footer-member-name">
          <img
            src="/src/assets/icon/Arrow-1.png"
            alt="화살표 기호"
            aria-hidden="true"
          />
          함정민
        </p>
        <p>
          Github :
          <a
            href="https://github.com/hammadam"
            aria-label="함정민 깃허브 프로필 보기"
            class="footer-member-link"
            >hammadam</a
          >
        </p>
        <p>
          e-mail :
          <a
            href="mailto:hammadam@naver.com"
            aria-label="함정민에게 메일보내기"
            class="footer-member-link"
            >hammadam@naver.com</a
          >
        </p>
      </li>
    </ul>
  </div>
  <div class="footer-copyright">
    <div class="content-center">
      마켓컬리에서 판매되는 상품 중에는 마켓컬리에 입점한 개별 판매자가
      판매하는 마켓플레이스(오픈마켓) 상품이 포함되어 있습니다.
      <br />
      마켓플레이스(오픈마켓) 상품의 경우 컬리는 통신판매중개자로서
      통신판매의 당사자가 아닙니다. 컬리는 해당 상품의 주문, 품질, 교환/환불
      등 의무와 책임을 부담하지 않습니다.
      <br />
      <span>&copy; KURLY CORP. ALL RIGHTS RESERVED</span>
    </div>
  </div>
</footer>
`;

insertLast("body", footerTemp);
