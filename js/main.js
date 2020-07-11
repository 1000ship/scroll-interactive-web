(function () {
  let loadedCount = 0;
  const totalFrame = 80;
  const frameImages = [];
  const imagePath = (frame) => `./img/puppy/frame-${frame}.jpg`;
  document.body.style.height = `${window.innerHeight * 2}px`;

  const $bg = document.getElementById("bgImage");
  const $img = document.getElementById("scrollImage");
  const $loadingText = document.getElementById("loadingText");

  function loadImages() {
    for (let i = 0; i < totalFrame; ++i) {
      let image = new Image();
      image.src = imagePath(i);
      frameImages.push(image);
      image.addEventListener("load", () => {
        loadedCount += 1;
        $loadingText.innerHTML = `Now Loading... ${
          parseInt(loadedCount / totalFrame) * 100
        }%`;
        if (loadedCount === totalFrame) loadedAllFrame();
      });
    }
  }

  function loadedAllFrame() {
    $loadingText.style.display = "none";
    window.addEventListener("scroll", () => {
      const scrollRate =
        window.pageYOffset / (document.body.offsetHeight - window.innerHeight);
      let currentFrame = parseInt(totalFrame * scrollRate);
      if (currentFrame >= totalFrame) currentFrame = totalFrame - 1;
      if (currentFrame < 0) currentFrame = 0;
      $img.src = frameImages[currentFrame].src;
      $bg.style.backgroundImage = `url(${imagePath(currentFrame)})`;
    });
  }

  window.addEventListener("DOMContentLoaded", () => {
    loadImages();
  });
})();
