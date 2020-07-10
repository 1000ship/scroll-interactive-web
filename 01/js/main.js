(() => {
  const sceneInfo = [
    {
      // 0
      type: "sticky",
      heightNum: 5, // 브라우저 높이의 5배로 scrollHeight 세팅
      scrollHeight: 0,
      objs: {
        container: document.querySelector("#scroll-section-0"),
        messageA: document.querySelector("#scroll-section-0 .main-message.a"),
        messageB: document.querySelector("#scroll-section-0 .main-message.b"),
        messageC: document.querySelector("#scroll-section-0 .main-message.c"),
        messageD: document.querySelector("#scroll-section-0 .main-message.d"),
      },
      value: {
        messageA_opacity: [0, 1],
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
      info.objs.container.style.height = `${info.scrollHeight}px`;
    });
    console.log(sceneInfo);
  }

  let yOffset = 0;
  let prevScrollHeight = 0;
  let currentScene = 0;
  function scrollLoop() {
    yOffset = window.pageYOffset;
    prevScrollHeight = 0;
    sceneInfo.forEach((info, index) =>
      index < currentScene ? (prevScrollHeight += info.scrollHeight) : true
    );

    if (yOffset >= 0 && yOffset < prevScrollHeight) {
      currentScene -= 1;
      document.body.setAttribute("id", `show-scene-${currentScene}`);
    }
    if (
      currentScene < sceneInfo.length &&
      yOffset > prevScrollHeight + sceneInfo[currentScene].scrollHeight
    ) {
      currentScene += 1;
      document.body.setAttribute("id", `show-scene-${currentScene}`);
    }
    playAnimation();
  }

  function playAnimation() {
    switch (currentScene) {
      case 0:
        console.log('0 play')
        break;
      case 1:
        console.log('1 play')
        break;
      case 2:
        console.log('2 play')
        break;
      case 3:
        console.log('3 play')
        break;
    }
  }

  setSetting();
  window.addEventListener("resize", setSetting);
  window.addEventListener("DOMContentLoaded", () => {
    setSetting();
    document.body.setAttribute("id", `show-scene-${currentScene}`);
  });
  window.addEventListener("scroll", () => {
    scrollLoop();
  });
})();
