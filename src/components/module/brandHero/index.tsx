 
import React from 'react';
import { CmsContent } from '@utils/cms/utils';
import Image from 'next/image';

interface BrandHeroProps {
  content: CmsContent;
}

const BrandHero: React.FC<BrandHeroProps> = ({ ...content }) => {
  console.log("content-------------brandhero----==========-", content);
  return (
    <div className="brand-hero">
      {/* <h1>{content.title}</h1>
      <p>{content.description}</p>
      <Image src={content.imageUrl} alt={content.title} width={600} height={400} /> */}
      <h1>Test</h1>
      =========0-=-=-=-======-==-=-=-=
    </div>
  );
};

export default BrandHero;
