import $ from 'jquery';
import localForage from 'localforage';

const clearMain = () => {
  $('#listGestures').empty();
  $('#listDevices').empty();
  $('#myAccount').empty();
};

const injectGestures = gestures => {
  for (const ges of gestures) {
    let pat = '';
    for (const i of ges.pattern)
      pat += i
        ? '                        <img src="img/high-level-prototype/icons/full.svg">\n'
        : '                        <img src="img/high-level-prototype/icons/empty.svg">\n';
    $('#listGestures').append(`
                <div class="gesture">
                    <h5>${ges.name}</h5>
                    <div>
                      ${pat}
                    </div>
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
                        <path
                            d="M12 0c-6.627 0-12 5.373-12 12s5.373 12 12 12 12-5.373 12-12-5.373-12-12-12zm6 13h-5v5h-2v-5h-5v-2h5v-5h2v5h5v2z" />
                    </svg>
                </div>
  `);
  // Add devices
  injectDevices(user.devices);
  // Add button to add a device
  $('#listDevices').append(`
                <div id="addDeviceBtn">
                    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24">
                        <path
                            d="M12 0c-6.627 0-12 5.373-12 12s5.373 12 12 12 12-5.373 12-12-5.373-12-12-12zm6 13h-5v5h-2v-5h-5v-2h5v-5h2v5h5v2z" />
                    </svg>
                </div>
  `);
  injectAccount(user);
};
