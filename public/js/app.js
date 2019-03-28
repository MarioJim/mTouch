import { validateLogin, validateRegister } from "./app/validateInputs.mjs";
import { emptyInputs, moveToMain, toggleSidemenu } from "./app/navigation.mjs";

$(document).ready(() => {
  // To remove animations/transitions while loading
  $('body').removeClass('preload');
  // To open the sidebar
  $('#sidebarButton').on('click touch', () => toggleSidemenu());
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
});
