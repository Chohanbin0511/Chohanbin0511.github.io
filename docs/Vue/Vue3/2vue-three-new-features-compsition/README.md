# Vue3의 새로운 기능

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

## 1. Composition API

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

💡 Vue 3에서는 더 이상 믹스인을 사용하지 않는 것이 좋습니다. 이 기능은 마이그레이션 및 친숙함을 위해서만 유지됩니다.


Composition API의 로직 재사용 기능은  **[VueUse](https://vueuse.org/)** , 컴포저블 유틸리티 컬렉션 과 같은 인상적인 커뮤니티 프로젝트를 탄생시켰습니다. 또한 상태 저장 타사 서비스 또는 라이브러리를 Vue의 반응성 시스템(예: **[immutable data](https://vuejs.org/guide/extras/reactivity-in-depth.html#immutable-data) ,** **[state machines](https://vuejs.org/guide/extras/reactivity-in-depth.html#state-machines) ,[RxJS](https://vueuse.org/rxjs/readme.html#vueuse-rxjs)**)에 쉽게 통합하기 위한 깨끗한 메커니즘의 역할도 합니다 .

💡 Vue Use에서 Vite + Vue 3 , Nuxt 3 + Vue 3, 등등 데모 버젼 확인이 가능합니다.

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

## 2. SFC Composition API Syntax Sugar

`<script setup>` Single File Compoents(SFCs) 내에서 Composition API를 사용하기 위한 Compile-time 구문입니다. SFC와 Compositions API를 모두 사용하는 경우 권장되는 구문입니다.

일반 `<script>` 구문보다 많은 이점을 제공합니다.

- 더 적은 상용구로 더 간결한 코드
- 순수 TypeScript를 사용하여 소품 및 방출된 이벤트를 선언하는 기능
- 더 나은 런타임 성능(템플릿은 중간 프록시 없이 동일한 범위의 렌더 함수로 컴파일됨)
- 더 나은 IDE 유형 추론 성능(언어 서버가 코드에서 유형을 추출하는 작업 감소)

---

**기본 구문**

구문을 선택하려면 `<script>` 블록에 `setup` 속성을 추가하세요.

```jsx
<script setup>
console.log('hello script setup')
</script>
```

내부 코드는 components `setup()` 기능의 내용으로 컴파일됩니다 . 즉 , 구성 요소를 처음 가져올 때 한 번만 실행되는 normal `<script>` 과 구성 요소를 처음 가져올 때 한 번만 실행되지만 `<script setup>` 내부의 코드는 구성 요소의 인스턴스가 생성될 때마다 실행됩니다.

★ ****최상위 바인딩은 템플릿에 노출됩니다.****

`<script setup>` 을 사용할때 내부에 선언된 모든 최상위 바인딩 (변수, 함수 선언 및 가져오기 포함)

`<script setup>` 은 템플릿에서 직접 사용할 수 있습니다.

```jsx
<script setup>
// variable
const msg = 'Hello!'

// functions
function log() {
  console.log(msg)
}
</script>

<template>
  <button @click="log">{{ msg }}</button>
</template>
```

Import한 바인딩도 같은 방식으로 노출됩니다 . 즉, `methods` 옵션을 통해 노출하지 않고도 템플릿 표현식에서 가져온 helper function을 직접 사용할 수 있습니다.

즉, `methods` 옵션을 통해 노출하지 않고도 템플릿 표현식에서 가져온 도우미 함수를 직접 사용할 수 있습니다.

```jsx
<script setup>
import { capitalize } from './helpers'
</script>

<template>
  <div>{{ capitalize('hello') }}</div>
</template>
```

---

**Reactivity**

**[Reactivity APIs](https://vuejs.org/api/reactivity-core.html)**를 사용하여 반응성 상태를 명시적으로 생성해야 합니다 . `setup()` function 에서 반환된 값과 유사하게 ref는 템플릿에서 참조될 때 자동으로 래핑이 해제됩니다.

```jsx
<script setup>
import { ref } from 'vue'

const count = ref(0)
</script>

<template>
  <button @click="count++">{{ count }}</button>
</template>
```

---

****구성 요소 사용****

범위의 값은 `<script setup>`사용자 정의 구성 요소 태그 이름으로 직접 사용할 수도 있습니다

```jsx
<script setup>
import MyComponent from './MyComponent.vue'
</script>

<template>
  <MyComponent />
</template>
```

`MyComponent`변수로 참조됩니다 . JSX를 사용한 적이 있는 경우 e mental model과 유사합니다. 해당하는 kebab-case `<my-component>`도 템플릿에서 작동하지만 일관성을 위해 PascalCase 구성 요소 태그를 사용하는 것이 좋습니다.  또한 기본 사용자 정의 요소와 구별하는 데 도움이 됩니다.

💡 vue2 에선 kebab-case 사용했지만 vue3에선 코드 일관성을위해 PascalCase 사용

★ ****동적 구성요소****

`:is`구성 요소는 문자열 키 아래에 등록되는 대신 변수로 참조되므로 내부에서 동적 구성 요소를 사용할 때 동적 바인딩 `<script setup>` 을 사용해야 합니다

```jsx
<script setup>
import Foo from './Foo.vue'
import Bar from './Bar.vue'
</script>

<template>
  <component :is="Foo" />
  <component :is="someCondition ? Foo : Bar" />
</template>
```

components 를 삼항 표현식에서 변수로 사용할 수 있습니다

★ **재귀 구성요소**

SFC는 파일 이름을 통해 암시적으로 자신을 참조할 수 있습니다. 예를 들어 이름이 지정된 파일 `<FooBar/>` 는 템플릿에서 `FooBar.vue`와 같이 자신을 참조할 수 있습니다 .

가져온 구성 요소보다 우선 순위가 낮습니다. 구성 요소의 유추된 이름과 충돌하는 명명된 가져오기가 있는 경우 가져오기에 별칭을 지정할 수 있습니다.

```jsx
import { FooBar as FooBarChild } from './components'
```

★ ****네임스페이스 구성요소****

`<Foo.Bar>`개체 속성 아래에 중첩된 구성 요소를 참조하기 위해 점과 함께 구성 요소 태그를 사용할 수 있습니다 . 단일 파일에서 여러 구성요소를 가져올 때 유용합니다.

```jsx
<script setup>
import * as Form from './form-components'
</script>

<template>
  <Form.Input>
    <Form.Label>label</Form.Label>
  </Form.Input>
</template>
```

---

****사용자 지정 지시문 사용****

전역적으로 등록된 사용자 지정 지시문은 정상적으로 작동합니다. 로컬 사용자 지정 지시문은 `vNameOfDirective` 에 명시적으로 등록할 필요는 없지만 `<script setup>` 명명 체계를 따라야 합니다 

```jsx
<script setup>
const vMyDirective = {
  beforeMount: (el) => {
    // do something with the element
  }
}
</script>
<template>
  <h1 v-my-directive>This is a Heading</h1>
</template>
```

다른 곳에서 지시문을 가져오는 경우 필요한 명명 체계에 맞게 이름을 바꿀 수 있습니다.

```jsx
<script setup>
import { myDirective as vMyDirective } from './MyDirective.js'
</script>
```

---

****defineProps() & defineEmits()****

전체 유형 추론 지원과 함께 `props` 및 `emits`과 같은 옵션을 선언하려면 `<script setup>` 내에서 자동으로 사용할 수 있는 `defineProps` 및 `defineEmits` API를 사용할 수 있습니다.

```jsx
<script setup>
const props = defineProps({
  foo: String
})

const emit = defineEmits(['change', 'delete'])
// setup code
</script>
```

- `defineProps` 와 `defineEmits` 은 `<script setup>` 내부에서만 사용할 수 있는 **컴파일러 매크로** 입니다.  Import할 필요가 없으며 `<script setup>`처리될 때 컴파일됩니다.
- `defineProps`옵션은 `props`과 동일한 값을 허용하는 반면 `defineEmits`옵션은 `emits`과 동일한 값을 허용합니다 .
- `defineProps` 와 `defineEmits` 에 전달된 옵션을 기반으로 적절한 유형 추론을 제공합니다 .
- 전달된 옵션 `defineProps`, `defineEmits` 은 설정에서 모듈 범위로 호이스트됩니다 따라서 옵션은 설정 범위에서 선언된 지역 변수를 참조할 수 없습니다. 그렇게 하면 컴파일 오류가 발생합니다. 그러나 가져온 바인딩도 모듈 범위에 있으므로 참조 할 수 있습니다.

**[TypeScript를 사용하는 경우 순수 유형 주석을 사용하여 props 및](https://vuejs.org/api/sfc-script-setup.html#typescript-only-features)** emission을 선언하는 것도 가능합니다 .

---

****defineExpose()****

사용하는 구성 요소 는 기본적 `<script setup>`으로 닫혀 있습니다. 즉 템플릿 참조 또는 체인`$parent` 을 통해 검색되는 구성 요소의 공개 인스턴스는 `<script setup>`  내부에 선언된 바인딩을 노출하지 않습니다.

`<script setup>` component의 속성을 명시적으로 노출하려면 `defineExpose`컴파일러 매크로를 사용합니다.

```jsx
<script setup>
import { ref } from 'vue'

const a = 1
const b = ref(2)

defineExpose({
  a,
  b
})
</script>
```

부모가 템플릿 참조를 통해 이 구성 요소의 인스턴스를 가져오면 검색된 인스턴스는 모양 `{ a: number, b: number }`이 됩니다(참조는 일반 인스턴스와 마찬가지로 자동으로 래핑 해제됨).

---

`**useSlots()`&`useAttrs()`**

템플릿에서 `$slots` 및 `$attrs`로 직접 액세스할 수 있기 때문에 `<script setup>` 내에서 `slots` 및 `attrs` 의 사용은 비교적 드물어야 합니다. 드물게 필요한 경우 `useSlots`및 `useAttrs` helpers를 각각 사용합니다.

```jsx
<script setup>
import { useSlots, useAttrs } from 'vue'

const slots = useSlots()
const attrs = useAttrs()
</script>
```

`useSlots`및 `useAttrs`는 `setupContext.slots` 및 `setupContext.attrs`에 해당하는 항목을 반환하는 실제 런타임 함수입니다. 일반 composition API 함수에서도 사용할 수 있습니다

---

**일반 `<script>` 와 함께 사용**

`<script setup>`은 일반 `<script>`와 함께 사용할 수 있습니다. 다음을 수행해야 하는 경우 일반 `<script>`가 필요할 수 있습니다.

- `<script setup>`에서 표현할 수 없는 옵션을 선언하십시오.
- 명명된 내보내기를 선언합니다.
- 부작용을 실행하거나 한 번만 실행되어야 하는 개체를 만듭니다.

```jsx
<script>
// normal <script>, executed in module scope (only once)
runSideEffectOnce()

// declare additional options
export default {
  inheritAttrs: false,
  customOptions: {}
}
</script>

<script setup>
// executed in setup() scope (for each instance)
</script>
```

---

**최상위 `await`**

최상위 `await`는 `<script setup>` 내에서 사용할 수 있습니다. 결과 코드는 `async setup()`으로 컴파일됩니다.

```jsx
<script setup>
const post = await fetch(`/api/post/1`).then((r) => r.json())
</script>
```

또한 awaited 표현식은 `await` 후 현재 구성 요소 인스턴스 컨텍스트를 유지하는 형식으로 자동 컴파일됩니다.

💡 `async setup()`은 현재 아직 실험적인 기능인 `Suspense`와 함께 사용해야 합니다. 향후 이를 마무리하고 문서화할 계획입니다. 하지만 지금 궁금하다면 [테스트](https://github.com/vuejs/core/blob/main/packages/runtime-core/__tests__/components/Suspense.spec.ts)를 참조하여 작동 방식을 확인할 수 있습니다.


---

****TypeScript 전용 기능****

★ ****Type-only props/emit 선언****

`Props`및 `emits`은 리터럴 유형 인수를 `defineProps` 또는 `defineEmits`에 전달하여 pure-type syntax을 사용하여 선언할 수도 있습니다.

```jsx
const props = defineProps<{
  foo: string
  bar?: number
}>()

const emit = defineEmits<{
  (e: 'change', id: number): void
  (e: 'update', value: string): void
}>()
```

`defineProps` 또는 `defineEmits`는 runtime 선언 또는 type 선언만 사용할 수 있습니다. 두 가지를 동시에 사용하면 컴파일 오류가 발생합니다.

type 선언을 사용할 때 이중 선언의 필요성을 제거하고 올바른 런타임 동작을 보장하기 위해 정적 분석에서 동등한 runtime 선언이 자동으로 생성됩니다.

- 개발 모드에서 컴파일러는 유형에서 해당 런타임 유효성 검사를 유추하려고 시도합니다. 예를 들어 여기 `foo: String`은 `foo: string` 유형에서 유추됩니다. 유형이 가져온 유형에 대한 참조인 경우 컴파일러에 외부 파일 정보가 없기 때문에 추론된 결과는 `foo: null` ( `any` type과 동일)이 됩니다.
- prod 모드에서 컴파일러는 번들 크기를 줄이기 위해 배열 형식 선언을 생성합니다(여기서 props는`['foo', 'bar']`로 컴파일됩니다).
- 내보낸 코드는 여전히 유효한 입력이 있는 TypeScript이며 다른 도구에서 추가로 처리할 수 있습니다

현재로서는 올바른 정적 분석을 보장하기 위해 type 선언 인수가 다음 중 하나여야 합니다.

- A type literal
- 동일한 파일에 있는 Interface 또는 type literal에 대한 참조

현재  complex 유형 및 다른 파일에서 type Imports는 지원되지 않습니다. 향후 type Imports를 지원할 수 있습니다.

★ **type 선언을 사용할 때 기본 props 값**

Type 전용 `defineProps`선언의 한 가지 단점은 props에 대한 기본값을 제공할 방법이 없다는 것입니다. 이 문제를 해결하기 위해 `withDefaults`컴파일러 매크로도 제공됩니다.

```jsx
export interface Props {
  msg?: string
  labels?: string[]
}

const props = withDefaults(defineProps<Props>(), {
  msg: 'hello',
  labels: () => ['one', 'two']
})
```

동등한 runtime props `default` 옵션으로 컴파일됩니다. 또한 `withDefaults` helpers는 기본값에 대한 유형 검사를 제공하고 반환된 `props`유형에 기본값이 선언된 속성에 대해 제거된 선택적 플래그가 있는지 확인합니다.

---

****Restrictions(제한)****

Module 실행 의미의 차이로 인해 `<script setup>` 내부의 코드는 SFC의 Context에 의존합니다. 외부 `.js` 또는 `.ts` 파일로 이동하면 개발자와 도구 모두에게 혼란을 초래할 수 있습니다. 따라서 `<script setup>`은 `src` 속성과 함께 사용할 수 없습니다.

---

## 3. Teleport

[**VUE3 Teleport 강의 영상**](https://vueschool.io/lessons/vue-3-teleport?friend=vuejs)

`<Teleport>`는 구성 요소 템플릿의 일부를 해당 구성 요소의 DOM 계층 구조 외부에 있는 DOM 노드로 "텔레포트"할 수 있게 해주는 내장 구성 요소입니다.

---

****기본 사용법****

 때때로 다음과 같은 상황을 마주칠 겁니다. compoenent’s template의 일부는 논리적으로 해당 template에 속하지만, 시각적인 관점에서는 Vue application 외부의 DOM 다른 어딘가에 표시되어야 합니다.

 가장 일반적인 예시는 full-screen modal을 빌드할 때입니다.  이상적으로는 modal의 button과 modal 자체가 모두 modal의 open/close 상태와 관련이 있기 때문에 동일한 component 내에 있기를 원합니다. 그러나 이는 modal이 버튼과 함께 렌더링되고 응용 프로그램의 DOM 계층 구조에 깊숙이 중첩되어 있음을 의미합니다. 이는 CSS를 통해 modal을 배치할 때 몇 가지 문제가 있습니다.

다음 HTML 구조

```jsx
<div class="outer">
  <h3>Vue Teleport Example</h3>
  <div>
    <MyModal />
  </div>
</div>
```

다음은 `<MyModal>` 구현

```jsx
<script setup>
import { ref } from 'vue'

const open = ref(false)
</script>

<template>
  <button @click="open = true">Open Modal</button>

  <div v-if="open" class="modal">
    <p>Hello from the modal!</p>
    <button @click="open = false">Close</button>
  </div>
</template>

<style scoped>
.modal {
  position: fixed;
  z-index: 999;
  top: 20%;
  left: 50%;
  width: 300px;
  margin-left: -150px;
}
</style>
```

component에는 modal의 opend을 트리거하는 `<button>`과 modal의 내용과 self-close 버튼을 포함하는 `.modal` 클래스가 있는 `<div>`가 포함되어 있습니다**.**

초기 HTML 구조 내에서 이 component를 사용할 때 여러 가지 잠재적인 문제가 있습니다.

 

- `position: fixed`는 조상 요소에 `transform`,  `perspective`  또는 `filter` property set가 없는 경우에만 viewport를 기준으로 요소를 배치합니다. 예를 들어, CSS 변환을 사용하여 조상 `<div class="outer">`에 애니메이션을 적용하려는 경우 modal layout이 깨집니다!
- modal의 `z-index`는 포함하는 요소에 의해 제한됩니다. `<div class="outer">`와 겹치고 `z-index`가 더 높은 또 다른 element가 있으면 modal을 덮을 것입니다.

`<Teleport>`는 중첩된 DOM 구조에서 벗어날 수 있도록 하여, 이런 문제를 해결할 수 있는 방법을 제공합니다. `<Teleport>`를 사용하도록 `<MyModal>`을 수정해 보겠습니다**.**

```jsx
<button @click="open = true">Open Modal</button>

<Teleport to="body">
  <div v-if="open" class="modal">
    <p>Hello from the modal!</p>
    <button @click="open = false">Close</button>
  </div>
</Teleport>
```

`<Teleport>`의 대상은 CSS 선택기 문자열 또는 실제 DOM 노드를 필요로 합니다. 여기서 본질적으로 Vue에게 "이 templeta 조각을 `body` Tag로 **Teleport**"하라고 지시합니다.

`<Teleport>`와 결합 **`[<Transition>](https://vuejs.org/guide/built-ins/transition.html)`**하여 애니메이션 모달을 만들 수 있습니다.

[**Modal 예시**](https://vuejs.org/examples/#modal)

💡 `<Teleport>` component가 mounted 될 때 대상으로의 Teleport는 이미 DOM에 있어야 합니다. 이상적으로는 전체 Vue 애플리케이션 외부의 element여야 합니다. Vue에서 렌더링한 다른 element를 대상으로 하는 경우 해당 요소가 `<Teleport>` 전에 moutned 되었는지 확인해야 합니다.


---

****Components와 함께 사용****

`<Teleport>`는 렌더링된 DOM 구조만 변경합니다. Components의 Logical 계층에는 영향을 주지 않습니다. 즉, `<Teleport>`에 component가 포함되어 있으면 해당 component는 `<Teleport>`를 포함하는 상위 구성 요소의 논리적 자식으로 유지됩니다. Props 전달 및 event Emits은 계속 동일한 방식으로 작동합니다.

 또한 상위 component의 주입이 예상대로 작동하고 하위 component가 실제 콘텐츠가 이동한 위치에 배치되는 대신 Vue Devtools의 상위 component 아래에 중첩된다는 것을 의미합니다.

---

****Teleport 비활성화****

경우에 따라 `<Teleport>`를 조건부로 `disable` 할 수 있습니다. 예를 들어 component  를 데스크톱용 overlay로 렌더링하지만 Mobile에서는 인라인으로 렌더링할 수 있습니다. `<Teleport>`는 동적으로 토글할 수 있는 disabled prop을 지원합니다.

```jsx
<Teleport :disabled="isMobile">
  ...
</Teleport>
```

`isMobile`미디어 쿼리 변경을 감지 하여 상태를 동적으로 업데이트할 수 있는 곳 입니다.

---

****동일한 대상에 Multiple Teleports****

일반적으로 `<Modal>` 여러 인스턴스가 동시에 활성화될 가능성이 있는 재사용 가능한 구성 요소입니다. 이러한 종류의 시나리오에서는 여러 `<Teleport>`구성 요소가 해당 콘텐츠를 동일한 대상 요소에 탑재할 수 있습니다. 순서는 단순 추가입니다. 이후 마운트는 대상 요소 내에서 이전 마운트 다음에 위치합니다.

일반적으로 여러 instance가 동시에 활성화되어 재사용 가능한 `<Modal>` component입니다. 이런 시나리오에서는 여러 `<Teleport>` component가 해당 콘텐츠를 동일한 대상 element에 탑재할 수 있습니다.  순서는 단순 추가입니다. 이후 마운트는 대상 요소 내에서 이전 마운트 다음에 위치합니다.

다음 사용법을 감안할 때:

```jsx
<Teleport to="#modals">
  <div>A</div>
</Teleport>
<Teleport to="#modals">
  <div>B</div>
</Teleport>
```

렌더링된 결과

```jsx
<div id="modals">
  <div>A</div>
  <div>B</div>
</div>
```

- **`[<Teleport>`API 참조](https://vuejs.org/api/built-in-components.html#teleport)**
- **[SSR에서 텔레포트 다루기](https://vuejs.org/guide/scaling-up/ssr.html#teleports)**

---

## 4. Fragments

****개요****

Vue 3에서 component는 이제 multi-root node components, 즉 fragements을 공식 지원합니다.

---

**2.x Syntax**

2.x에서는 multi-root components가 지원되지 않았으며 사용자가 실수로 component를 만들 때 경고를 표시했습니다. 이 오류를 수정하기 위해 많은 구성 요소가 단일 `<div>`로 래핑됩니다.

```jsx
<!-- Layout.vue -->
<template>
  <div>
    <header>...</header>
    <main>...</main>
    <footer>...</footer>
  </div>
</template>
```

---

**3.x Syntax**

3.x에서는 이제 multi-root components를 사용할 수 있습니다. 그러나 이를 위해서는 개발자가 속성을 배포해야 하는 위치를 명시적으로 정의해야 합니다.

```jsx
<!-- Layout.vue -->
<template>
  <header>...</header>
  <main v-bind="$attrs">...</main>
  <footer>...</footer>
</template>
```

속성 상속이 작동하는 방식에 대한 자세한 내용은 [**Fallthrough Attributes**](https://vuejs.org/guide/components/attrs.html#fallthrough-attributes) 를 참조하세요.

---

## 5. Emits Component Option

**emits**

component에서 내보낸 custom 이벤트를 선언합니다.

 Type

```tsx
interface ComponentOptions {
  emits?: ArrayEmitsOptions | ObjectEmitsOptions
}

type ArrayEmitsOptions = string[]

type ObjectEmitsOptions = { [key: string]: EmitValidator | null }

type EmitValidator = (...args: unknown[]) => boolean
```

**Details**

Emit된 이벤트는 두 가지 형식 입니다.

- 문자열 배열(Array of Strings)을 사용하는 간단한 형식
- 각 property key가 이벤트의 이름이고 값이 `null` 또는 Validation function인 개체를 사용하는 전체 형식입니다.

Validation function은 component의 `$emit` 호출에 전달된 추가 인수를 받습니다. 

예를 들어 `this.$emit('foo', 1)`이 호출되면 `foo`에 대한 해당 Validation function은 argument `1`을 수신합니다. Validation function은 이벤트 argument가 유효한지 여부를 나타내는 부울을 반환해야 합니다.

`emits` option은 기본 DOM 이벤트 리스너가 아닌 component 이벤트 리스너로 간주되는 이벤트 리스너에 영향을 미칩니다. 선언된 이벤트에 대한 리스너는 component의 `$attrs` Object 에서 제거되므로 compoent’s의 root element로 전달되지 않습니다. 자세한 내용은 **[Fallthrough Attributes](https://vuejs.org/guide/components/attrs.html)** 을 참조하세요.

**Example**

Array syntax:

```tsx
export default {
  emits: ['check'],
  created() {
    this.$emit('check')
  }
}
```

Object syntax:

```tsx
export default {
  emits: {
    // no validation
    click: null,

    // with validation
    submit: (payload) => {
      if (payload.email && payload.password) {
        return true
      } else {
        console.warn(`Invalid submit event payload!`)
        return false
      }
    }
  }
}
```

---

## 6. CreateRenderer API from @vue/runtime-core
 to create custom renderers

**createRenderer()**

사용자 지정 렌더러를 만듭니다. 플랫폼별 노드 생성 및 조작 API를 제공하여 Vue의 핵심 런타임을 활용하여 비 DOM 환경을 대상으로 할 수 있습니다

Type

```tsx
function createRenderer<HostNode, HostElement>(
  options: RendererOptions<HostNode, HostElement>
): Renderer<HostElement>

interface Renderer<HostElement> {
  render: RootRenderFunction<HostElement>
  createApp: CreateAppFunction<HostElement>
}

interface RendererOptions<HostNode, HostElement> {
  patchProp(
    el: HostElement,
    key: string,
    prevValue: any,
    nextValue: any,
    // the rest is unused for most custom renderers
    isSVG?: boolean,
    prevChildren?: VNode<HostNode, HostElement>[],
    parentComponent?: ComponentInternalInstance | null,
    parentSuspense?: SuspenseBoundary | null,
    unmountChildren?: UnmountChildrenFn
  ): void
  insert(
    el: HostNode,
    parent: HostElement,
    anchor?: HostNode | null
  ): void
  remove(el: HostNode): void
  createElement(
    type: string,
    isSVG?: boolean,
    isCustomizedBuiltIn?: string,
    vnodeProps?: (VNodeProps & { [key: string]: any }) | null
  ): HostElement
  createText(text: string): HostNode
  createComment(text: string): HostNode
  setText(node: HostNode, text: string): void
  setElementText(node: HostElement, text: string): void
  parentNode(node: HostNode): HostElement | null
  nextSibling(node: HostNode): HostNode | null

  // optional, DOM-specific
  querySelector?(selector: string): HostElement | null
  setScopeId?(el: HostElement, id: string): void
  cloneNode?(node: HostNode): HostNode
  insertStaticContent?(
    content: string,
    parent: HostElement,
    anchor: HostNode | null,
    isSVG: boolean
  ): [HostNode, HostNode]
}
```

**예시** 

```tsx
import { createRenderer } from '@vue/runtime-core'

const { render, createApp } = createRenderer({
  patchProp,
  insert,
  remove,
  createElement
  // ...
})

// `render` is the low-level API
// `createApp` returns an app instance
export { render, createApp }

// re-export Vue core APIs
export * from '@vue/runtime-core'
```

Vue 자체 `@vue/runtime-dom`는 **[동일한 API를 사용하여 구현됩니다](https://github.com/vuejs/core/blob/main/packages/runtime-dom/src/index.ts)** . 

더 간단한 구현을 **`[@vue/runtime-test](https://github.com/vuejs/core/blob/main/packages/runtime-test/src/index.ts)`**위해 Vue 자체 단위 테스트를 위한 private 패키지가 무엇인지 확인하세요.

---

## 7. SFC State-driven CSS Variables (v-bind in style)

****`v-bind()` in CSS**

SFC `<style>` 태그는 `v-bind` CSS 기능을 사용하여 CSS 값을 동적 구성 요소 상태에 연결하는 것을 지원합니다.

```tsx
<template>
  <div class="text">hello</div>
</template>

<script>
export default {
  data() {
    return {
      color: 'red'
    }
  }
}
</script>

<style>
.text {
  color: v-bind(color);
}
</style>
```

구문은 `<script setup>`과 함께 작동하며 JavaScript 표현식을 지원합니다(따옴표로 묶어야 함)

```tsx
<script setup>
const theme = {
  color: 'red'
}
</script>

<template>
  <p>hello</p>
</template>

<style scoped>
p {
  color: v-bind('theme.color');
}
</style>
```

실제 값은 hasg된 CSS 사용자 정의 속성으로 컴파일되므로 CSS는 여전히 정적입니다. 

Custom 속성은 인라인 스타일을 통해 구성 요소의 root element에 적용되고 소스 값이 변경되면 반응적으로 업데이트됩니다.

---

## 8. SFC can now include global rules or rules that target only slotted content

[URL참고](https://github.com/vuejs/rfcs/blob/master/active-rfcs/0023-scoped-styles-changes.md)

---
## 9. Suspense

💡 `<Suspense>` 는 실험적인 기능입니다. 안정적인 상태를 보장하지 않으며, 이전에 API가 변경될 수 있습니다.


`<Suspense>`구성 요소 트리에서 비동기 종속성을 조정하기 위한 기본 제공 Component입니다. 

구성 Component 트리 아래에 여러 중첩된 비동기 종속성이 해결될 때까지 기다리는 동안 로드 상태를 렌더링할 수 있습니다.

---

**Async Dependencies (비동기 종속성)**

`<Suspense>`가 해결하려고 하는 것과 이러한 비동기 종속성과 상호 작용하는 방식을 설명하기 위해 다음과 같은 구성 요소 계층 구조를 살펴보겠습니다.

```bash
<Suspense>
└─ <Dashboard>
   ├─ <Profile>
   │  └─ <FriendStatus> (component with async setup())
   └─ <Content>
      ├─ <ActivityFeed> (async component)
      └─ <Stats> (async component)
```

component tree에는 먼저 확인할 async resource(비동기 리소스)에 따라 렌더링이 달라지는 여러 중첩 components가 있습니다. `<Suspense>`가 없으면 각각 고유한 loading/error 및 loaded states를 처리해야 합니다. 최악의 시나리오에서는 페이지에 3개의 로딩 스피너가 표시되고 콘텐츠가 다른 시간에 표시될 수 있습니다.

`<Suspense>` component는 이러한 중첩된 비동기 종속성이 해결될 때까지 기다리는 동안 top-level loading/error states를 표시할 수 있는 기능을 제공합니다.

`<Suspense>`가 기다릴 수 있는 두 가지 유형의 비동기 종속성이 있습니다.

1. 비동기 `setup()` hook가 있는 component. 여기에는 top-level `await` expressions(표현식)과 함께 `<script setup>`을 사용하는 component가 포함됩니다.
2. [Async Component (비동기 컴포넌트)](https://vuejs.org/guide/components/async.html)

****`async setup()`****

Composition API component의 `setup()` hook는 async (비동기) 일 수 있습니다.

```jsx
export default {
  async setup() {
    const res = await fetch(...)
    const posts = await res.json()
    return {
      posts
    }
  }
}
```

`<script setup>`을 사용하는 경우 top-level await 표현식이 있으면 component가 자동으로 비동기 종속성을 갖게 됩니다.

```jsx
<script setup>
const res = await fetch(...)
const posts = await res.json()
</script>

<template>
  {{ posts }}
</template>
```

**Async Components (비동기 구성 요소)**

**Async Components**는 기본적으로 "**중단 가능**"합니다.

 즉, 상위 체인에 `<Suspense>`가 있는 경우 해당 `<Suspense>`의 비동기 종속성으로 처리됩니다.

 이 경우 로딩 상태는 `<Suspense>`에 의해 제어되며 component 자체의 loading, error, delay 및 timeout options은 무시됩니다.

**Async Components**는 `Suspense` control을 선택 해제하고 component가 options에서 `suspensible: false`를 지정하여 항상 자체 loaing state를 제어하도록 할 수 있습니다.

---

**Loading State**

`<Suspense>` component에는 `#default` 및 `#fallback`이라는 두 개의 slots 이 있습니다. 두 slots 모두 하나의 직계 child node만 허용합니다. 가능한 경우 기본 slot의 node가 표시됩니다. 그렇지 않은 경우 대체 slot의 node가 대신 표시됩니다.

```html
<Suspense>
  <!-- component with nested async dependencies -->
  <Dashboard />

  <!-- loading state via #fallback slot -->
  <template #fallback>
    Loading...
  </template>
</Suspense>
```

 초기 렌더링 시 `<Suspense>`는 default slot content를 메모리에 렌더링합니다. 프로세스 중에 비동기 종속성이 발생하면 **보류(pending)** 상태가 됩니다. **보류(pending)** 상태 동안 대체 콘텐츠가 표시됩니다. 발생한 모든 비동기 종속성이 해결되면 `<Suspense>`가 **해결된 (resolved)** 상태로 전환되고 해결된 기본 slot content가 표시됩니다.

 초기 렌더링 중에 비동기 종속성이 발생하지 않은 경우 `<Suspense>`는 직접 **해결된 (resolved)** 상태로 전환됩니다.

**해결된 (resolved)**상태에서 `<Suspense>`는 `#default` 슬롯의 root node가 교체되는 경우에만 **보류(pending)**상태로 되돌아갑니다. 

트리 깊숙이 중첩된 새로운 비동기 종속성으로 인해 `<Suspense>`가 **보류(pending)** 상태로 되돌아가지 않습니다.

**revert**가 발생하면 대체 content가 즉시 표시되지 않습니다. 대신 `<Suspense>`는 새 content와 해당 비동기 종속성이 해결될 때까지 기다리는 동안 이전 `#default` content를 표시합니다. 이 동작은 timeout prop으로 구성할 수 있습니다. 새로운 default content를 렌더링하는 데 시간 초과보다 오래 걸리는 경우 `<Suspense>`가 fallback content로 전환됩니다. 시간 초과 값이 0이면 default content가 교체될 때 fallback content가 즉시 표시됩니다.

---

**Events**

`<Suspense>` component는 3가지 이벤트( `pending`, `resolve`, `fallback`)를 내보냅니다. 

 `pending` 이벤트는 **보류 (pending)** 상태에 들어갈 때 발생합니다. new content가 default slot에서 확인을 완료하면 확인 이벤트가 발생합니다. fallback slot의 content가 표시될 때 대체 이벤트가 시작됩니다.

예를 들어 이벤트를 사용하여 새 compoent가 load되는 동안 이전 DOM 앞에 load indicator를 표시할 수 있습니다.

---

**Error Handling**

`<Suspense>`는 현재 coponent 자체를 통해 오류 처리를 제공하지 않습니다. 그러나 `[errorCaptured](https://vuejs.org/api/options-lifecycle.html#errorcaptured)` 옵션 또는 `[onErrorCaptured()](https://vuejs.org/api/composition-api-lifecycle.html#onerrorcaptured)` hook를 사용하여 `<Suspense>`의 상위 component에서 비동기 오류를 캡처하고 처리할 수 있습니다.

---

****Combining with Other Components(다른 component 와 결합)****

 `<Transition>` 및 `<KeepAlive>` component와 함께 `<Suspense>`를 사용하려는 것이 일반적입니다. 이러한 compoennt의 중첩 순서는 모든 component가 올바르게 작동하도록 하는 데 중요합니다.

 또한 이러한 component는 **[Vue Router](https://router.vuejs.org/)**의 `<RouterView>` component와 함께 사용되는 경우가 많습니다.

다음 예제에서는 이러한 component가 모두 예상대로 작동하도록 중첩하는 방법을 보여줍니다.

 더 간단한 조합의 경우 필요하지 않은 component를 제거할 수 있습니다.

```html
<RouterView v-slot="{ Component }">
  <template v-if="Component">
    <Transition mode="out-in">
      <KeepAlive>
        <Suspense>
          <!-- main content -->
          <component :is="Component"></component>

          <!-- loading state -->
          <template #fallback>
            Loading...
          </template>
        </Suspense>
      </KeepAlive>
    </Transition>
  </template>
</RouterView>
```

 **Vue Router**에는 dynamic imports를 사용하여 **component를 지연 로드([Lazily loading components](https://router.vuejs.org/guide/advanced/lazy-loading.html))**하는 기능이 내장되어 있습니다.

 이들은 비동기 구성 요소와 구별되며 현재 `<Suspense>`를 트리거하지 않습니다. 

그러나 여전히 비동기 component 를 하위 항목으로 가질 수 있으며 일반적인 방식으로 `<Suspense>`를 트리거할 수 있습니다.

---
