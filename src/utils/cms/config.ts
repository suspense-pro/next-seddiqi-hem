import { ContentClient, ContentClientConfigV2 } from 'dc-delivery-sdk-js';

import Container from '@components/module/container';
import ContentPage from '@components/module/contentPage';
import Image from '@components/module/image';
import Slot from '@components/module/slot';
import { HeroBanner } from '@components/rendering';

export const defaultClientConfig: ContentClientConfigV2 = {
  hubName: process.env.DYNAMIC_CONTENT_HUB_NAME || '',
  secureMediaHost: process.env.DYNAMIC_CONTENT_SECURE_MEDIA_HOST || ''
};

const schemaUrl = 'https://seddiqi.amplience.com';
const contentUrl = schemaUrl + '/content';
const slotsUrl = schemaUrl + '/slots';
const pageUrl = schemaUrl + '/page';


export const ComponentMapping: any = {
  [`${pageUrl}/landing`]: ContentPage,
  [`${contentUrl}/container`]: Container,
  [`${contentUrl}/image`]: Image,
  [`${contentUrl}/content`]: ContentPage,
  [`${contentUrl}/hero_banner`]: HeroBanner,
  [`${contentUrl}/banner`]: HeroBanner,
  [`${slotsUrl}/container`]: Slot,
};