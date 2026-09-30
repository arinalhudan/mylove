const preloader =
  document.getElementById("preloader");

const enterBtn =
  document.getElementById("enterBtn");

const site =
  document.getElementById("site");

const intro =
  document.getElementById("intro");

const music =
  document.getElementById("music");

const soundBtn =
  document.getElementById("soundBtn");

const playBtn =
  document.getElementById("playBtn");

const progress =
  document.getElementById("progress");

const audioTime =
  document.getElementById("audioTime");

const giftBtn =
  document.getElementById("giftBtn");

const giftHint =
  document.getElementById("giftHint");

const restartBtn =
  document.getElementById("restartBtn");


let playing = false;


/* PRELOADER */

window.addEventListener("load", () => {

  setTimeout(() => {

    preloader.classList.add("done");

  }, 650);

});


/* MUSIC */

function startMusic(){

  music.volume = 0.34;

  music.play()
    .then(() => {

      playing = true;

      soundBtn.classList.add("playing");

      soundBtn.textContent = "♫";

      playBtn.textContent = "❚❚";

    })
    .catch(() => {

      console.log(
        "Browser menunggu interaksi pengguna."
      );

    });

}


/* ENTER */

enterBtn.addEventListener("click", () => {

  intro.style.transition =
    "opacity .9s, transform .9s";

  intro.style.opacity = "0";

  intro.style.transform =
    "scale(1.02)";


  setTimeout(() => {

    intro.classList.add("hidden");

    site.classList.remove("hidden");

    window.scrollTo({
      top: 0,
      behavior: "instant"
    });


    startMusic();

    revealNow();

  }, 850);

});


/* PLAY / PAUSE */

function toggleMusic(){

  if(music.paused){

    startMusic();

  }else{

    music.pause();

    playing = false;

    soundBtn.classList.remove(
      "playing"
    );

    soundBtn.textContent = "🔇";

    playBtn.textContent = "▶";

  }

}


soundBtn.addEventListener(
  "click",
  toggleMusic
);

playBtn.addEventListener(
  "click",
  toggleMusic
);


/* AUDIO CONTROL */

document
  .getElementById("prevBtn")
  .addEventListener("click", () => {

    music.currentTime = 0;

  });


document
  .getElementById("nextBtn")
  .addEventListener("click", () => {

    music.currentTime =
      Math.min(
        music.duration || 0,
        music.currentTime + 10
      );

  });


/* PROGRESS */

music.addEventListener(
  "timeupdate",
  () => {

    const percentage =
      music.duration
        ? (music.currentTime /
            music.duration) * 100
        : 0;


    progress.style.width =
      percentage + "%";


    const minutes =
      String(
        Math.floor(
          music.currentTime / 60
        )
      ).padStart(2, "0");


    const seconds =
      String(
        Math.floor(
          music.currentTime % 60
        )
      ).padStart(2, "0");


    audioTime.textContent =
      `${minutes} · ${seconds}`;

  }
);


/* GIFT */

giftBtn.addEventListener(
  "click",
  () => {

    giftBtn.classList.add("open");

    giftHint.textContent =
      "surat kecil untuk kamu ♡";


    setTimeout(() => {

      document
        .getElementById("letter")
        .scrollIntoView({
          behavior: "smooth"
        });

    }, 750);

  }
);


/* SCROLL ANIMATION */

const observer =
  new IntersectionObserver(
    entries => {

      entries.forEach(entry => {

        if(entry.isIntersecting){

          entry.target
            .classList
            .add("visible");

        }

      });

    },
    {
      threshold:0.13
    }
  );


document
  .querySelectorAll(".reveal")
  .forEach(element => {

    observer.observe(element);

  });


function revealNow(){

  document
    .querySelectorAll(".reveal")
    .forEach(element => {

      const rect =
        element.getBoundingClientRect();


      if(
        rect.top <
        window.innerHeight * 0.9
      ){

        element.classList.add(
          "visible"
        );

      }

    });

}


/* RESTART */

restartBtn.addEventListener(
  "click",
  () => {

    music.pause();

    music.currentTime = 0;

    location.reload();

  }
);


/* PAUSE MUSIC WHEN TAB CLOSED */

document.addEventListener(
  "visibilitychange",
  () => {

    if(
      document.hidden &&
      !music.paused
    ){

      music.pause();

    }

  }
);