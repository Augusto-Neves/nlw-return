import { EmailAdapter } from "../adapters/email-adapter";
import { FeedbacksRepository } from "../repositories/feedbacks-repositories";
interface SubmitFeedbackUseCaseRequest {
  type: string;
  comment: string;
  screenshot?: string;
}

export class SubmitFeedbackUseCase {
  constructor(
    private feedbackRepository: FeedbacksRepository,
    private emailAdapter: EmailAdapter
  ) {}

  async execute(request: SubmitFeedbackUseCaseRequest) {
    const { comment, type, screenshot } = request;

    if (!type) {
      throw new Error("Type is required");
    }

    if (!comment) {
      throw new Error("Comment is required");
    }
    
    if (screenshot && !screenshot.startsWith("data:image/png;base64,")) {
      throw new Error("Invalid screenshot format");
    }

    await this.feedbackRepository.create({
      type,
      comment,
      screenshot,
    });

    await this.emailAdapter.sendEmail({
      subject: "Novo feedback",
      body: [
        `<div style="font-family: sans-serif; font-size: 16px; color: #111";>`,
        `<p>Novo feedback de ${type}</p>`,
        `<p>Detalhes do que está acontecendo: ${comment}</p>`,
        `</div>`,
      ].join("\n"),
    });
  }
}
