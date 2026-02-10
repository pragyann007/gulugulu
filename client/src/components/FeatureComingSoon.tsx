'use client';

import { ReactNode } from 'react';

interface FeatureComingSoonProps {
  children: ReactNode;
  feature: string;
}

export default function FeatureComingSoon({ children, feature }: FeatureComingSoonProps) {
  const handleClick = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    alert(`${feature} - Feature not available yet! 🚧`);
  };

  return <div onClick={handleClick}>{children}</div>;
}