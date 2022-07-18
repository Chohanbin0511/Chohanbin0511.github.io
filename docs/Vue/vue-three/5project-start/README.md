# Project Start

## 개발환경 구성

**크롬 브라우저 설치**

 - 개발자에게 편리하고 다양한 기능을 지원하고 있습니다.

**Visual Studio Code 설치**

 -  HTML/CSS 코드를 입력 하는 텍스트 에디터 툴 설치

**VSCode Plugins 설치**

 - HTML/CSS 마크업(코드 입력)을 도와주는 확장 프로그램을 설치

- `Korean Language Pack`
    
    비주얼 스튜디오 코드 툴을 한국어로 사용할 수 있습니다.
    
- `Indent-Rainbow`
    
    Tab 영역을 컬러별로 다르게 표시하여 코드라인이 길어 졌을때 읽기 편하게 합니다.
    
- `Auto Rename Tag`
    
    HTML Tag에서 태그 이름을 바꾸면 쌍을 이루는 여는태그 또는 닫는태그 명도 함께 바꿔줍니다.
    
- `CSS Peek`
    
    HTML 문서에서 정의된 CSS를 금방 찾을 수 있도록 도와줌! `ctrl + 클릭` 하면 선언된 곳으로 이동함.
    
- `HTML to CSS autocompletion`HTML 문서에 선언된 class 명을 .css파일에서 입력할 때 자동완성 기능을 제공합니다.
- `HTML CSS Support`
    
    HTML 문서에서 CSS의 자동완성을 이용할 수 있다.
    
- `Live Server`
    
    HTML 파일 수정 시 새로고침 없이 바로바로 즉각 적용되도록 도와준다.
    
- `ESLint`
    
    코드 검사기로써 에러가 있는지 검사해주는 도구
    
- `Prettier`
    
    코드 포멧터로써 코드를 일관성있고 예쁘게 작성할 수 있도록 도와주는 도구
    

**설정**

`Format On Save` 사용 안함

**Vue.js devtools**

 - Vue.js 애플리케이션 디버깅을 위한 Chrome 브라우저 확장 프로그램( Vue3 지원 다운로드)

****Vue.js를 위한 VSCode Plugins****

 

- Volar

  Vue 3 언어 지원 플로그인 입니다. Volar는 Vue 2용 이전 공식 VSCode 확장인 Vetur를 대체합니다. 현재 Vetur가 설치되어 있는 경우 Vue 3 프로젝트에서 비활성화해야 합니다.

 

- Vue VSCode Snippets

 사용구 코드를 빠르게 타이필 할 수 있도록 도와주는 플러그인

---

## ESLint, Prettier

### **`vite.config.js`**

Vite 명령어로 dev 서버를 실행할 때 프로젝트 루트의 `vite.config.js` 파일 확인을 시도합니다. 그리고 내부에 설정된 값을 참고합니다.

```jsx
import { fileURLToPath, URL } from 'url'

import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [vue()],
  resolve: {
    alias: {
      '@': fileURLToPath(new URL('./src', import.meta.url))
    }
  }
})
```

- `alias` : 파일 시스템의 경로에 별칭을 만들 때 사용합니다. 미리 설정된 `‘@’` 기호를 통하여 `‘./src’` 디렉토리에 절대경로로 쉽게 접근할 수 있습니다.

### **`package.json`**

`npm` 으로 관리하기 위한 프로젝트

…………………….

## 프로젝트 구성 규칙

1. **프로젝트 설정**
- vue3 버전을 사용,
- 빌드 도구 : Vite
- 상태관리 : Vuex -> Pinia ⇒ 작은 프로젝트는 `export const state = reactive({})` 를 사용하면되지만 Pinia를 사용하면 많은 이점이 있음 [**참고**](https://www.gymcoding.co/pinia)
- IDE지원: Vetur -> Volar
- TypeScript는 사용X (하고싶으면 논의)
- ESLint, Prettier 설정 [https://www.gymcoding.co/eslint-prettier](https://www.gymcoding.co/eslint-prettier) 참고
1. **프로젝트 구조**

```bash
├── node_modules
│		└── ...
├── public
│   └── favicon.ico
├── src
│   ├── App.vue
│   ├── assets
│   │   ├── base.css
│   │   └── logo.svg
│   ├── components
│   │   ├── HelloWorld.vue
│   │   ├── TheWelcome.vue
│   │   ├── WelcomeItem.vue
│   │   └── icons
│   │       ├── IconCommunity.vue
│   │       ├── IconDocumentation.vue
│   │       ├── IconEcosystem.vue
│   │       ├── IconSupport.vue
│   │       └── IconTooling.vue
│   └── main.js
├── index.html
├── package-lock.json
├── package.json
├── README.md
└── vite.config.js
```

1. **Vue3 어플리케이션을 만들기 위한 방법 : Composition API사용**

예시 

```jsx
<template>
	<div>
		<button>Counter: {{ counter }}</button>
	</div>
</template>

<script>
import { onMounted, ref } from 'vue';

export default {
	setup() {
		const counter = ref(0);

		const increment = () => counter.value++;

		onMounted(() => {
			console.log('애플리케이션이 마운트 되었습니다!');
		});

		return {
			counter,
			increment,
		};
	},
};
</script>

<style lang="scss" scoped></style>
// Options API는 data, methods, mounted 와 같은 옵션을 사용합니다.
// Composition API는 반응형 코드를 작성하는 단일 setup 함수가 있습니다.

// 위프로젝트는 <script setup> 방식 사용
<template>
	<div>
		<button>Counter: {{ counter }}</button>
	</div>
</template>

<script setup>
import { onMounted, ref } from 'vue';

const counter = ref(0);

const increment = () => counter.value++;

onMounted(() => {
	console.log('애플리케이션이 마운트 되었습니다!');
});

defineExpose({
	counter,
	increment,
});
</script>

<style lang="scss" scoped></style>.

```

[**Composition API VS Options API](https://www.gymcoding.co/options-api-vs-composition-api) 참고**

1. **Component 사용** `PascalCased` **로 통일**

컴포넌트는 `template` 에서 사용 가능합니다.

```jsx
// Component 선언시 PascalCased 사용
// Props 선언시 camelCase 사용하여 이름 선언
// Compoenent에 Props 속성값 전달시 kebab-case 사용 권장
// 예시
// parent component
<TestComponent test-message="hi Chohbin"></TestComponent>

...
// child compoenent (TestComponent)

export default {
	props: {
		testMessage : String
	}
}

```

**권장 사항**

 - **컴포넌트** 

컴포넌트를 사용할 때 `PascalCased`를 권장합니다. `PascalCased`를 사용하면 다음과 같은 이점이 있습니다.

- `PascalCased` 이름은 유효한 JavaScript 식별자입니다. 이렇게 하면 JavaScript에서 구성 요소를 더 쉽게 가져오고 등록할 수 있습니다. IDE의 자동 완성 기능도 지원합니다.

- `<PascalCase />`이것은 템플릿의 기본 HTML 요소가 아닌 Vue 구성 요소라는 것을 더 분명하게 만듭니다. 또한 Vue 구성 요소를 사용자 정의 요소(웹 구성 요소)와 구별합니다.

`SFC`, `string template` 에서 `PascalCase`를 사용 가능하며 `DOM Template`에서는 `kebab-case`를 사용해야 합니다.

 - **props 선언**

  `props` 선언시에는 camelCase를 사용하여 이름을 선언합니다. 이렇게 하면 속성 키로 사용할 때 따옴표를 사용할 필요가 없고 유효한 JavaScript 식별자이기 때문에 템플릿 표현식에서 직접 참조할 수 있기 때문입니다.

 - **props 전달**

 속성에 값을 전달할 때는 `kebab-case`를 사용하는 것을 [권장](https://vuejs.org/guide/components/props.html#props-declaration)합니다.

1. **Composable 함수명은 'use'로 시작하는게 규칙입니다**.
2. **Stores는 애플리케이션 전역에서 접근할 수 있는 데이터를 포함해야 합니다. ex)사용자 정보**
3. **Store를 정의할때 `defineStore()` 를 사용하여 정의합니다. id 값은 `use…` 로 지정하는 것이 관용적으로 만들기 위한 composables전반에 걸친 규칙입니다.  [참고](https://www.gymcoding.co/store)**
4. **한번만 사용하는 컴포넌트는 The~~~로 네이밍합니다 (ex.  TheHeader)**

1. **emit**

```jsx
export default {
  emits: {
		// 유효성 검사가 없는 이벤트 선언
		someEvent: null,

		// 유효성 검사가 있는 이벤트 선언
		someSubmit: (result) => {
			if (email && password) {
	      return true
	    } else {
	      console.warn('result 값이 비어있습니다!')
	      return false
	    }
		}
	},
  setup(props, context) {
    context.emit('someEvent', 'Hello World!')
  }
}
// options에 emits을 선언하는건 선택 사항이지만 컴포넌트가 작동하는 방식을 
// 더 잘 문서화하기 위해 모든 이벤트를 정의하는 것이 좋습니다. 
// 또한 Vue가 **[Non-Prop 속성](https://vuejs.org/guide/components/attrs.html#v-on-listener-inheritance)에서 알려진 리스너를 제외할 수 있습니다 .**
```

1. 여러 루트노드 속성상속 

 **단일 루트 요소**가 있는 컴포넌트와 달리 **여러 루트 요소**가 있는 컴포넌트에는 자동으로 **Non-Prop 속성**이 상속되지 않습니다. 만약 명시적으로 `$attrs`를 바인딩 하지 않을 경우 런타입 경고가 발생됩니다.

<자식 컴포넌트>

```jsx
<!-- CustomLayout.vue -->
<template>
  <header></header>
  <main></main>
  <footer></footer>
</template>
```

<부모 컴포넌트>

```jsx
<CustomLayout id="custom-layout"></CustomLayout>
```

$attrs이 명시적으로 바인딩된 경우 경고가 표시되지 않습니다.

```jsx
<!-- CustomLayout.vue -->
<template>
  <header></header>
  <main v-bind="$attrs"></main>
  <footer></footer>
</template>
```

****JavaScript에서 Non-Prop 속성 접근****

`setup()` 함수의 `context.attrs` 속성으로 노출됩니다 .

1. ****Top-level `await`**

 npm i axios

 eslint-plugin-vue를 참고하여

```jsx
// .eslintrc.cts
module.exports = {
  parserOptions: {
    ecmaVersion: 'latest',
    sourceType: 'module'
  },
}
```

 `<script setup>` 내의 Top-level에서 `await`을 사용할 수 있습니다. 그리고 코드는 `async setup()`
 이렇게 컴파일 됩니다. 

```jsx
//기존
<script setup>
async function callApi() {
	await fetch(`/api/post/1`).then((r) => r.json())
}
</script>

// Top-level await 후
<script setup>
const post = await fetch(`/api/post/1`).then((r) => r.json())
</script>
```

1. **동적 컴포넌트**