import { Blob, Button, SelectCategory } from '@/components';

const Home = () => {
  return (
    <div className="welcome container">
      <Blob direction="left" />
      <Blob direction="right" />

      <h1 className="welcome__heading">Quizzical</h1>
      <p className="welcome__desc">Test your knowledge!</p>

      <SelectCategory />

      <Button type="start" />
    </div>
  );
};

export default Home;
