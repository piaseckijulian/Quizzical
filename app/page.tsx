'use client';

import { ChangeEvent, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';

import { useSelector, useDispatch } from 'react-redux';
import { RootState, AppDispatch } from '@/redux/store';
import { fetchCategories, selectCategory } from '@/redux/Features/category/categorySlice';

const Home = () => {
  const dispatch = useDispatch<AppDispatch>();
  const { categories, selectedCategory } = useSelector(
    (store: RootState) => store.category
  );

  const handleSelect = (e: ChangeEvent<HTMLSelectElement>) =>
    dispatch(selectCategory(parseInt(e.target.value)));

  const onSwitchToQuiz = () => {
    if (selectedCategory === -1) {
      dispatch(selectCategory(0));
    }
  };

  useEffect(() => {
    dispatch(fetchCategories());
  }, []);

  const categoriesEl = categories.map(({ id, name }) => (
    <option key={id} value={id}>
      {name}
    </option>
  ));

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

      <select
        className="welcome__category"
        value={selectedCategory}
        onChange={e => handleSelect(e)}
      >
        {categoriesEl}
      </select>

      <Link href="/quiz" className="btn" onClick={onSwitchToQuiz}>
        Start quiz
      </Link>
    </div>
  );
};

export default Home;
