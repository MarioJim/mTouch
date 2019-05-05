import $ from 'jquery';
// eslint-disable-next-line no-unused-vars
import { swipe, swipeStatus } from 'jquery-touchswipe';
import localForage from 'localforage';
import * as nav from './app/navigation';
import * as gen from './app/generate';
import * as add_edit from './app/add_edit';
import { setupAccountBtns } from './app/localStorageFunctions';

$(document).ready(() => {
  // To remove animations/transitions while loading
  $('body').removeClass('preload');
  // Validate input for login
  nav.setupLoginBtn();
  // Validate input for register
  nav.setupRegisterBtn();
  // Add event listeners to buttons
  nav.setupNavBtns();
  nav.setupKnockiBtn();
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
  setupAccountBtns();
  // Local storage setup
  localForage.config({
    driver: localForage.LOCALSTORAGE,
    name: 'store',
  });
});
