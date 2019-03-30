import $ from 'jquery';

export const setupAddBtns = () => {
  $('#addDeviceBtn').on('click', () => {
    $('#content > div').hide();
    $('#addDevice').fadeIn();
  });
  $('#addGestureBtn').on('click', () => {
    $('#content > div').hide();
    $('#addGesture').fadeIn();
  });
};

export const setupDoneAddDevice = () => {
  $('#doneAddDevice').on('click', () => {
    const room = $('.inp > .room').val();
    const surface = $('.inp > .surface').val();
    if (room.length === 0) alert('Enter a Room name');
    else if (surface.length === 0) alert('Enter a Surface name');
    else {
      $('#addDevice').fadeOut();
      $('#listDevices').fadeIn();
      $('.inp > .room').val('');
      $('.inp > .surface').val('');
    }
  });
};

export const setupDoneAddGesture = () => {
  $('#doneAddGesture').on('click', () => {
    const name = $('.inp > .name').val();
    if (name.length === 0) alert('Enter a name for the gesture');
    else {
      $('#addGesture').fadeOut();
      $('#listGestures').fadeIn();
      $('.inp > .name').val('');
    }
  });
};
