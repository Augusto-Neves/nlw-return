import express from "express";
import nodemailer from "nodemailer";
import { prisma } from "./prisma";

const app = express();
const port = process.env.PORT || 3333;

app.use(express.json());

const transport = nodemailer.createTransport({
  host: "smtp.mailtrap.io",
  port: 2525,
  auth: {
    user: "c953704ef7dc48",
    pass: "074fa9980f8f11",
  },
});

app.post("/feedbacks", async (req, res) => {
  const { type, comment, screenshot } = req.body;

  const feedback = await prisma.feedback.create({
    data: {
      type,
      comment,
      screenshot,
    },
  });

  await transport.sendMail({
    from: "Equipe Widget <oi@widget.com>",
    to: "Augusto Neves<augusto.agt1995@gmail.com>",
    subject: "Novo feedback",
    html: [
      `<div style="font-family: sans-serif; font-size: 16px; color: #111";>`,
      `<p>Novo feedback de ${type}</p>`,
      `<p>Detalhes do que está acontecendo: ${comment}</p>`,
      `</div>`,
    ].join("\n"),
  });

  res.status(201).json({ data: feedback });
});

app.listen(port, () => {
  console.log(`🚀Server running on port ${port}🚀`);
  console.log("Press CTRL+C to stop");
});
