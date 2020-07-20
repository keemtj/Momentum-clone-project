const $startPageInputs = document.querySelectorAll('.login-container input');
const $signUpHintSelected = document.querySelector('.signup-form .hint-selected');
const $signUpPwReq = document.querySelector('.signup-form .pw-req');
const $pwResetPwReq = document.querySelector('.pw-reset-form .reset-pw-req');
const $startPageBtns = document.querySelectorAll('.login-container button');

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

const resetErrorMsg = $target => {
  $target.parentNode.lastElementChild.classList.remove('error');
};
export {
  resetInputs, resetHint, resetBtns,
  resetMsg, resetPwCondition, resetErrorBg,
  resetErrorMsg
};
