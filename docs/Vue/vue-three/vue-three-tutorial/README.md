# Vue3 Tutorial

[VSCode 단축키](https://www.notion.so/VSCode-292bd7c2336545df8a46f75e8c845032)

## 1. Vue3 시작하기

브라우저에서 바로 Vue로 작업하여 스터디를 진행했습니다.

자세한 Vue Guide는 **[Guide](https://vuejs.org/guide/introduction.html)**를 참고하면 좋습니다.

Vue는 Options API와 Composition API 두가지 API Style을 제공합니다.

저는 Composition API를 사용하여 스터디를 진행했습니다.

- **실행 예시**

```jsx
<script setup>
import { ref } from 'vue'

// component logic
</script>

<template>
  <h1>Hello World!</h1>
</template>
```

- **결과**

```jsx
Hello World!
```

---

## 2. ****Declarative Rendering(선언적 렌더링)****

아래 코드는 Vue SFC(Single File Component)입니다.  SFC는 파일 내부에 작성되어 HTML, CSS및 JavaScript를 캡슐화하여 재사용 가능한 코드블록입니다.

Vue의 핵심 기능은 [**선언적 렌더링]** 입니다. HTML을 확장하는 템플릿 구문을 사용하여 JavaScript 상태를 기반으로 HTML이 어떻게 보이는지 설명할 수 있습니다. 상태가 변경되면 HTML 이 자동으로 업데이트 됩니다.

특징 : 변경시 업데이트를 트리거 할수 있는 상태는 **[반응적인]**로 간주합니다. Vue의 `reactive()` API 를 사용하여 반응 상태를 선언할 수 있습니다. 여기서 생성되는 객체는 일반 객체처럼 작동하는 `reactive()` JavaScript 프록시 입니다.

```jsx
import { reactive } from 'vue'

const counter = reactive({
  count: 0
})

console.log(counter.count) // 0
counter.count++
```

`reactive()Map`객체(배열 및 및 와 같은 내장 유형 포함 `Set`)에서만 작동합니다. `ref()`, 반면에 모든 값 유형을 사용할 수 있으며 `.value`속성 아래에 내부 값을 노출하는 개체를 만들 수 있습니다.

```jsx
import { ref } from 'vue'

const message = ref('Hello World!')

console.log(message.value) // "Hello World!"
message.value = 'Changed'
```

자세한 내용은 **[Guide - Reactivity Fundamentals](https://vuejs.org/guide/essentials/reactivity-fundamentals.html)을** 참고 하세요.

구성 요소의 `<script setup>`블록에 선언된 반응 상태는 템플릿에서 직접 사용할 수 있습니다. 이것은 콧수염 구문을 사용하여 `counter`객체와 `message`ref의 값을 기반으로 동적 텍스트를 렌더링하는 방법입니다.

```jsx
<h1>{{ message }}</h1>
<p>count is: {{ counter.count }}</p>
```

`.value`템플릿에서 ref에 액세스할 때 사용할 필요가 없었습니다. `message`. 보다 간결한 사용을 위해 자동으로 언래핑됩니다.

콧수염 내부의 내용은 식별자나 경로로 사용하지만 더 나아가 유효한 JavaScript 표현식을 사용할 수 있습니다.

```html
<h1>{{ message.split('').reverse().join('') }}</h1>
```

- ****Declarative Rendering 실행 예시****

```jsx
<script setup>
import { reactive, ref } from 'vue'

const counter = reactive({ count: 0 })
const message = ref('Hello World!')
</script>

<template>
  <h1>{{ message }}</h1>
  <p>Count is: {{ counter.count }}</p>
</template>
```

- **결과**

```html
Hello World!
Count is: 0
```

---

## 3. Attribute Bindings(속성 바인딩)

Vue에서 콧수염은 텍스트에만 사용됩니다. 속성을 동적 값에 바인딩하려면 다음 `v-bind`지시문을 사용합니다

```html
<div v-bind:id="dynamicId"></div>
```

**지시문(directive)** 은 `v-`접두사 로 시작 하는 특수 속성입니다. Vue 템플릿 구문의 일부입니다. 텍스트 보간과 유사하게 지시문 값은 구성 요소의 상태에 액세스할 수 있는 JavaScript 표현식입니다. `v-bind`및 지시문 구문에 대한 자세한 내용은 **[Guide-Template Syntax](https://vuejs.org/guide/essentials/template-syntax.html)를** 참고하세요

콜론( `:id`) 다음 부분은 지시문의 "인수"입니다. 여기에서 요소의 `id`속성은 구성 요소 상태의 속성과 동기화됩니다 `dynamicId`.

`v-bind`은(는) 자주 사용 되기 때문에 전용 단축 구문이 있습니다

```html
<div :id="dynamicId"></div>
```

이제 ref 를 값으로 사용하여 에 동적 `class`바인딩 을 추가해 봅니다. 올바르게 바인딩된 경우 텍스트가 빨간색으로 바뀝니다.`<h1>titleClass`

- **Attribute Bindings(속성 바인딩) 예시**

```jsx
<script setup>
import { ref } from 'vue'

const titleClass = ref('title')
</script>

<template>
  <h1 :class="titleClass">Make me red</h1>
</template>

<style>
.title {
  color: red;
}
</style>
```

- **결과 (빨간 텍스트)**

```html
Make me red
```

---

## 4. Event Listeners (이벤트 리스너)

`v-on` 지시문 을 사용하여 DOM 이벤트를 수신할 수 있습니다 .

```html
<button v-on:click="increment">{{ count }}</button>
```

많이 사용되기 때문에  `v-on`약식으로 사용가능합니다

```html
<button @click="increment">{{ count }}</button>
```

여기서 `increment`은 다음에서 선언된 함수를 참조합니다 `<script setup>`.

```jsx
<script setup>
import { ref } from 'vue'

const count = ref(0)

function increment() {
  // update component state
  count.value++
}
</script>
```

함수 내에서 참조를 변경하여 구성 요소 상태를 업데이트할 수 있습니다.

이벤트 핸들러는 인라인 표현식을 사용할 수도 있으며 수정자를 사용하여 일반 작업을 단순화할 수 있습니다. 이러한 세부 사항은 **[Guide-Event Handling](https://vuejs.org/guide/essentials/event-handling.html)** 에서 다룹니다 .

함수에  .`increment` `v-on` 구현한 예시

- **Event Listeners 예시**

```jsx
<script setup>
import { ref } from 'vue'

const count = ref(0)

function increment() {
  count.value++
}
</script>

<template>
  <button @click="increment">count is: {{ count }}</button>
</template>
```

- **결과**

```html
count is: 5
```

---

## 5. Form Bindings (양식 바인딩)

`v-bind`및 함께 사용하여 `v-on`양식 입력 요소에 대한 양방향 바인딩을 만들 수 있습니다.

```jsx
<input :value="text" @input="onInput">
```

```jsx
function onInput(e) {
  // a v-on handler receives the native DOM event
  // as the argument.
  text.value = e.target.value
}
```

입력 상자에 입력할 때 `<p>`업데이트되는 텍스트가 표시되어야 합니다.

양방향 바인딩을 단순화하기 위해 Vue `v-model`는 본질적으로 위의 구문을 제공합니다.

```jsx
<input v-model="text">
```

`v-model`의 값을 바인딩된 상태와 자동으로 동기화 `<input>`하므로 더 이상 이벤트 핸들러를 사용할 필요가 없습니다.

`v-model`텍스트 입력뿐만 아니라 확인란, 라디오 버튼 및 선택 드롭다운과 같은 다른 입력 유형에서도 작동합니다. 자세한 내용은 **[Guide-Form Bindings](https://vuejs.org/guide/essentials/forms.html)** 에서 다룹니다 .

`v-model` 을 사용하여 리팩토링한 예시

- **변경 전**

```jsx
<script setup>
import { ref } from 'vue'

const text = ref('')

function onInput(e) {
  text.value = e.target.value
}
</script>

<template>
  <input :value="text" @input="onInput" placeholder="Type here">
  <p>{{ text }}</p>
</template>
```

- **변경 후**

```jsx
<script setup>
import { ref } from 'vue'

const text = ref('')
</script>

<template>
  <input v-model="text" placeholder="Type here">
  <p>{{ text }}</p>
</template>
```

---

## 6. Conditional Rendering (조건부 렌더링)

지시문을 사용 `v-if`하여 요소를 조건부로 렌더링할 수 있습니다.

```jsx
<h1 v-if="awesome">Vue is awesome!</h1>
```

`awesome`의 값 이 **[truthy](https://developer.mozilla.org/en-US/docs/Glossary/Truthy)** 인 경우 `<h1>`에만 렌더링됩니다 . **[거짓](https://developer.mozilla.org/en-US/docs/Glossary/Falsy)** 값 으로 변경 되면 DOM에서 제거됩니다.

조건의 다른 분기를 나타내는 데 `v-else`및 `v-else-if`를 사용할 수도 있습니다 .

```jsx
<h1 v-if="awesome">Vue is awesome!</h1>
<h1 v-else>Oh no 😢</h1>
```

현재 데모는 두 `<h1>` 을 동시에 표시하고 버튼은 아무 작업도 수행하지 않습니다. 

`v-if`및 `v-else`지시문 을 추가 하고 `toggle()`버튼을 사용하여 둘 사이를 전환할 수 있도록 메서드를 구현합니다.

자세한 내용 `v-if`: **[가이드 - 조건부 렌더링](https://vuejs.org/guide/essentials/conditional.html)**

- **Conditional Rendering 예시**

```jsx
<script setup>
import { ref } from 'vue'

const awesome = ref(true)

function toggle() {
  awesome.value = !awesome.value
}
</script>

<template>
  <button @click="toggle">toggle</button>
  <h1 v-if="awesome">Vue is awesome!</h1>
  <h1 v-else>Oh no 😢</h1>
</template>
```

- **결과**

 토글 버튼 클릭시 출력 텍스트 변경됨

```jsx
1. click!
Vue is awesome!

2. click again
Oh no 😢
```

---

## 7. ****List Rendering (목록 렌더링)****

지시문을 사용하여 `v-for`소스 배열을 기반으로 요소 목록을 렌더링할 수 있습니다

```jsx
<ul>
  <li v-for="todo in todos" :key="todo.id">
    {{ todo.text }}
  </li>
</ul>
```

다음 `todo`은 현재 반복되는 배열 요소를 나타내는 지역 변수입니다. `v-for`요소 위 또는 내부에서만 액세스할 수 있습니다 .

또한 각 todo 객체에 고유한 값을 부여 하고, 이를 각각에 대한 **[특수 속성](https://vuejs.org/api/built-in-special-attributes.html#key)** `id` 으로 바인딩하는 방법이 있습니다 

. Vue 는 배열에서 해당 객체의 위치와 일치하도록 각각을 정확하게 이동할 수 있습니다

목록을 업데이트하는 2가지 방법

1. 소스 배열에서 **[변형 메서드](https://stackoverflow.com/questions/9009879/which-javascript-array-functions-are-mutating)** 를 호출 합니다.

```jsx
todos.value.push(newTodo)
```

1. Array를 new Array로 교체하십시오

```jsx
todos.value = todos.value.filter(/* ... */)
```

`addTodo()`여기에 간단한 할 일 목록이 있습니다. 

작동하도록 하는 logic 과 `removeTodo()`메서드를 구현 해봅니다

자세한 내용 `v-for`: **[가이드 - 목록 렌더링](https://vuejs.org/guide/essentials/list.html)**

- ****List Rendering 예시****

```jsx
<script setup>
import { ref } from 'vue'

// give each todo a unique id
let id = 0

const newTodo = ref('')
const todos = ref([
  { id: id++, text: 'Learn HTML' },
  { id: id++, text: 'Learn JavaScript' },
  { id: id++, text: 'Learn Vue' }
])

function addTodo() {
  todos.value.push({ id: id++, text: newTodo.value })
  newTodo.value = ''
}

function removeTodo(todo) {
  todos.value = todos.value.filter((t) => t !== todo)
}
</script>

<template>
  <form @submit.prevent="addTodo">
    <input v-model="newTodo">
    <button>Add Todo</button>    
  </form>
  <ul>
    <li v-for="todo in todos" :key="todo.id">
      {{ todo.text }}
      <button @click="removeTodo(todo)">X</button>
    </li>
  </ul>
</template>
```

- 결과

![Untitled](VUE3%208433b461a12c4ebb9a5e3dc390fa7689/Untitled.png)

---

## 8. ****Computed Property (계산된 속성)****

7번의 Todo List에 계속 작업을 이어갑니다.  이미 각 할 일에 토글 기능을 추가했습니다.  각 todo 객체에 속성을 추가 `v-model`하고 체크박스에 바인딩하는 데 사용합니다

```jsx
<li v-for="todo in todos">
  <input type="checkbox" v-model="todo.done">
  ...
</li>
```

다음은 이미 완료된 할 일에 대해 숨김 처리하는 것입니다.  `hideCompleted` 로 전환하는 버튼이 있습니다. 

상태에 따라 다른 항목을 렌더링 하려면 Computed()를 사용합니다.

 **`[computed()](https://vuejs.org/guide/essentials/computed.html)`** 는 데이터 소스를 기반으로 계산된 다른 값을 만들 수 있습니다 .

```jsx
import { ref, computed } from 'vue'

const hideCompleted = ref(false)
const todos = ref([
  /* ... */
])

const filteredTodos = computed(() => {
  // return filtered todos based on
  // `todos.value` & `hideCompleted.value`
})
```

```jsx
- <li v-for="todo in todos">
+ <li v-for="todo in filteredTodos">
```

Computed property는 계산된 다른 반응 상태를 종속성으로 추적합니다. 결과를 캐시하고 종속성이 변경되면 자동으로 업데이트합니다.

다음은 계산된 `filteredTodos`속성을 추가하고 계산 논리를 구현한 로직입니다.  완료된 항목을 숨길 때 할 일을 선택하면 즉시 숨겨집니다.

- ****Computed Property 예시****

```jsx
<script setup>
import { ref, computed } from 'vue'

let id = 0

const newTodo = ref('')
const hideCompleted = ref(false)
const todos = ref([
  { id: id++, text: 'Learn HTML', done: true },
  { id: id++, text: 'Learn JavaScript', done: true },
  { id: id++, text: 'Learn Vue', done: false }
])

const filteredTodos = computed(() => {
  return hideCompleted.value
    ? todos.value.filter((t) => !t.done)
    : todos.value
})

function addTodo() {
  todos.value.push({ id: id++, text: newTodo.value, done: false })
  newTodo.value = ''
}

function removeTodo(todo) {
  todos.value = todos.value.filter((t) => t !== todo)
}
</script>

<template>
  <form @submit.prevent="addTodo">
    <input v-model="newTodo" />
    <button>Add Todo</button>
  </form>
  <ul>
    <li v-for="todo in filteredTodos" :key="todo.id">
      <input type="checkbox" v-model="todo.done">
      <span :class="{ done: todo.done }">{{ todo.text }}</span>
      <button @click="removeTodo(todo)">X</button>
    </li>
  </ul>
  <button @click="hideCompleted = !hideCompleted">
    {{ hideCompleted ? 'Show all' : 'Hide completed' }}
  </button>
</template>

<style>
.done {
  text-decoration: line-through;
}
</style>
```

---

## 9. ****Lifecycle and Template Refs (수명주기 및 템플릿 참조)****

지금까지 Vue는 반응성 및 선언적 렌더링 덕분에 모든 DOM 업데이트를 처리해 왔습니다. 그러나 필연적으로 DOM을 수동으로 작업해야 하는 경우가 있습니다.

**[특별한 속성 을 사용하여 템플릿](https://vuejs.org/api/built-in-special-attributes.html#ref) 참조** (예: 템플릿의 요소에 대한 참조)를 요청할 수 있습니다 .

```jsx
<p ref="p">hello</p>
```

ref에 액세스하려면 이름이 일치하는 ref를 선언해야 합니다.

```jsx
const p = ref(null)
```

ref는 `null`값으로 초기화됩니다. .`<script setup>`가 실행될 때 아직 존재하지 않기 때문 입니다. 템플릿 참조는 구성 요소가 **마운트된** 후에만 액세스할 수 있습니다 .

마운트 후 코드를 실행하려면 다음 `onMounted()`기능을 사용할 수 있습니다

```jsx
import { onMounted } from 'vue'

onMounted(() => {
  // component is now mounted.
})
```

이것을 **수명 주기 후크** 라고 합니다. 구성 요소 수명 주기의 특정 시간에 호출할 콜백을 등록할 수 있습니다. `onUpdated`및 `onUnmounted`와 같은 다른 후크가 있습니다 .

 **[자세한 내용은 수명 주기 다이어그램](https://vuejs.org/guide/essentials/lifecycle.html#lifecycle-diagram)** 을 확인 하세요.

- ****Lifecycle and Template Refs (예시)****

```jsx
<script setup>
import { ref, onMounted } from 'vue'

const p = ref(null)

onMounted(() => {
  p.value.textContent = 'mounted!'
})
</script>

<template>
  <p ref="p">hello</p>
</template>
```

---

## 10. ****Watchers (감시자)****

때로는 "부작용"을 반응하여 수행해야 합니다. 

예를 들어, 숫자가 변경될 때 console에 숫자를 기록하는 것입니다. Watchers를 통해 수행할 수 있습니다.

```jsx
import { ref, watch } from 'vue'

const count = ref(0)

watch(count, (newCount) => {
  // yes, console.log() is a side effect
  console.log(`new count is: ${newCount}`)
})
```

`watch()`ref를 직접 관찰할수 있으며, `count` 의 값이 변경 될 때마다 콜백이 시작 됩니다. `watch()`다른 유형의 데이터 소스도 볼 수 있습니다. 자세한 내용은 **[Guide-Watchers](https://vuejs.org/guide/essentials/watchers.html)**  를 참고하세요.

 console에 로그인하는 것보다 더 실용적인 예는, ID가 변경될 때 새 데이터를 가져오는 것입니다. 

우리가 가지고 있는 Code는 컴포넌트 마운트의 모의 API에서 할 일 데이터를 가져오는 것입니다. 

가져와야 하는 할 일 ID를 증가시키는 버튼도 있습니다. 

버튼을 클릭할 때 새 할 일을 가져오는 감시자를 구현한 예시입니다.

- ****Watchers 예시****

```jsx
<script setup>
import { ref, watch } from 'vue'

const todoId = ref(1)
const todoData = ref(null)

async function fetchData() {
  todoData.value = null
  const res = await fetch(
    `https://jsonplaceholder.typicode.com/todos/${todoId.value}`
  )
  todoData.value = await res.json()
}

fetchData()

watch(todoId, fetchData)
</script>

<template>
  <p>Todo id: {{ todoId }}</p>
  <button @click="todoId++">Fetch next todo</button>
  <p v-if="!todoData">Loading...</p>
  <pre v-else>{{ todoData }}</pre>
</template>
```

@@@@@@응답

---

## 11. ****Components****

지금까지 우리는 단일 구성 요소로만 작업했습니다. Vue 애플리케이션은 일반적으로 중첩된 구성 요소로 생성됩니다.

상위 구성 요소는 템플릿의 다른 구성 요소를 하위 구성 요소로 렌더링할 수 있습니다. 자식 구성 요소를 사용하려면 먼저 가져와야 합니다.

```jsx
import ChildComp from './ChildComp.vue'
```

그런 다음 템플릿의 구성 요소를 다음과 같이 사용할 수 있습니다

```jsx
<ChildComp />
```

종합된 예시입니다.

- **Components 예시**

```jsx
<script setup>
import ChildComp from './ChildComp.vue'
</script>

<template>
  <ChildComp />
</template>
```

---

## 12. ****Props****

**자식 컴포넌트는 props** 를 통해 부모로부터 입력을 받을 수 있습니다 . 

먼저 props를 선언해야 합니다.

```jsx
<!-- ChildComp.vue -->
<script setup>
const props = defineProps({
  msg: String
})
</script>
```

참고로 `defineProps()`는 컴파일 타임 매크로이며 가져올 필요가 없습니다. 

선언된 `msg` prop은 자식 구성 요소의 템플릿에서 사용할 수 있습니다. `defineProps()`의 반환된 객체를 통해 JavaScript에서 액세스할 수도 있습니다.

부모는 속성처럼 prop을 자식에게 전달할 수 있습니다. `v-bind`동적 값을 전달하기 위해 다음 구문 을 사용할 수도 있습니다

```jsx
<ChildComp :msg="greeting" />
```

전체 예시입니다.

- **Props 예시**

```jsx
<script setup>
import { ref } from 'vue'
import ChildComp from './ChildComp.vue'

const greeting = ref('Hello from parent')
</script>

<template>
  <ChildComp :msg="greeting" />
</template>
```

---

## 13. ****Emits****

props를 받는 것 외에도 자식 구성 요소는 부모에게 이벤트를 내보낼 수도 있습니다

```jsx
<script setup>
// declare emitted events
const emit = defineEmits(['response'])

// emit with argument
emit('response', 'hello from child')
</script>
```

`emit()`에 대한 첫 번째 인수 는 이벤트 이름입니다.  모든 추가 인수는 이벤트 리스너에 전달됩니다.

부모는 다음`v-on`.을 사용하여 자식 발생 이벤트를 수신할 수 있습니다.

 여기에서 핸들러는 자식 발생 호출에서 추가 인수를 수신하고 이를 로컬 상태에 할당합니다

```jsx
<ChildComp @response="(msg) => childMsg = msg" />
```

전체 예시입니다.

- **Emits 예시**

```jsx
<script setup>
import { ref } from 'vue'
import ChildComp from './ChildComp.vue'

const childMsg = ref('No child msg yet')
</script>

<template>
  <ChildComp @response="(msg) => childMsg = msg" />
  <p>{{ childMsg }}</p>
</template>
```

---

## 14. ****Slots (슬롯)****

props를 통해 데이터를 전달하는 것 외에도 부모 구성 요소는 **슬롯** 을 통해 템플릿 조각을 자식에게 전달할 수도 있습니다 .

```jsx
<ChildComp>
  This is some slot content!
</ChildComp>
```

`<slot>`자식 구성 요소에서 요소를 콘센트로 사용하여 부모의 슬롯 콘텐츠를 렌더링할 수 있습니다 .

```jsx
<!-- in child template -->
<slot/>
```

콘센트 내부의 콘텐츠 `<slot>`는 "대체" 콘텐츠로 처리됩니다. 부모가 슬롯 콘텐츠를 전달하지 않은 경우 표시됩니다.

```jsx
<slot>Fallback content</slot>
```

현재 슬롯 콘텐츠를 `msg`.에 전달하지 않으므로 `<ChildComp>`대체 콘텐츠가 표시되어야 합니다. 부모의 상태를 사용하면서 자식에게 약간의 슬롯 콘텐츠를 제공합니다

 

- **slots 예시**

```jsx
<script setup>
import { ref } from 'vue'
import ChildComp from './ChildComp.vue'

const msg = ref('from parent')
</script>

<template>
  <ChildComp>Message: {{ msg }}</ChildComp>
</template>
```

---

vue에 대해서 짧게 정리해 보았습니다.

다음은 세부적으로 배워야할 사항입니다.

- **[빠른 시작](https://vuejs.org/guide/quick-start.html)** 에 따라 컴퓨터에 실제 Vue 프로젝트를 설정합니다 .
- 지금까지 배운 모든 주제를 더 자세히 다루고 있는 **[Main Guide 를 살펴보십시오.](https://vuejs.org/guide/essentials/application.html)**
- 좀 더 실용적인 **[예제](https://vuejs.org/examples/)** 를 확인하십시오 .

```jsx
<script setup>
import JSConfetti from 'js-confetti'

const confetti = new JSConfetti()

function showConfetti() {
  confetti.addConfetti()
}

showConfetti()
</script>

<template>
  <h1 @click="showConfetti">🎉 Congratulations!</h1>
</template>

<style>
h1 {
  text-align: center;
  cursor: pointer;
  margin-top: 3em;
}
</style>
```