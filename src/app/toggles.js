import $ from 'jquery';
import * as ls from './localStorageFunctions';

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
    console.log(index);
    const devices = await ls.getDevices();
    devices[index].isOn = !devices[index].isOn;
    await ls.setDevices(devices);
  });
};

export const setupGestureToggles = () => {};
