import $ from 'jquery';
import * as ls from './localStorageFunctions';
import generateMain from './generate';

export const setupEditBtns = () => {
  $('#listGestures').on('click', '.gesture', async event => {
    const index = $(event.currentTarget).index();
    window.editingGestureIndex = index;
    const gestures = await ls.getGestures();
    const editingGesture = gestures[index];
    $('#editGesture .name').val(editingGesture.name);
    $('#content > div').hide();
    $('#editGesture').fadeIn();
  });
  $('#listDevices').on('click', '.device > div', async event => {
    const index = $(event.currentTarget)
      .parent()
      .index();
    window.editingDeviceIndex = index;
    const devices = await ls.getDevices();
    const editingDevice = devices[index];
    $('#editDevice .room').val(editingDevice.room);
    $('#editDevice .surface').val(editingDevice.surface);
    $('#content > div').hide();
    $('#editDevice').fadeIn();
  });
};

export const setupDoneEditGesture = () => {
  $('#doneEditGesture').on('click', async () => {
    const name = $('#editGesture .name').val();
    if (name.length === 0) alert('Enter a name for the gesture');
    else {
      const gestures = await ls.getGestures();
      gestures[window.editingGestureIndex].name = name;
      window.editingGestureIndex = undefined;
      await ls.setGestures(gestures);
      await generateMain();
      $('#editGesture').fadeOut();
      $('#listGestures').fadeIn();
    }
  });
};

export const setupDeleteEditGesture = () => {
  $('#deleteEditGesture').on('click', async () => {
    const gestures = await ls.getGestures();
    const { name } = gestures[window.editingGestureIndex];
    const confirmed = confirm(`Are you sure you want to delete the gesture "${name}"?`);
    if (!confirmed) return;
    gestures.splice(window.editingGestureIndex, 1);
    window.editingGestureIndex = undefined;
    await ls.setGestures(gestures);
    await generateMain();
    $('#editGesture').fadeOut();
    $('#listGestures').fadeIn();
  });
};

export const setupDoneEditDevice = () => {
  $('#doneEditDevice').on('click', async () => {
    const room = $('#editDevice .room').val();
    const surface = $('#editDevice .surface').val();
    if (room.length === 0) alert('Enter a Room name');
    else if (surface.length === 0) alert('Enter a Surface name');
    else {
      const devices = await ls.getDevices();
      devices[window.editingDeviceIndex].room = room;
      devices[window.editingDeviceIndex].surface = surface;
      window.editingGestureIndex = undefined;
      await ls.setDevices(devices);
      await generateMain();
      $('#editDevice').fadeOut();
      $('#listDevices').fadeIn();
    }
  });
};

export const setupDeleteEditDevice = () => {
  $('#deleteEditDevice').on('click', async () => {
    const devices = await ls.getDevices();
    const { room } = devices[window.editingDeviceIndex];
    const confirmed = confirm(`Are you sure you want to delete the Knocki in ${room}?`);
    if (!confirmed) return;
    devices.splice(window.editingDeviceIndex, 1);
    window.editingDeviceIndex = undefined;
    await ls.setDevices(devices);
    await generateMain();
    $('#editDevice').fadeOut();
    $('#listDevices').fadeIn();
  });
};
