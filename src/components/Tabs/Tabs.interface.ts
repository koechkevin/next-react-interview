import React, { ReactNode } from 'react';

export interface TabPanelProps {
  children?: React.ReactNode;
  index: any;
  value: any;
}

export interface Item {
  label: string;
  component: ReactNode;
}
export interface Props {
   tabs: Item[];
   onTabChange?: (activeTab: number) => void;
}
