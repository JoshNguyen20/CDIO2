const resetPasswordTemplate = (name, resetLink) => `
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Reset Your Password</title>
  <style>
    body {
      font-family: Arial, sans-serif;
      background-color: #f4f4f4;
      color: #333;
      margin: 0;
      padding: 0;
    }
    .container {
      max-width: 600px;
      margin: 20px auto;
      background: #fff;
      border-radius: 8px;
      box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
      overflow: hidden;
    }
    .header {
      background: #007bff;
      color: #fff;
      padding: 20px;
      text-align: center;
    }
    .content {
      padding: 20px;
    }
    .button {
      display: block;
      margin: 20px auto;
      padding: 10px 20px;
      background: #007bff;
      color: #fff;
      text-decoration: none;
      border-radius: 5px;
      text-align: center;
      font-weight: bold;
    }
    .footer {
      text-align: center;
      padding: 10px;
      font-size: 12px;
      color: #777;
    }
  </style>
</head>
<body>
  <div class="container">
    <div class="header">
      <h1>Reset Your Password</h1>
    </div>
    <div class="content">
      <p>Hi <strong>${name}</strong>,</p>
      <p>You requested a password reset for your account. Click the button below to reset your password:</p>
      <a href="${resetLink}" class="button">Reset Password</a>
      <p>If you did not request this, you can safely ignore this email.</p>
      <p>Thank you,</p>
      <p>The Smart Yoga Team</p>
    </div>
    <div class="footer">
      <p>&copy; ${new Date().getFullYear()} Smart Yoga. All rights reserved.</p>
    </div>
  </div>
</body>
</html>
`;

module.exports = resetPasswordTemplate;
