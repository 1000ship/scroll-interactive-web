(() => {
  const sceneInfo = [
    {
      // 0
      type: "sticky",
      heightNum: 4, // 브라우저 높이의 5배로 scrollHeight 세팅
      scrollHeight: 0,
      objs: {
        container: document.querySelector("#scroll-section-0"),
        messageA: document.querySelector("#scroll-section-0 .main-message-a"),
        messageB: document.querySelector("#scroll-section-0 .main-message-b"),
        messageC: document.querySelector("#scroll-section-0 .main-message-c"),
        messageD: document.querySelector("#scroll-section-0 .main-message-d"),
      },
      values: [
        {
          extra: { left: true, right: false },
          low: 0,
          high: 1,
          range: { start: 0.1, end: 0.2 },
          obj: "messageA",
          prop: "opacity"
        },
        {
          extra: { left: false, right: true },
          low: 1,
          high: 0,
          range: { start: 0.1 + 0.1, end: 0.2 + 0.1 },
          obj: "messageA",
          prop: "opacity"
        },
        {
          low: 10,
          high: -10,
          range: {start: 0.1, end: 0.1 + 0.2},
          obj: "messageA",
          prop: "margin-top",
          format: (value) => `${value}px`
        },
        {
          extra: { left: true, right: false },
          low: 0,
          high: 1,
          range: { start: 0.3, end: 0.4 },
          obj: "messageB",
          prop: "opacity"
        },
        {
          extra: { left: false, right: true },
          low: 1,
          high: 0,
          range: { start: 0.3 + 0.1, end: 0.4 + 0.1 },
          obj: "messageB",
          prop: "opacity"
        },
        {
          low: 10,
          high: -10,
          range: {start: 0.3, end: 0.3 + 0.2},
          obj: "messageB",
          prop: "margin-top",
          format: (value) => `${value}px`
        },
        {
          extra: { left: true, right: false },
          low: 0,
          high: 1,
          range: { start: 0.5, end: 0.6 },
          obj: "messageC",
          prop: "opacity"
        },
        {
          extra: { left: false, right: true },
          low: 1,
          high: 0,
          range: { start: 0.5 + 0.1, end: 0.6 + 0.1 },
          obj: "messageC",
          prop: "opacity"
        },
        {
          low: 10,
          high: -10,
          range: {start: 0.5, end: 0.5 + 0.2},
          obj: "messageC",
          prop: "margin-top",
          format: (value) => `${value}px`
        },
        {
          extra: { left: true, right: false },
          low: 0,
          high: 1,
          range: { start: 0.7, end: 0.8 },
          obj: "messageD",
          prop: "opacity"
        },
        {
          extra: { left: false, right: true },
          low: 1,
          high: 0,
          range: { start: 0.7 + 0.1, end: 0.8 + 0.1 },
          obj: "messageD",
          prop: "opacity"
        },
        {
          low: 10,
          high: -10,
          range: {start: 0.7, end: 0.7 + 0.2},
          obj: "messageD",
          prop: "margin-top",
          format: (value) => `${value}px`
        },
      ],
    },
    {
      // 1
      type: "normal",
      heightNum: 1.5,
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
      if (info.type === "sticky")
        info.scrollHeight = info.heightNum * window.innerHeight;
      else if (info.type === "normal")
        info.scrollHeight = info.objs.container.offsetHeight;
      info.objs.container.style.height = `${info.scrollHeight}px`;
    });
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

  function calcValues(values, currentYOffset) {
    let rv;
    const scrollHeight = sceneInfo[currentScene].scrollHeight;
    const scrollRatio = currentYOffset / sceneInfo[currentScene].scrollHeight;
    const { low, high, range, extra } = values;
    if (range) {
      const { start, end } = range;
      const partScrollStart = start * scrollHeight;
      const partScrollEnd = end * scrollHeight;
      const partScrollHeight = partScrollEnd - partScrollStart;
      rv =
        currentYOffset < partScrollStart
          ? low
          : currentYOffset > partScrollEnd
          ? high
          : ((currentYOffset - partScrollStart) / partScrollHeight) *
              (high - low) +
            low;
    } else {
      rv = scrollRatio * (high - low) + low;
    }
    return rv;
  }

  function playAnimation() {
    const { objs, values } = sceneInfo[currentScene];
    const currentYOffset = yOffset - prevScrollHeight;
    const scrollRatio = currentYOffset / sceneInfo[currentScene].scrollHeight;

    switch (currentScene) {
      case 0:
        values.forEach((value) => {
          const { obj, extra, range, prop, format } = value;
          if (extra && range) {
            if (!extra.left && scrollRatio < range.start) return;
            if (!extra.right && scrollRatio > range.end) return;
          }
          if( format )
            objs[obj].style[prop] = format(calcValues(value, currentYOffset));
          else
            objs[obj].style[prop] = calcValues(value, currentYOffset);
        });
        break;
      case 1:
        console.log("1 play");
        break;
      case 2:
        console.log("2 play");
        break;
      case 3:
        console.log("3 play");
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
