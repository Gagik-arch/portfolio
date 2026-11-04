type Operator = '+' | '-' | '*' | '/' | '%';
type Token = number | Operator;

export function evaluateExpression(expression: string): number {
    const tokens: Token[] = [];
    const regex = /\s*(?:(\d+(?:\.\d*)?(?:e[+-]?\d+)?|\.\d+(?:e[+-]?\d+)?)|([+\-*/%]))/iy;

    let index = 0;

    while (index < expression.length) {
        regex.lastIndex = index;

        const match = regex.exec(expression);

        if (!match) {
            throw new Error('Invalid expression');
        }

        tokens.push(
            match[1]
                ? Number(match[1])
                : match[2] as Operator
        );

        index = regex.lastIndex;
    }

    let position = 0;

    const peek = () => tokens[position];

    const consume = (): Token => {
        const token = tokens[position++];

        if (!token ) {
            throw new Error('Unexpected end of expression');
        }

        return token;
    };

    const primary = (): number => {
        const token = consume();

        if (typeof token !== 'number' || !Number.isFinite(token)) {
            throw new Error('Expected a number');
        }

        return token;
    };

    const unary = (): number => {
        const token = peek();

        if (token === '-') {
            consume();
            return -unary();
        }

        if (token === '+') {
            consume();
            return unary();
        }

        return primary();
    };

    const term = (): number => {
        let value = unary();

        while (
            peek() === '*'
            || peek() === '/'
            || peek() === '%'
        ) {
            const operator = consume() as Operator;
            const right = unary();

            switch (operator) {
                    case '*':
                        value *= right;
                        break;

                    case '/':
                        if (right === 0) {
                            throw new Error('Division by zero');
                        }
                        value /= right;
                        break;

                    case '%':
                        if (right === 0) {
                            throw new Error('Division by zero');
                        }
                        value %= right;
                        break;
            }
        }

        return value;
    };

    const expressionParser = (): number => {
        let value = term();

        while (
            peek() === '+'
            || peek() === '-'
        ) {
            const operator = consume();
            const right = term();

            value = operator === '+'
                ? value + right
                : value - right;
        }

        return value;
    };

    const result = expressionParser();

    if (position !== tokens.length) {
        throw new Error('Invalid expression');
    }

    if (!Number.isFinite(result)) {
        throw new Error('Invalid result');
    }

    return result;
}
