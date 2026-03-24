import { NextRequest, NextResponse } from "next/server";
import nodemailer from "nodemailer";

export async function POST(request: NextRequest) {
  let body;
  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ error: "Corps de requête invalide" }, { status: 400 });
  }

  const { jobUid, jobTitle, message } = body as {
    jobUid?: string;
    jobTitle?: string;
    message?: string;
  };

  if (!jobUid || !jobTitle || !message?.trim()) {
    return NextResponse.json({ error: "Données manquantes" }, { status: 400 });
  }

  const transporter = nodemailer.createTransport({
    host: process.env.SMTP_HOST ?? "smtp.ethereal.email",
    port: parseInt(process.env.SMTP_PORT ?? "587"),
    auth: {
      user: process.env.SMTP_USER ?? "",
      pass: process.env.SMTP_PASS ?? "",
    },
  });

  const mailOptions = {
    from: process.env.MAIL_FROM ?? '"DEV Jobs" <noreply@dev-jobs.fr>',
    to: process.env.MAIL_TO ?? "recruteur@dev-jobs.fr",
    subject: `Candidature : ${jobTitle}`,
    text: message,
    html: `
      <h2>Candidature pour : ${jobTitle}</h2>
      <p><strong>Référence offre :</strong> ${jobUid}</p>
      <hr />
      <p>${message.replace(/\n/g, "<br/>")}</p>
    `,
  };

  // Log (envoi réel si SMTP_HOST et SMTP_USER sont configurés dans .env)
  console.log("[Candidature] Mail à envoyer :", {
    from: mailOptions.from,
    to: mailOptions.to,
    subject: mailOptions.subject,
    body: message,
  });

  if (process.env.SMTP_HOST && process.env.SMTP_USER) {
    await transporter.sendMail(mailOptions);
  }

  return NextResponse.json({ success: true });
}
