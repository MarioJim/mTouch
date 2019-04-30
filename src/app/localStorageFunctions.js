import $ from 'jquery';
import localForage from 'localforage';

export const loginAs = async (user, callback) => {
  const dbUser = await localForage.getItem(user.user);
  if (dbUser === null) alert(`User "${user.user}" doesn't exist`);
  else if (user.pass !== dbUser.pass) alert('Incorrect Password');
  else {
    window.currentUser = dbUser.user;
    callback();
  }
};

export const saveRegisteredUser = async (user, callback) => {
  const possibleUser = await localForage.getItem(user.user);
  if (possibleUser !== null) {
    alert('User already exists');
    return;
  }
  const newUser = await localForage.setItem(user.user, {
    user: user.user,
    mail: user.mail,
    pass: user.pass,
    devices: [
      { room: 'Bedroom', surface: 'Wall', isOn: false },
      { room: 'Living room', surface: 'Under table', isOn: true },
    ],
    gestures: [
      { name: 'Play music', app: 'sms', pattern: [true] },
      { name: 'Find my phone', app: 'tplink', pattern: [true, false, true] },
      { name: 'Unlock smart door', app: 'sonos', pattern: [false, true, false, true] },
    ],
  });
  loginAs(newUser, callback);
};

export const deleteAccount = () => {
  $('#myAccount').on('click', '#deleteAccount', async () => {
    const confirmed = confirm('Are you sure you want to delete this account?');
    if (!confirmed) return;
    await localForage.removeItem(window.currentUser);
    $('#main').fadeOut();
    $('#login').fadeIn();
  });
};

export const getDevices = async () => {
  const user = await localForage.getItem(window.currentUser);
  return user.devices;
};

export const setDevices = async newDevices => {
  const user = await localForage.getItem(window.currentUser);
  user.devices = newDevices;
  await localForage.setItem(window.currentUser, user);
};

export const getGestures = async () => {
  const user = await localForage.getItem(window.currentUser);
  return user.gestures;
};

export const setGestures = async newGestures => {
  const user = await localForage.getItem(window.currentUser);
  user.gestures = newGestures;
  await localForage.setItem(window.currentUser, user);
};
