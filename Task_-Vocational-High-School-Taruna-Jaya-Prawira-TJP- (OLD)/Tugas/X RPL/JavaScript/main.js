/*
    main.js - Dynamic calculator UI + logic
    Drop this file into a webpage (add <script src="main.js" defer></script>).
*/

document.addEventListener('DOMContentLoaded', () => {
    // Create basic styles
    const style = document.createElement('style');
    style.textContent = `
        .calc { width: 320px; margin: 40px auto; font-family: Arial, sans-serif; }
        .display { width: 100%; height: 60px; font-size: 28px; padding: 10px; box-sizing: border-box; text-align: right; }
        .keys { display: grid; grid-template-columns: repeat(4, 1fr); gap: 8px; margin-top: 12px; }
        .btn { padding: 18px; font-size: 18px; cursor: pointer; user-select: none; border: 1px solid #ccc; background: #f5f5f5; border-radius: 6px; }
        .btn.operator { background: #ffd9b3; }
        .btn.equal { grid-column: span 2; background: #b3e6b3; }
        .btn.clear { background: #ffb3b3; }
        .btn:active { transform: translateY(1px); }
    `;
    document.head.appendChild(style);

    // Build DOM
    const calc = document.createElement('div');
    calc.className = 'calc';

    const display = document.createElement('input');
    display.className = 'display';
    display.type = 'text';
    display.readOnly = true;
    display.value = '0';
    calc.appendChild(display);

    const keys = document.createElement('div');
    keys.className = 'keys';

    const buttons = [
        { label: 'C', action: 'clear', cls: 'clear' },
        { label: '←', action: 'back' },
        { label: '(', action: 'input', value: '(' },
        { label: ')', action: 'input', value: ')' },

        { label: '7', action: 'input', value: '7' },
        { label: '8', action: 'input', value: '8' },
        { label: '9', action: 'input', value: '9' },
        { label: '÷', action: 'input', value: '/' , cls: 'operator'},

        { label: '4', action: 'input', value: '4' },
        { label: '5', action: 'input', value: '5' },
        { label: '6', action: 'input', value: '6' },
        { label: '×', action: 'input', value: '*' , cls: 'operator'},

        { label: '1', action: 'input', value: '1' },
        { label: '2', action: 'input', value: '2' },
        { label: '3', action: 'input', value: '3' },
        { label: '-', action: 'input', value: '-' , cls: 'operator'},

        { label: '0', action: 'input', value: '0' },
        { label: '.', action: 'input', value: '.' },
        { label: '=', action: 'eval', cls: 'equal' },
        { label: '+', action: 'input', value: '+' , cls: 'operator'},
    ];

    buttons.forEach(b => {
        const btn = document.createElement('button');
        btn.type = 'button';
        btn.className = 'btn' + (b.cls ? ` ${b.cls}` : '');
        btn.textContent = b.label;
        btn.dataset.action = b.action;
        if (b.value) btn.dataset.value = b.value;
        keys.appendChild(btn);
    });

    calc.appendChild(keys);
    document.body.appendChild(calc);

    // State & helpers
    let expr = ''; // current expression string

    const setDisplay = (v) => {
        display.value = v === '' ? '0' : v;
    };

    const isOperator = (ch) => ['+', '-', '*', '/'].includes(ch);

    const pushInput = (text) => {
        if (text === '.') {
            // Prevent multiple decimals in the current number token
            const lastNumber = expr.split(/[\+\-\*\/\(\)]/).pop();
            if (lastNumber.includes('.')) return;
            if (lastNumber === '') text = '0.';
        }

        if (isOperator(text)) {
            // Replace trailing operator with new one (except minus after open paren or start)
            if (expr === '' && text === '-') {
                expr += '-';
            } else if (expr === '' && text !== '-') {
                return;
            } else {
                const last = expr.slice(-1);
                if (isOperator(last)) {
                    expr = expr.slice(0, -1) + text;
                    setDisplay(expr);
                    return;
                }
            }
        }

        expr += text;
        setDisplay(expr);
    };

    const clearAll = () => {
        expr = '';
        setDisplay('');
    };

    const backspace = () => {
        expr = expr.slice(0, -1);
        setDisplay(expr);
    };

    const safeEval = (s) => {
        // allow digits, operators, parentheses, decimal and spaces only
        if (!/^[0-9+\-*/().\s]+$/.test(s)) throw new Error('Invalid characters');
        // Prevent sequences like //, ** (not operators we allow) are okay since * * is allowed but double operator should be disallowed earlier
        // Evaluate with Function for slightly safer isolated evaluation
        // eslint-disable-next-line no-new-func
        const fn = new Function(`return (${s})`);
        return fn();
    };

    const evaluate = () => {
        if (expr.trim() === '') return;
        try {
            const result = safeEval(expr);
            expr = String(result);
            setDisplay(expr);
        } catch (e) {
            setDisplay('Error');
            expr = '';
            setTimeout(() => setDisplay(''), 800);
        }
    };

    // Click handling
    keys.addEventListener('click', (ev) => {
        const btn = ev.target.closest('button');
        if (!btn) return;
        const action = btn.dataset.action;
        if (action === 'input') {
            pushInput(btn.dataset.value);
        } else if (action === 'clear') {
            clearAll();
        } else if (action === 'back') {
            backspace();
        } else if (action === 'eval') {
            evaluate();
        }
    });

    // Keyboard support
    window.addEventListener('keydown', (ev) => {
        const k = ev.key;
        if ((k >= '0' && k <= '9') || k === '+' || k === '-' || k === '*' || k === '/' || k === '(' || k === ')' || k === '.') {
            ev.preventDefault();
            pushInput(k);
            return;
        }
        if (k === 'Enter' || k === '=') {
            ev.preventDefault();
            evaluate();
            return;
        }
        if (k === 'Backspace') {
            ev.preventDefault();
            backspace();
            return;
        }
        if (k.toLowerCase() === 'c') {
            // press C to clear
            ev.preventDefault();
            clearAll();
            return;
        }
    });

    // Initialize
    setDisplay('');
});