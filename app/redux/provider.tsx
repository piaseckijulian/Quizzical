'use client';

import { Provider } from 'react-redux';
import { store } from './store';

import { childrenInterface } from '../../types';

export const Providers = ({ children }: childrenInterface) => {
  return <Provider store={store}>{children}</Provider>;
};
