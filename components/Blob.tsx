import Image from 'next/image';

interface Props {
  direction: 'right' | 'left';
  isQuiz?: boolean;
}

const Blob = ({ direction, isQuiz }: Props) => {
  return (
    <div className={`blob__${direction}`}>
      <Image
        src={`/assets/blob-${direction}.svg`}
        alt=""
        className={`blob ${isQuiz && 'blob__quiz'}`}
        width={isQuiz ? 130 : 210}
        height={isQuiz ? 130 : 210}
        priority={true}
      />
    </div>
  );
};

export default Blob;
