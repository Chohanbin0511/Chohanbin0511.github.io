const routes = ["Guide", "Vue", "Joheritage"];

const createSidebar = () => {
  const sidebar = {};
  for (const route of routes) {
    Object.assign(sidebar, require("../" + route));
  }
  return sidebar;
};

module.exports = {
  title: "chohbin",
  description: "desc",
  themeConfig: {
    nav: [
      { text: "Github", link: "https://github.com/Chohanbin0511" },
      { text: "개발가이드", link: "/Guide/" },
      { text: "VUE", link: "/Vue/" },
      { text: "JoHeritage", link: "/Joheritage/" },
    ],
    sidebar: createSidebar(),
    lastUpdated: "최근변경일",
  },
  // sidebar: getSidebarArr(),
  //가장 중요한 부분!
  //<username>.github.io 뒤에 주소가 붙으시면
  //아래와 같이 뒤 붙는 주소를 넣어주셔야합니다.
  //안그러면 css 가 반영이 안되요!! 꼭꼭 넣어주세요
  base: "/Chohanbin0511.github.io/",
  plugins: [
    ["@vuepress/back-to-top"],
    ["@vuepress/last-updated"],
    ["vuepress-plugin-code-copy"],
    // ["@vuepress/pagination"], //다음글, 이전글
    [
      "@vuepress/search",
      {
        //검색창
        searchMaxSuggestions: 10,
      },
    ],
    [
      "@vuepress/active-header-links",
      {
        //헤더 바로가기
        sidebarLinkSelector: ".sidebar-link",
        headerAnchorSelector: ".header-anchor",
        headerTopOffset: 120,
      },
    ],
    // [
    //     "@vuepress/google-analytics",
    //     {
    //         ga: // UA-00000000-0
    //     }
    // ],
  ],
};

function getSidebarArr() {
  var fs = require("fs");
  var docsPath = __dirname + "/../";
  var sidebarArr = [];
  var HomeFilelist = [];
  var filelist = fs.readdirSync(docsPath);
  filelist.forEach(function (file) {
    if (file === ".vuepress") return;
    var stat = fs.lstatSync(docsPath + "/" + file);
    if (stat.isDirectory()) {
      // directory
      // title is file, children is readdirSync
      var docsFolderPath = docsPath + "/" + file;
      var list = fs.readdirSync(docsFolderPath);
      sidebarArr.push(makeSidebarObject(file, list));
    } else {
      // NOT directory
      // title is '/' children is file
      HomeFilelist.push(file);
    }
  });
  sidebarArr.unshift(makeSidebarObject("", HomeFilelist));
  return sidebarArr;
}
function makeSidebarObject(folder, mdfileList) {
  var path = folder ? "/" + folder + "/" : "/";
  mdfileList = aheadOfReadme(mdfileList);
  var tmpMdfileList = [];
  // remove .md, add Path
  mdfileList.forEach(function (mdfile) {
    if (mdfile.substr(-3) === ".md") {
      mdfile = mdfile.slice(0, -3) === "README" ? "" : mdfile.slice(0, -3);
      tmpMdfileList.push(path + mdfile);
    }
  });
  mdfileList = tmpMdfileList;
  // remove folder prefix number
  if (folder) {
    var dotIdx = folder.indexOf(".");
    var title = Number(folder.substr(0, dotIdx))
      ? folder.substr(dotIdx + 1)
      : folder;
  } else {
    title = "HOME";
  }
  return {
    title: title,
    children: mdfileList,
  };
}
function aheadOfReadme(arr) {
  // ['1.test.md','README.md'] => ['README.md','1.test.md']
  var readmeIdx = arr.indexOf("README.md");
  if (readmeIdx > 0) {
    arr.unshift(arr.splice(readmeIdx, 1)[0]);
  }
  return arr;
}
