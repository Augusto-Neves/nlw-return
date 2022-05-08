import { EmailAdapter, SendEmailData } from "../email-adapter";
import nodemailer from "nodemailer";

const transport = nodemailer.createTransport({
  host: "smtp.mailtrap.io",
  port: 2525,
  auth: {
    user: "c953704ef7dc48",
    pass: "074fa9980f8f11",
  },
});

export class NodeMailAdapter implements EmailAdapter {
  async sendEmail({ body, subject }: SendEmailData) {
    await transport.sendMail({
      from: "Equipe Widget <oi@widget.com>",
      to: "Augusto Neves<augusto.agt1995@gmail.com>",
      subject,
      html: body,
    });
  }
}
