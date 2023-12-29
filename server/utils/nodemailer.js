const nodeMailer = require("nodemailer");

const transporter = nodeMailer.createTransport({
  service: "gmail",
  auth: {
    user: "hiroandika@gmail.com",
    pass: "yjka rmxv flmu ttap",
  },
});

const sendForgotPasswordEmail = (to, resetToken) => {
  const mailOptions = {
    from: "hiroandika@gmail.com",
    to,
    subject: "Reset Password",
    html: `
      <!DOCTYPE html>
      <html>
        <head>
          <title>Reset Password</title>
        </head>
        <body>
          <div>
            <h1>Hi,</h1>
            <p>You have requested your account password to be reset. Please click the following link to change your password:</p>
            <a style="background-color: #4e5b3e; color: #ffffff; padding: 10px 20px; text-decoration: none; cursor: pointer; font-weight: 600" href="http://localhost:3000/reset-password/${resetToken}">Change My Password</a>
            <p>If you did not request this, please ignore this email!</p>
          </div>
        </body>
      </html>
    `,
  };

  transporter.sendMail(mailOptions, (err, info) => {
    if (err) {
      console.error(err);
    } else {
      console.log(`Email sent: ${info.response}`);
    }
  });
};

module.exports = sendForgotPasswordEmail;
