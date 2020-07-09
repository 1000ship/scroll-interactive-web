(() => {
  const sceneInfo = [
    {
      // 0
      type: "sticky",
      heightNum: 5, // 브라우저 높이의 5배로 scrollHeight 세팅
      scrollHeight: 0,
      objs: {
        container: document.querySelector("#scroll-section-0"),
      },
    },
    {
      // 1
      type: "normal",
      heightNum: 5,
      scrollHeight: 0,
      objs: {
        container: document.querySelector("#scroll-section-1"),
      },
    },
    {
      // 2
      type: "sticky",
      heightNum: 5,
      scrollHeight: 0,
      objs: {
        container: document.querySelector("#scroll-section-2"),
      },
    },
    {
      // 3
      type: "sticky",
      heightNum: 5,
      scrollHeight: 0,
      objs: {
        container: document.querySelector("#scroll-section-3"),
      },
    },
  ];

  function setSetting() {
    // 각 스크롤 섹션의 높이 세팅
    sceneInfo.forEach((info) => {
      info.scrollHeight = info.heightNum * window.innerHeight;
      info.objs.container.style.height = `${info.scrollHeight}px`
    });
    console.log(sceneInfo);
  }
  setSetting();
  window.addEventListener('resize', setSetting);
})();
