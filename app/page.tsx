import Blob from '@/components/Blob';
import HomeButton from '@/components/HomeButton';
import SelectCategory from '@/components/SelectCategory';
import { getCategories } from '@/lib/queries';

const Home = async () => {
  const categories = await getCategories();

  return (
    <main className="home container">
      <Blob side="left" />
      <Blob side="right" />

      <h1 className="home__heading">Quizzical</h1>
      <p className="home__info">Test your knowledge!</p>

      <SelectCategory categories={categories} />

      <HomeButton />
    </main>
  );
};

export default Home;
