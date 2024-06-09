import blobLeft from '@/app/assets/blob-left.svg';
import blobRight from '@/app/assets/blob-right.svg';
import { cn } from '@/lib/utils';
import Image from 'next/image';

interface Props {
  side: 'right' | 'left';
  quiz?: boolean;
}

const Blob = ({ side, quiz }: Props) => {
  return (
    <div className={`blob__${side}`}>
      <Image
        src={side === 'left' ? blobLeft : blobRight}
        alt=""
        width={quiz ? 130 : 210}
        height={quiz ? 130 : 210}
        className={cn('blob', quiz && 'blob_quiz')}
      />
    </div>
  );
};

export default Blob;
