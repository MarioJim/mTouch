import $ from 'jquery';
import generateMain from './generate';
import { validateLogin, validateRegister } from './validateInputs';
import * as ls from './localStorageFunctions';

export const ifEmptyInputs = button => {
  switch (button) {
    case 'login':
      $('#regbtn').slideToggle();
      $('#login > img').toggleClass('onLogin');
      $('#logform > form').slideToggle();
      break;
    case 'register':
      $('#logbtn').slideToggle();
      $('#login > img').toggleClass('onLogin');
      $('#regform > form').slideToggle();
      break;
    default:
  }
};

export const moveToMain = async () => {
  await generateMain();
  $('#login').fadeOut();
  $('#main').fadeIn();
};

const toggleSidemenu = (action = 'toggle') => {
  switch (action) {
    case 'toggle':
      $('#sidebarButton').toggleClass('active');
      $('nav').toggleClass('active');
      break;
    case 'open':
      $('#sidebarButton').addClass('active');
      $('nav').addClass('active');
      break;
    case 'close':
      $('#sidebarButton').removeClass('active');
      $('nav').removeClass('active');
      break;
    default:
  }
};

export const setupNavBtns = () => {
  $('nav > p').on('click', event => {
    toggleSidemenu('close');
    if ($(event.currentTarget).attr('data-screen') === '#login') {
      $('#main').hide();
      $('#login').fadeIn();
    } else if ($(event.currentTarget).attr('data-screen') !== '') {
      $('#content > div').hide();
      $($(event.currentTarget).attr('data-screen')).fadeIn();
    }
  });
};

export const setupSideMenuInteractions = () => {
  $('#sidebarButton').on('click', () => toggleSidemenu());
  $('.swipe-area').swipe({
    // eslint-disable-next-line consistent-return
    swipeStatus(event, phase, direction) {
      if (phase === 'move' && direction === 'right') {
        toggleSidemenu('close');
        return false;
        // eslint-disable-next-line no-else-return
      } else if (phase === 'move' && direction === 'left') {
        toggleSidemenu('open');
        return false;
      }
    },
    allowPageScroll: 'vertical',
  });
};

export const setupLoginBtn = () => {
  $('#logbtn').on('click', () => {
    const result = validateLogin();
    if (result.state === 'valid') ls.loginAs(result, moveToMain);
    else if (result.state === 'empty') ifEmptyInputs('login');
  });
};

export const setupRegisterBtn = () => {
  $('#regbtn').on('click', () => {
    const result = validateRegister();
    if (result.state === 'valid') ls.saveRegisteredUser(result, moveToMain);
    else if (result.state === 'empty') ifEmptyInputs('register');
  });
};
