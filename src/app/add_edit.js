/* eslint-disable camelcase */
import $ from 'jquery';
import * as zt from 'zingtouch';
import * as ls from './localStorageFunctions';
import generateMain from './generate';

const updateSelectAppImg = () => {
  const addVal = $('#addGesture .selectApp').val();
  $('#addGesture .appImg').css('background', `url('./img/high-level-prototype/app_icons/${addVal}.png') center`);
  $('#addGesture .appImg').css('background-size', 'contain');
  const editVal = $('#editGesture .selectApp').val();
  $('#editGesture .appImg').css('background', `url('./img/high-level-prototype/app_icons/${editVal}.png') center`);
  $('#editGesture .appImg').css('background-size', 'contain');
};

const parsePattern = pattern => {
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

const parseToggles = toggles => {
  const result = [];
  for (const i of toggles)
    if (
      $(i)
        .find('input')
        .prop('checked')
    )
      result.push(true);
    else result.push(false);
  return result;
};

const clearScreen = (dev_ges, add_edit) => {
  if (dev_ges === 'gesture' && add_edit === 'add') {
    $('#addGesture .name').val('');
    $('#addGesture .selectApp').val('facebook');
    updateSelectAppImg();
    $('#addGesture .pattern').empty();
  } else if (dev_ges === 'gesture' && add_edit === 'edit') $('#editGesture .pattern').empty();
  else if (dev_ges === 'device' && add_edit === 'add') {
    $('#addDevice .room').val('');
    $('#addDevice .surface').val('');
    $('#addDevice .gestureToggles').empty();
  } else if (dev_ges === 'device' && add_edit === 'edit') $('#editDevice .gestureToggles').empty();
};

const patternIsDuplicate = async pattern => {
  const gestures = await ls.getGestures();
  const editing = window.editingGestureIndex !== undefined ? window.editingGestureIndex : -1;
  let isEqual = false;
  gestures.forEach((g, index) => {
    console.log(`comparing against ${g.pattern}`);
    if (editing === index) return;
    if (pattern.length !== g.pattern.length) return;
    let patternEquals = true;
    for (let i = 0; i < pattern.length; i++) if (pattern[i] !== g.pattern[i]) patternEquals = false;
    if (patternEquals) isEqual = true;
  });
  return isEqual;
};

export const setupAddBtns = () => {
  $('#listGestures').on('click', '#addGestureBtn', () => {
    $('#content > div').hide();
    $('#addGesture').fadeIn();
  });
  $('#listDevices').on('click', '#addDeviceBtn', async () => {
    const gestures = await ls.getGestures();
    for (const g of gestures)
      $('#addDevice .gestureToggles').append(`
      <div>
        <h4>${g.name}</h4>
        <label class="switch">
          <input type="checkbox" checked >
          <span class="slider"></span>
        </label>
      </div>`);
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
    updateSelectAppImg();
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
    const gestures = await ls.getGestures();
    gestures.forEach((g, i) =>
      $('#editDevice .gestureToggles').append(`
      <div>
        <h4>${g.name}</h4>
        <label class="switch">
          <input type="checkbox" ${editingDevice.gestureToggles[i] ? 'checked' : ''} >
          <span class="slider"></span>
        </label>
      </div>`)
    );
    $('#content > div').hide();
    $('#editDevice').fadeIn();
  });
};

export const setupDoneGesture = () => {
  $('#doneAddGesture').on('click', async () => {
    const name = $('#addGesture .name').val();
    const app = $('#addGesture .selectApp').val();
    const pat = $('#addGesture .pattern').children();
    const pattern = parsePattern(pat);
    if (name.length === 0) alert('Enter a name for the gesture');
    else if (pat.length === 0) alert('Enter a pattern for the gesture');
    else if (await patternIsDuplicate(pattern)) alert('This pattern has already been used');
    else {
      const gestures = await ls.getGestures();
      gestures.push({ name, app, pattern });
      await ls.setGestures(gestures);
      const devices = await ls.getDevices();
      for (const d of devices) d.gestureToggles.push(true);
      await ls.setDevices(devices);
      await generateMain();
      $('#addGesture').fadeOut();
      $('#listGestures').fadeIn();
      clearScreen('gesture', 'add');
    }
  });
  $('#doneEditGesture').on('click', async () => {
    const name = $('#editGesture .name').val();
    const app = $('#editGesture .selectApp').val();
    const pat = $('#editGesture .pattern').children();
    const pattern = parsePattern(pat);
    if (name.length === 0) alert('Enter a name for the gesture');
    else if (pat.length === 0) alert('Enter a pattern for the gesture');
    else if (await patternIsDuplicate(pattern)) alert('This pattern has already been used');
    else {
      const gestures = await ls.getGestures();
      gestures[window.editingGestureIndex].name = name;
      gestures[window.editingGestureIndex].app = app;
      gestures[window.editingGestureIndex].pattern = pattern;
      window.editingGestureIndex = undefined;
      await ls.setGestures(gestures);
      await generateMain();
      $('#editGesture').fadeOut();
      $('#listGestures').fadeIn();
      clearScreen('gesture', 'edit');
    }
  });
};

export const setupDoneDevice = () => {
  $('#doneAddDevice').on('click', async () => {
    const room = $('#addDevice .room').val();
    const surface = $('#addDevice .surface').val();
    const toggles = $('#editDevice .gestureToggles').children();
    if (room.length === 0) alert('Enter a Room name');
    else if (surface.length === 0) alert('Enter a Surface name');
    else {
      const devices = await ls.getDevices();
      const gestureToggles = parseToggles(toggles);
      devices.push({ room, surface, isOn: true, gestureToggles });
      await ls.setDevices(devices);
      await generateMain();
      $('#addDevice').fadeOut();
      $('#listDevices').fadeIn();
      clearScreen('device', 'add');
    }
  });
  $('#doneEditDevice').on('click', async () => {
    const room = $('#editDevice .room').val();
    const surface = $('#editDevice .surface').val();
    const toggles = $('#editDevice .gestureToggles').children();
    if (room.length === 0) alert('Enter a Room name');
    else if (surface.length === 0) alert('Enter a Surface name');
    else {
      const devices = await ls.getDevices();
      devices[window.editingDeviceIndex].room = room;
      devices[window.editingDeviceIndex].surface = surface;
      devices[window.editingDeviceIndex].gestureToggles = parseToggles(toggles);
      window.editingGestureIndex = undefined;
      await ls.setDevices(devices);
      await generateMain();
      $('#editDevice').fadeOut();
      $('#listDevices').fadeIn();
      clearScreen('device', 'edit');
    }
  });
};

export const setupSelectAppDropdown = () => {
  $('#addGesture .selectApp').on('change', updateSelectAppImg);
  $('#editGesture .selectApp').on('change', updateSelectAppImg);
};

export const setupDeleteEditBtns = () => {
  $('#deleteEditGesture').on('click', async () => {
    const gestures = await ls.getGestures();
    const { name } = gestures[window.editingGestureIndex];
    const confirmed = confirm(`Are you sure you want to delete the gesture "${name}"?`);
    if (!confirmed) return;
    gestures.splice(window.editingGestureIndex, 1);
    window.editingGestureIndex = undefined;
    await ls.setGestures(gestures);
    const devices = await ls.getDevices();
    for (const d of devices) d.gestureToggles.splice(window.editingGestureIndex, 1);
    await ls.setDevices(devices);
    await generateMain();
    $('#editGesture').fadeOut();
    $('#listGestures').fadeIn();
    clearScreen('gesture', 'edit');
  });
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
    clearScreen('device', 'edit');
  });
};

export const setupCancelAddBtns = () => {
  $('#cancelAddGesture').on('click', async () => {
    const confirmed = confirm(`Are you sure you want to cancel adding this gesture?`);
    if (!confirmed) return;
    $('#addGesture').fadeOut();
    $('#listGestures').fadeIn();
    clearScreen('gesture', 'add');
  });
  $('#cancelAddDevice').on('click', async () => {
    const confirmed = confirm(`Are you sure you want to cancel adding this device?`);
    if (!confirmed) return;
    $('#addDevice').fadeOut();
    $('#listDevices').fadeIn();
    clearScreen('device', 'add');
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
