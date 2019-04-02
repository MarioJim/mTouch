import $ from 'jquery';
import * as ls from './localStorageFunctions';
import generateMain from './generate';

export const setupAddBtns = () => {
  $('#listGestures').on('click', '#addGestureBtn', () => {
    $('#content > div').hide();
    $('#addGesture').fadeIn();
  });
  $('#listDevices').on('click', '#addDeviceBtn', () => {
    $('#content > div').hide();
    $('#addDevice').fadeIn();
  });
};

export const setupDoneAddGesture = () => {
  $('#doneAddGesture').on('click', async () => {
    const name = $('#addGesture .name').val();
    if (name.length === 0) alert('Enter a name for the gesture');
    else {
      const gestures = await ls.getGestures();
      const pattern = [];
      for (let i = 0; i < 4; i++) pattern.push(Math.random() > 0.5);
      gestures.push({ name, pattern });
      await ls.setGestures(gestures);
      await generateMain();
      $('#addGesture').fadeOut();
      $('#listGestures').fadeIn();
      $('#addGesture .name').val('');
    }
  });
};

export const setupDoneAddDevice = () => {
  $('#doneAddDevice').on('click', async () => {
    const room = $('#addDevice .room').val();
    const surface = $('#addDevice .surface').val();
    if (room.length === 0) alert('Enter a Room name');
    else if (surface.length === 0) alert('Enter a Surface name');
    else {
      const devices = await ls.getDevices();
      devices.push({ room, surface, isOn: true });
      await ls.setDevices(devices);
      await generateMain();
      $('#addDevice').fadeOut();
      $('#listDevices').fadeIn();
      $('#addDevice .room').val('');
      $('#addDevice .surface').val('');
    }
  });
};
