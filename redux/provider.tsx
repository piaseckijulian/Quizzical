'use client';

import { childrenInterface } from '@/types';
import { Provider } from 'react-redux';
import { store } from './store';

export const Providers = ({ children }: childrenInterface) => {
  return <Provider store={store}>{children}</Provider>;
};
