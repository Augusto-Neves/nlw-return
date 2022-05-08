import { SubmitFeedbackUseCase } from "./submit-feedback";

const createFeedbackSpy = jest.fn();
const sendEmailSpy = jest.fn();

const submitFeedback = new SubmitFeedbackUseCase(
  { create: createFeedbackSpy },
  { sendEmail: sendEmailSpy }
);

describe("Submit feedback", () => {
  it("should be able to submit feedback", async () => {
    await expect(
      submitFeedback.execute({
        type: "BUG",
        comment: "This is a bug",
        screenshot: "data:image/png;base64,dadarknqou6161deasfqoiunljvb",
      })
    ).resolves.not.toThrow();

    expect(createFeedbackSpy).toHaveBeenCalled();
    expect(sendEmailSpy).toHaveBeenCalled();
  });

  it("should not be able to submit feedback without type", async () => {
    await expect(
      submitFeedback.execute({
        type: "",
        comment: "This is a bug",
        screenshot: "data:image/png;base64,dadarknqou6161deasfqoiunljvb",
      })
    ).rejects.toThrow();
  });

  it("should not be able to submit feedback without comment", async () => {
    await expect(
      submitFeedback.execute({
        type: "OTHER",
        comment: "",
        screenshot: "data:image/png;base64,dadarknqou6161deasfqoiunljvb",
      })
    ).rejects.toThrow();
  });

  it("should not be able to submit feedback with an invalid screenshot", async () => {
    await expect(
      submitFeedback.execute({
        type: "BUG",
        comment: "This is a bug",
        screenshot: "imagem.jpg",
      })
    ).rejects.toThrow();
  });
});
