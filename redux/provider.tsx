'use client';

import { ChildrenProps } from '@/types';
import { Provider } from 'react-redux';
import { store } from './store';

export const Providers = ({ children }: ChildrenProps) => {
  return <Provider store={store}>{children}</Provider>;
};
