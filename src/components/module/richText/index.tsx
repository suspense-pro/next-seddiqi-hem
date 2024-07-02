import React from 'react';
import ReactMarkdown from 'markdown-to-jsx';
import { getImageURL } from '@utils/cms/helpers/getImageUrl';
import Typography from '../typography';
import Link from 'next/link';
import { CmsContent } from '@utils/cms/utils';
import ContentBlock from '../contentBlock';


type TextProps = {} & CmsContent;

const RichText = ({ text = [], align = 'left' }: TextProps) => {
    const options = {
        overrides: {
            h1: { component: Typography, props: { variant: 'h1' } },
            h2: { component: Typography, props: { variant: 'h2' } },
            h3: { component: Typography, props: { variant: 'h3' } },
            h4: { component: Typography, props: { variant: 'h4' } },
            h5: { component: Typography, props: { variant: 'h5' } },
            h6: { component: Typography, props: { variant: 'h6' } },
            p: { component: Typography, props: { variant: 'p', gutterBottom: true } },
            a: { component: Link },
            li: {
                component: ({ ...props }) => (
                    <li>
                        <Typography align={'left'} variant="p" component="span" {...props} />
                    </li>
                ),
            },
        },
    };

    return (
        <>
            {text.map((item: any, index: number) => {
                const { type, data } = item;

                switch (type) {
                    case 'markdown':
                        return (
                            <div key={index} className="amp-dc-text" style={{ textAlign: align, padding: '10px 0' }}>
                                {data && <ReactMarkdown options={options}>{data}</ReactMarkdown>}
                            </div>
                        );
                    case 'dc-content-link':
                        return data && <ContentBlock key={index} content={data} />;
                    case 'dc-image-link':
                        return (
                            data && (
                                <picture key={data.name} className="amp-dc-image">
                                    <img
                                        src={getImageURL(data, { strip: true })}
                                        className="amp-dc-image-pic"
                                        width="100%"
                                        alt={data.name}
                                    />
                                </picture>
                            )
                        );
                    default:
                        return null;
                }
            })}
        </>
    );
};

export default RichText;
