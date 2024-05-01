/*
01.05.2024 тестовое задание выполнил кандидат на должность фронтенд разработчик - Мясоед Александр.

Контакты: 
тел.: +7-952-267-27-26
Telegram: @Aleksandr_Myasoed
Email: myasoedas@ya.ru

GitHub: https://github.com/myasoedas
*/

/*
Функция numberWithSpaces является JavaScript функцией, которая принимает числовое значение x и опциональный 
параметр fullValue. Её целью является форматирование числа x, добавляя пробелы в разряды и, 
при необходимости, сокращая число до кратких форм (тысячи, миллионы, миллиарды и т.д.). 

Давайте разберём, как она работает:
В начале функции происходит проверка наличия параметра fullValue. Если он передан и равен true, 
функция возвращает полное значение числа с добавленными пробелами в разрядах.

Если параметр fullValue не передан или равен false, функция проверяет длину числа x и в зависимости 
от этой длины определяет, какое сокращенное представление числа использовать 
(тысячи, миллионы, миллиарды и т.д.).

Далее, в соответствии с длиной числа, функция формирует строку, добавляя точку и дополнительные 
цифры после разделения на тысячи, миллионы и т.д. (если это необходимо).

Если длина числа превышает 12 символов, функция возвращает строку "999B+", обозначая очень большое значение.

Функция также обрабатывает отрицательные числа и возвращает отформатированное значение с пробелами в разрядах.
В случае возникновения ошибки, функция ловит исключение и выводит сообщение об ошибке в консоль.
*/

/*
Замечания по работе функции numberWithSpaces:

В строках, где переменные secondNumber, thirdNumber, needDot, needDot3 вычисляются, код рабочий, но неэффективный, 
потому что необходимые значения вычисляются несколько раз. Лучше вычислить их один раз в начале функции.

В строках, где возвращается строка с пробелами, код работает правильно, но неэффективен, так как использует несколько 
раз x.toString() и parts.join("."). Лучше использовать результаты один раз и сохранять их в переменные для повторного 
использования.

В блоке catch обработка ошибки слишком простая - просто выводится сообщение об ошибке в консоль, но функция продолжает 
выполнение. Это может привести к возвращению undefined, если ошибка произойдет до возврата значения. 
Необходимо добавить возврат значения по умолчанию или более тщательно обработать ошибку.
*/
const numberWithSpaces = (x: number, fullValue?: boolean) => {
    try {
        if (fullValue) {
            let parts = x.toString().split(".");
            parts[0] = parts[0].replace(/\B(?=(\d{3})+(?!\d))/g, " ");
            return parts.join(".");
        } else {
            const secondNumber = x.toString()[2] === '0' ? '' : x.toString()[2]
            const needDot = secondNumber ? '.' : ''
            const thirdNumber = x.toString()[3] === '0' ? '' : x.toString()[3]
            const needDot3 = thirdNumber ? '.' : ''
            if (x.toString().length > 12) {
                return '999B+'
            } else if (x.toString().length === 12) {
                return x.toString()[0] + x.toString()[1] + x.toString()[2] + needDot3 + thirdNumber + 'B'
            } else if (x.toString().length === 11) {
                if (thirdNumber) {
                    return x.toString()[0] + x.toString()[1] + '.' + x.toString()[2] + x.toString()[3] + 'B'
                } else {
                    return x.toString()[0] + x.toString()[1] + needDot + secondNumber + 'B'
                }
            } else if (x.toString().length === 10) {
                return x.toString()[0] + '.' + x.toString()[1] + secondNumber + 'B'
            } else if (x.toString().length === 9) {
                return x.toString()[0] + x.toString()[1] + x.toString()[2] + needDot3 + thirdNumber + 'M'
            } else if (x.toString().length === 8) {
                if (thirdNumber) {
                    return x.toString()[0] + x.toString()[1] + '.' + x.toString()[2] + x.toString()[3] + 'M'
                } else {
                    return x.toString()[0] + x.toString()[1] + needDot + secondNumber + 'M'
                }
            } else if (x.toString().length === 7) {
                return x.toString()[0] + '.' + x.toString()[1] + secondNumber + 'M'
            } else {
                let parts = x.toString().split(".");
                parts[0] = parts[0].replace(/\B(?=(\d{3})+(?!\d))/g, " ");
                return parts.join(".");
            }
        }
    } catch (e) {
        console.log(`[numberWithSpaces] error with ${e}`);
    }
};

/*
Функция newFunc принимает два аргумента: x, который представляет числовое значение, и fullValue, который по умолчанию 
устанавливается в false и указывает, нужно ли полное форматирование числа. Функция возвращает отформатированную строку 
на основе этих аргументов.

Полное форматирование (если fullValue равно true):
Функция разбивает число x на целую и дробную части с помощью метода split(".").
Затем она добавляет пробелы к целой части числа, чтобы разделить разряды, используя регулярное выражение \B(?=(\d{3})+(?!\d)).
И наконец, объединяет части обратно в строку с помощью метода join(".").

Альтернативное форматирование (если fullValue равно false):
Функция сначала преобразует число x в строку numString.
Затем она определяет длину строки числа numLength и выделяет первые две цифры (firstTwoDigits), а также третью 
и четвертую цифры (secondNumber и thirdNumber).

В зависимости от длины числа и его значений, функция форматирует числа в различные единицы измерения 
(миллиарды - "B" или миллионы - "M"), добавляя дополнительные разряды там, где это необходимо.

Обработка ошибок:
Функция использует блок try-catch для обработки возможных исключений. Если возникает ошибка, она выводит 
сообщение об ошибке в консоль и возвращает строку "Error".
*/
const newFunc = (x: number, fullValue: boolean = false): string => {
    try {
        if (fullValue) {
            const parts = x.toString().split(".");
            parts[0] = parts[0].replace(/\B(?=(\d{3})+(?!\d))/g, " ");
            return parts.join(".");
        } else {
            const numString = x.toString();
            const numLength = numString.length;
            const firstTwoDigits = numString.slice(0, 2);
            const secondNumber = numLength >= 3 ? numString[2] : '';
            const thirdNumber = numLength >= 4 ? numString[3] : '';

            if (numLength > 12) {
                return '999B+';
            } else if (numLength === 12) {
                return `${numString.slice(0, 3)}.${numString.slice(3, 0)}${thirdNumber}B`;
            } else if (numLength === 11) {
                return `${firstTwoDigits}${thirdNumber ? '.' : ''}${thirdNumber ? numString.slice(2, 4) : secondNumber}B`;
            } else if (numLength === 10) {
                return `${numString[0]}.${numString.slice(1, 2)}${secondNumber}B`;
            } else if (numLength === 9) {
                return `${firstTwoDigits}${thirdNumber ? '.' : ''}${thirdNumber}M`;
            } else if (numLength === 8) {
                return `${firstTwoDigits}${thirdNumber ? '.' : ''}${thirdNumber ? numString.slice(2, 4) : secondNumber}M`;
            } else if (numLength === 7) {
                return `${numString[0]}.${numString.slice(1, 3)}${secondNumber}M`;
            } else {
                const parts = numString.split(".");
                parts[0] = parts[0].replace(/\B(?=(\d{3})+(?!\d))/g, " ");
                return parts.join(".");
            }
        }
    } catch (e) {
        console.error(`[newFunc] error: ${e}`);
        return "Error";
    }
};


(() => {
    const tests = [
        123, 10001, 153056, 5132.51321, -1, -5561321313, 99999, 12345678, 912321561321, 912301561321, 51231411.31313131, 0
    ]

    tests.forEach((number, index) => {
        const old = numberWithSpaces(number, false);
        const old1 = numberWithSpaces(number, true);
        const newN = newFunc(number, false)?.replace(/\xa0/g, ' ')?.replace(/\u202f/g, ' ');
        const newN1 = newFunc(number, true)?.replace(/\xa0/g, ' ')?.replace(/\u202f/g, ' ');
        const status = (old == newN && old1 == newN1);
        console.log(`#${index + 1}`, status ? "OK" : "FAILED", !status ? `${old} == ${newN} | ${old1} == ${newN1}` : '');
    });
})();
