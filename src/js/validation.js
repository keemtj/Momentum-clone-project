// validation.js
import * as ani from './animation';
import * as etc from './etc';
import * as t from './todos';
import * as set from './setting';
import * as main from './main';
import * as valid from './validation';

let user = {};
let forgotPwUser = {};

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
  $loginBtn.disabled = ($warnings.length || !$target.value.trim() || !$siblingTarget.value.trim());
};

const enableCreateAccount = () => {
  const $warnings = document.querySelectorAll('.signup-form input.warning');
  const $hintText = document.querySelector('.signup-form .hint-selected').textContent.trim();
  const $createAccountBtn = document.querySelector('.signup-form .btn-signup');
  $createAccountBtn.disabled = !(!$warnings.length && ($hintText !== 'Select a hint'));
};

const enableNextBtn = $target => {
  const $warnings = document.querySelectorAll('.login-container input.warning');
  const $btn = $target.parentNode.lastElementChild.previousElementSibling;
  $btn.disabled = $warnings.length;
};

const resetPw = async () => {
  const pw = document.querySelector('#pw-reset-new-pw').value;
  const { email } = forgotPwUser;
  try {
    const { data } = await axios.patch('/users/reset_pw', { email, pw });
    ani.movePage($pwResetPage, $loginPage);
  } catch (error) {
    console.error(error);
  }
};

// const generateId = () => (users.length ? Math.max(...users.map(user => user.userId)) + 1 : 1);

const getUsers = async () => {
  const { data } = await axios.get('/users');
  return data;
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
    const { data } = await axios.post('/users', { online: false, name, email, pw, hint, answer });
    if (data) {
      ani.movePage($signupPage, $loginPage);
    } else {
      const $signupErrorMsg = document.querySelector('.signup-error-msg');
      $signupErrorMsg.classList.add('error');
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
      console.log(data);
      
      user = data;
      $loginMsg.classList.toggle('error', false);
      const $greetingName = document.querySelector('.greeting .name');
      $greetingName.textContent = user.name;
      etc.startClock();
      set.getSettings();
      ani.movePage($loginPage, $mainPage);
      $email.value = '';
      $pw.value = '';
      t.getTodos();
    } else {
      $loginMsg.classList.toggle('error', true);
    }
  } catch (error) {
    console.error(error);
  }
};

const checkEmailExists = async $email => {
  const email = $email.value.trim();
  const $forgotPwMsg = $forgotPwPage.querySelector('.forgot-pw-error-msg');
  try {
    const { data } = await axios.post('/users/forgot_pw', { email });
    if (data) {
      forgotPwUser = data;
      $forgotPwMsg.classList.toggle('error', false);
      const $pwHintQuestion = $pwHintPage.querySelector('.pw-hint-question');
      $pwHintQuestion.textContent = forgotPwUser.hint;
      ani.movePage($forgotPwPage, $pwHintPage);
    } else {
      $forgotPwMsg.classList.toggle('error', true);
    }
  } catch (error) {
    console.error(error);
  }
};

const checkPwHintAnswer = $answer => {
  const answer = $answer.value.trim();
  const $pwHintMsg = $pwHintPage.querySelector('.pw-hint-error-msg');
  if (answer === forgotPwUser.answer) {
    $pwHintMsg.classList.toggle('error', false);
    ani.movePage($pwHintPage, $pwResetPage);
  } else {
    $pwHintMsg.classList.toggle('error', true);
  }
};

export {
  checkLengthZero, checkEmail, checkPw, resetPw,
  checkPwCondition, checkPwConditionResult, checkPwHintAnswer,
  checkEmailExists, checkConfirmPw, enableCreateAccount, enableLoginBtn,
  enableNextBtn, createAccount, login, getUsers, user
};
