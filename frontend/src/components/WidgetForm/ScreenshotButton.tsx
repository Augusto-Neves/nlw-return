import { useState } from 'react';
import { Camera, Trash } from 'phosphor-react';
import html2canvas from 'html2canvas';
import { Loading } from '../Loading';

interface ScreenshotButtonProps {
  onScreenshotTook: (screenshot: string | null) => void;
  screenShot: string | null;
}

export const ScreenshotButton = ({ onScreenshotTook, screenShot }: ScreenshotButtonProps) => {
  const styles = {
    buttonBackground: {
      backgroundImage: `url(${screenShot})`
    }
  };

  const [isScreenshotReady, setIsScreenshotReady] = useState(false);

  const handleTakeScreenshot = async () => {
    setIsScreenshotReady(!isScreenshotReady);

    const canvas = await html2canvas(document.querySelector('html')!);
    const base64image = canvas.toDataURL('image/png');
    onScreenshotTook(base64image);

    setTimeout(() => {
      setIsScreenshotReady(false);
    }, 500);
  };

  if (screenShot) {
    return (
      <button
        type='button'
        className='p-1 w-10 h-10 rounded-[4px] border-transparent flex justify-end items-end text-zinc-400 hover:text-zinc-100 transition-colors'
        style={styles.buttonBackground}
        onClick={() => onScreenshotTook(null)}>
        <Trash weight='fill' />
      </button>
    );
  }
  return (
    <button
      type='button'
      className='p-2 rounded-[4px] bg-zinc-800 text-white border-transparent hover:bg-zinc-700 transition-colors focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-zinc-900 focus:ring-brand-500'
      onClick={handleTakeScreenshot}>
      {isScreenshotReady ? <Loading /> : <Camera className=' w-6 h-6' />}
    </button>
  );
};
