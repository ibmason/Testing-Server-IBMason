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
sessionStorage.setItem('pendingScrollToHIW', 'true');
}

function checkAndPerformScroll() {
if (sessionStorage.getItem('pendingScrollToHIW') === 'true') {
var checkCount = 0;
var scrollInterval = setInterval(function() {
var target = document.getElementById('how-it-works-section');
checkCount++;

if (target && target.offsetParent !== null) {
clearInterval(scrollInterval);
sessionStorage.removeItem('pendingScrollToHIW');

setTimeout(function() {
var yOffset = -40;
var y = target.getBoundingClientRect().top + window.pageYOffset + yOffset;
window.scrollTo({ top: y, behavior: 'smooth' });
}, 150);
}

if (checkCount > 30) {
clearInterval(scrollInterval);
sessionStorage.removeItem('pendingScrollToHIW');
}
}, 100);
}
}

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
