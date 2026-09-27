// ===== Menu Bar =====
(function() {
try {
document.addEventListener("DOMContentLoaded", function () {
var navToggle = document.getElementById("ibm-nav-toggle");
var closeTriggers = document.querySelectorAll(".ibm-close-trigger");
var scrollY = 0;

if (navToggle) {
navToggle.addEventListener("change", function () {
if (navToggle.checked) {
scrollY = window.scrollY || window.pageYOffset;
document.body.style.top = (-scrollY) + "px";
document.body.classList.add("ibm-nav-scroll-lock");
} else {
document.body.classList.remove("ibm-nav-scroll-lock");
document.body.style.top = "";
window.scrollTo(0, scrollY);
}
});
}

closeTriggers.forEach(function (trigger) {
trigger.addEventListener("click", function () {
if (navToggle) {
navToggle.checked = false;
navToggle.dispatchEvent(new Event("change"));
}
});
});

// Auto-scroll the mobile drawer so all 4 Services options are visible after expanding
var servicesToggle = document.getElementById("ibm-services-toggle");
if (servicesToggle) {
servicesToggle.addEventListener("change", function () {
if (servicesToggle.checked) {
setTimeout(function () {
var content = document.querySelector(".ibm-dropdown-content");
if (content) {
content.scrollIntoView({ behavior: "smooth", block: "end" });
}
}, 60);
}
});
}
});
} catch(e) { console.warn("Script error in Menu Bar:", e); }
})();

// ===== animation-card-logos =====
(function() {
try {
(function() {
  function initMarquee(card) {
    var imgs = card.querySelectorAll('img');
    if (!imgs.length) {
      card.classList.add('marquee-ready');
      return;
    }
    var remaining = imgs.length;
    function done() {
      remaining--;
      if (remaining <= 0) {
        card.classList.add('marquee-ready');
      }
    }
    imgs.forEach(function(img) {
      if (img.complete) {
        done();
      } else {
        img.addEventListener('load', done, { once: true });
        img.addEventListener('error', done, { once: true }); // don't block forever on a broken image
      }
    });
    // Safety net: if something never fires (very unlikely), start anyway after 4s so it's never stuck frozen
    setTimeout(function() { card.classList.add('marquee-ready'); }, 4000);
  }

  function init() {
    document.querySelectorAll('.marquee-card').forEach(initMarquee);
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }
})();
} catch(e) { console.warn("Script error in animation-card-logos:", e); }
})();

// ===== animation-card-logos =====
(function() {
try {
(function() {
  function initMobileLogoStrip() {
    var wrapper = document.getElementById('ibmMobileLogoStrip');
    if (!wrapper) return;

    var paused = false;
    var speed = 0.6; // pixels per animation frame

    function step() {
      if (!paused) {
        // Recalculated every single frame — stays correct even while images
        // are still progressively loading, so there's nothing to "wait" for.
        var halfWidth = wrapper.scrollWidth / 2;
        if (halfWidth > 0) {
          wrapper.scrollLeft += speed;
          if (wrapper.scrollLeft >= halfWidth) {
            wrapper.scrollLeft -= halfWidth;
          }
        }
      }
      requestAnimationFrame(step);
    }

    wrapper.addEventListener('touchstart', function() { paused = true; }, { passive: true });
    wrapper.addEventListener('touchend', function() { paused = false; }, { passive: true });
    wrapper.addEventListener('mousedown', function() { paused = true; });
    wrapper.addEventListener('mouseup', function() { paused = false; });

    requestAnimationFrame(step);
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initMobileLogoStrip);
  } else {
    initMobileLogoStrip();
  }
})();
} catch(e) { console.warn("Script error in animation-card-logos:", e); }
})();

// ===== animation-card-logos =====
(function() {
try {
(function() {
  var LOGOS = [["assets/images/apollo.png", "Apollo"], ["assets/images/bank-of-america-2.png", "Bank of America"], ["assets/images/barclays.png", "Barclays"], ["assets/images/citi.png", "Citi"], ["assets/images/cornell.png", "Cornell"], ["assets/images/evercore-2.png", "Evercore"], ["assets/images/goldman-sachs-2.png", "Goldman Sachs"], ["assets/images/harvard.png", "Harvard"], ["assets/images/jpmorgan.png", "JPMorgan"], ["assets/images/jefferies.png", "Jefferies"], ["assets/images/lazard-2.png", "Lazard"], ["assets/images/mit.png", "MIT"], ["assets/images/moelis.png", "Moelis"], ["assets/images/morgan-stanley.png", "Morgan Stanley"], ["assets/images/piper-sandler.gif", "Piper Sandler"], ["assets/images/raymond-james.png", "Raymond James"], ["assets/images/rbc.webp", "RBC"], ["assets/images/stanford.png", "Stanford"], ["assets/images/ubs.png", "UBS"], ["assets/images/university-of-chicago.png", "University of Chicago"], ["assets/images/university-of-virginia.png", "University of Virginia"], ["assets/images/vanderbilt.png", "Vanderbilt"], ["assets/images/virginia-tech.png", "Virginia Tech"], ["assets/images/yale.png", "Yale"], ["assets/images/wells-fargo-2.png", "Wells Fargo"]];

  var ROW_COUNT = 4;
  // Several source logo files have much more internal padding baked in than
  // others, so at an identical box height they render visibly smaller —
  // confirmed against screenshots of the old marquee. Scaled these up
  // individually rather than the rest, instead of raising everyone's size.
  // Real height change, not transform:scale() — the desktop marquee CSS has
  // a comment noting transform-based sizing is exactly what causes phantom
  // scrollbars on some mobile browsers, so this avoids that entirely.
  var BASE_LOGO_HEIGHT = 34;
  var SIZE_BOOST = {
    "MIT": 2.15,
    "University of Chicago": 1.75,
    "Yale": 2.5,
    "Cornell": 1.6,
    "University of Virginia": 2.8,
    "RBC": 2.9,
    "Stanford": 1.7,
    "Barclays": 2.8,
    "Vanderbilt": 1.8,
    "Goldman Sachs": 1.6,
    "Wells Fargo": 1.55,
    "Virginia Tech": 1.15,
    "Bank of America": 1.9,
    "Morgan Stanley": 1.8
  };
  var GROUP_SIZE = 3;
  // Space each row's starting point evenly around the same 25-logo list,
  // so all 4 rows show different logos from one another at any given moment.
  var ROW_OFFSET_STEP = Math.floor(LOGOS.length / ROW_COUNT);

  // iPhone-only fix: iOS Safari has a known bug where swapping an <img> src
  // while it's mid-opacity-transition can leave a stale, still-composited
  // frame on screen — two different logos appearing to render on top of each
  // other. This only affects iOS; every other platform is untouched below.
  var IS_IPHONE = /iPhone|iPod/.test(navigator.userAgent) && !window.MSStream;
  if (IS_IPHONE) {
    document.documentElement.classList.add('ibm-ios-logo-fix');
  }

  function initFadeRow(grid, rowIndex) {
    var slots = grid.querySelectorAll('.ibm-mlogo-fade-slot img');
    if (!slots.length) return;

    var index = rowIndex * ROW_OFFSET_STEP;

    function setGroup(startIndex) {
      slots.forEach(function(img, i) {
        var logo = LOGOS[(startIndex + i) % LOGOS.length];
        img.src = logo[0];
        img.alt = logo[1];
        var boost = SIZE_BOOST[logo[1]];
        img.style.height = boost ? (BASE_LOGO_HEIGHT * boost) + 'px' : '';
      });
    }

    setGroup(index); // show immediately, no fade needed on first paint

    // Staggered per row so all rows don't fade in perfect unison — each row
    // starts its cycle slightly after the previous one, for a cascading feel.
    setTimeout(function() {
      setInterval(function() {
        slots.forEach(function(img) { img.classList.add('ibm-fade-out'); });

        setTimeout(function() {
          index = (index + GROUP_SIZE) % LOGOS.length;
          setGroup(index);
          if (IS_IPHONE) {
            // Force a synchronous reflow before fading back in, so iOS Safari
            // actually flushes the new image instead of showing a stale
            // composited frame underneath it.
            slots.forEach(function(img) { void img.offsetHeight; });
          }
          slots.forEach(function(img) { img.classList.remove('ibm-fade-out'); });
        }, 500); // matches the CSS transition duration
      }, 2800); // how long each group stays visible before cycling
    }, rowIndex * 220);
  }

  function initFadeCarousel() {
    var grids = document.querySelectorAll('.ibm-mlogo-fade-grid');
    grids.forEach(function(grid) {
      var rowIndex = parseInt(grid.getAttribute('data-row'), 10) || 0;
      initFadeRow(grid, rowIndex);
    });
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initFadeCarousel);
  } else {
    initFadeCarousel();
  }
})();
} catch(e) { console.warn("Script error in animation-card-logos:", e); }
})();

// ===== placement-percentage-our-mentors-first-year-compensation =====
(function() {
try {
(function() {
  function animateCount(el) {
    if (el.dataset.counted === 'true') return;
    el.dataset.counted = 'true';

    var raw = (el.dataset.target || el.textContent).trim().replace(/,/g, '');
    var target = parseFloat(raw);
    if (isNaN(target)) return;

    var duration = 1400;
    var startTime = null;

    function formatNumber(n) {
      var rounded = Math.round(n);
      return rounded.toLocaleString('en-US');
    }

    function step(timestamp) {
      if (!startTime) startTime = timestamp;
      var progress = Math.min((timestamp - startTime) / duration, 1);
      var eased = 1 - Math.pow(1 - progress, 3); // ease-out cubic
      var current = target * eased;
      el.textContent = formatNumber(current);
      if (progress < 1) {
        requestAnimationFrame(step);
      } else {
        el.textContent = formatNumber(target);
        el.classList.add('ibm-count-pop');
        var glowCard = el.closest('.bento-hero-card, .bento-mini-card, .bento-full-banner, .nontarget-card') || el.parentElement;
        if (glowCard) { glowCard.classList.add('ibm-count-glow-card'); }
      }
    }

    requestAnimationFrame(step);
  }

  function initCountAnimations() {
    var targets = document.querySelectorAll('.count-target');
    if (!targets.length) return;

    if (!('IntersectionObserver' in window)) {
      // Fallback for very old browsers: just show final numbers, no animation
      targets.forEach(function(el) { el.dataset.counted = 'true'; });
      return;
    }

    // Start every number at 0 so visitors never see the final value flash first
    targets.forEach(function(el) {
      el.dataset.target = el.textContent.trim();
      el.textContent = '0';
    });

    var observer = new IntersectionObserver(function(entries) {
      entries.forEach(function(entry) {
        if (entry.isIntersecting) {
          animateCount(entry.target);
          observer.unobserve(entry.target);
        }
      });
    }, { threshold: 0.6, rootMargin: '0px 0px -60px 0px' });

    targets.forEach(function(el) { observer.observe(el); });
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initCountAnimations);
  } else {
    initCountAnimations();
  }
})();
} catch(e) { console.warn("Script error in placement-percentage-our-mentors-first-year-compensation:", e); }
})();

// ===== successs-path-quiz =====
(function() {
try {
function initDiagnosticQuiz() {

var container = document.getElementById('diagnostic');

if (!container) return;

var answers = {};

var panels = container.querySelectorAll('.quiz-step');

var buttons = container.querySelectorAll('.quiz-opt-btn');

var order = ['step-1-panel','step-2-panel','step-3-panel','step-4-panel','results-panel'];

function showPanel(className) {

panels.forEach(function(p) {

p.style.setProperty('display', 'none', 'important');

p.classList.remove('active-step');

});

var targetPanel = container.querySelector('.' + className);

if (targetPanel) {

targetPanel.style.setProperty('display', 'block', 'important');

targetPanel.classList.add('active-step');

}

}

function goToNext(currentClass) {

var idx = order.indexOf(currentClass);

if (idx > -1 && idx < order.length - 1) {

showPanel(order[idx + 1]);

}

}

function handleSelection(btn) {

var q = btn.getAttribute('data-q');

var val = btn.getAttribute('data-val');

var pts = parseInt(btn.getAttribute('data-pts'), 10);

answers[q] = { val: val, pts: pts };

var panel = btn.closest('.quiz-step');

var panelClass = order.filter(function(c) { return panel.classList.contains(c); })[0];

if (Object.keys(answers).length >= 4) {

renderResults();

showPanel('results-panel');

} else {

goToNext(panelClass);

}

}

buttons.forEach(function(btn) {

btn.addEventListener('click', function(e) {

e.preventDefault();

handleSelection(btn);

});

btn.addEventListener('keydown', function(e) {

if (e.key === 'Enter' || e.key === ' ') {

e.preventDefault();

handleSelection(btn);

}

});

});

function renderResults() {

var score = (answers.school ? answers.school.pts : 0) +

(answers.gpa ? answers.gpa.pts : 0) +

(answers.year ? answers.year.pts : 0) +

(answers.weak ? answers.weak.pts : 0);

var tierInfo;

if (score >= 90) {

tierInfo = { tier: 'ELITE STANDING', desc: 'Your profile is very strong for competitive recruiting, and the fundamentals are already in place.' };

} else if (score >= 75) {

tierInfo = { tier: 'STRONG STANDING', desc: 'You have a competitive profile with a real edge over most applicants.' };

} else if (score >= 60) {

tierInfo = { tier: 'MODERATE STANDING', desc: 'You have a solid base, but a few targeted changes will make a big difference for top boutique offers.' };

} else {

tierInfo = { tier: 'FOUNDATIONAL STANDING', desc: 'You have real potential, but you need focused work now to close the gap before recruiting picks up.' };

}

var schoolNote = {

target: 'coming from a target program',

semi: 'coming from a semi target program',

non: 'as a non target candidate'

}[answers.school.val] || '';

var weakNoteMap = {

outreach: { label: 'networking and cold outreach', next: 'Focus on a clear outreach plan: what to send, when to send it, and how to follow up so cold emails turn into first round interviews.' },

technical: { label: 'technical and DCF skills', next: 'Focus on technical practice: DCFs, valuation, and the modeling speed interviewers expect on Superdays.' },

narrative: { label: 'personal story and behavioral answers', next: 'Focus on your story: a sharp "Why Investment Banking" and "Why This Bank" answer that sounds genuine, not rehearsed.' }
}[answers.weak.val] || { label: 'preparation', next: 'Book a free strategy session to review.' };

var summary = tierInfo.desc + ' Given that you\'re ' + schoolNote + ', your biggest opportunity right now is your ' + weakNoteMap.label + '.';

document.getElementById('resultsSummary').textContent = summary;

document.getElementById('resultsNextStep').textContent = weakNoteMap.next + ' Book a free one on one strategy session to build the exact plan for your timeline.';

document.getElementById('scoreTier').textContent = tierInfo.tier;

var ctaButton = document.getElementById('dynamicCtaBtn');

if (ctaButton) {

ctaButton.setAttribute('href', 'https://form.typeform.com/to/sySiYYvt');

}

var scoreNumEl = document.getElementById('scoreNumber');

var ringFill = document.getElementById('scoreRingFill');

var circumference = 326.7;

var start = 0;

var duration = 900;

var startTime = null;

function animateCount(ts) {

if (!startTime) startTime = ts;

var progress = Math.min((ts - startTime) / duration, 1);

var current = Math.round(progress * score);

scoreNumEl.textContent = current;

if (progress < 1) requestAnimationFrame(animateCount);

}

requestAnimationFrame(animateCount);

setTimeout(function() {

if(ringFill) ringFill.style.strokeDashoffset = circumference * (1 - score / 100);

}, 50);

}

var retakeBtn = document.getElementById('retakeBtn');

if (retakeBtn) {

var resetQuiz = function(e) {

e.preventDefault();

answers = {};

var ringFill = document.getElementById('scoreRingFill');

if(ringFill) ringFill.style.strokeDashoffset = 326.7;

document.getElementById('scoreNumber').textContent = '0';

showPanel('step-1-panel');

};

retakeBtn.addEventListener('click', resetQuiz);

retakeBtn.addEventListener('keydown', function(e) {

if (e.key === 'Enter' || e.key === ' ') resetQuiz(e);

});

}

}

if (document.readyState === 'loading') {

document.addEventListener('DOMContentLoaded', initDiagnosticQuiz);

} else {

initDiagnosticQuiz();

}

window.addEventListener('load', initDiagnosticQuiz);
} catch(e) { console.warn("Script error in successs-path-quiz:", e); }
})();

// ===== application-tracker-free-resources-pop-up-important =====
(function() {
try {
(function() {
var form = document.getElementById('form_app_tracker');
var iframe = document.getElementById('iframe_app_tracker');
var btn = document.getElementById('btn_app_tracker');
var msg = document.getElementById('msg_app_tracker');
var submitted = false;

form.addEventListener('submit', function() {
btn.innerText = 'Sending...';
btn.disabled = true;
submitted = true;
});

iframe.onload = function() {
if (submitted) {
form.style.display = 'none';
msg.style.display = 'block';
}
};
})();
} catch(e) { console.warn("Script error in application-tracker-free-resources-pop-up-important:", e); }
})();

// ===== coffe-chat-questions-free-resources-pop-up-important =====
(function() {
try {
(function() {
var form = document.getElementById('form_coffee');
var iframe = document.getElementById('iframe_coffee');
var btn = document.getElementById('btn_coffee');
var msg = document.getElementById('msg_coffee');
var submitted = false;

form.addEventListener('submit', function() {
btn.innerText = 'Sending...';
btn.disabled = true;
submitted = true;
});

iframe.onload = function() {
if (submitted) {
form.style.display = 'none';
msg.style.display = 'block';
}
};
})();
} catch(e) { console.warn("Script error in coffe-chat-questions-free-resources-pop-up-important:", e); }
})();

// ===== messaging-template-free-resources-pop-up-important =====
(function() {
try {
(function() {
var form = document.getElementById('form_msg_temp');
var iframe = document.getElementById('iframe_msg_temp');
var btn = document.getElementById('btn_msg_temp');
var msg = document.getElementById('msg_msg_temp');
var submitted = false;

form.addEventListener('submit', function() {
btn.innerText = 'Sending...';
btn.disabled = true;
submitted = true;
});

iframe.onload = function() {
if (submitted) {
form.style.display = 'none';
msg.style.display = 'block';
}
};
})();
} catch(e) { console.warn("Script error in messaging-template-free-resources-pop-up-important:", e); }
})();

// ===== faq: 4-Step Process button now uses a plain #coaching-process anchor
// link instead of custom JS + sessionStorage, so the browser's own native
// anchor-scroll handles it directly. See the scroll-margin-top rule on
// #coaching-process in style.css for the fixed-nav clearance. =====

// ===== Page Transition Animation + Same-page Nav Scroll-to-top =====
(function() {
try {
var currentPage = (window.location.pathname.split("/").pop() || "index.html");
if (currentPage === "") currentPage = "index.html";
var fadeWrapper = document.getElementById("ibm-page-fade-wrapper");

document.querySelectorAll('a[href$=".html"]').forEach(function(link) {
if (link.target === '_blank') return;
link.addEventListener('click', function(e) {
var href = link.getAttribute('href');
if (!href) return;
var targetPage = href.split("/").pop();

if (targetPage === currentPage) {
e.preventDefault();
window.scrollTo({ top: 0, behavior: 'smooth' });
return;
}

e.preventDefault();
if (fadeWrapper) fadeWrapper.classList.add('ibm-page-fade-out');
setTimeout(function() { window.location.href = href; }, 380);
});
});
} catch(e) { console.warn('Page transition script error:', e); }
})();
// ===== NEW: detail-pass components (back-to-top, scroll progress, nav shadow, scroll-reveal) =====
// All injected at runtime so every page gets them without editing 18 HTML files individually.
(function() {
try {
document.addEventListener("DOMContentLoaded", function () {

// ---- Scroll progress bar ----
var progressBar = document.createElement('div');
progressBar.id = 'ibm-scroll-progress';
document.body.appendChild(progressBar);

// ---- Back-to-top button ----
var backToTop = document.createElement('button');
backToTop.id = 'ibm-back-to-top';
backToTop.setAttribute('aria-label', 'Back to top');
backToTop.innerHTML = '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><line x1="12" y1="19" x2="12" y2="5"></line><polyline points="5 12 12 5 19 12"></polyline></svg>';
backToTop.addEventListener('click', function() {
window.scrollTo({ top: 0, behavior: 'smooth' });
});
document.body.appendChild(backToTop);

var navWrapper = document.querySelector('.ibm-custom-nav-wrapper');

function onScroll() {
var scrollTop = window.scrollY || document.documentElement.scrollTop;
var docHeight = document.documentElement.scrollHeight - document.documentElement.clientHeight;
var pct = docHeight > 0 ? (scrollTop / docHeight) * 100 : 0;
progressBar.style.width = pct + '%';

if (scrollTop > 80) {
backToTop.classList.add('ibm-visible');
if (navWrapper) navWrapper.classList.add('ibm-nav-scrolled');
} else {
backToTop.classList.remove('ibm-visible');
if (navWrapper) navWrapper.classList.remove('ibm-nav-scrolled');
}
}
window.addEventListener('scroll', onScroll, { passive: true });
onScroll();

});
} catch(e) { console.warn("Script error in detail-pass components:", e); }
})();

// ===== iPhone-only: fix "stuck" hover states after tapping a card =====
// iOS Safari has a known quirk where tapping an element can trigger its
// :hover CSS state and leave it stuck on (e.g. the green accent bar on
// coach/service cards) until something else is tapped. Adding a no-op
// touchstart listener is the standard, minimal fix for this — it changes
// nothing about the CSS itself and only ever runs on iPhone/iPod, so
// Android and desktop behavior are completely untouched.
(function() {
try {
  var isIphone = /iPhone|iPod/.test(navigator.userAgent) && !window.MSStream;
  if (isIphone) {
    document.addEventListener('touchstart', function() {}, { passive: true });
    document.documentElement.classList.add('ibm-iphone');
  }
} catch(e) { console.warn("Script error in iPhone hover-stick fix:", e); }
})();

// ===== Mobile/touch: make the green top-accent bar show reliably on tap =====
// Relying on the browser's native tap-triggers-:hover behavior turned out to
// be inconsistent specifically for the first card in a grid, on both iPhone
// and Android. The first attempt at fixing this (attaching a listener to
// each card individually at page-load) turned out to itself be unreliable
// for the very first cards on a page — confirmed by screenshots showing it
// working correctly for later cards but never triggering at all for the
// first ones. Rebuilt using event delegation on the document instead, which
// doesn't depend on exactly when each card's own listener got attached.
// Desktop mouse :hover is completely untouched either way.
(function() {
try {
  var isTouchDevice = window.matchMedia('(hover: none)').matches;
  if (!isTouchDevice) return;

  var cardSelector = '.ib-recruiting-card, .series79-card, .pe-card, .cp-feature-card, .cp-step-card, .team-card, .resources-card-item, .ibm-svc-card';
  var activeCard = null;

  document.addEventListener('touchstart', function(e) {
    var tappedCard = e.target.closest(cardSelector);

    if (activeCard && activeCard !== tappedCard) {
      activeCard.classList.remove('ibm-card-tapped');
      activeCard = null;
    }

    if (tappedCard) {
      tappedCard.classList.add('ibm-card-tapped');
      activeCard = tappedCard;
    }
  }, { passive: true });
} catch(e) { console.warn("Script error in mobile card tap accent fix:", e); }
})();

// ===== Marquee: normalize scroll speed across rows with different logo counts =====
// Rows don't all have the same number of logos (one row has 7 vs 6 in the others),
// so a single fixed animation-duration for every row made rows with more content
// visibly scroll faster, since they had to travel further in the same amount of
// time. This measures each row's real width and sets its duration proportionally,
// so every row moves at the same actual pixels-per-second speed.
(function() {
try {
  function normalizeMarqueeSpeed() {
    var tracks = document.querySelectorAll('.marquee-track');
    var PIXELS_PER_SECOND = 45; // consistent speed target for every row

    tracks.forEach(function(track) {
      var fullWidth = track.scrollWidth / 2; // one full set, since content is duplicated for the loop
      if (fullWidth > 0) {
        var duration = fullWidth / PIXELS_PER_SECOND;
        track.style.animationDuration = duration + 's';
      }
    });
  }

  if (document.readyState === 'complete') {
    normalizeMarqueeSpeed();
  } else {
    window.addEventListener('load', normalizeMarqueeSpeed);
  }
} catch(e) { console.warn("Script error in marquee speed normalization:", e); }
})();

// ===== FAQ "View Our 4 Step Process" button: show the homepage first, then scroll down slowly =====
(function() {
try {
  if (window.location.hash !== '#go-coaching-process') return;
  var target = document.getElementById('coaching-process');
  if (!target) return;
  window.scrollTo(0, 0);

  var cancelled = false;
  function cancel() { cancelled = true; }
  // If the visitor starts scrolling on their own, don't take over
  ['wheel', 'touchstart', 'keydown'].forEach(function(evt) {
    window.addEventListener(evt, cancel, { once: true, passive: true });
  });

  function slowScroll() {
    if (cancelled) return;
    var root = document.documentElement;
    root.style.setProperty('scroll-behavior', 'auto', 'important');
    var startY = window.pageYOffset;
    var offset = parseInt(getComputedStyle(target).scrollMarginTop, 10) || 90;
    var endY = target.getBoundingClientRect().top + startY - offset;
    var duration = 1800;
    var startTime = null;
    function ease(t) { return t < 0.5 ? 4 * t * t * t : 1 - Math.pow(-2 * t + 2, 3) / 2; }
    function step(ts) {
      if (cancelled) { root.style.removeProperty('scroll-behavior'); return; }
      if (!startTime) startTime = ts;
      var p = Math.min((ts - startTime) / duration, 1);
      window.scrollTo(0, startY + (endY - startY) * ease(p));
      if (p < 1) { requestAnimationFrame(step); }
      else {
        root.style.removeProperty('scroll-behavior');
        history.replaceState(null, '', window.location.pathname + '#coaching-process');
      }
    }
    requestAnimationFrame(step);
  }

  function begin() { setTimeout(slowScroll, 1000); }
  if (document.readyState === 'complete') begin();
  else window.addEventListener('load', begin);
} catch(e) { console.warn('FAQ scroll script error:', e); }
})();
