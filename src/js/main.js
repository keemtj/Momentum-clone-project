import * as ani from './animation';
import * as valid from './validation';
import * as etc from './etc';
import * as reset from './reset';
import * as set from './setting';
import * as weather from './weather';
import * as todos from './todos';

let onUser = {};

const $loginEmail = document.querySelector('#login-email');
const $loginPw = document.querySelector('#login-pw');
const $loginSignUp = document.querySelector('.login-signup-text');
const $btnLogin = document.querySelector('.btn-login');
const $loginPage = document.querySelector('#login');
const $signupPage = document.querySelector('.signup-page');
const $forgotPwPage = document.querySelector('.forgot-pw-page');
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
const $signupCreateBtn = document.querySelector('.btn-signup');
const $signUpUserName = document.querySelector('#signup-username');
const $signUpEmail = document.querySelector('#signup-email');
const $signUpPw = document.querySelector('#signup-pw');
const $signUpConfirmPw = document.querySelector('#signup-confirm-pw');
const $signUpHintAnswer = document.querySelector('#signup-pw-hint-answer');
const $pwResetBtn = document.querySelector('.pw-reset-form > .btn-reset-pw');
const $pwResetNewPw = document.querySelector('.pw-reset-form > #pw-reset-new-pw');
const $pwResetNewPwConfirm = document.querySelector('.pw-reset-form > #pw-reset-new-pw-confirm');
const $listIcon = document.querySelector('.icon-th-list');
const $todolistBox = document.querySelector('.todolist-box');

$loginEmail.onfocus = ({ target }) => {
  reset.resetErrorMsg(target);
};

$loginEmail.onblur = ({ target }) => {
  valid.enableLoginBtn(target, $loginPw);
};

$loginPw.onblur = ({ target }) => {
  valid.enableLoginBtn(target, $loginEmail);
};

$loginPw.onfocus = ({ target }) => {
  reset.resetErrorMsg(target);
};

$loginSignUp.onclick = () => {
  ani.movePage($loginPage, $signupPage);
};

$btnLogin.onclick = () => {
  const $emailInput = $loginPage.querySelector('#login-email');
  const $pwInput = $loginPage.querySelector('#login-pw');
  valid.login($emailInput, $pwInput);
};

$signupCreateBtn.onclick = () => {
  valid.createAccount();
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

$signUpConfirmPw.onblur = ({ target }) => {
  const $pw = document.querySelector('.signup-form > #signup-pw');
  valid.checkConfirmPw($pw, target);
  valid.enableCreateAccount();
};

$signUpHintAnswer.onblur = ({ target }) => {
  valid.checkLengthZero(target);
  valid.enableCreateAccount();
};

$hintSelected.onclick = () => {
  $optionsContainer.classList.toggle('active');
};

$optionsContainer.onclick = ({ target }) => {
  if (!target.matches('div.option > label')) return;
  $optionsContainer.classList.toggle('active');
  $hintSelected.textContent = target.textContent;
  valid.enableCreateAccount();
};

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

$loginContainer.onclick = ({ target }) => {
  if (!target.matches('div.fade-in > i')) return;
  const $currentPage = target.parentNode;
  ani.movePage($currentPage, $loginPage);
};

$forgotPwBtn.onclick = () => {
  ani.movePage($loginPage, $forgotPwPage);
};

$forgotPwNextBtn.onclick = () => {
  const $email = document.querySelector('.forgot-pw-form #forgot-pw-email');
  valid.checkEmailExists($email);
};

const $forgotPwEmail = document.querySelector('.forgot-pw-form > #forgot-pw-email');
$forgotPwEmail.onblur = ({ target }) => {
  valid.checkEmail(target);
  valid.enableNextBtn(target);
};

const $pwHintNextBtn = document.querySelector('.pw-hint-btn-next');
$pwHintNextBtn.onclick = () => {
  const $pwHintAnswer = document.querySelector('.pw-hint-form #pw-hint-answer');
  valid.checkPwHintAnswer($pwHintAnswer);
};

const $pwHintInput = document.querySelector('.pw-hint-form > #pw-hint-answer');
$pwHintInput.onblur = ({ target }) => {
  valid.checkLengthZero(target);
  valid.enableNextBtn(target);
};

$pwResetBtn.onclick = () => {
  valid.resetPw();
};

$pwResetNewPw.addEventListener('blur', ({ target }) => {
  valid.checkPw(target);
  valid.enableCreateAccount();
});

$pwResetNewPw.addEventListener('keyup', ({ target }) => {
  valid.checkPwCondition(target);
});

$pwResetNewPwConfirm.onblur = ({ target }) => {
  const $newPw = document.querySelector('.pw-reset-form > #pw-reset-new-pw');
  valid.checkConfirmPw($newPw, target);
  valid.enableNextBtn(target);
};

$listIcon.onclick = () => {
  const todoBoxCs = window.getComputedStyle($todolistBox);
  const todoOnOff = todoBoxCs.getPropertyValue('display');
  todoOnOff === 'none' ? etc.openTodoList($todolistBox) : etc.closeTodoList($todolistBox);
};

const renderMainPage = () => {
  const $nameText = document.querySelector('.greeting .name');
  $nameText.textContent = onUser.name;
  todos.getTodos();
  etc.startClock();
  set.getSettings();
  $loginPage.classList.remove('fade-in');
  $mainPage.classList.add('fade-in');
};

const renderStartPage = () => {
  $loginPage.classList.add('fade-in');
};

const init = async () => {
  onUser = await valid.getUsers();
  if (onUser.online) {
    renderMainPage(onUser);
  } else { 
    renderStartPage();
  }
  const weatherStart = await weather.weatherInit();
};
window.onload = init;

export { onUser, renderStartPage };