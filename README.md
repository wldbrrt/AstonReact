# AstonReact

https://wldbrrt.github.io/AstonReact

### React

- Проект написан с использованием функциональных компонентов в приоритете над классовыми
- Есть четкое разделение на умные и глупые компоненты.  Пример [**глупого**](https://github.com/wldbrrt/AstonReact/blob/main/src/components/form/input.tsx) и [**умного**](https://github.com/wldbrrt/AstonReact/blob/main/src/components/form/form.tsx) компонента
- Есть рендеринг списков (https://github.com/wldbrrt/AstonReact/blob/main/src/components/allGamesList/allGamesList.tsx)
- Реализована хотя бы одна форма (https://github.com/wldbrrt/AstonReact/blob/main/src/components/form/form.tsx)
- Есть применение предохранителя (https://github.com/wldbrrt/AstonReact/blob/main/src/App.tsx)
- Есть хотя бы один кастомный хук (https://github.com/wldbrrt/AstonReact/blob/main/src/store/hooks.ts)
- Хотя бы несколько компонентов используют PropTypes(https://github.com/wldbrrt/AstonReact/blob/main/src/components/gameCard/gameCard.tsx) (https://github.com/wldbrrt/AstonReact/blob/main/src/components/search/gameList.tsx)
- Поиск не должен триггерить много запросов к серверу. Реализовао с помощью кастомного хука useDebounce (https://github.com/wldbrrt/AstonReact/blob/main/src/store/hooks.ts) - [**Пример использования**](https://github.com/wldbrrt/AstonReact/blob/main/src/components/search/search.tsx)
- Есть применение lazy + Suspense (https://github.com/wldbrrt/AstonReact/blob/main/src/App.tsx)

### Redux

- Используется Modern Redux with Redux Toolkit
- Используются слайсы (https://github.com/wldbrrt/AstonReact/tree/main/src/store/slices)
- Есть кастомная мидлвара (https://github.com/wldbrrt/AstonReact/blob/main/src/store/middleware/userMiddleware.ts)
- Используется RTK Query (https://github.com/wldbrrt/AstonReact/blob/main/src/store/slices/gamesAPI.ts)
- Используется Transforming Responses (https://github.com/wldbrrt/AstonReact/blob/main/src/store/slices/gamesAPI.ts)

## Дополнительно
- Использование TypeScript
- Использование Firebase для учетных записей пользователей и их Избранного и Истории поиска.
