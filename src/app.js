import $ from 'jquery';
// eslint-disable-next-line no-unused-vars
import { swipe, swipeStatus } from 'jquery-touchswipe';
import { validateLogin, validateRegister } from './app/validateInputs';
import { ifEmptyInputs, moveToMain, toggleSidemenu } from './app/navigation';
import * as toggle from './app/toggles';
import * as add from './app/add';

$(document).ready(() => {
  // To remove animations/transitions while loading
  $('body').removeClass('preload');
  // To open and close the sidebar
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
  });
  $('.swipe-area').click(() => toggleSidemenu('close'));
  // Validate input for login
  $('#logbtn').on('click', () => {
    const result = validateLogin();
    if (result.state === 'valid') moveToMain();
    else if (result.state === 'empty') ifEmptyInputs('login');
  });
  // Validate input for register
  $('#regbtn').on('click', () => {
    const result = validateRegister();
    if (result.state === 'valid') moveToMain();
    else if (result.state === 'empty') ifEmptyInputs('register');
  });
  // Check scroll
  window.addEventListener(
    'scroll',
    () => {
      if (window.scrollY <= 0) $('#main > header').removeClass('scrolled');
      else $('#main > header').addClass('scrolled');
    },
    { passive: true }
  );
  // Add event listeners to nav buttons
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
  // Bind add buttons to their screens
  add.setupAddBtns();
  add.setupDoneAddDevice();
  add.setupDoneAddGesture();
  // Bind toggles to devices at deviceList
  $('div.device > label.switch > input').on('click', event => {
    if ($(event.currentTarget).prop('checked'))
      toggle.device(
        $(event.currentTarget)
          .parent()
          .parent(),
        'on'
      );
    else
      toggle.device(
        $(event.currentTarget)
          .parent()
          .parent(),
        'off'
      );
  });
});
