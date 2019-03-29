export const device = function (elem, pos) {
  switch (pos) {
    case 'on':
      $(elem).children('img').removeClass('off');
      $(elem).children('div').children('span.on').show();
      $(elem).children('div').children('span.off').hide();
      break;
    case 'off':
      $(elem).children('img').addClass('off');
      $(elem).children('div').children('span.on').hide();
      $(elem).children('div').children('span.off').show();
      break;
    default:
      $(elem).children('img').toggleClass('off');
      if ($(elem).children('img').hasClass('off')) {
        $(elem).children('div').children('span.on').hide();
        $(elem).children('div').children('span.off').show();
      } else {
        $(elem).children('div').children('span.on').show();
        $(elem).children('div').children('span.off').hide();
      }
  }
};