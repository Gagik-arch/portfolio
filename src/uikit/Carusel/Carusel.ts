import Element from '$lib/Element';

function Carousel() { 

    return (
        new Element<HTMLDivElement>({
            tagName: 'div',
            props: {
                children: [ 'Carousel' ],
            },
        }).dom
    );
}

export default Carousel;
