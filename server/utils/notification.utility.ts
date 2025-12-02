import nodemailer from "nodemailer";

interface EmailOptions {
  purpose: string;
  email: string;
  data?: any; // optional extra data (OTP, name, links, etc.)
}

export async function sendMail({ purpose, email, data }: EmailOptions) {
  // Configure transporter
  const transporter = nodemailer.createTransport({
    host: process.env.MAIL_HOST,
    port: Number(process.env.MAIL_PORT),
    secure: false,
    auth: {
      user: process.env.MAIL_USER,
      pass: process.env.MAIL_PASS,
    },
  });

  // Message templates based on purpose
  const templates: Record<string, { subject: string; html: string }> = {
    welcome: {
      subject: "Welcome to our service!",
      html: `<h2>Welcome!</h2><p>Thanks for joining us.</p>`,
    },
    otp: {
      subject: "Your OTP Code",
      html: `<p>Your OTP is: <strong>${data?.otp}</strong></p>`,
    },
    reset_password: {
      subject: "Reset your password",
      html: `<p>Click here to reset password: <a href="${data?.link}">Reset</a></p>`,
    },
  };

  // Fallback if purpose not found
  const template = templates[purpose] || {
    subject: "Notification",
    html: `<p>${purpose}</p>`,
  };

  const mailOptions = {
    from: process.env.MAIL_USER,
    to: email,
    subject: template.subject,
    html: template.html,
  };

  // Send email
  const info = await transporter.sendMail(mailOptions);
  return info;
}
