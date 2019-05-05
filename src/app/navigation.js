import $ from 'jquery';
import generateMain from './generate';
import { validateLogin, validateRegister } from './validateInputs';
import * as ls from './localStorageFunctions';

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
    $('nav path').css('fill', '#CCC');
    $(event.currentTarget)
      .children('path')
      .css('fill', '#00bfa5');
    $('header > h4').text($(event.currentTarget).attr('data-title'));
    $('#content > div').hide();
    $($(event.currentTarget).attr('data-screen')).fadeIn();
  });
  $('header > svg').on('click', () => {
    $('nav path').css('fill', '#CCC');
    $('header > h4').text('Account');
    $('#content > div').hide();
    $('#myAccount').fadeIn();
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
