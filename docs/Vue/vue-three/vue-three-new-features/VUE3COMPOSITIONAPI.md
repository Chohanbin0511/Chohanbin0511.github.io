# Vue 3 Migration

## Vue 3의 새로운 기능

- Composition API
- SFC Composition API Syntax Sugar (  `<script setup>`)
- Teleport
- Fragments
- Emits Component Option
- `createRenderer` API from  `@vue/runtime-core`  to create custom renderers
- SFC State-driven CSS Variables ( `v-bind` in `<style>` ) (SFC 상태기반 CSS최적화)
- SFC `<style scoped>` can now include global rules for rules that target only slotted content
- Suspense

---

### 1. Composition API

  Compositon API는 options을 선언하는 대신 가져온 함수를 사용하여 Vue 구성 요소를 작성할 수 있는 API입니다. 다음 API를 포괄하는 용어입니다.

 

- [**Reactivity API]** , 예를 들어, `ref()` 와 `reactive()` 같이  Computed된 state 와 Reative State, watchers를 직정 생성할수 있는 API
- **[Lifecycle Hooks],** 예를 들어, ( `onMouted()` 와 `onUnmounted()`)를 통해 프로그래밍 방식으로 구성요소 라이프 사이클에 연결할 수 있습니다.
- **[Dependency Injection]**(의존성 주입), 즉 ( `provied()` 와 `inject()` ) 이고, Reactivity API를 사용하는 동안 Vue의 종속성 주입 시스템을 사용할 수 있습니다

Composition API는 Vue 3의 내장 기능이며, 현재 공식적으로 유지 관리 되는 @vue/compostion-api 플러그인을 통해 Vue 2에서 사용할 수 있습니다. 

Vue 3 에서는 주로 Single-File Compoenents(SFC:단일파일 구성요소)의  `<script setup>` 구문과 함께 사용됩니다. 

**Composition API를 사용하는 구성 요소의 기본 예시**

```jsx
<script setup>
import { ref, onMounted } from 'vue'

// reactive state
const count = ref(0)

// functions that mutate state and trigger updates
function increment() {
  count.value++
}

// lifecycle hooks
onMounted(() => {
  console.log(`The initial count is ${count.value}.`)
})
</script>

<template>
  <button @click="increment">Count is: {{ count }}</button>
</template>
```

Function Composition을 기반으로 하는 API Style에도 불구하고 **Composition API는 함수형 프로그래밍이 아닙니다** .

 Composition API는 Vue의 변경 가능하고 세분화된 반응성 패러다임을 기반으로 하는 반면 기능적 프로그래밍은 불변성을 강조합니다.

---

★ **왜 Compostion API인가?**

**더 나은 논리 재사용 (Better Logic Reuse)**

Composition API의 주요 이점은 **[컴포저블 함수](https://vuejs.org/guide/reusability/composables.html)** 의 형태로 깨끗하고 효율적인 논리 재사용이 가능합니다. 옵션 API의 기본 로직 재사용 메커니즘인 **[mixins의 모든 단점](https://vuejs.org/guide/reusability/composables.html#vs-mixins)**을 해결 합니다. 

<aside>
💡 Vue 3에서는 더 이상 믹스인을 사용하지 않는 것이 좋습니다. 이 기능은 마이그레이션 및 친숙함을 위해서만 유지됩니다.

</aside>

Composition API의 로직 재사용 기능은  **[VueUse](https://vueuse.org/)** , 컴포저블 유틸리티 컬렉션 과 같은 인상적인 커뮤니티 프로젝트를 탄생시켰습니다. 또한 상태 저장 타사 서비스 또는 라이브러리를 Vue의 반응성 시스템(예: **[immutable data](https://vuejs.org/guide/extras/reactivity-in-depth.html#immutable-data) ,** **[state machines](https://vuejs.org/guide/extras/reactivity-in-depth.html#state-machines) ,[RxJS](https://vueuse.org/rxjs/readme.html#vueuse-rxjs)**)에 쉽게 통합하기 위한 깨끗한 메커니즘의 역할도 합니다 .

<aside>
💡 Vue Use에서 Vite + Vue 3 , Nuxt 3 + Vue 3, 등등 데모 버젼 확인이 가능합니다.

</aside>

**보다 유연한 코드 구성 (More Flexible Code Organization)**

많은 사용자들은 기본적으로 Options API를 사용하여 조직화된 코드작성을 선호합니다. 그러나 단일 single component's의 논리가 특정 복잡성 임계값을 초과하면 Options API에 심각한 제한이 따릅니다. 이 제한은 여러 프로덕션 Vue 2 앱에서 직접 목격한 여러 **논리적 문제** 를 처리해야 하는 구성 요소에서 특히 두드러 집니다.

Vue CLI의 GUI에서 폴더 탐색기 구성 요소를 예로 들어 보겠습니다. 이 구성 요소는 다음과 같은 논리적 문제가 있습니다.

- 현재 폴더 상태 추적 및 내용 표시
- 폴더 탐색 처리(열기, 닫기, 새로 고침...)
- 새 폴더 생성 처리
- 즐겨찾기 폴더만 표시 전환
- 숨김 폴더 표시 전환
- 현재 작업 디렉토리 변경 처리

원래 버전은 Options API로 작성되었습니다. 처리하는 논리적 문제에 따라 코드의 각 줄에 색상을 지정하면 다음과 같습니다.

[Options API로 구성된 소스 보기](https://github.com/vuejs/vue-cli/blob/a09407dd5b9f18ace7501ddb603b95e31d6d93c0/packages/@vue/cli-ui/src/components/folder/FolderExplorer.vue#L198-L404)

[Composition API로 구성된 소스 보기](https://gist.github.com/yyx990803/8854f8f6a97631576c14b63c8acd8f2e)

![https://vuejs.org/assets/composition-api-after.e3f2c350.png](https://vuejs.org/assets/composition-api-after.e3f2c350.png)

특정 문제를 작업하는 동안  다른 옵션 블록으로 이동할 필요가 없습니다.  

또한, 추출을 위해 더 이상 코드를 섞을 필요가 없기 때문에 최소한의 노력으로 코드 그룹을 외부 파일로 이동할 수 있습니다. 

리팩토링을 위한 이러한 감소된 마찰은 대규모 코드베이스에서 장기적인 유지 관리의 핵심입니다.

**더 나은 유형 추론 (Better Type Inference)**

최근 몇 년 동안 점점 더 많은 프론트엔드 개발자가 **[TypeScript](https://www.typescriptlang.org/)** 를 채택하고 있습니다.

 TypeScript가 더 강력한 코드를 작성하고, 더 자신 있게 변경하고, IDE 지원을 통해 뛰어난 개발 경험을 제공하는 데 도움이 되기 때문입니다. 

 그러나 원래 2013년에 고안된 Options API는 유형 유추를 염두에 두지 않고 설계되었습니다. 

유형 추론이 Options API와 함께 작동하도록 하려면 **[터무니없이 복잡한 유형 체조](https://github.com/vuejs/core/blob/44b95276f5c086e1d88fa3c686a5f39eb5bb7821/packages/runtime-core/src/componentPublicInstance.ts#L132-L165)** 를 구현해야 했습니다 . 이러한 모든 노력에도 불구하고 옵션 API에 대한 유형 추론은 여전히 믹스인 및 종속성 주입에 대해 분해될 수 있습니다.

이로 인해 TS와 함께 Vue를 사용하려는 많은 개발자가`vue-class-component`로 구동되는 Class API에 의존하게 되었습니다.  그러나 Class 기반 API는 2019년 Vue 3가 개발될 때 2단계 제안에 불과했던 언어 기능인 ES decorators에 크게 의존합니다. 

불안정한 제안에 공식 API를 기반으로 하는 것은 너무 위험하다고 느꼈습니다. 

그 이후로 데코레이터 제안은 또 다른 완전한 점검을 거쳤으며 이 글을 쓰는 시점에서 아직 3단계에 도달하지 못했습니다. 또한 Class 기반 API는 Options API와 유사한 논리 재사용 및 구성 제한이 있습니다.

이에 비해 Composition API는 자연적으로 유형 친화적인 일반 변수와 함수를 주로 사용합니다. Composition API로 작성된 코드는 수동 유형 힌트가 거의 필요 없이 전체 유형 추론을 즐길 수 있습니다. 

대부분의 경우 Composition API 코드는 TypeScript와 일반 JavaScript에서 거의 동일하게 보입니다. 이것은 또한 일반 JavaScript 사용자가 부분 유형 추론의 이점을 누릴 수 있도록 합니다.

**더 작은 Production Bundle 및 더 적은 Overhead**

Composition API로 작성된 코드 `<script setup>`는 Options API에 비해 더 효율적이고 축소하기 쉽습니다. 이는 Component의 Template이 코드 `<script setup>`의 동일한 범위에 인라인된 함수로 컴Compile 되기 때문입니다. `<script setup>`의 속성 액세스와 달리 컴파일된 Template 코드는 사이에 instance proxy 없이 `this`내부에 선언된 변수에 직접 액세스할 수 있습니다 . `<script setup>`은 모든 변수 이름을 안전하게 단축할 수 있기 때문에 더 효과적입니다

---

★ **Options API와의 관계**

****Trade-offs (절충안)****

Options API에서 이동하는 일부 사용자는 자신의 구성 API 코드가 덜 구성되어 있다는 것을 발견하고 구성 API가 코드 구성 측면에서 "더 나쁘다"고 결론지었습니다. 이러한 의견을 가진 사용자는 문제를 다른 관점에서 볼 것을 권장합니다.

Composition API가 더 이상 코드를 해당 버킷에 넣도록 안내하는 "가드 레일"을 제공하지 않는 것이 사실입니다. 그 대가로 일반 JavaScript를 작성하는 것과 같은 구성 요소 코드를 작성할 수 있습니다. 즉 **, 일반 JavaScript를 작성할 때와 마찬가지로 모든 코드 구성 모범 사례를 Composition API 코드에 적용할 수 있고 적용해야 합니다** . 잘 구성된 자바스크립트를 작성할 수 있다면 잘 구성된 Composition API 코드도 작성할 수 있어야 합니다.

Options API를 사용하면 구성 요소 코드를 작성할 때 "생각을 덜"할 수 있으므로 많은 사용자가 이 API를 좋아합니다. 그러나 정신적 오버헤드를 줄이는 데 있어 탈출구가 없는 규정된 코드 구성 패턴에 갇히게 되므로 대규모 프로젝트에서 코드 품질을 리팩토링하거나 개선하기 어려울 수 있습니다. 이와 관련하여 Composition API는 더 나은 장기 확장성을 제공합니다.

****Composition API는 모든 사용 사례를 포괄합니까?****

상태 저장 논리 측면에서 그렇습니다. Composition API를 사용할 때 여전히 필요할 수 있는 몇 가지 옵션 [ `props`, `emits`, `name`, `inheritAttrs` ]이  있습니다.

`<script setup>` 을 사용하는 경우 일반적으로`inheritAttrs`는 별도의 일반 `<script>` 블록이 필요할 수 있는 유일한 옵션입니다.

위에 나열된 옵션과 함께 Composition API를 독점적으로 사용하려는 경우 Vue에서 Options API 관련 코드를 삭제 하는 **[컴파일 타임 플래그 를 통해 프로덕션 번들에서 몇 kb를 줄일 수 있습니다.](https://github.com/vuejs/core/tree/main/packages/vue#bundler-build-feature-flags)** 이는 종속성의 Vue 구성 요소에도 영향을 미칩니다.

****두 API를 함께 사용할 수 있습니까?****

예. **`[setup()](https://vuejs.org/api/composition-api-setup.html)`**Options API 구성 요소의 옵션을 통해 Composition API를 사용할 수 있습니다 .

그러나 새로운 기능/Composition API로 작성된 외부 라이브러리와 통합해야 하는 기존 Options API 코드베이스가 있는 경우에만 그렇게 하는 것이 좋습니다.

**Options API가 더 이상 사용되지 않습니까?**

아니요. Options API는 Vue의 필수적인 부분이며 많은 개발자들이 Vue를 좋아하는 이유입니다. 우리는 또한 합성 API의 많은 이점이 대규모 프로젝트에서만 나타나며 Options API는 복잡도가 낮거나 중간인 많은 시나리오에서 여전히 확실한 선택이라는 것을 알고 있습니다.

---

★ ****클래스 API와의 관계****

Composition API가 추가적인 로직 재사용 및 코드 구성 이점과 함께 뛰어난 TypeScript 통합을 제공한다는 점을 감안할 때 Vue 3에서 Class API를 더 이상 사용하지 않는 것이 좋습니다

---

★ ****React Hooks와의 비교****

Composition API는 React Hooks와 동일한 수준의 논리 구성 기능을 제공하지만 몇 가지 중요한 차이점이 있습니다.

React Hooks는 구성 요소가 업데이트될 때마다 반복적으로 호출됩니다. 이것은 노련한 React 개발자들조차 혼동할 수 있는 여러 가지 주의 사항을 만듭니다. 또한 개발 경험에 심각한 영향을 줄 수 있는 성능 최적화 문제로 이어집니다. 여기 몇 가지 예가 있어요.

- 후크는 호출 순서에 민감하며 조건부일 수 없습니다.
- React 구성 요소에 선언된 변수는 후크 클로저에 의해 캡처될 수 있으며 개발자가 올바른 종속성 배열을 전달하지 못하면 "부실"이 될 수 있습니다. 이로 인해 React 개발자는 ESLint 규칙에 의존하여 올바른 종속성이 전달되도록 합니다. 그러나 규칙은 종종 충분히 똑똑하지 않고 정확성에 대해 과도하게 보상하므로 극단적인 경우가 발생하면 불필요한 무효화와 골치 아픈 문제가 발생합니다.
- 값비싼 계산에는 `useMemo`올바른 종속성 배열을 수동으로 전달해야 하는 의 사용이 필요합니다.
- 자식 구성 요소에 전달된 이벤트 핸들러는 기본적으로 불필요한 자식 업데이트를 일으키며 `useCallback`최적화를 위해 명시적이어야 합니다. 이것은 거의 항상 필요하며 올바른 종속성 배열이 다시 필요합니다. 이를 무시하면 기본적으로 앱이 과도하게 렌더링되고 깨닫지 못하는 사이에 성능 문제가 발생할 수 있습니다.
- 동시성 기능과 결합된 부실 클로저 문제는 후크 코드가 실행되는 시기에 대해 추론하기 어렵게 만들고 렌더를 통해 유지되어야 하는 변경 가능한 상태로 작업하는 것을 `useRef`번거롭게 만듭니다.

이에 비해 Vue Composition API는 다음과 같습니다.

- 한 번만 호출 `setup()`하거나 코딩합니다. `<script setup>`이것은 걱정할 오래된 클로저가 없기 때문에 코드가 관용적 JavaScript 사용의 직관에 더 잘 맞도록 합니다. Composition API 호출도 호출 순서에 민감하지 않으며 조건부일 수 있습니다.
- Vue의 런타임 반응성 시스템은 computed properties 및 watchers 에서 사용되는 반응성 종속성을 자동으로 수집하므로 종속성을 수동으로 선언할 필요가 없습니다.
- 불필요한 자식 업데이트를 피하기 위해 수동으로 콜백 함수를 캐시할 필요가 없습니다. 일반적으로 Vue의 세분화된 반응성 시스템은 자식 구성 요소가 필요할 때만 업데이트되도록 합니다. 수동 자식 업데이트 최적화는 Vue 개발자에게 거의 문제가 되지 않습니다.

우리는 React Hooks의 창의성을 인정하며 이는 Composition API에 대한 주요 영감의 원천입니다. 그러나 위에서 언급한 문제는 디자인에 존재하며 Vue의 반응성 모델이 이러한 문제를 해결할 수 있는 방법을 제공한다는 것을 알았습니다.

---

### 2. SFC Composition API Syntax Sugar (  `<script setup>`)

## 주요 변경 사항

## 새로운 구성요소