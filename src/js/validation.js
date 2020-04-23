// validation.js
import * as ani from './animation';
import * as etc from './etc';
let user = {};
let users = [];
let todos = [];
let settings = {};

const $loginPage = document.querySelector('#login');
const $signupPage = document.querySelector('.signup-page');
const $forgotPwPage = document.querySelector('.forgot-pw-page');
const $pwHintPage = document.querySelector('.pw-hint-page');
const $pwResetPage = document.querySelector('.pw-reset-page');
const $mainPage = document.querySelector('.main-page');

const checkLengthZero = $target => {
  const input = $target.value.trim();
  const $lengthMsg = $target.nextElementSibling;
  $lengthMsg.classList.toggle('msg-show', !input);
  $target.classList.toggle('warning', !input);
};

const checkEmailForm = email => {
  const re = /^([\w-]+(?:\.[\w-]+)*)@((?:[\w-]+\.)*\w[\w-]{0,66})\.([a-z]{2,6}(?:\.[a-z]{2})?)$/i;
  return !re.test(email);
};

// Email Validation(형식과 길이 둘다 확인)
const checkEmail = $target => {
  const email = $target.value.trim();
  const $lengthMsg = $target.nextElementSibling;
  const $formMsg = $lengthMsg.nextElementSibling;
  $lengthMsg.classList.toggle('msg-show', !email);
  $formMsg.classList.toggle('msg-show', checkEmailForm(email) && email);
  $target.classList.toggle('warning', checkEmailForm(email) || !email);
};

// Pw Validation(비밀번호 조건을 만족하는지 확인)
const checkPwCondition = $target => {
  const pw = $target.value.trim();
  const numExp = /[0-9]/;
  const upperExp = /[A-Z]/;
  const specialExp = /[^A-Za-z0-9]/gi;
  const $form = $target.parentNode;
  const $pwReqLength = $form.querySelector('ul > li[class*="-length"');
  const $pwReqNumber = $form.querySelector('ul > li[class*="-number"');
  const $pwReqUpper = $form.querySelector('ul > li[class*="-upper"');
  const $pwReqSpecial = $form.querySelector('ul > li[class*="-special"');
  $pwReqLength.classList.toggle('underline', (pw.length >= 8));
  $pwReqNumber.classList.toggle('underline', numExp.test(pw));
  $pwReqUpper.classList.toggle('underline', upperExp.test(pw));
  $pwReqSpecial.classList.toggle('underline', specialExp.test(pw));
};

const checkPwConditionResult = pw => {
  const numExp = /[0-9]/;
  const upperExp = /[A-Z]/;
  const specialExp = /[^A-Za-z0-9]/gi;
  return !((pw.length >= 8 && numExp.test(pw) && upperExp.test(pw) && specialExp.test(pw)));
};

const checkPw = $target => {
  const pw = $target.value.trim();
  const $lengthMsg = $target.nextElementSibling;
  const $formMsg = $lengthMsg.nextElementSibling;
  $lengthMsg.classList.toggle('msg-show', !pw);
  $formMsg.classList.toggle('msg-show', checkPwConditionResult(pw) && pw);
  $target.classList.toggle('warning', checkPwConditionResult(pw));
};


const checkConfirmPw = ($pw, $confirmPw) => {
  const pw = $pw.value.trim();
  const confirmPw = $confirmPw.value.trim();
  const $lengthMsg = $confirmPw.nextElementSibling;
  const $formMsg = $lengthMsg.nextElementSibling;
  $confirmPw.classList.toggle('warning', pw !== confirmPw || !confirmPw);
  $lengthMsg.classList.toggle('msg-show', !confirmPw);
  $formMsg.classList.toggle('msg-show', (pw !== confirmPw) && confirmPw);
};

const enableLoginBtn = ($target, $siblingTarget) => {
  if ($target.id === 'login-email') {
    checkEmail($target);
  } else {
    checkLengthZero($target);
  }
  const $warnings = document.querySelectorAll('.login-container input.warning');
  const $loginBtn = document.querySelector('.btn-login');
  console.log('length: ', $warnings.length);
  console.log('target value: ', !$target.value.trim());
  console.log('sibling value: ', !$siblingTarget.value.trim());
  console.log('result, ', ($warnings.length || !$target.value.trim() || !$siblingTarget.value.trim()));
  $loginBtn.disabled = ($warnings.length || !$target.value.trim() || !$siblingTarget.value.trim());
};

const enableCreateAccount = () => {
  const $warnings = document.querySelectorAll('.signup-form input.warning');
  const $hintText = document.querySelector('.signup-form .hint-selected').textContent.trim();
  const $createAccountBtn = document.querySelector('.signup-form .btn-signup');
  $createAccountBtn.disabled = !(!$warnings.length && ($hintText !== 'Select a hint'));
};

// const enableForgotPwNext = () => {
//   const $warnings = document.querySelectorAll('.forgot-pw-form input.warning');
//   const $forgotPwNext = document.querySelector('.forgot-pw-form .forgot-pw-btn-next');
//   $forgotPwNext.disabled = $warnings.length;
// };

const enableNextBtn = $target => {
  const $warnings = document.querySelectorAll('.login-container input.warning');
  const $btn = $target.parentNode.lastElementChild;
  $btn.disabled = $warnings.length;
};

const generateId = () => (users.length ? Math.max(...users.map(user => user.userId)) + 1 : 1);

const getUsers = async () => {
  const { data } = await axios.get('/users');
  console.log('data', data);
  return data;
};

const createAccountSuccess = () => {
  console.log('createAccountSuccess!');
  ani.movePage($signupPage, $loginPage);
};

const createAccountFailed = () => {
  const $signupErrorMsg = document.querySelector('.signup-error-msg');
  $signupErrorMsg.classList.add('error');
  console.log('createAccountFailed');
};

const createAccount = async () => {
  const $signupForm = document.querySelector('.signup-form');
  const nameInput = $signupForm.querySelector('#signup-username');
  const name = nameInput.value;
  const email = $signupForm.querySelector('#signup-email').value;
  const pw = $signupForm.querySelector('#signup-pw').value;
  const hint = $signupForm.querySelector('.hint-selected').textContent;
  const answer = $signupForm.querySelector('#signup-pw-hint-answer').value;
  try {
    const { data } = await axios.post('/users', { userId: generateId(), online: false, name, email, pw, hint, answer });
    if (data) {
      ani.movePage($signupPage, $loginPage);
    } else {
      console.log(data);
      createAccountFailed();
    }
  } catch (error) {
    console.error(error);
  }
};

const login = async ($email, $pw) => {
  const $loginMsg = $loginPage.querySelector('.login-error-msg');
  const email = $email.value.trim();
  const pw = $pw.value.trim();
  try {
    const { data } = await axios.post('/users/login', { email, pw });
    if (data) {
      user = data;
      todos = user.todos;
      settings = user.settings;
      $loginMsg.classList.toggle('error', false);
      const $greetingName = document.querySelector('.greeting .name');
      $greetingName.textContent = user.name;
      etc.startClock();
      ani.movePage($loginPage, $mainPage);
      $email.value = '';
      $pw.value = '';
    } else {
      $loginMsg.classList.toggle('error', true);
    }
  } catch (error) {
    console.error(error);
  }
};

export {
  checkLengthZero, checkEmail, checkPw,
  checkPwCondition, checkPwConditionResult,
  checkConfirmPw, enableCreateAccount, enableLoginBtn,
  enableNextBtn, createAccount, login, getUsers
};
