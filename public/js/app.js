const toggleNav = () => {
  $('#sidebarButton').toggleClass('active');
  $('nav').toggleClass('active');
};

const checkUser = (user) => {
  const regexUser = /^[a-zA-Z_\d]{6,}$/;
  if (!regexUser.test(user)) {
    alert('Enter a username consisting of at least 6 letters and underscores');
    return false;
  } else return true;
}

const checkMail = (mail) => {
  const regexMail = /\w+@[a-zA-Z_]+?\.[a-zA-Z]{2,3}$/;
  if (!regexMail.test(mail)) {
    alert('Enter a valid email address');
    return false;
  } else return true;
};

const checkPass = (pass) => {
  const regexPass = /.{4,}/;
  if (!regexPass.test(pass)) {
    alert('Password is too short');
    return false;
  } else return true;
};

const validateLogin = () => {
  const mail = $('#logform .mail').val();
  const pass = $('#logform .password').val();
  if (mail.length === 0 && pass.length === 0)
    return { state: 'empty' };
  else if (checkMail(mail) && checkPass(pass))
    return { state: 'valid', mail, pass };
  else
    return { state: '' };
};

const validateRegister = () => {
  const user = $('#regform .user').val();
  const mail = $('#regform .mail').val();
  const pass = $('#regform .password').val();
  if (mail.length === 0 && pass.length === 0)
    return { state: 'empty' };
  else if (checkUser(user) && checkMail(mail) && checkPass(pass))
    return { state: 'valid', user, mail, pass };
  else
    return { state: '' };
};

$(document).ready(() => {
  $("body").removeClass("preload");
  $('#logbtn').on('click touch', () => {
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
  $('#regbtn').on('click touch', () => {
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
