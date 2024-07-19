import { ContentClient, ContentClientConfigV2 } from 'dc-delivery-sdk-js';

import Container from '@components/module/container';
import ContentPage from '@components/module/contentPage';
import Image from '@components/module/image';
import Slot from '@components/module/slot';
import { HeroBanner, TwoColumnImageCopy } from '@components/rendering';
import { ArticleCard, DisplayCard, StoryCard } from '@components/module';

export const defaultClientConfig: ContentClientConfigV2 = {
  hubName: process.env.DYNAMIC_CONTENT_HUB_NAME || 'platinumpanda',
  secureMediaHost: process.env.DYNAMIC_CONTENT_SECURE_MEDIA_HOST || '',
};

const schemaUrl = 'https://seddiqi.amplience.com';
const contentUrl = schemaUrl + '/content';
const slotsUrl = schemaUrl + '/slots';
const pageUrl = schemaUrl + '/page';
const moduleUrl = schemaUrl + '/module';
const componentUrl = schemaUrl + '/component';


export const ComponentMapping: any = {
  [`${pageUrl}/landing`]: ContentPage,
  [`${contentUrl}/container`]: Container,
  [`${contentUrl}/image`]: Image,
  [`${contentUrl}/content`]: ContentPage,
  [`${contentUrl}/hero_banner`]: HeroBanner,
  [`${contentUrl}/banner`]: HeroBanner,
  [`${slotsUrl}/container`]: Slot,
  [`${moduleUrl}/article-card`]: ArticleCard,
  [`${moduleUrl}/display-card`]: DisplayCard,
  [`${moduleUrl}/story-card`]: StoryCard,
  [`${componentUrl}/two-column-image-copy`]: TwoColumnImageCopy,
};


const defaultConfig = {
  url: schemaUrl,
  cms: {
      hubName: 'platinumpanda',
      imageHub: 'willow',
  },
};

let configObj: any | undefined = undefined;

export function getConfig(): any {
    if (!configObj) {
        configObj = defaultClientConfig
    }

    return configObj as any;
}


export function getHubName() {
    return getConfig()?.cms?.hubName ?? 'unknown';
}
