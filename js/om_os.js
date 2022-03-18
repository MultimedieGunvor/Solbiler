
//Slideshow
function gaaFremad() {
    if (billedIndeks < billedliste.length - 1) {
        billedIndeks++;
    } else {
        billedIndeks = 0;
    }

    const slidefoto = document.getElementById("slidebillede");
    slidefoto.src = billedliste[billedIndeks];
}

function gaaTilbage() {
    if (billedIndeks > 0) {
        billedIndeks--;
    } else {
        billedIndeks = billedliste.length - 1;
    }

    const slidefoto = document.getElementById("slidebillede");
    slidefoto.src = billedliste[billedIndeks];
}

// ------- Hovedprogram ---------
const billedliste = ["/billeder/citat_1.png", "/billeder/citat_2.png", "/billeder/citat_3.png", "/billeder/citat_4.png"]; //Global variabel
let billedIndeks = 0; //Global variabel

const fremad = document.getElementById("frem");
fremad.addEventListener("click", function () {
    gaaFremad();
})

const tilbage = document.getElementById("tilbage");
tilbage.addEventListener("click", function () {
    gaaTilbage();
})

// Geolocation og ruteplanlægning - kode til geolocation fundet hos mozilla
function geoFindMe() {

    const status = document.querySelector('#status');
    const mapLink = document.querySelector('#map-link');
  
    mapLink.href = '';
    mapLink.textContent = '';
  
    function success(position) {
      const latitude  = position.coords.latitude;
      const longitude = position.coords.longitude;
  
      status.textContent = '';
      mapLink.href = `https://www.google.com/maps/dir/?api=1&origin=${latitude}/${longitude}&destination=56.18537433286232/10.120977150240433&travelmode=transit`;
      mapLink.textContent = `Vis min rute`;
    }
  
    function error() {
      status.textContent = 'Vi kunne ikke finde din placering';
    }
  
    if(!navigator.geolocation) {
      status.textContent = 'Din browser understøtter ikke geolocation';
    } else {
      status.textContent = 'Finder…';
      navigator.geolocation.getCurrentPosition(success, error);
    }
  
}
  
document.querySelector('#find-mig').addEventListener('click', geoFindMe);


// IntersectionObserver- kode fundet hos: https://benfrain.com/automatically-play-and-pause-video-as-it-enters-and-leaves-the-viewport-screen/
function playPauseVideo() {
    let videos = document.querySelectorAll("video");
    videos.forEach((video) => {
        // We can only control playback without insteraction if video is mute
        video.muted = true;
        // Play is a promise so we need to check we have it
        let playPromise = video.play();
        if (playPromise !== undefined) {
            playPromise.then((_) => {
                let observer = new IntersectionObserver(
                    (entries) => {
                        entries.forEach((entry) => {
                            if (
                                entry.intersectionRatio !== 1 &&
                                !video.paused
                            ) {
                                video.pause();
                            } else if (video.paused) {
                                video.play();
                            }
                        });
                    },
                    { threshold: 0.5 }
                );
                observer.observe(video);
            });
        }
    });
}
playPauseVideo();