# New Framwork-level Recommendations (새로운 프레임워크 수준 권장 사항)

Vue3의 지원 라이브러리가 업데이트 되었습니다. 다음은 새로운 권장사항입니다.

- Vue 3 지원이 포함된 새로운 버전의 라우터, Devtools 및 테스트 유틸리티
- 빌드 도구 모음: Vue CLI -> [Vite](https://vitejs.dev/)
- 상태 관리: Vuex -> [Pinia](https://pinia.vuejs.org/)
- IDE 지원: Vetur -> [Volar](https://marketplace.visualstudio.com/items?itemName=johnsoncodehk.volar)
- 새로운 명령줄 TypeScript 지원: [vue-tsc](https://github.com/johnsoncodehk/volar/tree/master/packages/vue-tsc)
- SSG: VuePress -> [VitePress](https://vitepress.vuejs.org/)
- JSX: `@vue/babel-preset-jsx[@vue/babel-plugin-jsx](https://github.com/vuejs/jsx-next)`

---

## 1. Details (세부사항)

**Build Toolchain**

 Vue3 프로젝트는 새로운 Build tool로 [Vite](https://vitejs.dev/)를 권장합니다. Vite는 매우 빠른 server start 및 Hot update 성능을 제공하는 새로운 build tool입니다. 

원래 Vue team에서 만들었지만 지금은 cross-framwork tool입니다. 

 [Vite를 추천하는 이유](https://vitejs.dev/guide/why.html) 에 대해 자세히 알아보세요 .

 

새로운 scaffolding 도구인 `create-vue` 을 통해 Vite 기반 Vue3 프로젝트를 생성할 수 있습니다.

 

```html
npm init vue@3
```

 Vue CLI도 Vue3을 지원하도록 업그레이드 되었지만 현재 유지 관리 중이며, 더 이상 새 프로젝트에 권장되지 않습니다. 

 Vue CLI에서 Vite로 마이그레이션 하는 방법입니다.

- [Vue CLI -> VueSchool.io의 Vite 마이그레이션 가이드](https://vueschool.io/articles/vuejs-tutorials/how-to-migrate-from-vue-cli-to-vite/)
- [자동 마이그레이션에 도움이 되는 도구/플러그인](https://github.com/vitejs/awesome-vite#vue-cli)

또한 [새 문서의 도구 장을](https://vuejs.org/guide/scaling-up/tooling.html) 참조하십시오 .

---

## 2. Vue Router (뷰 라우터)

Vue Router 4.0은 Vue3의 지원을 제공하며 자체적으로 여러 주요 변경사항이 있습니다. 

[자세한 내용은 마이그레이션 가이드](https://router.vuejs.org/) 를 확인 하세요.

- [Documentation](https://router.vuejs.org/)
- [GitHub](https://github.com/vuejs/router)
- [RFCs](https://github.com/vuejs/rfcs/pulls?q=is%3Apr+is%3Amerged+label%3Arouter)

---

## 3. State Management (상태관리)

[Pinia](https://pinia.vuejs.org/) 는 새롭게 권장되는 대규모 상태 관리 솔루션입니다. Pinia는 Vuex 5의 프로토타입으로 만들어졌으며 이제 Vuex 5에 대해 계획한 것을 사실상 구현하는 단계로 발전했습니다. 

핵심 팀원([에두아르도](https://github.com/posva) )이 작업에 투입한 작업량을 고려하여 원래 이름을 유지합니다.. 

- [Documentation](https://pinia.vuejs.org/)
- [GitHub](https://github.com/vuejs/pinia)
- [State management chapter in new docs](https://vuejs.org/guide/scaling-up/state-management.html)

Vuex 4.0은 또한 3.x와 거의 동일한 API로 Vue 3 지원을 제공하며 Vue 3으로 마이그레이션해야 하는 기존 Vuex 스토어가 있는 경우 사용할 수 있습니다. 유일한 주요 변경 사항은 [플러그인 설치 방법](https://next.vuex.vuejs.org/guide/migrating-to-4-0-from-3-x.html#breaking-changes) 입니다.

---

## 4. **IDE Support (IDE 지원)**

[Volar](https://github.com/johnsoncodehk/volar) 는 템플릿 표현식에 대한 전체 유형 추론을 포함하여 Vue SFC에 대한 TypeScript 지원이 크게 개선된 새로운 공식 VSCode 확장입니다.

이전에 Vetur를 설치했다면 Volar와 충돌하지 않도록 비활성화해야 합니다

---

## 5. Devtools EXtension (Devtools 확장)

devtools 확장은 Vue 2와 Vue 3을 모두 지원하기 위해 주요 업데이트(v6으로 출시)를 받았습니다. 이전에 베타 채널을 통해 v6을 설치했다면 지금 제거하고 안정적인 채널에서 확장을 설치할 수 있습니다.

- [Documentation](https://devtools.vuejs.org/guide/installation.html)
- [GitHub](https://github.com/vuejs/devtools)

---

## 6. TypeScript Support (타입스크립트 지원)

이제 [vue-tsc](https://github.com/johnsoncodehk/volar/tree/master/packages/vue-tsc) 를 사용하여 명령줄에서 Vue SFC에 대한 정의 파일을 유형 확인하고 생성할 수 있습니다 .

 [새 문서의 TypeScript 가이드](https://vuejs.org/guide/typescript/overview.html) 참조

---

## 7. **Static Site Generator (정적 사이트 생성기)**

[VitePress](https://vitepress.vuejs.org/) 는 Vue 3 + Vite를 기반으로 구축된 VuePress의 영적 계승자입니다. 훨씬 우수한 개발 경험을 제공하고 더 빠른 사이트를 생성합니다.

---

## 8. **JSX**

Vue 3에 대한 JSX 지원은 이제 `[@vue/babel-plugin-jsx](https://github.com/vuejs/babel-plugin-jsx)`.