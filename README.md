# @endsoul/react-ui

[![npm version](https://img.shields.io/npm/v/%40endsoul%2Freact-ui.svg)](https://www.npmjs.com/package/@endsoul/react-ui)
[![license](https://img.shields.io/npm/l/%40endsoul%2Freact-ui.svg)](./LICENSE)

여러 프로젝트에서 공통으로 사용하는 React UI 컴포넌트 라이브러리입니다. TypeScript, Tailwind CSS로 작성되었고 Storybook으로 개발합니다.

## 설치

```bash
npm install @endsoul/react-ui
```

`react`, `react-dom`은 `^19.0.0` peerDependency입니다. 사용하는 프로젝트에 호환되는 React 19 버전이 설치되어 있어야 합니다.

## 사용법

컴포넌트를 사용하려면 스타일시트를 한 번 import해야 합니다 (보통 앱의 엔트리 파일에서):

```ts
import '@endsoul/react-ui/style.css'
```

```tsx
import { Button } from '@endsoul/react-ui'

function App() {
  return (
    <Button type="button" onClick={() => console.log('clicked')}>
      Click me
    </Button>
  )
}
```

## 컴포넌트

### Button

Base UI Button을 감싼 버튼입니다. 현재 제공하는 스타일과 크기는 다음과 같습니다.

| Prop        | Type                   | Default   | 설명                           |
| ----------- | ---------------------- | --------- | ------------------------------ |
| `variant`   | `'default' \| 'ghost'` | `default` | 기본 테두리 버튼 / 테두리 없음 |
| `size`      | `'default'`            | `default` | 높이 36px의 기본 크기          |
| `disabled`  | `boolean`              | `false`   | 비활성화 여부                  |
| `className` | `string`               | —         | 추가 CSS 클래스                |

그 외 표준 `<button>` HTML 속성을 모두 그대로 지원합니다 (`onClick`, `type`, `form` 등).

```tsx
import { Button } from '@endsoul/react-ui'

export function ButtonExample() {
  return (
    <>
      <Button type="button">저장</Button>
      <Button type="button" variant="ghost">
        취소
      </Button>
      <Button type="button" disabled>
        저장 중
      </Button>
    </>
  )
}
```

### Tabs

Base UI Tabs를 감싼 컴포넌트입니다. 현재 기본 디자인은 가로 탭이며, 활성 탭의 위·좌·우 테두리가 콘텐츠 영역과 연결됩니다.

| 컴포넌트        | 역할                                | 주요 props                                   |
| --------------- | ----------------------------------- | -------------------------------------------- |
| `Tabs`          | 전체 탭의 선택 상태 관리            | `defaultValue`, `value`, `onValueChange`     |
| `TabsList`      | 탭 버튼 그룹                        | `aria-label`, `activateOnFocus`, `loopFocus` |
| `TabsTab`       | 선택 가능한 탭 버튼                 | `value`(필수), `disabled`                    |
| `TabsIndicator` | 활성 탭을 따라 움직이는 배경·테두리 | `className`, `style`                         |
| `TabsPanel`     | 선택된 탭에 대응하는 콘텐츠         | `value`(필수), `keepMounted`                 |

```tsx
import {
  Tabs,
  TabsIndicator,
  TabsList,
  TabsPanel,
  TabsTab,
} from '@endsoul/react-ui'

export function TabsExample() {
  return (
    <Tabs defaultValue="overview">
      <TabsList aria-label="프로젝트 정보">
        <TabsTab value="overview">개요</TabsTab>
        <TabsTab value="projects">프로젝트</TabsTab>
        <TabsTab value="settings" disabled>
          설정
        </TabsTab>
        <TabsIndicator />
      </TabsList>

      <div style={{ border: '1px solid black', backgroundColor: 'white' }}>
        <TabsPanel value="overview">작업 공간의 통계와 활동입니다.</TabsPanel>
        <TabsPanel value="projects">프로젝트 진행 상황입니다.</TabsPanel>
        <TabsPanel value="settings">프로젝트 설정입니다.</TabsPanel>
      </div>
    </Tabs>
  )
}
```

사용 시 다음 규칙을 지켜주세요.

- `TabsTab`과 `TabsPanel`의 `value`를 일치시키고, 각 탭의 값은 서로 다르게 지정합니다.
- 초기 선택은 활성화 가능한 탭의 값으로 `defaultValue`에 지정합니다. 외부에서 제어하려면 `value`와 `onValueChange`를 함께 사용합니다.
- `TabsIndicator`는 `TabsList` 안에 한 개 넣습니다. 생략해도 탭 전환은 동작하지만 현재 스타일의 선택 테두리는 표시되지 않습니다.
- 콘텐츠 외곽선은 예제의 `div`가 그립니다. `TabsPanel` 자체에는 외곽선이 없습니다.
- 현재 Indicator 배경은 흰색입니다. 배경을 바꾸면 콘텐츠와 Indicator를 같은 불투명 색으로 맞춰야 활성 탭 아래의 선이 가려집니다. `TabsList`의 `-mb-px`도 유지합니다.
- 방향키로 탭 사이의 포커스를 이동하고 Enter/Space로 선택합니다. 방향키 이동과 동시에 선택하려면 `TabsList`에 `activateOnFocus`를 지정합니다.
- 비활성 패널의 DOM과 내부 상태를 유지하려면 해당 `TabsPanel`에 `keepMounted`를 지정합니다(기본값 `false`).

현재 래퍼의 기본 스타일은 가로·밝은 배경용입니다. `orientation="vertical"`만 설정한다고 세로 스타일이 완성되지는 않습니다. 세로 배치와 Indicator의 위치·크기 스타일도 추가해야 합니다. 또한 현재 래퍼에서는 `className`을 문자열로 사용하세요. Base UI의 상태 함수형 `className`을 병합하는 처리는 구현되어 있지 않습니다.

## 스타일 적용

Button과 Tabs의 기본 스타일은 `@endsoul/react-ui/style.css`를 import하면 적용됩니다. 예제의 콘텐츠 테두리는 Tailwind가 없는 소비 프로젝트에서도 적용되도록 인라인 스타일로 지정했습니다. 소비 프로젝트에서 추가하는 Tailwind 클래스는 해당 프로젝트의 Tailwind 빌드 설정이 필요합니다.

현재 제공하는 Button·Tabs 사용에 별도의 portal 설정은 필요하지 않습니다. Dialog·Popover 등 portal 컴포넌트를 추가하면 해당 컴포넌트에 필요한 설정을 별도로 안내합니다.

## 로컬 개발

```bash
npm install
npm run storybook
```

컴포넌트를 브라우저에서 확인하며 개발할 수 있습니다 (`http://localhost:6006`).

| 스크립트            | 설명                        |
| ------------------- | --------------------------- |
| `npm run storybook` | Storybook 개발 서버 실행    |
| `npm run build`     | 라이브러리 빌드 (`dist/`)   |
| `npm run test`      | 유닛/브라우저 테스트 실행   |
| `npm run lint`      | ESLint 검사                 |
| `npm run format`    | Prettier + ESLint 자동 수정 |

## 릴리즈

이 프로젝트는 [Changesets](https://changesets.dev/guide/cli)로 `@endsoul/react-ui` 패키지 전체의 버전을 관리합니다. 아래는 로컬 터미널에서 직접 npm에 게시하는 절차입니다. 모든 명령은 저장소 루트에서 실행하고, 오류가 발생하면 다음 단계로 넘어가지 마세요.

### 명령별 자동 처리 범위

| 명령                       | 직접 준비하거나 입력할 것                                 | 자동으로 처리하는 것                                                           |
| -------------------------- | --------------------------------------------------------- | ------------------------------------------------------------------------------ |
| `npm run changeset`        | 대상 패키지, patch/minor/major, 사용자에게 알릴 변경 설명 | `.changeset/`에 변경 기록 파일 생성                                            |
| `npm run version-packages` | 변경 기록을 검토하고 커밋                                 | `package.json` 버전 변경, `CHANGELOG.md` 생성·갱신, 사용한 변경 기록 파일 제거 |
| `npm run release`          | 검증 완료, 릴리즈 커밋, npm 게시 권한과 인증              | 빌드 후 npm 게시, Git 태그 생성                                                |

`package.json`의 버전과 `CHANGELOG.md`는 직접 먼저 수정하지 않습니다. README의 사용법·props 설명은 직접 관리해야 합니다. Changesets는 소스를 분석해 변경 설명을 작성하지 않으며, changeset에 입력한 내용을 CHANGELOG에 반영합니다. 현재 `.changeset/config.json`의 `commit`은 `false`이므로 커밋과 push도 직접 해야 합니다.

### 버전 선택

Button과 Tabs는 별도 npm 패키지가 아니므로 각각의 버전을 갖지 않습니다. **Tabs를 처음 추가했다고 패키지를 `1.0.0`으로 올릴 필요는 없습니다.**

| 선택    | 기준                                                  | `0.1.1` 기준 예시 |
| ------- | ----------------------------------------------------- | ----------------- |
| `patch` | 기존 API와 호환되는 버그·스타일 수정                  | `0.1.2`           |
| `minor` | 기존 API와 호환되는 기능·컴포넌트 추가                | `0.2.0`           |
| `major` | 안정 버전의 호환성을 깨는 변경 또는 첫 안정 버전 선언 | `1.0.0`           |

기존 API를 유지하면서 Tabs를 추가하는 이번 릴리즈는 `minor`가 적절합니다. `1.0.0`은 패키지 전체의 공개 API를 안정화하고, 이후 호환성 규칙을 지키기로 결정할 때 선택합니다. `0.x`는 초기 개발 단계이므로 호환성을 깨는 변경이 있다면 변경 내용과 마이그레이션 방법을 명시하고 릴리즈 수준을 별도로 판단하세요. 위 숫자는 예시이며, 매번 현재 버전을 기준으로 계산됩니다. [Semantic Versioning](https://semver.org/spec/v2.0.0.html)

### 1. 소스·문서·인증 준비

- 릴리즈할 코드를 `main`에 반영하고, 릴리즈와 관계없는 미커밋 변경이 없는지 확인합니다. 진행 중인 변경이 있다면 먼저 커밋하거나 정리한 뒤 브랜치를 바꿉니다.
- 새 컴포넌트가 `src/index.ts`에서 export되는지 확인합니다. 현재 Button과 Tabs는 모두 export되어 있습니다.
- README 예제와 props가 실제 구현과 맞는지 확인합니다. 런타임에 사용하는 외부 패키지는 `dependencies` 또는 `peerDependencies`에 있어야 합니다.
- 프로젝트 의존성의 Node.js 요구 버전에 맞는 환경을 사용합니다. 현재 도구 구성에서는 Node.js 22.12 이상인 22.x와 npm 10.9 이상을 사용할 수 있습니다. `node --version`, `npm --version`으로 확인하고, 의존성을 업데이트하면 요구 버전도 다시 확인합니다.

```bash
git status --short
git switch main
git pull --ff-only
npm ci
npm config get registry
npm whoami
npm view @endsoul/react-ui version
```

registry는 일반적인 npm 공개 게시 기준 `https://registry.npmjs.org/`여야 합니다. 다른 주소라면 사용자/프로젝트 npm 설정을 확인하세요. `npm whoami`가 인증 오류를 내면 `npm login` 후 재확인합니다. 로그인한 계정에 `@endsoul/react-ui` 게시 권한이 있어야 하며, 실제 게시 때 npm이 요구하는 2FA 또는 게시용 인증을 완료해야 합니다. 로그인 성공만으로 게시 권한까지 확인되는 것은 아닙니다. [npm 게시 인증](https://docs.npmjs.com/requiring-2fa-for-package-publishing-and-settings-modification/)

`npm view`의 버전은 npm에 게시된 최신 버전이며 로컬 `package.json`과 비교합니다. 최초 게시 전이라면 404가 날 수 있지만, 기존 패키지라면 registry·이름·접근 권한을 먼저 확인합니다. 이미 로컬 버전만 올라가 있고 게시만 남은 상태라면 3단계를 다시 실행하지 말고 아래의 실패 시 재시도 절차를 확인하세요.

`npm ci`가 의존성/lockfile 불일치로 실패하면 의도한 `package.json` 변경을 확인한 뒤 `npm install`로 동기화하고 diff를 검토·커밋합니다. 버전만 다른 경우도 아래 3단계에서 lockfile을 동기화합니다.

현재 CHANGELOG 생성기는 `@changesets/changelog-github`이고 대상 저장소는 `kkw855/react-ui`입니다. 커밋·PR 정보를 가져오기 위해 **`version-packages` 실행 전에 GitHub 접근 토큰을 `GITHUB_TOKEN`으로 준비해야 합니다.** npm 로그인과는 별개입니다. [GitHub 토큰 설정](https://github.com/settings/tokens)에서 준비하며, 설치된 생성기가 안내하는 classic 토큰 권한은 `read:user`, `repo:status`입니다. 다른 토큰 종류를 사용하면 저장소 접근 설정과 그에 맞는 권한을 확인하세요.

macOS 기본 zsh에서는 다음처럼 토큰을 화면이나 명령 히스토리에 직접 남기지 않고 입력할 수 있습니다.

```zsh
read -rs 'GITHUB_TOKEN?GitHub token: '
export GITHUB_TOKEN
```

토큰은 README나 추적되는 파일에 작성하지 마세요. 버전 생성이 끝나면 `unset GITHUB_TOKEN`으로 해당 셸에서 제거할 수 있습니다. GitHub 링크가 필요 없다면 별도 설정 변경으로 기본 CHANGELOG 생성기를 선택할 수 있지만, 현재 절차는 GitHub 생성기를 유지하는 기준입니다.

### 2. 변경 사항 기록·커밋

```bash
npm run changeset
```

대상으로 `@endsoul/react-ui`를 선택하고 버전 수준과 설명을 입력합니다. 예를 들어 호환되는 Tabs 추가라면 `minor`, 설명은 `Tabs 컴포넌트 추가`입니다. 생성된 `.changeset/` 파일에서 대상 패키지와 내용을 확인합니다. 이미 이번 변경에 대한 changeset이 있다면 중복 생성하지 않습니다.

```bash
git status --short
git add .changeset
git diff --cached
git commit -m "chore: add release changeset"
git push
npm run changeset -- status
```

소스나 README 변경이 아직 커밋되지 않았다면 해당 파일도 검토 후 함께 커밋합니다. GitHub CHANGELOG 조회를 위해 changeset 커밋을 원격에도 반영합니다. `status`에서 예상 버전과 포함될 변경을 확인한 뒤 진행합니다. 여러 changeset이 있으면 모두 반영되며, 가장 높은 변경 수준이 버전을 결정합니다.

### 3. 버전·CHANGELOG 생성 및 lockfile 동기화

```bash
npm run version-packages
npm install --package-lock-only
git diff -- package.json package-lock.json CHANGELOG.md .changeset
git status --short
```

`package.json` 버전, CHANGELOG 내용, `package-lock.json`의 루트 버전, changeset 파일 삭제를 확인합니다. `version-packages`가 lockfile까지 동기화한다고 가정하지 마세요. 원치 않는 의존성 변경이 보이면 원인을 확인한 뒤 진행합니다. 이 단계는 아직 npm에 게시하지 않습니다.

### 4. 검사·빌드·배포 파일 확인

```bash
npm run check
npm run lint
npx tsc --noEmit
npm run test:ci
npm run build
npm pack --dry-run
```

- 포맷, lint, 타입, 테스트, 빌드를 모두 통과해야 합니다. `release`는 이 중 빌드만 자동 실행합니다.
- 브라우저 테스트에서 Chromium 실행 파일이 없다고 나오면 `npx playwright install chromium`으로 설치한 후 테스트를 다시 실행합니다.
- `npm run format`은 파일을 실제 수정합니다. 사용했다면 diff를 확인하고 관련 검사를 다시 통과시킵니다.
- `npm pack --dry-run`은 게시 없이 배포 파일 목록을 보여줍니다. `dist/index.js`, `dist/index.cjs`, `dist/index.d.ts`, `dist/style.css`와 README·라이선스가 포함되는지 확인합니다. `package.json`의 `exports` 경로와 일치해야 합니다.
- 새 컴포넌트가 빌드된 JS와 타입 선언에서 export되는지 확인합니다. 현재 `files`는 `dist`만 지정하므로 저장소의 모든 파일이 배포되는 것은 아닙니다. CHANGELOG의 npm 포함 여부도 실제 목록으로 확인하세요.

출시 전 소비 환경을 확인하려면 `npm pack`으로 실제 `.tgz`를 만들고, 별도 React 19 테스트 프로젝트에서 그 파일을 설치합니다. Button·Tabs import, CSS import, 렌더링과 탭 전환이 동작하는지 확인합니다. 이 확인도 npm 게시 없이 가능합니다.

### 5. 릴리즈 커밋

검사 중 수정한 소스·문서가 있으면 먼저 검토하고 커밋합니다. 마지막으로 버전 관련 파일을 커밋하여 게시할 소스와 버전을 Git에 남깁니다.

```bash
git add package.json package-lock.json CHANGELOG.md .changeset
git diff --cached
git commit -m "chore: version packages"
git status --short
git push
```

`git status --short`에 출력이 없고, 최신 커밋이 릴리즈 버전 커밋인지 확인합니다. 보호된 `main`이면 저장소 정책에 따라 PR로 병합한 뒤 최신 `main`을 받아 게시합니다. 게시 전에 별도의 기능 변경을 끼워 넣지 마세요. 생성되는 Git 태그가 이 릴리즈의 소스를 가리켜야 합니다.

### 6. npm 게시

```bash
npm run release
```

실제 스크립트는 `npm run build && changeset publish`입니다. 빌드에 성공하면 아직 npm에 없는 현재 버전을 게시하며, 기본 npm dist-tag는 `latest`입니다. `publishConfig.access`와 Changesets `access`가 모두 `public`이므로 scoped 패키지도 공개 게시됩니다.

이 단계는 실제 외부 게시입니다. `npm run release -- --dry-run`을 배포 미리보기 용도로 사용하지 마세요. 파일 목록 확인은 앞 단계의 `npm pack --dry-run`으로 합니다. 게시 중 표시되는 인증 안내를 완료하고 성공 메시지를 확인합니다.

### 7. 게시 확인·Git 태그 push

```bash
npm view @endsoul/react-ui version
npm view @endsoul/react-ui dist-tags --json
git tag --points-at HEAD
git push --follow-tags
```

npm의 버전과 `latest`가 이번 릴리즈를 가리키는지 확인합니다. 단일 패키지 저장소의 기본 Git 태그는 `v0.2.0` 같은 형태입니다. Changesets가 태그를 만들어도 원격 push는 직접 해야 합니다. GitHub Releases 페이지의 릴리즈 노트는 이 로컬 스크립트가 자동 생성하지 않습니다.

마지막으로 소비 프로젝트에서 게시한 정확한 버전을 설치해 확인합니다. 예를 들어 이번 릴리즈가 `0.2.0`인 경우:

```bash
npm install @endsoul/react-ui@0.2.0
```

이 명령은 라이브러리 저장소가 아니라 **소비 프로젝트**에서 실행합니다. 해당 프로젝트의 lockfile 변경도 확인하세요. 특히 `^0.1.1` 범위는 `0.2.0`을 포함하지 않으므로 minor 릴리즈 후에는 소비 프로젝트의 의존성 버전을 명시적으로 올려야 합니다.

### 실패했을 때 재시도

| 상황                                         | 다음 행동                                                                                                                                                       |
| -------------------------------------------- | --------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `version-packages`에서 GitHub 인증/조회 오류 | `GITHUB_TOKEN`, 저장소 설정, changeset 커밋 push 여부 확인. 파일 diff와 남은 changeset을 확인한 뒤 미완료 단계를 재시도                                         |
| `No unreleased changesets found`             | changeset을 아직 만들지 않았는지, 이미 버전 생성에 사용했는지 확인. 이미 버전이 올라갔다면 게시 단계로 진행                                                     |
| 버전 생성 후 검사·빌드 실패                  | 오류 수정 후 검사·빌드를 다시 실행하고 변경을 커밋. 같은 릴리즈를 위해 changeset과 버전을 다시 만들지 않음                                                      |
| 게시 인증/네트워크 오류                      | 먼저 `npm view @endsoul/react-ui versions --json`으로 목표 버전의 게시 여부 확인. 미게시 상태면 인증 등을 해결하고 같은 버전으로 `npm run release` 재시도       |
| 목표 버전이 이미 npm에 존재                  | 같은 버전은 덮어쓸 수 없음. 이번 게시가 성공한 것이라면 태그/push/검증만 마무리. 코드 수정이 추가로 필요하면 새 changeset으로 다음 버전 출시                    |
| npm 게시 성공, 태그 생성 또는 push 실패      | npm 게시를 되돌리거나 버전을 올릴 필요 없음. 정확한 릴리즈 커밋에서 태그 상태 확인. 태그가 없다면 `npm run changeset -- git-tag`, 이후 `git push --follow-tags` |

오류 후 세 명령을 무조건 처음부터 반복하지 마세요. npm 게시 여부와 로컬 버전·CHANGELOG·changeset 상태를 기준으로 이어서 진행합니다. [Changesets 릴리즈 절차](https://changesets.dev/guide/versioning-and-publishing)

## 라이선스

[MIT](./LICENSE)
