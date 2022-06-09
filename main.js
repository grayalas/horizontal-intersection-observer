import './style.css';

// document.querySelector('#app').innerHTML = `
//   <h1>Hello Vite!</h1>
//   <a href="https://vitejs.dev/guide/features.html" target="_blank">Documentation</a>
// `

// https://cdn.jsdelivr.net/gh/grayalas/horizontal-intersection-observer/main.js

// sterilizeText normalizes any sting by replacing spaces with hypens and forcing lowercase.
const sterilizeText = (str) => str.replace(/\s+/g, '-').toLowerCase();

// prevRatio records what the visibility ratio was the last time a threshold was crossed;
// this will let us figure out whether the target element is becoming more or less visible.
let prevRatio = 0.0;
let sectionItems;
let navItems;

// Set things up
window.addEventListener(
  'load',
  () => {
    sectionItems = document.querySelectorAll('.item');
    navItems = document.querySelectorAll('.labels-list li');

    createObserver();
  },
  false
);

const createObserver = () => {
  let observer;

  observer = new IntersectionObserver(handleIntersections, {
    root: null,
    rootMargin: '0px',
    threshold: 0.5
  });

  sectionItems.forEach((sectionItem) => {
    // Get the text and set it as data attribute.
    // This will be used to match up with our navItems.
    const sectionIdentifier = sterilizeText(sectionItem.textContent);
    sectionItem.dataset.section = sectionIdentifier;

    // Observe each section intersection
    observer.observe(sectionItem);
  });

  navItems.forEach((navItem) => {
    const navItemIdentifier = sterilizeText(navItem.textContent);
    navItem.dataset.nav = navItemIdentifier;
  });
};

let handleIntersections = (entries, observer) => {
  entries.forEach((entry) => {
    const currentIntersection = entry.target;
    // Only give .active class to our current section.
    currentIntersection.classList.remove('active');

    // if the entry's intersectionRatio is going up
    if (entry.intersectionRatio > prevRatio) {
      currentIntersection.classList.add('active');

      navItems.forEach((navItem) => {
        // Only give .active class to our current section's navItem.
        navItem.classList.remove('active');
        const match =
          navItem.dataset.nav === currentIntersection.dataset.section
            ? navItem
            : null;

        if (match) match.classList.add('active');
      });
    }

    prevRatio = entry.intersectionRatio;
  });
};
