'use client';

import { ChangeEvent, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';

import { useSelector, useDispatch } from 'react-redux';
import { RootState, AppDispatch } from './redux/store';
import {
  fetchCategories,
  selectCategory
} from './redux/Features/category/categorySlice';

const Home = () => {
  const dispatch = useDispatch<AppDispatch>();
  const { categories, selectedCategory } = useSelector(
    (store: RootState) => store.category
  );

  const handleSelect = (e: ChangeEvent<HTMLSelectElement>) =>
    dispatch(selectCategory(parseInt(e.target.value)));

  useEffect(() => {
    dispatch(fetchCategories());
  }, []);

  const categoriesEl = categories.map(({ id, name }, index) => (
    <option key={index} value={id}>
      {name}
    </option>
  ));

  return (
    <div className="welcome--wrapper">
      <div className="blob--left">
        <Image
          src="/assets/blob-left.svg"
          alt=""
          className="blob"
          width={210}
          height={210}
          priority
        />
      </div>
      <div className="blob--right">
        <Image
          src="/assets/blob-right.svg"
          alt=""
          className="blob"
          width={210}
          height={210}
        />
      </div>

      <h1 className="welcome--heading">Quizzical</h1>
      <p className="welcome--description">Test your knowledge!</p>

      <select
        className="welcome--category"
        value={selectedCategory}
        onChange={e => handleSelect(e)}
      >
        {categoriesEl}
      </select>

      <Link href="/quiz" className="btn">
        Start quiz
      </Link>
    </div>
  );
};

export default Home;
