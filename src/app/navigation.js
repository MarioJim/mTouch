import $ from 'jquery';

export const ifEmptyInputs = button => {
  switch (button) {
    case 'login':
      $('#regbtn').slideToggle();
      $('#login > img').toggleClass('onLogin');
      $('#logform > form').slideToggle();
      break;
    case 'register':
      $('#logbtn').slideToggle();
      $('#login > img').toggleClass('onLogin');
      $('#regform > form').slideToggle();
      break;
    default:
  }
};

export const moveToMain = () => {
  $('#login').fadeOut();
  $('#main').fadeIn();
};

export const toggleSidemenu = (action = 'toggle') => {
  switch (action) {
    case 'toggle':
      $('#sidebarButton').toggleClass('active');
      $('nav').toggleClass('active');
      break;
    case 'open':
      $('#sidebarButton').addClass('active');
      $('nav').addClass('active');
      break;
    case 'close':
      $('#sidebarButton').removeClass('active');
      $('nav').removeClass('active');
      break;
    default:
  }
};
