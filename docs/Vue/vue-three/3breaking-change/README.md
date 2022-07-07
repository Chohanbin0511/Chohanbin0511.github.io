# Breaking Changes

---

이 페이지는 Vue 2의 모든 Vue 3 주요 변경 사항을 나열합니다.

## 1. Global API (글로벌 API)

- **(breaking) [Global Vue API가 Application instancs를 사용하도록 변경되었습니다.](https://v3-migration.vuejs.org/breaking-changes/global-api.html)**
- **(breaking) [전역 및 내부 API가 트리를 흔들 수 있도록 재구성되었습니다](https://v3-migration.vuejs.org/breaking-changes/global-api-treeshaking.html)**

## 2. Template Directives (템플릿 지시문)

- **(breaking) `[v-bind.sync`를 대체하여 구성 요소의 `v-model` 사용이 재작업되었습니다.](https://v3-migration.vuejs.org/breaking-changes/v-model.html)**
- **(breaking) `[<template v-for>` 및 non-`v-for` node의 `key` 사용이 변경되었습니다.](https://v3-migration.vuejs.org/breaking-changes/key-attribute.html)**
- **(breaking)[동일한 요소에 사용될 때 `v-if` 및 `v-for` 우선순위가 변경됨](https://v3-migration.vuejs.org/breaking-changes/v-if-v-for.html)**

<aside>
💡 **2.x에서 동일한 요소에 v-if와 v-for를 사용할 때 v-for가 우선합니다.
3.x에서 v-if는 항상 v-for보다 우선 순위가 높습니다.**

</aside>

- **(breaking) `[v-bind="object"`는 이제 순서를 구분합니다](https://v3-migration.vuejs.org/breaking-changes/v-bind.html)**
- **(breaking) `[v-on:event.native` 수정자가 제거되었습니다.](https://v3-migration.vuejs.org/breaking-changes/v-on-native-modifier-removed.html)**

## 3. **Components (컴포넌트)**

- **(breaking) [functional components는 일반 기능을 사용해서만 생성할 수 있습니다.](https://v3-migration.vuejs.org/breaking-changes/functional-components.html)**
- **(breaking) Single-file component(SFC) <template>의 functional 속성 및 기능적 component 옵션은 더 이상 사용되지 않습니다. (url은 위와 같음)**
- **(new) [비동기 Components를 생성하려면 `defineAsyncComponent` 메서드가 필요합니다.](https://v3-migration.vuejs.org/breaking-changes/async-components.html)**
- **(new) [Component 이벤트는 이제 `emits` 옵션으로 선언되어야 합니다.](https://v3-migration.vuejs.org/breaking-changes/emits-option.html)**

## 4. **Render Function (랜더 기능)**

- **(breaking) [렌더링 기능 API가 변경됨](https://v3-migration.vuejs.org/breaking-changes/)**
- **(breaking)** **`[$scopedSlots` 속성이 제거되고 모든 슬롯이 `$slots`를 통해 함수로 노출됩니다.](https://v3-migration.vuejs.org/breaking-changes/slots-unification.html)**
- **(new) [이제 비동기 Comonents를 생성하려면 `defineAsyncComponent` 메서드가 필요합니다.](https://v3-migration.vuejs.org/breaking-changes/async-components.html)**
- **(breaking) `[$attrs`에는 이제 `class` 및 `style` 속성이 포함됩니다.](https://v3-migration.vuejs.org/breaking-changes/attrs-includes-class-style.html)**

## 5. **Custom Elements (사용자 정의)**

- **[(breaking) 이제 템플릿 컴파일 중에 사용자 정의 요소 검사가 수행됩니다.](https://v3-migration.vuejs.org/breaking-changes/custom-elements-interop.html)**
- **(breaking)  [Special `is` 사용은 예약된 `<component>` 태그로만 제한됩니다.](https://v3-migration.vuejs.org/breaking-changes/custom-elements-interop.html)**

## 6. Other Minor Changes (변경사항)

- `**destroyed` lifecycle option의 이름이 `unmounted` 으로 변경되었습니다**
- `beforeDestroy` **lifecycle option의 이름이 `beforeUnmount`으로 변경되었습니다**
- **(breaking) [Props `default` factory function는 더 이상 `this` context에 접근 할 수 없습니다](https://v3-migration.vuejs.org/breaking-changes/props-default-this.html)**
- **(breaking) [Custom directive API가 component lifecycle에 맞게 변경되고 `binding.expression`이 제거됨](https://v3-migration.vuejs.org/breaking-changes/custom-directives.html)**
- **(breaking) [`data` 옵션은 항상 함수로 선언되어야 합니다.](https://v3-migration.vuejs.org/breaking-changes/data-option.html)**
- **mixins의 `data` 옵션이 이제 얕게 병합되었습니다.**
- **(breaking) [속성 강제 전략 변경됨](https://v3-migration.vuejs.org/breaking-changes/attribute-coercion.html)**
- **(breaking) [일부 transition classes의 이름이 변경되었습니다.](https://v3-migration.vuejs.org/breaking-changes/transition.html)**
- **(breaking) `[<TransitionGroup>`은 이제 기본적으로 wrapper element를 렌더링하지 않습니다.](https://v3-migration.vuejs.org/breaking-changes/transition-group.html)**
- **(breaking) [배열을 관찰할 때 배열이 교체될 때만 콜백이 트리거됩니다. 예외로 트리거해야 하는 경우 `deep` 옵션을 지정해야 합니다.](https://v3-migration.vuejs.org/breaking-changes/watch.html)**
- **특별한 directives가 없는 `<template>` tags(`v-if/else-if/else`, `v-for` 또는 `v-slot`)는 이제 일반 element로 처리되며 내부 content 를 렌더링하는 대신 default `<template>` element가 됩니다.**
- **(breaking) [Mounted된 application은 mounted element를 대체하지 않습니다.](https://v3-migration.vuejs.org/breaking-changes/mount-changes.html)**
- **(breaking) [Lifecycle  `hook:` 이벤트 접두사가 `vnode-`로 변경됨](https://v3-migration.vuejs.org/breaking-changes/vnode-lifecycle-events.html)**

## 7. Removed APIs (**제거된 API)**

- **[`v-on` 수정자로 `keyCode` 지원](https://v3-migration.vuejs.org/breaking-changes/keycode-modifiers.html)**
- [**$on, $off and $once instance methods**](https://v3-migration.vuejs.org/breaking-changes/events-api.html)
- [**Filters**](https://v3-migration.vuejs.org/breaking-changes/filters.html)
- [**Inline templates attributes**](https://v3-migration.vuejs.org/breaking-changes/inline-template-attribute.html)
- `[$children` instance property](https://v3-migration.vuejs.org/breaking-changes/children.html)
- `[propsData` option](https://v3-migration.vuejs.org/breaking-changes/props-data.html)
- **`$destroy` instance method. 사용자는 더 이상 개별 Vue components의 Lifecycle를 수동으로 관리해서는 안 됩니다.**
- **Global functions `set` 및 `delelte`, instance method의 `$set` 및 `$delete`. 프록시 기반 변경 감지에는 더 이상 필요하지 않습니다.**

---