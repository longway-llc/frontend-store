import {useEffect, useState} from 'react'

// source: https://habr.com/ru/post/492248/

export default function useDebounce(value: unknown, delay: number): typeof value {
    // Состояние и сеттер для отложенного значения
    const [debouncedValue, setDebouncedValue] = useState(value)

    useEffect(
        () => {
            // Выставить debouncedValue равным price (переданное значение)
            // после заданной задержки
            const handler = setTimeout(() => {
                setDebouncedValue(value)
            }, delay)

            // Вернуть функцию очистки, которая будет вызываться каждый раз, когда ...
            // ... useEffect вызван снова. useEffect будет вызван снова, только если ...
            // ... price будет изменено (смотри ниже массив зависимостей).
            // Так мы избегаем изменений debouncedValue, если значение price ...
            // ... поменялось в рамках интервала задержки.
            // Таймаут очищается и стартует снова.
            // Что бы сложить это воедино: если пользователь печатает что-то внутри ...
            // ... нашего приложения в поле поиска, мы не хотим, чтобы debouncedValue...
            // ... не менялось до тех пор, пока он не прекратит печатать дольше, чем 500ms.
            return () => {
                clearTimeout(handler)
            }
        },
        // Вызывается снова, только если значение изменится
        // мы так же можем добавить переменную "delay" в массива зависимостей ...
        // ... если вы собираетесь менять ее динамически.
        [delay, value]
    )

    return debouncedValue
}