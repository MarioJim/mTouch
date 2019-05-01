import $ from 'jquery';
// eslint-disable-next-line no-unused-vars
import { swipe, swipeStatus } from 'jquery-touchswipe';
import localForage from 'localforage';
import * as nav from './app/navigation';
import * as gen from './app/generate';
import * as add_edit from './app/add_edit';
import { deleteAccount } from './app/localStorageFunctions';

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
  // Bind add/edit buttons to their functions
  add_edit.setupAddBtns();
  add_edit.setupEditBtns();
  add_edit.setupDoneGesture();
  add_edit.setupDoneDevice();
  add_edit.setupSelectAppDropdown();
  add_edit.setupDeleteEditBtns();
  add_edit.setupCancelAddBtns();
  add_edit.setupTappingArea();
  // Bind toggles to devices at listDevices
  gen.setupDevicesToggles();
  // Bind delete account button
  deleteAccount();
  // Local storage setup
  localForage.config({
    driver: localForage.LOCALSTORAGE,
    name: 'store',
  });
});
