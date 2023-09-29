'use client';

import { fetchCategories, selectCategory } from '@/redux/Features/category/categorySlice';
import { AppDispatch, RootState } from '@/redux/store';
import { ChangeEvent, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';

const SelectCategory = () => {
  const dispatch = useDispatch<AppDispatch>();
  const { categories, selectedCategory } = useSelector(
    (store: RootState) => store.category
  );

  useEffect(() => {
    dispatch(fetchCategories());
  }, []);

  const handleSelect = (e: ChangeEvent<HTMLSelectElement>) =>
    dispatch(selectCategory(parseInt(e.target.value)));

  const categoriesEl = categories.map(({ id, name }) => (
    <option key={id} value={id}>
      {name}
    </option>
  ));

  return (
    <select
      className="welcome__category"
      value={selectedCategory}
      onChange={e => handleSelect(e)}
      aria-label="Select category"
    >
      {categoriesEl}
    </select>
  );
};

export default SelectCategory;
