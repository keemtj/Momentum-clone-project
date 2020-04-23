// src/js/main.js
import * as ani from './animation';
import * as valid from './validation';
import * as etc from './etc';
import * as reset from './reset';
import * as set from './setting';
import * as weather from './weather';

// 상태변수
let onlineUser = {};

// 로그인페이지에서 사인업 페이지로 넘어가는 애니메이션
const $loginEmail = document.querySelector('#login-email');
const $loginPw = document.querySelector('#login-pw');
const $loginSignUp = document.querySelector('.login-signup-text');
const $btnLogin = document.querySelector('.btn-login');
// Page
const $loginPage = document.querySelector('#login');
const $signupPage = document.querySelector('.signup-page');
const $forgotPwPage = document.querySelector('.forgot-pw-page');
const $pwHintPage = document.querySelector('.pw-hint-page');
const $pwResetPage = document.querySelector('.pw-reset-page');
const $mainPage = document.querySelector('.main-page');

const $forgotPwBtn = document.querySelector('.login-forgot-pw');
const $forgotPwNextBtn = document.querySelector('.forgot-pw-btn-next');
const $signupPw = document.querySelector('#signup-pw');
const $resetPw = document.querySelector('#pw-reset-new-pw');
const $pwReq = document.querySelector('.pw-req');
const $resetPwReq = document.querySelector('.reset-pw-req');
const $hintSelected = document.querySelector('.hint-selected');
const $optionsContainer = document.querySelector('.hint-options-container');
const $loginContainer = document.querySelector('.login-container');

// SignupPage Elements
const $signupCreateBtn = document.querySelector('.btn-signup');
const $signUpUserName = document.querySelector('#signup-username');
const $signUpEmail = document.querySelector('#signup-email');
const $signUpPw = document.querySelector('#signup-pw');
const $signUpConfirmPw = document.querySelector('#signup-confirm-pw');
const $signUpHintAnswer = document.querySelector('#signup-pw-hint-answer');


// ---login-page Event Bindings---
// login-page에서 이메일 형식 확인
$loginEmail.onfocus = ({ target }) => {
  reset.resetErrorMsg(target);
};
$loginEmail.onblur = ({ target }) => {
  valid.enableLoginBtn(target, $loginPw);
};

// login-page에서 비밀번호 입력 확인

$loginPw.onblur = ({ target }) => {
  valid.enableLoginBtn(target, $loginEmail);
};
$loginPw.onfocus = ({ target }) => {
  reset.resetErrorMsg(target);
};

// login-page -> signup-page
$loginSignUp.onclick = () => {
  ani.movePage($loginPage, $signupPage);
};
// login-page -> main-page
$btnLogin.onclick = () => {
  const $emailInput = $loginPage.querySelector('#login-email');
  const $pwInput = $loginPage.querySelector('#login-pw');
  // test동안에는 valid.login주석
  valid.login($emailInput, $pwInput);
  // 대신 ani.movePage
  // ani.movePage($loginPage, $mainPage);
};


// --signup-page Event Bindings---
$signupCreateBtn.onclick = () => {
  valid.createAccount();
  // axios.get('/users')
  //   .then(({ data }) => { users = data; })
  //   .then(() => { console.log(users); })
  //   .catch(err => console.error(err));
  // email이 중복되지 않으면
  // ani.movePage($signupPage, $loginPage);
  // email이 중복되면 showEmailErrorMsg(); 
};

$signUpUserName.onblur = ({ target }) => {
  valid.checkLengthZero(target);
  valid.enableCreateAccount();
};

$signUpEmail.onblur = ({ target }) => {
  valid.checkEmail(target);
  valid.enableCreateAccount();
};
$signUpEmail.onfocus = ({ target }) => {
  reset.resetErrorMsg(target);
};

$signUpPw.addEventListener('blur', ({ target }) => {
  valid.checkPw(target);
  valid.enableCreateAccount();
});
$signUpPw.addEventListener('keyup', ({ target }) => {
  valid.checkPwCondition(target);
});

// signup-page에서 password가 일치(password-confirm)하는지 확인
$signUpConfirmPw.onblur = ({ target }) => {
  const $pw = document.querySelector('.signup-form > #signup-pw');
  valid.checkConfirmPw($pw, target);
  valid.enableCreateAccount();
};

// signup-page에서 hint-answer 입력했는지 확인
$signUpHintAnswer.onblur = ({ target }) => {
  valid.checkLengthZero(target);
  valid.enableCreateAccount();
};

// signup-page select box 기능
$hintSelected.onclick = () => {
  $optionsContainer.classList.toggle('active');
};
$optionsContainer.onclick = ({ target }) => {
  if (!target.matches('div.option > label')) return;
  $optionsContainer.classList.toggle('active');
  $hintSelected.textContent = target.textContent;
  valid.enableCreateAccount();
};

// 페이지에서 패스워드 input이 focus됬을때 조건을 부드럽게 보여주는 기능
$signupPw.onfocus = () => {
  $pwReq.classList.toggle('active');
};
$signupPw.onblur = () => {
  $pwReq.classList.toggle('active');
};
$resetPw.onfocus = () => {
  $resetPwReq.classList.toggle('active');
};
$resetPw.onblur = () => {
  $resetPwReq.classList.toggle('active');
};


// loginContainer hover시 backBtn icon을 보여줌
$loginContainer.onmouseover = () => {
  const $currentPage = document.querySelector('div.fade-in');
  if (!$currentPage || $currentPage.id === 'login') return;
  const $iconBackBtn = document.querySelector('.login-container > div[class*="-page"].fade-in > i');
  if (!$iconBackBtn) return;
  ani.fadeIn($iconBackBtn, 150);
};
$loginContainer.onmouseleave = () => {
  const $currentPage = document.querySelector('div.fade-in');
  if (!$currentPage || $currentPage.id === 'login') return;
  const $iconBackBtn = document.querySelector('.login-container > div[class*="-page"].fade-in > i');
  if (!$iconBackBtn) return;
  ani.fadeOut($iconBackBtn, 150);
};

// backBtn 클릭시 loginPage로 돌아감
$loginContainer.onclick = ({ target }) => {
  if (!target.matches('div.fade-in > i')) return;
  const $currentPage = target.parentNode;
  ani.movePage($currentPage, $loginPage);
};

// signup-page에 있는 forgot-pw Btn 클릭시 forgot-pw-page 보여줌
$forgotPwBtn.onclick = () => {
  ani.movePage($loginPage, $forgotPwPage);
};

// ---forgot-pw page Event Bindings---
// forgot-pw-page에서 Next 버튼 누르면 pw-hint-page로 이동
$forgotPwNextBtn.onclick = () => {
  ani.movePage($forgotPwPage, $pwHintPage);
};
// forgot-pw-page에서 입력했을때 이메일이 존재하고 형식이 맞으면 버튼 활성화
const $forgotPwEmail = document.querySelector('.forgot-pw-form > #forgot-pw-email');
$forgotPwEmail.onblur = ({ target }) => {
  valid.checkEmail(target);
  valid.enableNextBtn(target);
};

// ---pw-hint page Event Bindings---
// pw-hint-page에서 Next 버튼 누르면 pw-reset-page로 이동
const $pwHintNextBtn = document.querySelector('.pw-hint-btn-next');
$pwHintNextBtn.onclick = () => {
  ani.movePage($pwHintPage, $pwResetPage);
};

// pw-hint-page에서 힌트 입력 확인
const $pwHintInput = document.querySelector('.pw-hint-form > #pw-hint-answer');
$pwHintInput.onblur = ({ target }) => {
  valid.checkLengthZero(target);
  valid.enableNextBtn(target);
};

// ---pw-reset-page Event Bindings---
const $pwResetBtn = document.querySelector('.pw-reset-form > .btn-reset-pw');
const $pwResetNewPw = document.querySelector('.pw-reset-form > #pw-reset-new-pw');
const $pwResetNewPwConfirm = document.querySelector('.pw-reset-form > #pw-reset-new-pw-confirm');
// pw-reset-page에서 reset 버튼 누르면 login-page로 이동
$pwResetBtn.onclick = () => {
  ani.movePage($pwResetPage, $loginPage);
}
// pw-reset-page에서 password 입력할때 조건 확인
$pwResetNewPw.addEventListener('blur', ({ target }) => {
  valid.checkPw(target);
  valid.enableCreateAccount();
});
$pwResetNewPw.addEventListener('keyup', ({ target }) => {
  valid.checkPwCondition(target);
});
// pw-reset-page에서 password가 일치(password-confirm)하는지 확인
$pwResetNewPwConfirm.onblur = ({ target }) => {
  const $newPw = document.querySelector('.pw-reset-form > #pw-reset-new-pw');
  valid.checkConfirmPw($newPw, target);
  valid.enableNextBtn(target);
};

// weather start
// weather end

// setting start
// setting end

// etc start
const $listIcon = document.querySelector('.icon-th-list');
const $todolistBox = document.querySelector('.todolist-box');

$listIcon.onclick = () => {
  const todoBoxCs = window.getComputedStyle($todolistBox);
  const todoOnOff = todoBoxCs.getPropertyValue('display');
  todoOnOff === 'none' ? etc.openTodoList($todolistBox) : etc.closeTodoList($todolistBox);
};

const renderMainAll = onlineUser => {
 console.log('renderMainAll');
};

const renderMainPage = onlineUser => {
  $loginPage.classList.remove('fade-in');
  renderMainAll(onlineUser);
  $mainPage.classList.add('fade-in');

};

const renderStartPage = () => {
  $loginPage.classList.add('fade-in');
};


const $logoutBtn = document.querySelector('.logout');
$logoutBtn.onclick = () => {
  // onlinerUser의 online 프로퍼티를 true -> false
  // 서버에 이 정보를 업데이트 해달라는 요청을 보냄
  // 그 이후에 ani.movePage($mainPage, $loginPage);

};

const init = async () => {
  const $loadingContainer = document.querySelector('.loading-container');
  const $loadingText = document.querySelector('.loading-text');

  onlineUser = await valid.getUsers();
  console.log('OnlineUser: ', onlineUser);
  if (onlineUser.online) {
    renderMainPage(onlineUser);
  } else {
    renderStartPage();
  }
  const weatherStart = await weather.weatherInit();
};
window.onload = init;

export { onlineUser };
