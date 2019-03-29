import { validateLogin, validateRegister } from "./app/validateInputs.mjs";
import { emptyInputs, moveToMain, toggleSidemenu } from "./app/navigation.mjs";
import * as toggle from "./app/toggles.mjs";

$(document).ready(() => {
  // To remove animations/transitions while loading
  $('body').removeClass('preload');
  // To open the sidebar
  $('#sidebarButton').on('click touch', () => toggleSidemenu());
  $(".swipe-area").swipe({
    swipeStatus: function (event, phase, direction, distance, duration, fingers) {
      if (phase === "move" && direction === "right") {
        toggleSidemenu();
        return false;
      } else if (phase === "move" && direction === "left") {
        toggleSidemenu();
        return false;
      }
    }
  });
  // Validate input for login
  $('#logbtn').on('click touch', () => {
    const result = validateLogin();
    if (result.state === 'valid') moveToMain();
    else if (result.state === 'empty') emptyInputs('login');
  });
  // Validate input for register
  $('#regbtn').on('click touch', () => {
    const result = validateRegister();
    if (result.state === 'valid') moveToMain();
    else if (result.state === 'empty') emptyInputs('register');
  });
  // Check scroll
  window.addEventListener('scroll', () => {
    if (window.scrollY <= 0)
      $('#main > header').removeClass('scrolled');
    else
      $('#main > header').addClass('scrolled');
  }, { passive: true });
  // Add event listeners to nav buttons
  $('nav > p').on('click', function () {
    toggleSidemenu('close');
    if ($(this).attr('data-screen') === '#login') {
      $('#main').hide();
      $('#login').fadeIn();
    } else if ($(this).attr('data-screen') !== '') {
      $('#content > div').hide();
      $($(this).attr('data-screen')).fadeIn();
    }
  });
  // Bind add buttons to their screens
  $('#addDeviceBtn').on('click', () => {
    $('#content > div').hide();
    $('#addDevice').fadeIn();
  });
  $('#addGestureBtn').on('click', () => {
    $('#content > div').hide();
    $('#addGesture').fadeIn();
  })
  // Bind toggles to devices at deviceList
  $('div.device > label.switch > input').on('click', function () {
    if ($(this).prop('checked'))
      toggle.device($(this).parent().parent(), 'on');
    else
      toggle.device($(this).parent().parent(), 'off');
  });
});
