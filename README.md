# @endsoul/react-ui

[![npm version](https://img.shields.io/npm/v/%40endsoul%2Freact-ui.svg)](https://www.npmjs.com/package/@endsoul/react-ui)
[![license](https://img.shields.io/npm/l/%40endsoul%2Freact-ui.svg)](./LICENSE)

여러 프로젝트에서 공통으로 사용하는 React UI 컴포넌트 라이브러리입니다. TypeScript, Tailwind CSS로 작성되었고 Storybook으로 개발합니다.

## 설치

```bash
npm install @endsoul/react-ui
```

`react`, `react-dom`은 peerDependency이므로 사용하는 프로젝트에 이미 설치되어 있어야 합니다.

## 사용법

컴포넌트를 사용하려면 스타일시트를 한 번 import해야 합니다 (보통 앱의 엔트리 파일에서):

```ts
import '@endsoul/react-ui/style.css'
```

```tsx
import { Button } from '@endsoul/react-ui'

function App() {
  return (
    <Button variant="primary" size="md" onClick={() => console.log('clicked')}>
      Click me
    </Button>
  )
}
```

## 컴포넌트

### Button

| Prop       | Type                                    | Default   | 설명                     |
| ---------- | ---------------------------------------- | --------- | ------------------------ |
| `variant`  | `'primary' \| 'secondary' \| 'outline'` | `primary` | 버튼 스타일              |
| `size`     | `'sm' \| 'md' \| 'lg'`                   | `md`      | 버튼 크기                |
| `disabled` | `boolean`                                | `false`   | 비활성화 여부            |

그 외 표준 `<button>` HTML 속성을 모두 그대로 지원합니다 (`onClick`, `type`, `form` 등).

## 필수 설정

일부 컴포넌트는 내부적으로 [Base UI](https://base-ui.com/react)의 Dialog, Popover 등 포탈(portal) 기반 컴포넌트를 사용합니다. 이런 컴포넌트가 올바르게 동작하려면, **소비 프로젝트의 전역 CSS**에 아래 두 규칙을 추가해주세요 (라이브러리가 제공하는 `style.css`에는 포함되어 있지 않습니다 — 앱의 최상위 DOM에 대한 설정이라 각 프로젝트가 직접 넣어야 합니다):

```css
/* 앱을 마운트하는 루트 엘리먼트에 적용 */
.root {
  isolation: isolate;
}

/* Dialog 등의 backdrop이 iOS Safari에서 올바르게 동작하도록 */
body {
  position: relative;
}
```

## 로컬 개발

```bash
npm install
npm run storybook
```

컴포넌트를 브라우저에서 확인하며 개발할 수 있습니다 (`http://localhost:6006`).

| 스크립트                 | 설명                                        |
| ------------------------ | ------------------------------------------- |
| `npm run storybook`      | Storybook 개발 서버 실행                    |
| `npm run build`          | 라이브러리 빌드 (`dist/`)                   |
| `npm run test`           | 유닛/브라우저 테스트 실행                   |
| `npm run lint`           | ESLint 검사                                 |
| `npm run format`         | Prettier + ESLint 자동 수정                 |

## 릴리즈

이 프로젝트는 [Changesets](https://github.com/changesets/changesets)로 버전을 관리합니다.

```bash
npm run changeset         # 변경 사항 기록 (patch/minor/major 선택)
npm run version-packages  # package.json 버전 업데이트 + CHANGELOG 생성
npm run release           # 빌드 후 npm publish
```

## 라이선스

[MIT](./LICENSE)
