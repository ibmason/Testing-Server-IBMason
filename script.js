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
  var LOGOS = [["https://www.image2url.com/r2/default/images/1783832204311-af84a679-dc4d-41ae-95d4-b6db4a02451e.png", "Apollo"], ["https://www.image2url.com/r2/default/images/1783832241704-4198987c-ae9f-47e7-90fa-86452c1267dc.png", "Bank of America"], ["https://www.image2url.com/r2/default/images/1783832245458-8a62381b-fc16-4b7e-ba47-940d71478d00.png", "Barclays"], ["https://www.image2url.com/r2/default/images/1783832251518-1fe46456-0ec5-48fe-8d70-97985d3f4ae6.png", "Citi"], ["https://www.image2url.com/r2/default/images/1783832254496-5b24e568-2556-4eed-b5c2-23f4ff6ef121.png", "Cornell"], ["https://www.image2url.com/r2/default/images/1783832316087-3697c180-4e14-4a29-ac68-96ca39e377d5.png", "Evercore"], ["https://www.image2url.com/r2/default/images/1783832314485-5f482b16-4681-4d7e-84c4-865356166d29.png", "Goldman Sachs"], ["https://www.image2url.com/r2/default/images/1783832313065-33ecd907-7d47-444f-8ae1-58704a16b96a.png", "Harvard"], ["https://www.image2url.com/r2/default/images/1783832311580-18cc755a-cbf5-4685-85e7-956ccaa4373f.png", "JPMorgan"], ["https://www.image2url.com/r2/default/images/1783832358385-546782a7-6c49-45a0-8561-13c0df6a76d0.png", "Jefferies"], ["https://cdn.phototourl.com/free/2026-07-12-c8aafce8-552b-4ad4-8b0e-b79b1223ebe3.png", "Lazard"], ["https://cdn.phototourl.com/free/2026-07-12-98990894-0f63-4112-904b-275eae9d6290.png", "MIT"], ["https://cdn.phototourl.com/free/2026-07-12-d121affd-c1a5-46e1-9b72-e889a8feb508.png", "Moelis"], ["https://cdn.phototourl.com/free/2026-07-12-bb9a6866-be08-4657-97fb-21f5dddda5db.png", "Morgan Stanley"], ["https://cdn.phototourl.com/free/2026-07-12-d2274af3-1eda-4e01-8a7b-f92af9c249f2.gif", "Piper Sandler"], ["https://cdn.phototourl.com/free/2026-07-12-152f51a0-de1b-44a8-b9e6-778af6db47ef.png", "Raymond James"], ["https://cdn.phototourl.com/free/2026-07-12-af19a262-a70a-44a3-a3aa-7e6640a95602.webp", "RBC"], ["https://cdn.phototourl.com/free/2026-07-12-82968dc1-b93f-4e29-b00f-57092b66ad44.png", "Stanford"], ["https://cdn.phototourl.com/free/2026-07-12-ddb8b60e-c8a4-4d16-8496-570d8b930eb5.png", "UBS"], ["https://cdn.phototourl.com/free/2026-07-12-9fde7067-61bd-4680-81f8-5df7995d0c6b.png", "University of Chicago"], ["https://pdftourl.net/images/1783832904501-9c8207cb-574b-40c4-b1c2-f76e10d4f563.png", "University of Virginia"], ["https://pdftourl.net/images/1783832927985-296f3a39-ba26-4b59-b181-c932c05f6d03.png", "Vanderbilt"], ["https://pdftourl.net/images/1783832938051-b6d795a9-b166-4d94-8503-e8075f904d27.png", "Virginia Tech"], ["https://pdftourl.net/images/1783832951186-b55d7340-219f-4839-a87c-bdb832198bd3.png", "Yale"], ["https://pdftourl.net/images/1783832963888-04cf93f7-0cd0-4bce-91bd-6faf1be633dc.png", "Wells Fargo"]];

  function initFadeCarousel() {
    var grid = document.getElementById('ibmMlogoFadeGrid');
    if (!grid) return;
    var slots = grid.querySelectorAll('.ibm-mlogo-fade-slot img');
    if (!slots.length) return;

    var groupSize = slots.length;
    var index = 0;

    function setGroup(startIndex) {
      slots.forEach(function(img, i) {
        var logo = LOGOS[(startIndex + i) % LOGOS.length];
        img.src = logo[0];
        img.alt = logo[1];
      });
    }

    setGroup(index); // show the first group immediately, no fade needed

    setInterval(function() {
      slots.forEach(function(img) { img.classList.add('ibm-fade-out'); });

      setTimeout(function() {
        index = (index + groupSize) % LOGOS.length;
        setGroup(index);
        slots.forEach(function(img) { img.classList.remove('ibm-fade-out'); });
      }, 400); // matches the CSS transition duration
    }, 2800); // how long each group stays visible before cycling
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

    var raw = el.textContent.trim().replace(/,/g, '');
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

    var observer = new IntersectionObserver(function(entries) {
      entries.forEach(function(entry) {
        if (entry.isIntersecting) {
          animateCount(entry.target);
          observer.unobserve(entry.target);
        }
      });
    }, { threshold: 0.4, rootMargin: '0px 0px -40px 0px' });

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

tierInfo = { tier: 'ELITE STANDING', desc: 'Your baseline profile is exceptionally strong for competitive recruiting — the fundamentals are already in place.' };

} else if (score >= 75) {

tierInfo = { tier: 'STRONG STANDING', desc: 'You have a highly competitive profile with a clear structural edge over most of the applicant pool.' };

} else if (score >= 60) {

tierInfo = { tier: 'MODERATE STANDING', desc: 'You possess a competitive base profile, but strategic structural adjustments are required to secure high-end boutique offers.' };

} else {

tierInfo = { tier: 'FOUNDATIONAL STANDING', desc: 'You have real potential, but you need focused, structural work now to close the gap to elite offers before the window narrows.' };

}

var schoolNote = {

target: 'coming from a target program',

semi: 'coming from a semi-target program',

non: 'as a non-target candidate'

}[answers.school.val] || '';

var weakNoteMap = {

outreach: { label: 'networking pipeline and cold outreach strategy', next: 'Prioritize a structured outreach cadence — the messaging, timing, and follow-up system that turns cold emails into first-round interviews.' },

technical: { label: 'technical modeling and DCF fluency', next: 'Prioritize technical drilling — DCF mechanics, valuation frameworks, and the modeling speed interviewers expect on Superdays.' },

narrative: { label: 'personal narrative and behavioral storytelling', next: 'Prioritize your story — a sharp "Why Investment Banking" and "Why This Bank" answer that sounds genuine, not rehearsed.' }
}[answers.weak.val] || { label: 'preparation pipeline', next: 'Book a free strategy session to review.' };

var summary = tierInfo.desc + ' Given that you\'re ' + schoolNote + ', your single highest-leverage opportunity right now is your ' + weakNoteMap.label + '.';

document.getElementById('resultsSummary').textContent = summary;

document.getElementById('resultsNextStep').textContent = weakNoteMap.next + ' Book a free 1-on-1 strategy session to build the exact plan for your timeline.';

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

// ===== faq =====
(function() {
try {
function triggerSectionScroll() {
// Set flag so destination section knows to scroll
sessionStorage.setItem('pendingScrollToHIW', 'true');
}

function checkAndPerformScroll() {
if (sessionStorage.getItem('pendingScrollToHIW') === 'true') {
// Poll briefly to ensure Carrd finishes DOM rendering and scroll reset
var checkCount = 0;
var scrollInterval = setInterval(function() {
var target = document.getElementById('how-it-works-section');
checkCount++;

if (target && target.offsetParent !== null) { // Ensures element is visible
clearInterval(scrollInterval);
sessionStorage.removeItem('pendingScrollToHIW');

// Timeout gives Carrd's scroll-to-top handler time to finish before we scroll down
setTimeout(function() {
var yOffset = -40; // Optional offset for header clearance
var y = target.getBoundingClientRect().top + window.pageYOffset + yOffset;
window.scrollTo({ top: y, behavior: 'smooth' });
}, 150);
}

if (checkCount > 30) { // Safety fallback after 3s
clearInterval(scrollInterval);
sessionStorage.removeItem('pendingScrollToHIW');
}
}, 100);
}
}

// Run on initial load and whenever Carrd switches sections via hashchange
window.addEventListener('load', checkAndPerformScroll);
window.addEventListener('hashchange', checkAndPerformScroll);
} catch(e) { console.warn("Script error in faq:", e); }
})();

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
