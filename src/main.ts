const konamiCode = [
  "ArrowUp",
  "ArrowUp",
  "ArrowDown",
  "ArrowDown",
  "ArrowLeft",
  "ArrowRight",
  "ArrowLeft",
  "ArrowRight",
  "b",
  "a",
];

let inputs: string[] = [];

const normalContainer = document.getElementById("normal");
const gameContainer = document.getElementById("game");
const noInput = document.getElementById("no-input");
const gameContent = document.getElementById("game-content");
const gameTitle = document.getElementById("game-title");
const gameIntro = document.getElementById("game-intro");
const gameSkills = document.getElementById("game-skills");
const gameProjects = document.getElementById("game-projects");
const gameContact = document.getElementById("game-contact");
let current = gameTitle;
const gameStartAudio = document.getElementById(
  "game-start-audio",
) as HTMLAudioElement | null;
const gameScreenSwitchAudio = document.getElementById(
  "game-screen-switch-audio",
) as HTMLAudioElement | null;

window.addEventListener("keyup", handleKeyUp);

function handleKeyUp(event: KeyboardEvent) {
  inputs.push(event.key);

  // Only keep the last inputs
  if (inputs.length > konamiCode.length) {
    inputs.shift();
  }

  if (inputs.join("") === konamiCode.join("")) {
    window.removeEventListener("keyup", handleKeyUp);
    activate();
  }
}

function activate() {
  document.body.classList.remove(
    "bg-[url(/background-dark.svg)]",
    "dark:bg-[url(/background-light.svg)]",
  );
  document.body.classList.add("bg-black");
  normalContainer?.classList.add("hidden");
  gameContainer?.classList.remove("hidden");

  setTimeout(() => {
    document.startViewTransition(() => {
      document.querySelector("html")?.classList.add("game");
      document.body.classList.replace(
        "bg-black",
        "bg-[url(/background-game.svg)]",
      );
      gameContainer?.classList.replace("font-mono", "font-game");
      noInput?.classList.add("hidden");
      gameContent?.classList.remove("hidden");
      gameContent?.classList.add("flex");
      gameStartAudio?.play();
    });
  }, 2000);

  window.addEventListener("keyup", handleEnter);
  window.addEventListener("keyup", handleBackspace);
}

function handleEnter(event: KeyboardEvent) {
  if (event.key === "Enter") {
    if (current !== gameContact) {
      gameScreenSwitchAudio?.play();
    }

    switch (current) {
      case gameTitle:
        document.startViewTransition(() => {
          gameTitle?.classList.add("hidden");
          gameIntro?.classList.remove("hidden");
        });

        current = gameIntro;
        break;
      case gameIntro:
        document.startViewTransition(() => {
          gameIntro?.classList.add("hidden");
          gameSkills?.classList.remove("hidden");
        });

        current = gameSkills;
        break;
      case gameSkills:
        document.startViewTransition(() => {
          gameSkills?.classList.add("hidden");
          gameProjects?.classList.remove("hidden");
        });

        current = gameProjects;
        break;
      case gameProjects:
        document.startViewTransition(() => {
          gameProjects?.classList.add("hidden");
          gameContact?.classList.remove("hidden");
        });

        current = gameContact;
        break;
    }
  }
}

function handleBackspace(event: KeyboardEvent) {
  if (event.key === "Backspace") {
    if (current !== gameTitle) {
      gameScreenSwitchAudio?.play();
    }

    switch (current) {
      case gameIntro:
        document.startViewTransition(() => {
          gameIntro?.classList.add("hidden");
          gameTitle?.classList.remove("hidden");
        });

        current = gameTitle;
        break;
      case gameSkills:
        document.startViewTransition(() => {
          gameSkills?.classList.add("hidden");
          gameIntro?.classList.remove("hidden");
        });

        current = gameIntro;
        break;
      case gameProjects:
        document.startViewTransition(() => {
          gameProjects?.classList.add("hidden");
          gameSkills?.classList.remove("hidden");
        });

        current = gameSkills;
        break;
      case gameContact:
        document.startViewTransition(() => {
          gameContact?.classList.add("hidden");
          gameProjects?.classList.remove("hidden");
        });

        current = gameProjects;
        break;
    }
  }
}
