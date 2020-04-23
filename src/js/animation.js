import * as reset from './reset';

const $loginContainer = document.querySelector('.login-container');

// fadeIn
const fadeIn = (target, duration) => {
  target.style.animationDuration = `${duration / 1000}s`;
  target.classList.add('fade-in');
  target.classList.remove('fade-out');
};
// fadeOut
const fadeOut = (target, duration) => {
  target.style.animationDuration = `${duration / 1000}s`;
  target.classList.add('fade-out');
  target.classList.remove('fade-in');
  setTimeout(() => {
    target.classList.remove('fade-out');
  }, duration);
};

// movePage(from, to)
const movePage = (from, to) => {
  fadeOut(from, 300);
  setTimeout(() => {
    if (from.id === 'signup' && to.id === 'login') {
      $loginContainer.style.top = 'calc(50% - 30vh)';
      reset.resetHint();
    }
    if (from.id === 'login' && to.id === 'signup') {
      $loginContainer.style.top = 'calc(50% - 40vh)';
    }
    if (to.id === 'main') $loginContainer.style.display = 'none';
    reset.resetInputs();
    reset.resetBtns();
    reset.resetPwCondition();
    reset.resetMsg();
    reset.resetErrorBg();
    fadeIn(to, 300);
  }, 300);
};

export {
  fadeIn,
  fadeOut,
  movePage,
};
