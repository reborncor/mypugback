import nodemailer from "nodemailer";
import { env } from "../../util/config";

// Fonction d'envoi d'e-mails
export async function sendEmail(
  to: string,
  subject: string,
  html: string
): Promise<void> {
  try {
    console.log("EMAIL :" + env.GMAIL_USER, env.GMAIL_PASS);
    let transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: env.GMAIL_USER,
        pass: env.GMAIL_PASS,
      },
    });

    // Options de l'e-mail
    let mailOptions = {
      from: env.GMAIL_USER,
      to: to,
      subject: subject,
      html: html,
    };

    // Envoi de l'e-mail
    await transporter.sendMail(mailOptions);
    console.log("E-mail envoyé avec succès");
  } catch (error) {
    console.error("Erreur lors de l'envoi de l'e-mail :", error);
    throw new Error("E-mail non envoyé");
  }
}
