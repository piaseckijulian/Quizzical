import blobLeft from '@/app/assets/blob-left.svg';
import blobRight from '@/app/assets/blob-right.svg';
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
        className={`blob ${quiz ? 'blob__quiz' : ''}`}
      />
    </div>
  );
};

export default Blob;
