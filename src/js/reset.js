// reset.js
// start-page에서 back-btn 클릭시 input.value, btn.disabled, hint, pwcondition 등 reset 시킴
const $startPageInputs = document.querySelectorAll('.login-container input');
const $signUpHintSelected = document.querySelector('.signup-form .hint-selected');
const $signUpPwReq = document.querySelector('.signup-form .pw-req > li');
const $pwResetPwReq = document.querySelector('.pw-reset-form .reset-pw-req > li');
const $startPageBtns = document.querySelectorAll('.login-container button:not(.btn-login)');

const resetInputs = () => {
  [...$startPageInputs].forEach($input => {
    $input.value = '';
  });
};

const resetHint = () => {
  $signUpHintSelected.textContent = 'Select a hint';
};

const resetBtns = () => {
  [...$startPageBtns].forEach($btn => {
    $btn.disabled = true;
  });
};

const resetPwCondition = () => {
  [...$signUpPwReq.children].forEach($req => {
    $req.classList.remove('underline');
  });
  [...$pwResetPwReq.children].forEach($req => {
    $req.classList.remove('underline');
  });
};

const resetMsg = () => {
  const $msgs = document.querySelectorAll('.msg-show');
  [...$msgs].forEach($msg => {
    $msg.classList.remove('msg-show');
  });
};

const resetErrorBg = () => {
  const errorBg = document.querySelectorAll('.warning');
  [...errorBg].forEach($bg => {
    $bg.classList.remove('warning');
  });
};

export {
  resetInputs, resetHint, resetBtns,
  resetMsg, resetPwCondition, resetErrorBg
};
