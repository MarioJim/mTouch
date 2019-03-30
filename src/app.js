import $ from 'jquery';
// eslint-disable-next-line no-unused-vars
import { swipe, swipeStatus } from 'jquery-touchswipe';
import localForage from 'localforage';
import * as nav from './app/navigation';
import * as toggle from './app/toggles';
import * as add from './app/add';

$(document).ready(() => {
  // To remove animations/transitions while loading
  $('body').removeClass('preload');
  // To open and close the sidebar
  nav.setupSideMenuInteractions();
  // Validate input for login
  nav.setupLoginBtn();
  // Validate input for register
  nav.setupRegisterBtn();
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
  nav.setupNavBtns();
  // Bind add buttons to their screens
  add.setupAddBtns();
  add.setupDoneAddDevice();
  add.setupDoneAddGesture();
  // Bind toggles to devices at deviceList
  toggle.setupDevicesToggles();
  // Local storage setup
  localForage.config({
    driver: localForage.LOCALSTORAGE,
    name: 'store',
  });
});
