const helper = require('@sendgrid/mail');
const env = require('../../env');
const resetPassword = require('./templates/resetPassword');
const welcome = require('./templates/welcome');

helper.setApiKey(env.SENDGRID_KEY);

const sendEmail = async ({
  recipientEmails,
  subject,
  body,
  template,
}) => {
  const msg = {
    from: env.SENDGRID_SENDER, // Change to your verified sender
    subject,
    body,
    html: template,
    personalizations: recipientEmails.map(
      (email) => ({
        to: [{ email }],
      })
    ),
  };
  try {
    await helper.send(msg);
    console.log('--- EMAIL SENT');
  } catch (error) {
    console.log('--- CANNOT SEND EMAIL', error);
    throw error;
  }
};

const sendWelcome = ({
  email,
  displayName,
  roomName,
}) => {
  sendEmail({
    recipientEmails: [email],
    subject:
      'Welcome to meeDoctor - the family of prationers!',
    template: welcome({
      displayName,
      roomName,
    }),
  });
};

const sendResetPasswordToken = async ({
  email,
  displayName,
  resetPasswordToken,
}) =>
  await sendEmail({
    recipientEmails: [email],
    subject:
      'Your password reset token (valid for only 10 minutes)',
    template: resetPassword({
      displayName,
      resetPasswordToken,
    }),
  });

module.exports = {
  sendEmail,
  sendWelcome,
  sendResetPasswordToken,
};
