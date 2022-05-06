import { useState } from 'react';
import bugImageUrl from '../../assets/bug.svg';
import ideaImageUrl from '../../assets/idea.svg';
import thoughtImageUrl from '../../assets/thought.svg';
import { FeedbackTypeStep } from './Steps/FeedbackTypeStep';
import { FeedbackContentStep } from './Steps/FeedbackContentStep';
import { FeedbackSuccessStep } from './Steps/FeedbackSuccessStep';

export const feedbackTypes = {
  BUG: {
    title: 'Problema',
    image: {
      src: bugImageUrl,
      alt: 'Imagem de um inseto'
    }
  },
  IDEA: {
    title: 'Ideia',
    image: {
      src: ideaImageUrl,
      alt: 'Imagem de uma lâmpada'
    }
  },
  OTHER: {
    title: 'Outro',
    image: {
      src: thoughtImageUrl,
      alt: 'Imagem de uma nuvem de pensamento'
    }
  }
};

export type FeedbackType = keyof typeof feedbackTypes;

export const WidgetForm: React.FC = () => {
  const [feedbackType, setFeedbackType] = useState<FeedbackType | null>(null);
  const [feedbackSent, setFeedbackSent] = useState(false);

  const handleRestartFeedback = () => {
    setFeedbackSent(false);
    setFeedbackType(null);
  };

  const handleFeedbackTypeChanged = () => {
    if (!feedbackType) {
      return <FeedbackTypeStep onFeedbackTypeChanged={setFeedbackType} />;
    } else {
      return (
        <FeedbackContentStep
          feedBackType={feedbackType}
          onFeedBackRestartRequested={handleRestartFeedback}
          onFeedbackSent={() => setFeedbackSent(true)}
        />
      );
    }
  };

  return (
    <div className='bg-zinc-900 p-4 relative rounded-2xl mb-4 flex flex-col items-center shadow-lg w-[calc(100vw-2rem)] md:w-auto'>
      {feedbackSent ? <FeedbackSuccessStep onFeedbackRestartRequest={handleRestartFeedback} /> : <>{handleFeedbackTypeChanged()}</>}

      <footer className='text-xs text-neutral-400'>
        Feito com ❤️ durante a NLW por{' '}
        <a className='underline underline-offset-2' href='https://github.com/Augusto-Neves' target='_blank'>
          Augusto Neves
        </a>
      </footer>
    </div>
  );
};
