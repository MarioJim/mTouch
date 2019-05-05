import $ from 'jquery';
import localForage from 'localforage';
import * as ls from './localStorageFunctions';

const clearMain = () => {
  $('#listGestures').empty();
  $('#listDevices').empty();
  $('#myAccount').empty();
};

const injectGestures = gestures => {
  for (const ges of gestures) {
    let pat = '';
    for (const i of ges.pattern) pat += `<img src="img/high-level-prototype/icons/${i ? 'full' : 'empty'}.svg">`;
    $('#listGestures').append(`
      <div class="gesture">
        <h5>${ges.name}</h5>
        <div>${pat}</div>
      </div>
  `);
  }
};

const injectDevices = devices => {
  for (const dev of devices)
    $('#listDevices').append(`
      <div class="device">
        <img src="img/high-level-prototype/logo.svg" class="${dev.isOn ? '' : 'off'}">
        <div>
          <h5>${dev.room}</h5>
          <h5>${dev.surface}</h5>
          <span>Status:</span>
          <span class="on" style="display: ${dev.isOn ? 'inline-block' : 'none'};">Online</span>
          <span class="off" style="display: ${dev.isOn ? 'none' : 'inline-block'};">Offline</span>
        </div>
        <label class="switch">
          <input type="checkbox" ${dev.isOn ? 'checked' : ''}>
          <span class="slider"></span>
        </label>
      </div>
  `);
};

const injectAccount = user => {
  $('#myAccount').append(`
    <img src="img/high-level-prototype/icons/avatar.svg">
    <h4>Name</h4>
    <p>${user.user}</p>
    <h4>Username</h4>
    <p>${user.user}</p>
    <h4>Email</h4>
    <p>${user.mail}</p>
    <h4>Password</h4>
    <p>${'*'.repeat(user.pass.length)}</p>
    <div id="logOut">
      <p>Log Out</p>
    </div>
    <div id="deleteAccount">
      <p>Delete Account</p>
    </div>
  `);
};

export default async () => {
  clearMain();
  const user = await localForage.getItem(window.currentUser);
  // Add gestures
  injectGestures(user.gestures);
  // Add button to add a gesture
  $('#listGestures').append(`
    <div id="addGestureBtn">
      <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24">
        <path d="M12 0c-6.627 0-12 5.373-12 12s5.373 12 12 12 12-5.373 12-12-5.373-12-12-12zm6 13h-5v5h-2v-5h-5v-2h5v-5h2v5h5v2z" />
      </svg>
    </div>
  `);
  // Add devices
  injectDevices(user.devices);
  // Add button to add a device
  $('#listDevices').append(`
    <div id="addDeviceBtn">
      <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24">
        <path d="M12 0c-6.627 0-12 5.373-12 12s5.373 12 12 12 12-5.373 12-12-5.373-12-12-12zm6 13h-5v5h-2v-5h-5v-2h5v-5h2v5h5v2z" />
      </svg>
    </div>
  `);
  injectAccount(user);
};

const device = (elem, pos) => {
  switch (pos) {
    case 'on':
      $(elem)
        .children('img')
        .removeClass('off');
      $(elem)
        .children('div')
        .children('span.on')
        .show();
      $(elem)
        .children('div')
        .children('span.off')
        .hide();
      break;
    case 'off':
      $(elem)
        .children('img')
        .addClass('off');
      $(elem)
        .children('div')
        .children('span.on')
        .hide();
      $(elem)
        .children('div')
        .children('span.off')
        .show();
      break;
    default:
      $(elem)
        .children('img')
        .toggleClass('off');
      if (
        $(elem)
          .children('img')
          .hasClass('off')
      ) {
        $(elem)
          .children('div')
          .children('span.on')
          .hide();
        $(elem)
          .children('div')
          .children('span.off')
          .show();
      } else {
        $(elem)
          .children('div')
          .children('span.on')
          .show();
        $(elem)
          .children('div')
          .children('span.off')
          .hide();
      }
  }
};

export const setupDevicesToggles = () => {
  $('#listDevices').on('click', 'div.device > label.switch > input', async event => {
    if ($(event.currentTarget).prop('checked'))
      device(
        $(event.currentTarget)
          .parent()
          .parent(),
        'on'
      );
    else
      device(
        $(event.currentTarget)
          .parent()
          .parent(),
        'off'
      );
    const index = $(event.currentTarget)
      .parent()
      .parent()
      .index();
    const devices = await ls.getDevices();
    devices[index].isOn = !devices[index].isOn;
    await ls.setDevices(devices);
  });
};
