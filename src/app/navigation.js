import $ from 'jquery';
import generateMain from './generate';
import { validateLogin, validateRegister } from './validateInputs';
import * as ls from './localStorageFunctions';

const clearInputs = () => {
  $('#logform .user').val('');
  $('#logform .password').val('');
  $('#regform .user').val('');
  $('#regform .mail').val('');
  $('#regform .password').val('');
};

const ifEmptyInputs = button => {
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
  $('nav path').css('fill', '#CCC');
  $('#start path').css('fill', '#00bfa5');
  $('#content > div').hide();
  $('#listDevices').fadeIn();
  $('#main').fadeIn();
};

export const setupNavBtns = () => {
  $('nav > svg').on('click', event => {
    if ($(event.currentTarget).attr('data-screen') === '#login') {
      clearInputs();
      $('#regbtn').show();
      $('#logbtn').show();
      $('#logform > form').hide();
      $('#regform > form').hide();
      $('#login > img').removeClass('onLogin');
      $('#main').hide();
      $('#login').fadeIn();
    } else if ($(event.currentTarget).attr('data-screen') !== '') {
      $('nav path').css('fill', '#CCC');
      $(event.currentTarget)
        .children('path')
        .css('fill', '#00bfa5');
      $('#content > div').hide();
      $($(event.currentTarget).attr('data-screen')).fadeIn();
    }
  });
};

export const setupKnockiBtn = () => {
  $('header > img').on('click', () => {
    $('#content > div').hide();
    $('#listGestures').fadeIn();
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
