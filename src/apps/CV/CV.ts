import App from '$components/App';
import Window from '$components/Window';
import appIcon from '$assets/images/app-icons/preview.png';
import type { AppProps } from '$apps/types';
import styles from './style.module.css';
import Element from '$lib/Element';
import Typography from '$uikit/Typography';
import json from './data.json';
import { getCssVariable } from '$utils/index';
import Icon from '$uikit/Icon';
import Scroll from '$uikit/Scroll';
import Link from '$uikit/Link';
import Button from '$uikit/Button';
import linkedinImage from '$assets/images/linkedin.png';
import githubImage from '$assets/images/github.png';
import Image from '$uikit/Image';

const CV_FILE = 'https://raw.githubusercontent.com/Gagik-arch/portfolio-storage/main/gagik-chilingaryan-cv.pdf';

const Row = (left:string, right?:string, isSubtitle = false) => {
    return (
        new Element<HTMLDivElement>({
            tagName: 'div',
            props: {
                className: styles.row,
                children: [
                    new Typography({
                        text: left,
                        variant: isSubtitle ? 'callout-emphasized' : 'callout-regular',
                    }).dom,

                    right
                        ? new Typography({
                            text: right,
                            className: isSubtitle ? styles.subtitle : undefined,
                            variant: isSubtitle ? 'callout-emphasized' : 'callout-regular',
                        }).dom
                        : undefined
                ],
            },
        }).dom
    );
};

function CV(props?: AppProps) { 
    return (
        new App({
            name: 'CV',
            appIcon,
            window: new Window({
                className: styles.root,
                children: [ 
                    new Scroll({
                        children: [
                            new Element<HTMLDivElement>({
                                tagName: 'div',
                                props: {
                                    className: styles.content,
                                    children: [
                                        new Element<HTMLDivElement>({
                                            tagName: 'div',
                                            props: {
                                                className: styles.header,
                                                children: [
                                                    new Link({
                                                        href: CV_FILE,
                                                        download: 'gagik-chilingaryan-cv',
                                                        children: [
                                                            new Button({
                                                                variant: 'primary',
                                                                children: [ 'Download' ],
                                                            }).dom
                                                        ],
                                                    }).dom
                                                ],
                                            },
                                        }).dom,
                                        new Typography({
                                            className: styles.text_center,
                                            text: json.basics.name,
                                            variant: 'title1-emphasized',
                                        }).dom,
                                        new Typography({
                                            className: styles.text_center,
                                            style: { margin: '8px 0' },
                                            text: json.basics.headline,
                                        }).dom,

                                        new Element<HTMLDivElement>({
                                            tagName: 'div',
                                            props: {
                                                className: styles.contacts,
                                                children: [
                                                    new Icon('Map', {
                                                        stroke: 'var(--accents-blue)',
                                                        size: 12,
                                                        className: styles.icon,
                                                    }).dom,

                                                    new Typography({
                                                        text: json.basics.location,
                                                    }).dom,

                                                    new Icon('Phone', {
                                                        stroke: 'var(--accents-blue)',
                                                        size: 12,
                                                        className: styles.icon,
                                                    }).dom,

                                                    new Typography({
                                                        text: json.basics.phone,
                                                    }).dom,
                                            
                                                    new Typography({
                                                        text: '@',
                                                        style: { color: 'var(--accents-blue)' },
                                                        variant: 'subheadline-emphasized',
                                                    }).dom,

                                                    new Typography({
                                                        text: json.basics.email,
                                                    }).dom
                                                ],
                                            },
                                        }).dom,

                                        new Element<HTMLHRElement>({
                                            tagName: 'hr',
                                            props: {
                                                className: styles.separator,
                                            },
                                        }).dom,

                                        new Element<HTMLDivElement>({
                                            tagName: 'div',
                                            props: {
                                                children: [
                                                    new Element<HTMLDivElement>({
                                                        tagName: 'div',
                                                        props: {
                                                            className: styles.segment,
                                                            children: [
                                                                new Element<HTMLDivElement>({
                                                                    tagName: 'div',
                                                                    props: {
                                                                        children: [
                                                                            new Typography({
                                                                                text: json.sections.summary.name,
                                                                                variant: 'callout-emphasized', 
                                                                            }).dom
                                                                        ],
                                                                    },
                                                                }).dom,
                                                                
                                                                new Element<HTMLDivElement>({
                                                                    tagName: 'div',
                                                                    props: {
                                                                        children: [
                                                                            new Typography({
                                                                                text: json.sections.summary.description,
                                                                                variant: 'callout-regular', 
                                                                            }).dom
                                                                        ],
                                                                    },
                                                                }).dom
                                                            ],
                                                        },
                                                    }).dom
                                                ],
                                            },
                                        }).dom,

                                        new Element<HTMLHRElement>({
                                            tagName: 'hr',
                                            props: {
                                                className: styles.separator,
                                            },
                                        }).dom,

                                        new Element<HTMLDivElement>({
                                            tagName: 'div',
                                            props: {
                                                children: [
                                                    new Element<HTMLDivElement>({
                                                        tagName: 'div',
                                                        props: {
                                                            className: styles.segment,
                                                            children: [
                                                                new Element<HTMLDivElement>({
                                                                    tagName: 'div',
                                                                    props: {
                                                                        children: [
                                                                            new Typography({
                                                                                text: json.sections.profiles.name,
                                                                                variant: 'callout-emphasized', 
                                                                            }).dom
                                                                        ],
                                                                    },
                                                                }).dom,
                                                                
                                                                new Element<HTMLDivElement>({
                                                                    tagName: 'div',
                                                                    props: {
                                                                        children: [
                                                                            new Element<HTMLDivElement>({
                                                                                tagName: 'div',
                                                                                props: {
                                                                                    style: {
                                                                                        marginBottom: '10px',
                                                                                    },
                                                                                    children: [
                                                                                        new Link({
                                                                                            className: styles.profile,
                                                                                            href: json.sections.profiles.items[0].url.href,
                                                                                            target: '_blank',
                                                                                            children: [
                                                                                                new Image({
                                                                                                    src: linkedinImage,
                                                                                                }).dom,
                                                                                                new Typography({
                                                                                                    text: json.sections.profiles.items[0].username,
                                                                                                    variant: 'callout-regular', 
                                                                                                }).dom
                                                                                            ],
                                                                                        }).dom
                                                                                    ],
                                                                                },
                                                                            }).dom,

                                                                            new Element<HTMLDivElement>({
                                                                                tagName: 'div',
                                                                                props: {
                                                                                    children: [
                                                                                        new Link({
                                                                                            className: styles.profile,
                                                                                            href: json.sections.profiles.items[1].url.href,
                                                                                            target: '_blank',
                                                                                            children: [
                                                                                                new Image({
                                                                                                    src: githubImage,
                                                                                                }).dom,
                                                                                                new Typography({
                                                                                                    text: json.sections.profiles.items[1].username,
                                                                                                    variant: 'callout-regular', 
                                                                                                }).dom
                                                                                            ],
                                                                                        }).dom
                                                                                    ],
                                                                                },
                                                                            }).dom
                                                                        ],
                                                                    },
                                                                }).dom
                                                            ],
                                                        },
                                                    }).dom
                                                ],
                                            },
                                        }).dom,

                                        new Element<HTMLHRElement>({
                                            tagName: 'hr',
                                            props: {
                                                className: styles.separator,
                                            },
                                        }).dom,

                                        new Element<HTMLDivElement>({
                                            tagName: 'div',
                                            props: {
                                                children: [
                                                    new Element<HTMLDivElement>({
                                                        tagName: 'div',
                                                        props: {
                                                            className: styles.segment,
                                                            children: [
                                                                new Element<HTMLDivElement>({
                                                                    tagName: 'div',
                                                                    props: {
                                                                        children: [
                                                                            new Typography({
                                                                                text: json.sections.experience.name,
                                                                                variant: 'callout-emphasized', 
                                                                            }).dom
                                                                        ],
                                                                    },
                                                                }).dom,
                                                                new Element<HTMLDivElement>({
                                                                    tagName: 'div',
                                                                    props: {
                                                                        children: json.sections.experience.items.map(item => {
                                                                            return (
                                                                                new Element<HTMLDivElement>({
                                                                                    tagName: 'div',
                                                                                    props: {
                                                                                        className: styles.block,
                                                                                        children: [
                                                                                            Row(item.company, item.date, true),
                                                                                                        
                                                                                            Row(item.position, item.location),

                                                                                            item.url.href && new Element<HTMLDivElement>({
                                                                                                tagName: 'div',
                                                                                                props: {
                                                                                                    className: styles.link,
                                                                                                    children: [
                                                                                                        new Icon('Link', {
                                                                                                            className: styles.link_icon,
                                                                                                            size: 12,
                                                                                                            color: 'var(--accents-blue)',
                                                                                                        }).dom,

                                                                                                        new Link({
                                                                                                            href: item.url.href,
                                                                                                            target: '_blank',
                                                                                                            children: [
                                                                                                                new Typography({
                                                                                                                    text: item.url.href,
                                                                                                                    variant: 'callout-regular', 
                                                                                                                }).dom
                                                                                                            ],
                                                                                                        }).dom
                                                                                                    ],
                                                                                                },
                                                                                            }).dom,

                                                                                            new Element<HTMLDivElement>({
                                                                                                tagName: 'div',
                                                                                                props: {
                                                                                                    innerHTML: item.summary,
                                                                                                },
                                                                                            }).dom
                                                                                        ],             
                                                                                    },
                                                                                }).dom
                                                                            );
                                                                        }),
                                                                    },
                                                                }).dom
                                                            ],
                                                        },
                                                    }).dom,

                                                    new Element<HTMLHRElement>({
                                                        tagName: 'hr',
                                                        props: {
                                                            className: styles.separator,
                                                        },
                                                    }).dom,

                                                    new Element<HTMLDivElement>({
                                                        tagName: 'div',
                                                        props: {
                                                            children: [
                                                                new Element<HTMLDivElement>({
                                                                    tagName: 'div',
                                                                    props: {
                                                                        className: styles.segment,
                                                                        children: [
                                                                            new Element<HTMLDivElement>({
                                                                                tagName: 'div',
                                                                                props: {
                                                                                    children: [
                                                                                        new Typography({
                                                                                            text: json.sections.education.name,
                                                                                            variant: 'callout-emphasized', 
                                                                                        }).dom
                                                                                    ],
                                                                                },
                                                                            }).dom,
                                                                
                                                                            new Element<HTMLDivElement>({
                                                                                tagName: 'div',
                                                                                props: {
                                                                                    children: [
                                                                                        new Element<HTMLDivElement>({
                                                                                            tagName: 'div',
                                                                                            props: {
                                                                                                className: styles.block,
                                                                                                children: [
                                                                                                    Row(
                                                                                                        json.sections.education.items[0].institution,
                                                                                                        json.sections.education.items[0].date,
                                                                                                        true
                                                                                                    ),
                                                                                                    
                                                                                                    Row(
                                                                                                        json.sections.education.items[0].area,
                                                                                                        json.sections.education.items[0].studyType
                                                                                                    ),

                                                                                                    new Element<HTMLDivElement>({
                                                                                                        tagName: 'div',
                                                                                                        props: {
                                                                                                            className: styles.link,
                                                                                                            children: [
                                                                                                                new Icon('Link', {
                                                                                                                    className: styles.link_icon,
                                                                                                                    size: 12,
                                                                                                                    color: 'var(--accents-blue)',
                                                                                                                }).dom,

                                                                                                                new Link({
                                                                                                                    href: json.sections.education.items[0].url.href,
                                                                                                                    target: '_blank',
                                                                                                                    children: [
                                                                                                                        new Typography({
                                                                                                                            text: json.sections.education.items[0].url.href,
                                                                                                                            variant: 'callout-regular', 
                                                                                                                        }).dom
                                                                                                                    ],
                                                                                                                }).dom
                                                                                                            ],
                                                                                                        },
                                                                                                    }).dom
                                                                                                ],             
                                                                                            },
                                                                                        }).dom
                                                                                    ],
                                                                                },
                                                                            }).dom
                                                                        ],
                                                                    },
                                                                }).dom
                                                            ],
                                                        },
                                                    }).dom,

                                                    new Element<HTMLHRElement>({
                                                        tagName: 'hr',
                                                        props: {
                                                            className: styles.separator,
                                                        },
                                                    }).dom,

                                                    new Element<HTMLDivElement>({
                                                        tagName: 'div',
                                                        props: {
                                                            children: [
                                                                new Element<HTMLDivElement>({
                                                                    tagName: 'div',
                                                                    props: {
                                                                        className: styles.segment,
                                                                        children: [
                                                                            new Element<HTMLDivElement>({
                                                                                tagName: 'div',
                                                                                props: {
                                                                                    children: [
                                                                                        new Typography({
                                                                                            text: json.sections.skills.name,
                                                                                            variant: 'callout-emphasized', 
                                                                                        }).dom
                                                                                    ],
                                                                                },
                                                                            }).dom,
                                                                
                                                                            new Element<HTMLDivElement>({
                                                                                tagName: 'div',
                                                                                props: {
                                                                                    className: styles.skill_container,
                                                                                    children: json.sections.skills.items.map(item => {
                                                                                        return (
                                                                                            new Element<HTMLDivElement>({
                                                                                                tagName: 'div',
                                                                                                props: {
                                                                                                    className: styles.skill_block,
                                                                                                    children: [
                                                                                                        new Typography({
                                                                                                            text: item.name,
                                                                                                            variant: 'callout-emphasized', 
                                                                                                        }).dom,

                                                                                                        new Element<HTMLDivElement>({
                                                                                                            tagName: 'div',
                                                                                                            props: {
                                                                                                                className: styles.circle_container,
                                                                                                                children: Array.from({ length: 5 })
                                                                                                                    .map((_, index) => { 
                                                                                                                        return (
                                                                                                                            new Element<HTMLSpanElement>({
                                                                                                                                tagName: 'span',
                                                                                                                                props: {
                                                                                                                                    style: {
                                                                                                                                        backgroundColor: index + 1 <= item.level ? 'var(--accents-blue)' : undefined,  
                                                                                                                                    },
                                                                                                                                },
                                                                                                                            }).dom
                                                                                                                        );
                                                                                                                    }),
                                                                                                            },
                                                                                                        }).dom
                                                                                                    ],             
                                                                                                },
                                                                                            }).dom
                                                                                        );
                                                                                    }),
                                                                                },
                                                                            }).dom
                                                                        ],
                                                                    },
                                                                }).dom
                                                            ],
                                                        },
                                                    }).dom
                                                ],
                                            },
                                        }).dom
                                    ],
                                },
                            }).dom
                        ],
                    }).dom
                ],
                width: getCssVariable<number>('--scale') === 1 ? 800 : 600,
                height: getCssVariable<number>('--scale') === 1 ? 500 : window.innerHeight / 2,
                x: (window.innerWidth / 2) - (450 * getCssVariable<number>('--scale')),
                y: 42,
                id: props?.id,
                key: props?.key,
                minWidth: getCssVariable<number>('--scale') === 1 ? 800 : 600,
                minHeight: getCssVariable<number>('--scale') === 1 ? 500 : window.innerHeight / 2,
            }),
        })
    );
}

export default CV;
