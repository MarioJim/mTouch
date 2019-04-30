import $ from 'jquery';
import * as zt from 'zingtouch';
import * as ls from './localStorageFunctions';
import generateMain from './generate';

const parsePattern = pattern => {
  console.log(pattern);
  const result = [];
  for (const i of pattern)
    if (
      $(i)
        .attr('src')
        .endsWith('full.svg')
    )
      result.push(true);
    else result.push(false);
  return result;
};

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

export const setupEditBtns = () => {
  $('#listGestures').on('click', '.gesture', async event => {
    const index = $(event.currentTarget).index();
    window.editingGestureIndex = index;
    const gestures = await ls.getGestures();
    const editingGesture = gestures[index];
    $('#editGesture .name').val(editingGesture.name);
    $('#editGesture .selectApp').val(editingGesture.app);
    $('#editGesture .appImg').css(
      'background',
      `url('./img/high-level-prototype/app_icons/${editingGesture.app}.png') center`
    );
    $('#editGesture .appImg').css('background-size', 'contain');
    $('#editGesture .pattern').empty();
    for (const i of editingGesture.pattern)
      $('#editGesture .pattern').append(`<img src="img/high-level-prototype/icons/${i ? 'full' : 'empty'}.svg">`);
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

export const setupDoneGesture = () => {
  $('#doneAddGesture').on('click', async () => {
    const name = $('#addGesture .name').val();
    const app = $('#addGesture .selectApp').val();
    const pat = $('#addGesture .pattern').children();
    if (name.length === 0) alert('Enter a name for the gesture');
    else if (pat.length === 0) alert('Enter a pattern for the gesture');
    else {
      const gestures = await ls.getGestures();
      const pattern = parsePattern(pat);
      gestures.push({ name, app, pattern });
      await ls.setGestures(gestures);
      await generateMain();
      $('#addGesture').fadeOut();
      $('#listGestures').fadeIn();
      $('#addGesture .name').val('');
      $('#addGesture .selectApp').val('facebook');
    }
  });
  $('#doneEditGesture').on('click', async () => {
    const name = $('#editGesture .name').val();
    const app = $('#editGesture .selectApp').val();
    const pat = $('#editGesture .pattern').children();
    if (name.length === 0) alert('Enter a name for the gesture');
    else if (pat.length === 0) alert('Enter a pattern for the gesture');
    else {
      const gestures = await ls.getGestures();
      gestures[window.editingGestureIndex].name = name;
      gestures[window.editingGestureIndex].app = app;
      gestures[window.editingGestureIndex].pattern = parsePattern(pat);
      window.editingGestureIndex = undefined;
      await ls.setGestures(gestures);
      await generateMain();
      $('#editGesture').fadeOut();
      $('#listGestures').fadeIn();
    }
  });
};

export const setupDoneDevice = () => {
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

export const setupSelectAppDropdown = () => {
  $('#addGesture .selectApp').on('change', async () => {
    const newValue = $('#addGesture .selectApp').val();
    $('#addGesture .appImg').css('background', `url('./img/high-level-prototype/app_icons/${newValue}.png') center`);
    $('#addGesture .appImg').css('background-size', 'contain');
  });
  $('#editGesture .selectApp').on('change', async () => {
    const newValue = $('#editGesture .selectApp').val();
    $('#editGesture .appImg').css('background', `url('./img/high-level-prototype/app_icons/${newValue}.png') center`);
    $('#editGesture .appImg').css('background-size', 'contain');
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

export const setupTappingArea = () => {
  const tapOrPress = new zt.Tap({
    maxDelay: 800,
    numInputs: 1,
    tolerance: 15,
  });
  const addTappingArea = $('#addGesture div.tappingArea')[0];
  const addRegion = new zt.Region(addTappingArea);
  addRegion.bind(addTappingArea, tapOrPress, event => {
    if ($('#addGesture div.pattern').children().length >= 7) return;
    if (event.detail.interval < 200)
      $('#addGesture div.pattern').append('<img src="img/high-level-prototype/icons/full.svg">');
    else $('#addGesture div.pattern').append('<img src="img/high-level-prototype/icons/empty.svg">');
  });
  $('#addGesture div.backspace').on('click', () =>
    $('#addGesture div.pattern img')
      .last()
      .remove()
  );
  const editTappingArea = $('#editGesture div.tappingArea')[0];
  const editRegion = new zt.Region(editTappingArea);
  editRegion.bind(editTappingArea, tapOrPress, event => {
    if ($('#editGesture div.pattern').children().length >= 7) return;
    if (event.detail.interval < 200)
      $('#editGesture div.pattern').append('<img src="img/high-level-prototype/icons/full.svg">');
    else $('#editGesture div.pattern').append('<img src="img/high-level-prototype/icons/empty.svg">');
  });
  $('#editGesture div.backspace').on('click', () =>
    $('#editGesture div.pattern img')
      .last()
      .remove()
  );
};
