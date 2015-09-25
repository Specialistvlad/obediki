module.exports = {
  send: function sendEmail(to, subject, htmlBody) {
    return new Promise(function(resolve, reject) {
      console.log('Dummy email to ' + to, subject);
      console.log(htmlBody);
      resolve();
    });
  }
}
