# Vite

### 들어가기 전에

VIte는 (프랑스어로 “빠르다(Quick)”를 의미하며, 발음은 “veet”와 비슷한 `/vit/` 입니다.) 

빠르고 간결한 모던 웹 프로젝트 개발 경험에 초점을 맞춰 탄생한 빌드 도구이며 , 두 가지 컨샙을 중심으로 하고 있습니다.

- 개발 시 네이티브 ES Module을 넘어 더욱 다양한 기능을 제공합니다. ex) Hot Module Replacement (HMR)
- 번들링 시, Rollup 기반의 다양한 빌드 커맨드를 사용할 수 있습니다. 이는 높은 수준으로 최적화된 정적(Static) 리소스들을 배포할 수 있게끔 하며, 미리 정의된 설정(Pre-configured)을 제공합니다.

vite는 기본적으로 최적화 된 설정을 제공하지만, **[Plugin API](https://vitejs-kr.github.io/guide/api-plugin.html)** 또는 **[JavaScript API](https://vitejs-kr.github.io/guide/api-javascript.html)** 를 이용할 수 있습니다. (물론 TypeScript 역시 지원하구요.)

---

### 호환성

Vite는 버전 14.18+ 또는 16+ 의 **[Node.js](https://nodejs.org/)** 를 요구합니다. 다만 일부 템플릿의 경우 더 높은 버전의 Node.js를 요구할 수 있습니다.

---

### **`index.html` 그리고 프로젝트의 루트**

만들어진 Vite 프로젝트를 유심히 보면 `index.html` 파일이 `public` 디렉터리가 아닌 프로젝트의 루트에 위치해 있다는 것을 발견할 수 있습니다. 의도적으로 이렇게 위치시킨 것인데, 추가적인 번들링 과정 없이 `index.html` 파일이 앱의 진입점이 되게끔 하기 위함입니다.

Vite는 `index.html` 파일을 소스 코드이자 JavaScript 모듈 그래프를 구성하는 요소 중 하나로 취급하고 있습니다. 다시말해, `<script type="module" src="...">` 태그를 이용해 JavaScript 소스 코드를 가져온다는 의미이며, 인라인으로 작성된 `<script type="module">`이나 `<link href>`와 같은 CSS 역시 Vite에서 취급이 가능합니다. 추가적으로, Vite는 `index.html` 내에 존재하는 URL에 대해 `%PUBLIC_URL%`과 같은 Placeholder 없이 사용할 수 있도록 URL 베이스를 자동으로 맞춰줍니다.

Vite는 정적(Static) HTTP 서버와 비슷하게 "루트 디렉터리"라는 개념을 갖고 있습니다. 향후 `<root>`라는 이름으로 문서 내에서 보게 되는데, 이는 Absolute URL을 프로젝트 루트를 가리키게끔 함으로써 일반적인 정적 파일 서버와 동일하게 코드를 작성할 수 있게 됩니다. 또한 Vite는 프로젝트 루트 외부에서도 디펜던시를 가져올 수 있게끔 구현했는데, 이를 이용하면 모노리포 구성 등 다양한 작업이 가능합니다.

또한 Vite는 여러 `.html` 파일을 앱의 진입점으로 하는 **[Multi-page apps](https://vitejs-kr.github.io/guide/build.html#multi-page-app)**를 지원하고 있습니다.

### **프로젝트 루트 지정[#](https://vitejs-kr.github.io/guide/#specifying-alternative-root)**

`vite`은 개발 서버를 시작할 때 현재 위치해 있는 디렉터리를 프로젝트 루트로 가정하고 동작합니다. 만약 특정 디렉터리를 지정해 프로젝트 루트로써 동작하게끔 하고 싶다면, `vite serve some/sub/dir` 명령으로 Vite를 시작해주세요.

---

### **커맨드 라인 인터페이스**

vite가 설치된 프로젝트는 `vite` 명령을 통해 바로 Vite를 실행할 수 있습니다. (`npx vite`
을 이용해도 되구요.) 기본적으로 Vite에서 제공하는 npm 스크립트는 아래와 같습니다.

```tsx
{
  "scripts": {
    "dev": "vite", // 개발 서버를 실행합니다. 
									//(`vite dev` 또는 `vite serve`로도 시작이 가능합니다.)
    "build": "vite build", // 배포용 빌드 작업을 수행합니다.
    "preview": "vite preview" // 로컬에서 배포용 빌드에 대한 프리뷰 서버를 실행합니다.
  }
}
```

---

 - 작성 예정

ESM이란 무엇인가