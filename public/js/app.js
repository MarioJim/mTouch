const toggleNav = () => {
  $('#sidebarButton').toggleClass('active');
  $('nav').toggleClass('active');
};

$(window).load(function () {
  $("body").removeClass("preload");
});

const validateLogin = () => {
  const mail = $('#logform .mail').val();
  const pass = $('#logform .password').val();
  if (mail.length === 0 && pass.length === 0) return { state: 'empty' };
  const regexMail = /\w+@[a-zA-Z_]+?\.[a-zA-Z]{2,3}$/;
  if (!regexMail.test(mail)) alert('Enter a valid email address');
  else if (pass.length < 4) alert('Password is too short');
  else return { state: 'valid', mail, pass };
  return { state: '' };
};

const validateRegister = () => {
  const user = $('#regform .user').val();
  const mail = $('#regform .mail').val();
  const pass = $('#regform .password').val();
  if (mail.length === 0 && pass.length === 0) return { state: 'empty' };
  const regexUser = /^[a-zA-Z_\d]{6,}$/;
  const regexMail = /^\w+@[a-zA-Z_]+?\.[a-zA-Z]{2,3}$/;
  if (!regexUser.test(user)) alert('Enter a username consisting of at least 6 letters and underscores');
  else if (!regexMail.test(mail)) alert('Enter a valid email address');
  else if (pass.length < 4) alert('Password is too short');
  else return { state: 'valid', user, mail, pass };
  return { state: '' };
};

$(document).ready(() => {
  $('#logbtn').on('click', () => {
    const result = validateLogin();
    switch (result.state) {
      case 'valid':
        $('#login').fadeOut();
        $('#main').fadeIn();
        break;
      case 'empty':
        $('#regbtn').slideToggle();
        $('#login > img').toggleClass('onLogin');
        $('#logform > form').slideToggle();
        break;
      default:
    }
  });
  $('#regbtn').on('click', () => {
    const result = validateRegister();
    switch (result.state) {
      case 'valid':
        $('#login').fadeOut();
        $('#main').fadeIn();
        break;
      case 'empty':
        $('#logbtn').slideToggle();
        $('#login > img').toggleClass('onLogin');
        $('#regform > form').slideToggle();
        break;
      default:
    }
  });
});
