// app/services/email.server.ts
import nodemailer from "nodemailer";

export async function sendPasswordSetupEmail(email: string, token: string) {
  try {
    const transporter = nodemailer.createTransport({
      host: "smtp.mailgun.org",
      port: 587,
      auth: {
        user: process.env.EMAIL_USERNAME,
        pass: process.env.EMAIL_PASSWORD,
      },
    });

    const resetLink = `${process.env.APP_URL}/setup-password?token=${token}`;

    console.log(`Sending email to ${email} with reset link: ${resetLink}`);

    await transporter.sendMail({
      from: process.env.EMAIL_FROM,
      to: email,
      subject: "Set Up Your Password",
      html: `<p>Please click the following link to set up your password: <a href="${resetLink}">${resetLink}</a></p>`,
    });

    console.log("Email sent successfully");
  } catch (error) {
    console.error("Failed to send email", error);
  }
}