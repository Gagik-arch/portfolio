export default {
    meta: {
        type: 'problem',
        docs: {
            description: 'Enforce comments to start with specific tags',
            category: 'Stylistic Issues',
            recommended: false,
        },
        schema: [
            {
                type: 'object',
                properties: {
                    tags: {
                        type: 'array',
                        items: { type: 'string' },
                        uniqueItems: true,
                    },
                },

            }
        ],
        messages: {
            invalidComment: `1. Before comment double space_  //  <TAG>  comment  ;
2. Comment should start with one of the allowed tags; {{ tags }}
3. After comment double space_//  <TAG>  comment;`,
        },
    },
    create(context) {
        const options = context.options[0] ?? {};

        const allowedTags = options.tags ?? [
            'TODO:',
            'FIX:',
            'NOTE:'
        ];

        const tagPattern = new RegExp(`^\\s{2}\\s*(${allowedTags.join('|')})\\s{1}`);

        return {
            Program() {
                const sourceCode = context.getSourceCode();

                const comments = sourceCode.getAllComments();

                comments.forEach((comment) => {
                    const isTsIgnoreException = comment.value.trim()
                        .startsWith('@ts-ignore');

                    if (comment.type === 'Line' && !isTsIgnoreException && !tagPattern.test(comment.value)) {
                        context.report({
                            node: comment,
                            messageId: 'invalidComment',
                            data: {
                                tags: allowedTags.join(', '),
                            },
                        });
                    }
                });
            },
        };
    },
};

