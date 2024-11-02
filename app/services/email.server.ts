// app/services/email.server.ts
import nodemailer from "nodemailer";
import { QuoteCreateInputWithHorses } from "~/models/quote.server";
import { WaiverCreateInput } from "~/models/waiver.server";

export async function sendPasswordSetupEmail(email: string, token: string) {
  try {
    const transporter = nodemailer.createTransport({
      host: "smtp.mailgun.org",
      port: 587,
      secure: false,
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

// Function to send a notification email for a quote request
export async function sendQuoteNotificationEmail(data: QuoteCreateInputWithHorses) {
  try {
    const transporter = nodemailer.createTransport({
      host: "smtp.mailgun.org",
      port: 587,
      secure: false,
      auth: {
        user: process.env.EMAIL_USERNAME,
        pass: process.env.EMAIL_PASSWORD,
      },
    });

    const subject = "New Quote Request Submitted";
    const htmlContent = `
      <p>A new quote request has been submitted.</p>
      <p>Details:</p>
      <ul>
        <li>Name: ${data.firstName} ${data.lastName}</li>
        <li>Phone: ${data.phoneNumber}</li>
        <li>Pick-up Location: ${data.pickUpLocation}</li>
        <li>Drop-off Location: ${data.dropOffLocation}</li>
        <li>Comments: ${data.comments}</li>
      </ul>
    `;

    await transporter.sendMail({
      from: process.env.EMAIL_FROM,
      to: process.env.NOTIFICATION_EMAIL,
      subject,
      html: htmlContent
    });

    console.log("Quote notification email sent successfully");
  } catch (err) {
    console.error("Failed to send quote notification email successfully", err);
  }
}

// Function to send a notification email for a trip request
export async function sendTripNotificationEmail(data: WaiverCreateInput) {
  try {
    const transporter = nodemailer.createTransport({
      host: "smtp.mailgun.org",
      port: 587,
      secure: false,
      auth: {
        user: process.env.EMAIL_USERNAME,
        pass: process.env.EMAIL_PASSWORD,
      },
    });

    const subject = "New Trip Request Submitted";
    const htmlContent = `
      <p>A new trip request has been submitted.</p>
      <p>Details:</p>
      <ul>
        <li>Name: ${data.firstName} ${data.lastName}</li>
        <li>Phone: ${data.phone}</li>
        <li>Pick-up Address: ${data.pickUpAddress}</li>
        <li>Drop-off Address: ${data.dropOffAddress}</li>
        <li>Comments: ${data.comments}</li>
      </ul>
    `;

    await transporter.sendMail({
      from: process.env.EMAIL_FROM,
      to: process.env.NOTIFICATION_EMAIL,
      subject,
      html: htmlContent,
    });

    console.log("Trip notification email sent successfully");
  } catch (err) {
    console.error("Failed to send trip notification email", err);
  }
}