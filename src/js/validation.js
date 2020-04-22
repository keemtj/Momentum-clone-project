// validation.js

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
  // const $pwReqNumber = document.querySelector('.pw-req > .pw-req-number');
  // const $pwReqUpper = document.querySelector('.pw-req > .pw-req-upper');
  // const $pwReqSpecial = document.querySelector('.pw-req > .pw-req-special');
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

export {
  checkLengthZero, checkEmail, checkPw,
  checkPwCondition, checkPwConditionResult,
  checkConfirmPw, enableCreateAccount,
  enableNextBtn
};
