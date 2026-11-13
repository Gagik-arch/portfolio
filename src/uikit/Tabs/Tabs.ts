import {
    Element, Store 
} from '@nuvo-js/core';
import type {
    TabsProps
} from './types';
import { clsx } from '$utils/clsx';
import styles from './styles.module.css';
import Button from '$uikit/Button';
import { setCSSVariable } from '$utils/css';

class Tabs extends Element<HTMLDivElement> {
    private readonly index = new Store<number>(0);
    
    public constructor({ 
        tabs,
        className,
        defaultSelected = 0,
    }: TabsProps) {
        let effect: (() => void) | undefined;

        const selected = new Element<HTMLDivElement>({
            tagName: 'div',
            props: {
                className: styles.selected,
            },
        })
            .OnMount(() => {
                effect = this.index.Effect(val => {
                    const btns = [ ...document.getElementsByClassName(styles.tab) ] as HTMLButtonElement[];
                  
                    const btn = btns[val] as HTMLButtonElement | undefined;

                    if (!btn) return; 

                    setCSSVariable('--width', btn.offsetWidth - 8 + 'px', selected.dom);
                    setCSSVariable('--left', btn.offsetLeft + 4 + 'px', selected.dom);
                });
            })
            .OnUnMount(() => {
                effect?.();
            });

        const onPress = (e: MouseEvent) => {
            const target = (e.target as HTMLElement).closest(`.${styles.tab}`) as HTMLButtonElement | undefined;
            
            if (!target) return; 
            
            const stringIndex = target.dataset.index;
      
            if (!stringIndex) return; 

            this.index.SetState(Number(target.dataset.index));
        };

        super({
            tagName: 'div',
            props: {
                className: clsx(
                    styles.root,
                    className
                ),
                events: {
                    onclick: onPress,
                },
                children: [
                    selected.dom,
                         
                    ...tabs.map((tab, index) => {
                        return (
                            new Button({
                                className: styles.tab,
                                ['data-index']: index.toString(),
                                children: [ tab ],
                            }).dom
                        );
                    })
                ],
            },
        });

        this.index.SetState(defaultSelected);
    }

    public SetSelection(value:number) { 
        this.index.SetState(value);

        return this;
    }

    public readonly OnChangeSelection = (callback: (val:number) => void) => { 
        this.index.Subscribe(callback);

        return this;
    };
}

export default Tabs;
