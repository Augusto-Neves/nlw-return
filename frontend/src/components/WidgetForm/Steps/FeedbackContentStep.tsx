import { ArrowLeft } from 'phosphor-react';
import { FormEvent, useState } from 'react';
import { FeedbackType, feedbackTypes } from '..';
import { CloseButton } from '../../CloseButton';
import { ScreenshotButton } from '../ScreenshotButton';

interface FeedbackContentStepProps {
  feedBackType: FeedbackType;
  onFeedBackRestartRequested: () => void;
  onFeedbackSent: () => void;
}

export const FeedbackContentStep = ({ feedBackType, onFeedBackRestartRequested, onFeedbackSent }: FeedbackContentStepProps) => {
  const feedbackTypeInfo = feedbackTypes[feedBackType];
  const [screenshot, setScreenshot] = useState<string | null>(null);
  const [feedbackComment, setFeedbackComment] = useState<string>('');

  const handleSubmitFeedback = (e: FormEvent) => {
    e.preventDefault();
    console.log({ screenshot, feedbackComment });
    onFeedbackSent();
  };

  return (
    <>
      <header>
        <button type='button' className='top-5 left-5 absolute text-zinc-400 hover:text-zinc-100' onClick={onFeedBackRestartRequested}>
          <ArrowLeft weight='bold' className='w-4 h-4' />
        </button>
        <span className='flex items-center gap-2 text-xl leading-6'>
          <img src={feedbackTypeInfo.image.src} alt={feedbackTypeInfo.image.alt} className='w-6 h-6' />
          {feedbackTypeInfo.title}
        </span>

        <CloseButton />
      </header>

      <form onSubmit={handleSubmitFeedback} className='my-4 w-full'>
        <textarea
          className='min-w-[304px] w-full min-h-[112px] text-sm placeholder-zinc-400 text-zinc-100  border-zinc-600 bg-transparent rounded-md focus:border-brand-500 focus:ring-brand-500 focus:ring-1 focus:outline-none resize-none form-textarea scrollbar scrollbar-thumb-zinc-700 scrollbar-track-transparent scrollbar-thin'
          placeholder='Conte-nos com detalhes o que está acontecendo...'
          value={feedbackComment}
          onChange={e => setFeedbackComment(e.target.value)}
        />

        <footer className='flex mt-2 gap-3'>
          <ScreenshotButton onScreenshotTook={setScreenshot} screenShot={screenshot} />

          <button
            type='submit'
            disabled={feedbackComment.length === 0}
            className='p-2 bg-brand-500 rounded-[4px] border-transparent flex flex-1 justify-center items-center hover:bg-brand-300 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-zinc-900 focus:ring-brand-500 transition-colors disabled:opacity-50 disabled:hover:bg-brand-500'>
            Enviar Feedback
          </button>
        </footer>
      </form>
    </>
  );
};
