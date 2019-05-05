import $ from 'jquery';

const checkUser = user => {
  const regexUser = /^[a-zA-Z_\d]{6,}$/;
  if (!regexUser.test(user)) {
    alert('Enter a username consisting of at least 6 letters and underscores');
    return false;
  }
  return true;
};

const checkMail = mail => {
  const regexMail = /\w+@[a-zA-Z_]+?\.[a-zA-Z]{2,3}$/;
  if (!regexMail.test(mail)) {
    alert('Enter a valid email address');
    return false;
  }
  return true;
};

const checkPass = pass => {
  const regexPass = /.{4,}/;
  if (pass.length === 0) {
    alert('Please fill out your password');
    return false;
  }
  if (!regexPass.test(pass)) {
    alert('Password is too short');
    return false;
  }
  return true;
};

export const validateLogin = () => {
  const user = $('#logform .user').val();
  const pass = $('#logform .password').val();
  if (user.length === 0 && pass.length === 0) return { state: 'empty' };
  if (checkUser(user) && checkPass(pass)) return { state: 'valid', user, pass };
  return { state: '' };
};

export const validateRegister = () => {
  const user = $('#regform .user').val();
  const mail = $('#regform .mail').val();
  const pass = $('#regform .password').val();
  if (mail.length === 0 && pass.length === 0) return { state: 'empty' };
  if (checkUser(user) && checkMail(mail) && checkPass(pass)) return { state: 'valid', user, mail, pass };
  return { state: '' };
};
