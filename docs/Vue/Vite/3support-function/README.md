# 지원하는 기능들

기본적으로 vite는 여타 정적 파일 서버와 크게 다르지 않습니다. 다만, vite는 네이티브 ESM 말고도 기존 번들러에서 제공하던 기능을 대부분 지원한다는 차이점이 있습니다.

---

### NPM을 이용한 디펜던시 `import` 그리고 사전 번들링

다음 코드는 네이티브 ES에서 정상적으로 실행되지 않습니다.

```tsx
import { someMethod } from 'my-dep'
```

모듈의 위치를 찾을 수 없기 때문인데, vite는 다음을 기준으로 모듈을 가져오기 때문에 위 코드 역시 정상적으로 실행됩니다.

1. Vite를 통해 ESM 스타일로 사전에 번들링 된 CommonJS 및 UMD 모듈. 이 과정은 EsBuild를 통해 이루어지며, JavaScript 기반의 다른 번들러보다 빠른 Cold-Start가 가능합니다.

💡 **UMD** 모듈 이란?
-  Universal Module Definition: CommonJS와 AMD 스타일의 모듈을 둘 다 지원하는 모듈 형태


1.  `/node_modules/.vite/deps/my-dep.js?v=f3sf2ebd`와 같이 URL을 이용해 ESM을 지원하는 브라우저에서 모듈을 가져올 수 있도록 `import` 구문을 수정.

참고로, **디펜던시는 반드시 캐시됩니다.**

vite는 HTTP 헤더를 이용해 요청한 디펜던시를 브라우저에서 캐싱하도록 합니다. 만약 디펜던시의 수정 또는 디버깅이 필요하다면 **[여기](https://vitejs-kr.github.io/guide/dep-pre-bundling.html#browser-cache)**를 참고해주세요.

---

### **Hot Module Replacement**

vite는 기본적으로 ESM를 통해 **[HMR API](https://vitejs-kr.github.io/guide/api-hmr.html)**를 제공합니다. HMR 기능이 있는 프레임워크는 API를 활용하여 페이지를 다시 로드하거나 애플리케이션 상태를 날려버리지 않고 즉각적이고 정확한 업데이트를 제공할 수 있습니다. vite는 **[Vue Single File Components](https://github.com/vitejs/vite-plugin-vue/tree/main/packages/plugin-vue)**, **[React Fast Refresh](https://github.com/vitejs/vite-plugin-react/tree/main/packages/plugin-react)** 또는 **[@prefresh/vite](https://github.com/JoviDeCroock/prefresh/tree/main/packages/vite)**과 같은 First-party HMR* 모듈을 제공하고 있습니다. (* Vite에서 직접 제공하는 HMR 모듈)

물론, **`[create-vite](https://vitejs-kr.github.io/guide/)`**에서 제공하는 템플릿 안에는 HMR 모듈이 포함되어 있기 때문에 굳이 위와 같은 방법을 따르지 않아도 됩니다.

---

### TypeScript

vite는 `.ts` 파일에 대한 컴파일링 및 Import 역시 지원합니다.

단, 타입 체킹은 오로지 IDE 또는 빌드 프로세스에만 의존하며, Vite 자체에는 `.ts` 파일에 대한 **타입체킹 작업을 진행하지 않습니다**. 

타입 체킹이 필요하다면 `tsc --noEmit`*을 빌드 스크립트에 넣어주세요. 만약 `*.vue` 소스 코드를 작성중이라면, `vue-tsc`를 설치해 `vue-tsc --noEmit`을 빌드 스크립트에 넣어서 타입 체킹을 하도록 설정할 수 있습니다. (* `--noEmit`: 컴파일링 없이 타입 체킹만을 수행하는 옵션)

Vite의 TypeScript 컴파일링은 **[Esbuild](https://github.com/evanw/esbuild)**를 이용하며, TypeScript 소스 코드를 JavaScript 소스 코드로 변환하는 작업에 대해 `tsc` 대비 약 20~30배 정도 빠른 퍼포먼스를 보이고 있습니다. (HMR은 50ms 미만)

참고로 타입만을 가져오는 경우 잘못 번들링이 될 수 있으며, 이는 **[타입 전용 Imports와 Exports](https://www.typescriptlang.org/ko/docs/handbook/release-notes/typescript-3-8.html#type-only-imports-and-export)**를 사용하여 이 문제를 우회할 수 있습니다:

```tsx
import type { T } from 'only/types'
export type { T }
```