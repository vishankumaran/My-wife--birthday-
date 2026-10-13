/* =========================================================
   OUR LOVE STORY — INTERACTIONS & ANIMATIONS
   File: script.js
   Designed for your supplied index.html
   ========================================================= */

"use strict";

/* PERSONALIZATION */

const RECIPIENT_NAME = "Dharshini";
const ROMANTIC_NICKNAME = "Uyire";

const BIRTHDAY_LETTER = `My favorite person,

Happy Birthday to the person who makes my world brighter just by being in it.

Your smile makes ordinary moments special, and your presence brings happiness into my life. I hope this new year brings you endless laughter, beautiful memories, success, peace, and all the happiness your heart deserves.

You are precious, you are special, and you deserve to feel loved every single day.

Today is your day, but having you in my life feels like a gift every day.

Happy Birthday, My Love. ❤️

With all my love,
UNNAVAN`;

const FINAL_SURPRISE_MESSAGE = `HAPPY BIRTHDAY TO YOU MY DEAR WIFE

na evlo sanda pottalu onnatha thedi varuve,
onna vitta enaku yar iruka,
Nama rendu peru strangers ahh irunthu friends ara mari ipo ivlo close ahh iruko,
Na en life fulla onaku tharanu nu nenaikikire

LOVE YOU PONDATI 🖤🩷`;

const REJECTION_MESSAGE =
  "Happy birthday to you 🖤 life long stay happy like this moment 🫂👑";

const MEMORY_PHOTOS = [
  "images/memory1.jpg",
  "images/memory2.jpg",
  "images/memory3.jpg",
  "images/memory4.jpg",
  "images/memory5.jpg"
];

const MEMORY_CAPTIONS = [
  "Every beginning becomes a beautiful memory. ❤️",
  "Your smile is my favorite view. 💗",
  "Little moments, endless meaning. ✨",
  "My heart keeps choosing you. 🫶",
  "Our story is my favorite adventure. 💞"
];

/* ELEMENTS */

const $ = id => document.getElementById(id);

const music = $("music");
const roseVideo = $("roseVideo");
const proposeVideo = $("proposeVideo");
const acceptVideo = $("acceptVideo");

let openedMemories = new Set();
let giftOpened = false;
let proposalAnswered = false;
let musicAttemptInProgress = false;

/* PERSONALIZED COPY */

$("pageTitle").textContent =
  `For ${RECIPIENT_NAME} ❤️`;

$("proposalText").textContent =
  `${RECIPIENT_NAME}, will you accept my little proposal? 💖`;

$("letterContent").textContent =
  BIRTHDAY_LETTER.replace(
    "My favorite person,",
    `My favorite person, ${RECIPIENT_NAME},`
  );

$("finalHeading").textContent =
  `For You, ${ROMANTIC_NICKNAME}`;

$("finalMessage").textContent =
  FINAL_SURPRISE_MESSAGE;

/* MUSIC STATUS */

function setMusicStatus(message) {
  const status = $("musicStatus");

  if (status) {
    status.textContent = message;
  }
}

/* VIDEO CONTROLS */

function safePlay(video, loop = false) {
  if (!video) return;

  video.loop = loop;

  const promise = video.play();

  if (promise && typeof promise.catch === "function") {
    promise.catch(() => {
      // Some browsers require a user tap before playing video.
    });
  }
}

function stopVideo(video) {
  if (!video) return;

  try {
    video.pause();
  } catch (error) {
    // Ignore unavailable video playback.
  }
}

function getSceneVideo(sceneId) {
  if (sceneId === "s1") {
    return roseVideo;
  }

  if (sceneId === "s3") {
    return proposeVideo;
  }

  if (
    sceneId === "s4" &&
    $("acceptStage") &&
    !$("acceptStage").hidden
  ) {
    return acceptVideo;
  }

  return null;
}

/* SCENE NAVIGATION */

function showScene(sceneId) {
  const target = $(sceneId);

  if (!target || !target.classList.contains("scene")) {
    return;
  }

  document.querySelectorAll(".scene").forEach(scene => {
    scene.classList.toggle(
      "active",
      scene.id === sceneId
    );
  });

  [roseVideo, proposeVideo, acceptVideo].forEach(video => {
    if (video && video !== getSceneVideo(sceneId)) {
      stopVideo(video);
    }
  });

  window.scrollTo({
    top: 0,
    behavior: "smooth"
  });

  const activeVideo = getSceneVideo(sceneId);

  if (activeVideo) {
    safePlay(activeVideo, sceneId === "s1");
  }

  attemptMusic();
}

/* BACKGROUND MUSIC */

function attemptMusic() {
  if (
    !music ||
    musicAttemptInProgress ||
    !music.paused
  ) {
    return;
  }

  musicAttemptInProgress = true;
  music.loop = true;
  music.volume = 0.45;

  const playPromise = music.play();

  if (
    playPromise &&
    typeof playPromise.then === "function"
  ) {
    playPromise
      .then(() => {
        setMusicStatus("♪ Romantic music is playing");
      })
      .catch(() => {
        setMusicStatus(
          "Tap Begin Our Story to start the music ♪"
        );
      })
      .finally(() => {
        musicAttemptInProgress = false;
      });
  } else {
    musicAttemptInProgress = false;
  }
}

function playMusicFromTap() {
  if (!music) return;

  musicAttemptInProgress = false;

  const promise = music.play();

  if (
    promise &&
    typeof promise.then === "function"
  ) {
    promise
      .then(() => {
        setMusicStatus("♪ Romantic music is playing");
      })
      .catch(() => {
        setMusicStatus(
          "Music could not play. Check audio/romantic.mp3"
        );
      });
  }
}

/* PASSWORD GATE
   Accepted answer: vishan kumaran

   NOTE:
   This is a front-end surprise gate, not secure
   website authentication.
*/

(function setupPasswordGate() {
  const gate = $("passwordGate");
  const form = $("partnerForm");
  const answerInput = $("partnerAnswer");
  const message = $("gateMessage");
  const unlockButton = $("unlockButton");

  if (
    !gate ||
    !form ||
    !answerInput ||
    !unlockButton
  ) {
    return;
  }

  const correctAnswer = "vishan kumaran";

  form.addEventListener("submit", event => {
    event.preventDefault();

    const answer = answerInput.value
      .trim()
      .toLowerCase()
      .replace(/\s+/g, " ");

    if (answer !== correctAnswer) {
      message.textContent =
        "That's not the right answer. Try again, my love. 💗";

      answerInput.value = "";

      answerInput.setAttribute(
        "aria-invalid",
        "true"
      );

      answerInput.focus();

      return;
    }

    message.textContent =
      "Welcome to our love story! ❤️";

    answerInput.setAttribute(
      "aria-invalid",
      "false"
    );

    unlockButton.disabled = true;

    unlockButton.textContent =
      "Opening your surprise... ✨";

    window.setTimeout(() => {
      gate.classList.add("unlocked");

      const removeGate = () => {
        if (gate.parentNode) {
          gate.remove();
        }
      };

      gate.addEventListener(
        "animationend",
        removeGate,
        { once: true }
      );

      // Fallback if animationend does not fire.
      window.setTimeout(removeGate, 1100);

      playMusicFromTap();
      safePlay(roseVideo, true);
    }, 350);
  });
})();

/* STARRY BACKGROUND */

(function createStars() {
  const container = $("stars");

  if (!container) return;

  const fragment = document.createDocumentFragment();

  for (let i = 0; i < 48; i++) {
    const star = document.createElement("span");

    star.className = "star";

    star.textContent =
      Math.random() > 0.55 ? "✦" : "·";

    star.style.left =
      `${Math.random() * 100}%`;

    star.style.top =
      `${Math.random() * 100}%`;

    star.style.fontSize =
      `${8 + Math.random() * 13}px`;

    star.style.animationDelay =
      `${Math.random() * 3}s`;

    star.style.animationDuration =
      `${1.5 + Math.random() * 2.5}s`;

    fragment.appendChild(star);
  }

  container.appendChild(fragment);
})();

/* PARTICLE BURSTS */

function burstParticles(
  symbols = ["💖", "✨", "💕", "🌸"]
) {
  const container = $("particles");

  if (!container) return;

  for (let i = 0; i < 30; i++) {
    const particle = document.createElement("span");

    particle.className = "particle";

    particle.textContent =
      symbols[
        Math.floor(Math.random() * symbols.length)
      ];

    particle.style.left =
      `${25 + Math.random() * 50}%`;

    particle.style.top =
      `${25 + Math.random() * 45}%`;

    particle.style.setProperty(
      "--x",
      `${Math.random() * 440 - 220}px`
    );

    particle.style.setProperty(
      "--y",
      `${Math.random() * 460 - 230}px`
    );

    particle.style.animationDelay =
      `${Math.random() * 0.18}s`;

    container.appendChild(particle);

    particle.addEventListener(
      "animationend",
      () => particle.remove(),
      { once: true }
    );
  }
}

/* MEMORY HEARTS */

function renderMemoryHearts() {
  const grid = $("heartGrid");

  if (!grid) return;

  grid.replaceChildren();

  MEMORY_PHOTOS.forEach((photoPath, index) => {
    const button = document.createElement("button");

    button.type = "button";
    button.className = "memory-heart";

    button.setAttribute(
      "aria-label",
      `Open memory ${index + 1}`
    );

    button.innerHTML =
      `💗<span>Memory ${index + 1}</span>`;

    button.addEventListener("click", () => {
      revealMemory(index, photoPath);
    });

    grid.appendChild(button);
  });
}

function revealMemory(index, photoPath) {
  const reveal = $("photoReveal");

  if (!reveal) return;

  if (openedMemories.has(index)) {
    showMemoryPhoto(index, photoPath);
    return;
  }

  openedMemories.add(index);

  const heartButton =
    $("heartGrid").children[index];

  if (heartButton) {
    heartButton.classList.add("done");

    heartButton.innerHTML =
      "💖<span>Opened ✓</span>";

    heartButton.setAttribute(
      "aria-label",
      `Memory ${index + 1}, opened`
    );
  }

  showMemoryPhoto(index, photoPath);

  $("memoryCount").textContent =
    `Memories discovered: ${openedMemories.size} / ${MEMORY_PHOTOS.length}`;

  $("toProposalButton").disabled =
    openedMemories.size < MEMORY_PHOTOS.length;

  if (openedMemories.size === MEMORY_PHOTOS.length) {
    $("memoryCount").textContent =
      "All five memories discovered. Our next chapter awaits! 💍";

    burstParticles(["💗", "✨", "🌸"]);
  }
}

function showMemoryPhoto(index, photoPath) {
  const reveal = $("photoReveal");

  reveal.replaceChildren();

  const frame = document.createElement("div");
  frame.className = "photo-frame";

  const img = document.createElement("img");

  img.src = photoPath;
  img.alt = `Memory ${index + 1}`;
  img.loading = "eager";

  const caption = document.createElement("p");

  caption.className = "photo-caption";

  caption.textContent =
    MEMORY_CAPTIONS[index] ||
    "A little memory from our story. 💗";

  img.onerror = () => {
    img.alt =
      "Photo not found. Check the images folder and filename.";

    img.style.minHeight = "150px";
    img.style.objectFit = "contain";

    caption.textContent =
      `Photo missing: ${photoPath}. Check that the filename matches exactly.`;
  };

  frame.append(img, caption);
  reveal.appendChild(frame);

  frame.scrollIntoView({
    behavior: "smooth",
    block: "nearest"
  });
}

/* SCENE 1 -> SCENE 2 */

$("beginButton")?.addEventListener("click", () => {
  playMusicFromTap();

  burstParticles([
    "💖",
    "🌹",
    "✨",
    "💕"
  ]);

  showScene("s2");
});

/* SCENE 2 -> SCENE 3 */

$("toProposalButton")?.addEventListener(
  "click",
  () => {
    if (openedMemories.size < MEMORY_PHOTOS.length) {
      $("memoryCount").textContent =
        "Open all five hearts first, my love. 💗";

      return;
    }

    burstParticles([
      "💍",
      "💖",
      "✨"
    ]);

    showScene("s3");
  }
);

/* PROPOSAL: YES */

$("yesButton")?.addEventListener("click", () => {
  if (proposalAnswered) return;

  proposalAnswered = true;

  $("proposalActions").hidden = true;

  $("proposalFeedback").textContent =
    "You just made this moment unforgettable! I love you. ❤️";

  $("resultHeading").textContent =
    "She said YES! 💖";

  $("resultMessage").textContent =
    `Dharshini, thank you for making this story even more beautiful. Here's to more memories together. 🖤🩷`;

  $("acceptStage").hidden = false;
  $("toGiftButton").hidden = false;
  $("finishButton").hidden = true;

  burstParticles([
    "💖",
    "💍",
    "💕",
    "✨",
    "🌸"
  ]);

  showScene("s4");
  safePlay(acceptVideo, false);
});

/* PROPOSAL: NO */

$("noButton")?.addEventListener("click", () => {
  $("proposalFeedback").textContent =
    "No pressure, my love. Your happiness matters most. 💗";

  // The visitor can make their own choice.
  burstParticles([
    "💗",
    "🌸",
    "✨"
  ]);
});

/* RESULT SCENE BUTTONS */

$("toGiftButton")?.addEventListener("click", () => {
  burstParticles([
    "🎁",
    "💖",
    "✨"
  ]);

  showScene("s5");
});

$("finishButton")?.addEventListener("click", () => {
  $("resultMessage").textContent =
    "Thank you for being part of this little universe. ❤️";

  burstParticles();
});

/* GIFT OPENING */

$("openGiftButton")?.addEventListener(
  "click",
  () => {
    if (giftOpened) {
      $("giftReveal").hidden = false;
      return;
    }

    giftOpened = true;

    $("gift").classList.add("open");

    $("openGiftButton").disabled = true;

    $("openGiftButton").textContent =
      "Your gift is open 💖";

    window.setTimeout(() => {
      $("giftReveal").hidden = false;

      burstParticles([
        "🎁",
        "💖",
        "✨",
        "🌸"
      ]);

      const photo = $("giftPhoto");

      if (photo) {
        photo.scrollIntoView({
          behavior: "smooth",
          block: "center"
        });
      }
    }, 650);
  }
);

/* GIFT PHOTO -> BIRTHDAY LETTER */

$("giftPhoto")?.addEventListener("click", () => {
  const letter = $("letter");

  letter.classList.add("show");

  burstParticles([
    "💌",
    "💖",
    "✨"
  ]);

  letter.scrollIntoView({
    behavior: "smooth",
    block: "center"
  });
});

/* BIRTHDAY LETTER -> FINAL SURPRISE */

$("finalButton")?.addEventListener("click", () => {
  burstParticles([
    "💖",
    "🌸",
    "✨",
    "💕"
  ]);

  showScene("s6");
});

/* FINAL SURPRISE */

$("magicButton")?.addEventListener("click", () => {
  burstParticles([
    "💖",
    "💕",
    "🌸",
    "✨",
    "🎉"
  ]);

  const button = $("magicButton");

  button.textContent =
    "Forever & Always 🖤🩷";

  $("finalMessage").textContent =
    `${FINAL_SURPRISE_MESSAGE}\n\nOne more hug, one more smile, and a million more memories together. ❤️`;
});

/* VIDEO ERROR HANDLING */

[
  roseVideo,
  proposeVideo,
  acceptVideo
].forEach(video => {
  if (!video) return;

  video.addEventListener("error", () => {
    const note =
      video.closest(".video-stage")?.nextElementSibling;

    if (note && note.classList.contains("video-note")) {
      note.textContent =
        "Add the matching video file in your videos folder to show this animation.";
    }
  });
});

/* AUDIO STATUS */

if (music) {
  music.addEventListener("playing", () => {
    setMusicStatus("♪ Romantic music is playing");
  });

  music.addEventListener("pause", () => {
    if (!music.ended) {
      setMusicStatus("Romantic music paused");
    }
  });

  music.addEventListener("error", () => {
    setMusicStatus(
      "Music file not found — check audio/romantic.mp3"
    );
  });
}

/* INITIALIZE */

renderMemoryHearts();

if ($("toProposalButton")) {
  $("toProposalButton").disabled = true;
}

if ($("acceptStage")) {
  $("acceptStage").hidden = true;
}

if ($("toGiftButton")) {
  $("toGiftButton").hidden = true;
}

if ($("finishButton")) {
  $("finishButton").hidden = true;
}

if ($("giftReveal")) {
  $("giftReveal").hidden = true;
}

if ($("letter")) {
  $("letter").classList.remove("show");
}

setMusicStatus(
  "Romantic music will begin after you unlock the story ♪"
);
