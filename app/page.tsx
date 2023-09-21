import Image from 'next/image';
import SelectCategory from '@/components/SelectCategory';
import Button from '@/components/Button';

const Home = () => {
  return (
    <div className="welcome container">
      <div className="blob__left">
        <Image
          src="/assets/blob-left.svg"
          alt=""
          className="blob"
          width={210}
          height={210}
        />
      </div>

      <div className="blob__right">
        <Image
          src="/assets/blob-right.svg"
          alt=""
          className="blob"
          width={210}
          height={210}
        />
      </div>

      <h1 className="welcome__heading">Quizzical</h1>
      <p className="welcome__desc">Test your knowledge!</p>

      <SelectCategory />

      <Button type="start" />
    </div>
  );
};

export default Home;
