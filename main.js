const header = document.querySelector('.main-header');

window.addEventListener('scroll', function() {
  if (window.pageYOffset > 100) {
    header.classList.add('fixed-header');
  } else {
    header.classList.remove('fixed-header');
  }
});


batch(".main-about, .tittle-project, .poke-api, .skills-tittle, .data-skill-container, #form-container, .contact-tittle", {
  interval: 0.1,
  onEnter: batch => gsap.to(batch, { autoAlpha: 1, stagger: 0.15, overwrite: true }),
  onLeave: batch => gsap.set(batch, { autoAlpha: 0, overwrite: true }),
  onEnterBack: batch => gsap.to(batch, { autoAlpha: 1, stagger: 0.15, overwrite: true }),
  onLeaveBack: batch => gsap.set(batch, { autoAlpha: 0, overwrite: true })
});



function batch(targets, vars) {
  let varsCopy = {},
    interval = vars.interval || 0.1,
    proxyCallback = (type, callback) => {
      let batch = [],
        delay = gsap.delayedCall(interval, () => { callback(batch); batch.length = 0; }).pause();
      return self => {
        batch.length || delay.restart(true);
        batch.push(self.trigger);
        vars.batchMax && vars.batchMax <= batch.length && delay.progress(1);
      };
    },
    p;
  for (p in vars) {
    varsCopy[p] = (~p.indexOf("Enter") || ~p.indexOf("Leave")) ? proxyCallback(p, vars[p]) : vars[p];
  }
  gsap.utils.toArray(targets).forEach(target => {
    let config = {};
    for (p in varsCopy) {
      config[p] = varsCopy[p];
    }
    config.trigger = target;
    ScrollTrigger.create(config);
  });
}

particlesJS("particles-js", {
  "particles": {
    "number": {
      "value": 80,
      "density": {
        "enable": true,
        "value_area": 800
      }
    },
    "color": {
      "value": "#ffffff"
    },
    "shape": {
      "type": "circle",
      "stroke": {
        "width": 0,
        "color": "#000000"
      },
      "polygon": {
        "nb_sides": 5
      }
    },
    "opacity": {
      "value": 0.5,
      "random": true,
      "anim": {
        "enable": false,
        "speed": 1,
        "opacity_min": 0.1,
        "sync": false
      }
    },
    "size": {
      "value": 3,
      "random": true,
      "anim": {
        "enable": false,
        "speed": 40,
        "size_min": 0.1,
        "sync": false
      }
    },
    "line_linked": {
      "enable": true,
      "distance": 150,
      "color": "#ff0000",
      "opacity": 0.4,
      "width": 1
    },
    "move": {
      "enable": true,
      "speed": 6,
      "direction": "none",
      "random": false,
      "straight": false,
      "out_mode": "out",
      "bounce": false,
      "attract": {
        "enable": false,
        "rotateX": 600,
        "rotateY": 1200
      }
    }
  },
  "interactivity": {
    "detect_on": "canvas",
    "events": {
      "onhover": {
        "enable": true,
        "mode": "repulse"
      },
      "onclick": {
        "enable": true,
        "mode": "push"
      },
      "resize": true
    },
    "modes": {
      "grab": {
        "distance": 400,
        "line_linked": {
          "opacity": 1
        }
      },
      "bubble": {
        "distance": 400,
        "size": 40,
        "duration": 2,
        "opacity": 8,
        "speed": 3
      },
      "repulse": {
        "distance": 200
      },
      "push": {
        "particles_nb": 4
      },
      "remove": {
        "particles_nb": 2
      }
    }
  },
  "retina_detect": true
});
