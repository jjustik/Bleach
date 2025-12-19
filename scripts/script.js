document.addEventListener("DOMContentLoaded", () => {
    // ------------------------ BACK TO TOP ------------------------
const backToTop = document.getElementById("backToTop");

if (backToTop) {
  window.addEventListener("scroll", () => {
    backToTop.style.display = (window.scrollY > 800) ? "flex" : "none";
  });

  backToTop.addEventListener("click", () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  });
}

const p = document.querySelector('.player');
    if (!p) return;
    p.classList.add('player--intro');
    p.addEventListener('animationend', (e) => {
        if (e.animationName === 'playerIntro') {
            p.classList.remove('player--intro');
            p.classList.add('player--alive');
        }
    });

const openButton = document.getElementById('open-sidebar-button')
const navbar = document.getElementById('navbar')

window.openSidebar = function() {
  navbar.classList.add('show')
}

window.closeSidebar = function() {
  navbar.classList.remove('show')
}
// ------------------------ SLIDER BUTTON ------------------------
const slides0 = Array.from(document.querySelectorAll(".slider-lieutenant-desc-card"))
const slides = Array.from(document.querySelectorAll(".slider-gotei-card"));
const slides1 = Array.from(document.querySelectorAll(".slider-gotei-card0"));
const slides2 = Array.from(document.querySelectorAll(".slider-gotei-desc-card"))

const r_buttons = document.querySelectorAll(".right-arrow");
const l_buttons = document.querySelectorAll(".left-arrow");

// соберём коллекции и их индексы
const collections = [slides0, slides, slides1, slides2];
const indices = collections.map(() => 0);

// показать первый слайд каждой коллекции
collections.forEach((col) => {
    if (col.length > 0) col[0].classList.add("displaySlide");
});

// ------------------------ общие индексы для синхронизации ------------------------
let sharedGoteiIndex = getCurrentIndex(slides2);       // для .slider-gotei-desc-card
let sharedLieutenantIndex = getCurrentIndex(slides0);  // для .slider-lieutenant-desc-card

// ------------------------ UTILS ------------------------
function getCurrentIndex(collection) {
    return collection.findIndex(slide => slide.classList.contains("displaySlide")) || 0;
}

// функция переключения
function advanceCaptain(collection, i, dir) {
    if (collection.length === 0) return;

    collection[indices[i]].classList.remove("displaySlide");

    indices[i] =
        dir === "right"
            ? (indices[i] + 1) % collection.length
            : (indices[i] - 1 + collection.length) % collection.length;

    const curr = collection[indices[i]];
    curr.classList.remove("slideIn", "slideInB", "reverseSlideIn");
    void curr.offsetWidth;

    if (collection !== slides) {
        curr.classList.add('slideInB');
    }
    curr.classList.add("displaySlide");

    // ------------------------ PATCH: обновляем индексы для синхронизации ------------------------
    sharedGoteiIndex = getCurrentIndex(slides2);
    sharedLieutenantIndex = getCurrentIndex(slides0);
}

// ------------------------ функция синхронизации описаний ------------------------
function syncDescriptions() {
    if (slides2.length) {
        slides2.forEach(slide => slide.classList.remove("displaySlide", "slideInB", "reverseSlideIn"));
        const curr = slides2[sharedGoteiIndex];
        curr.classList.add("slideInB", "displaySlide");
    }
    if (slides0.length) {
        slides0.forEach(slide => slide.classList.remove("displaySlide", "slideInB", "reverseSlideIn"));
        const curr = slides0[sharedLieutenantIndex];
        curr.classList.add("slideInB", "displaySlide");
    }
}

// обработчики для всех кнопок
r_buttons?.forEach((btn) => {
    btn.addEventListener("click", () => {
        collections.forEach((col, i) => advanceCaptain(col, i, "right"));
        syncDescriptions();
    });
});

l_buttons?.forEach((btn) => {
    btn.addEventListener("click", () => {
        collections.forEach((col, i) => advanceCaptain(col, i, "left"));
        syncDescriptions();
    });
});

// ------------------------ SLIDER BUTTON2 ------------------------
const slides3 = Array.from(document.querySelectorAll(".slider-gotei-desc-card"));

const r_buttons1 = document.getElementById("g-arrow1");
const l_buttons1 = document.getElementById("g-arrow2");

// соберём коллекции и их индексы
const collections1 = [slides3];
const indices1 = collections1.map(() => 0);

// показать первый слайд каждой коллекции
collections1.forEach((col) => {
    if (col.length > 0) col[0].classList.add("displaySlide");
});

// функция переключения
function advanceCaptain1(collection, i, dir) {
    if (collection.length === 0) return;

    indices1[i] = getCurrentIndex(collection);

    collection[indices1[i]].classList.remove("displaySlide");

    indices1[i] =
        dir === "right"
            ? (indices1[i] + 1) % collection.length
            : (indices1[i] - 1 + collection.length) % collection.length;

    const curr = collection[indices1[i]];

    curr.classList.remove("slideIn", "slideInB", "reverseSlideIn");
    void curr.offsetWidth;

    if (collection === slides3) {
        if (dir === "right") {
            curr.classList.add("slideInB");
        } else {
            curr.classList.add("reverseSlideIn");
        }
    }

    curr.classList.add("displaySlide");

    sharedGoteiIndex = indices1[i];
}

// обработчики для всех кнопок
r_buttons1?.addEventListener("click", () => {
    collections1.forEach((col, i) => advanceCaptain1(col, i, "right"));
});

l_buttons1?.addEventListener("click", () => {
    collections1.forEach((col, i) => advanceCaptain1(col, i, "left"));
});

// ------------------------ SLIDER BUTTON3 ------------------------
const slides4 = Array.from(document.querySelectorAll(".slider-lieutenant-desc-card"));

const r_buttons2 = document.getElementById("g-arrow3");
const l_buttons2 = document.getElementById("g-arrow4");

// соберём коллекции и их индексы
const collections2 = [slides4];
const indices2 = collections2.map(() => 0);

// показать первый слайд каждой коллекции
collections2.forEach((col) => {
    if (col.length > 0) col[0].classList.add("displaySlide");
});

// функция переключения
function advanceLieutenant(collection, i, dir) {
    if (collection.length === 0) return;

    indices2[i] = getCurrentIndex(collection);

    collection[indices2[i]].classList.remove("displaySlide");

    indices2[i] =
        dir === "right"
            ? (indices2[i] + 1) % collection.length
            : (indices2[i] - 1 + collection.length) % collection.length;

    const curr = collection[indices2[i]];

    curr.classList.remove("slideIn", "slideInB", "reverseSlideIn");
    void curr.offsetWidth;

    if (collection === slides4) {
        if (dir === "right") {
            curr.classList.add("slideInB");
        } else {
            curr.classList.add("reverseSlideIn");
        }
    }

    curr.classList.add("displaySlide");

    sharedLieutenantIndex = indices2[i];
}

// обработчики для всех кнопок
r_buttons2?.addEventListener("click", () => {
    collections2.forEach((col, i) => advanceLieutenant(col, i, "right"));
});

l_buttons2?.addEventListener("click", () => {
    collections2.forEach((col, i) => advanceLieutenant(col, i, "left"));
});


// ------------------------ SLIDER BUTTON4 ------------------------

const slides5 = Array.from(document.querySelectorAll(".slider-gotei-desc-card1"));

const r_buttons3 = document.getElementById("g-arrow5");
const l_buttons3 = document.getElementById("g-arrow6");

// соберём коллекции и их индексы
const collections3 = [slides5];
const indices3 = collections3.map(() => 0);

// показать первый слайд каждой коллекции
collections3.forEach((col) => {
    if (col.length > 0) col[0].classList.add("displaySlide");
});

// функция переключения
function advanceCaptain2(collection, i, dir) {
    if (collection.length === 0) return;

  // убрать текущий
    collection[indices3[i]].classList.remove("displaySlide");

  // рассчитать новый индекс
    indices3[i] =
    dir === "right"
        ? (indices3[i] + 1) % collection.length
        : (indices3[i] - 1 + collection.length) % collection.length;

const curr = collection[indices3[i]];

  // сброс старых анимаций
    curr.classList.remove("slideIn");
    curr.classList.remove("reverseSlideIn");
    void curr.offsetWidth; // хак для перезапуска анимации

  // если это наша коллекция slides18 → добавляем анимацию в зависимости от направления
    if (collection === slides5) {
        if (dir === "right") {
            curr.classList.add("slideInB");
        } else {
            curr.classList.add("reverseSlideIn");
        }
    }

  // показать слайд
    curr.classList.add("displaySlide");
}

// обработчики для всех кнопок
r_buttons3?.addEventListener("click", () => {
    collections3.forEach((col, i) => advanceCaptain2(col, i, "right"));
});

l_buttons3?.addEventListener("click", () => {
    collections3.forEach((col, i) => advanceCaptain2(col, i, "left"));
});

// ------------------------ SLIDER BUTTON5 ------------------------

const slides6 = Array.from(document.querySelectorAll(".slider-gotei-desc-card2"));

const r_buttons4 = document.getElementById("g-arrow7");
const l_buttons4 = document.getElementById("g-arrow8");

// соберём коллекции и их индексы
const collections4 = [slides6];
const indices4 = collections4.map(() => 0);

// показать первый слайд каждой коллекции
collections4.forEach((col) => {
    if (col.length > 0) col[0].classList.add("displaySlide");
});

// функция переключения
function advanceCaptain3(collection, i, dir) {
    if (collection.length === 0) return;

  // убрать текущий
    collection[indices4[i]].classList.remove("displaySlide");

  // рассчитать новый индекс
    indices4[i] =
    dir === "right"
        ? (indices4[i] + 1) % collection.length
        : (indices4[i] - 1 + collection.length) % collection.length;

const curr = collection[indices4[i]];

  // сброс старых анимаций
    curr.classList.remove("slideIn");
    curr.classList.remove("reverseSlideIn");
    void curr.offsetWidth; // хак для перезапуска анимации

  // если это наша коллекция slides18 → добавляем анимацию в зависимости от направления
    if (collection === slides6) {
        if (dir === "right") {
            curr.classList.add("slideInB");
        } else {
            curr.classList.add("reverseSlideIn");
        }
    }

  // показать слайд
    curr.classList.add("displaySlide");
}

// обработчики для всех кнопок
r_buttons4?.addEventListener("click", () => {
    collections4.forEach((col, i) => advanceCaptain3(col, i, "right"));
});

l_buttons4?.addEventListener("click", () => {
    collections4.forEach((col, i) => advanceCaptain3(col, i, "left"));
});

// ------------------------ SLIDER BUTTON6 ------------------------

const slides7 = Array.from(document.querySelectorAll(".slider-lieutenant-desc-card1"));

const r_buttons5 = document.getElementById("g-arrow9");
const l_buttons5 = document.getElementById("g-arrow10");

// соберём коллекции и их индексы
const collections5 = [slides7];
const indices5 = collections5.map(() => 0);

// показать первый слайд каждой коллекции
collections5.forEach((col) => {
    if (col.length > 0) col[0].classList.add("displaySlide");
});

// функция переключения
function advanceLieutenant2(collection, i, dir) {
    if (collection.length === 0) return;

  // убрать текущий
    collection[indices5[i]].classList.remove("displaySlide");

  // рассчитать новый индекс
    indices5[i] =
    dir === "right"
        ? (indices5[i] + 1) % collection.length
        : (indices5[i] - 1 + collection.length) % collection.length;

const curr = collection[indices5[i]];

  // сброс старых анимаций
    curr.classList.remove("slideIn");
    curr.classList.remove("reverseSlideIn");
    void curr.offsetWidth; // хак для перезапуска анимации

  // если это наша коллекция slides18 → добавляем анимацию в зависимости от направления
    if (collection === slides7) {
        if (dir === "right") {
            curr.classList.add("slideInB");
        } else {
            curr.classList.add("reverseSlideIn");
        }
    }

  // показать слайд
    curr.classList.add("displaySlide");
}

// обработчики для всех кнопок
r_buttons5?.addEventListener("click", () => {
    collections5.forEach((col, i) => advanceLieutenant2(col, i, "right"));
});

l_buttons5?.addEventListener("click", () => {
    collections5.forEach((col, i) => advanceLieutenant2(col, i, "left"));
});

// ------------------------ SLIDER BUTTON7 ------------------------

const slides8 = Array.from(document.querySelectorAll(".slider-gotei-desc-card3"));

const r_buttons6 = document.getElementById("g-arrow11");
const l_buttons6 = document.getElementById("g-arrow12");

// соберём коллекции и их индексы
const collections6 = [slides8];
const indices6 = collections6.map(() => 0);

// показать первый слайд каждой коллекции
collections6.forEach((col) => {
    if (col.length > 0) col[0].classList.add("displaySlide");
});

// функция переключения
function advanceCaptain4(collection, i, dir) {
    if (collection.length === 0) return;

  // убрать текущий
    collection[indices6[i]].classList.remove("displaySlide");

  // рассчитать новый индекс
    indices6[i] =
    dir === "right"
        ? (indices6[i] + 1) % collection.length
        : (indices6[i] - 1 + collection.length) % collection.length;

const curr = collection[indices6[i]];

  // сброс старых анимаций
    curr.classList.remove("slideIn");
    curr.classList.remove("reverseSlideIn");
    void curr.offsetWidth; // хак для перезапуска анимации

  // если это наша коллекция slides18 → добавляем анимацию в зависимости от направления
    if (collection === slides8) {
        if (dir === "right") {
            curr.classList.add("slideInB");
        } else {
            curr.classList.add("reverseSlideIn");
        }
    }

  // показать слайд
    curr.classList.add("displaySlide");
}

// обработчики для всех кнопок
r_buttons6?.addEventListener("click", () => {
    collections6.forEach((col, i) => advanceCaptain4(col, i, "right"));
});

l_buttons6?.addEventListener("click", () => {
    collections6.forEach((col, i) => advanceCaptain4(col, i, "left"));
});

// ------------------------ SLIDER BUTTON8 ------------------------

const slides9 = Array.from(document.querySelectorAll(".slider-gotei-desc-card4"));

const r_buttons7 = document.getElementById("g-arrow13");
const l_buttons7 = document.getElementById("g-arrow14");

// соберём коллекции и их индексы
const collections7 = [slides9];
const indices7 = collections7.map(() => 0);

// показать первый слайд каждой коллекции
collections7.forEach((col) => {
    if (col.length > 0) col[0].classList.add("displaySlide");
});

// функция переключения
function advanceCaptain5(collection, i, dir) {
    if (collection.length === 0) return;

  // убрать текущий
    collection[indices7[i]].classList.remove("displaySlide");

  // рассчитать новый индекс
    indices7[i] =
    dir === "right"
        ? (indices7[i] + 1) % collection.length
        : (indices7[i] - 1 + collection.length) % collection.length;

const curr = collection[indices7[i]];

  // сброс старых анимаций
    curr.classList.remove("slideIn");
    curr.classList.remove("reverseSlideIn");
    void curr.offsetWidth; // хак для перезапуска анимации

  // если это наша коллекция slides18 → добавляем анимацию в зависимости от направления
    if (collection === slides9) {
        if (dir === "right") {
            curr.classList.add("slideInB");
        } else {
            curr.classList.add("reverseSlideIn");
        }
    }

  // показать слайд
    curr.classList.add("displaySlide");
}

// обработчики для всех кнопок
r_buttons7?.addEventListener("click", () => {
    collections7.forEach((col, i) => advanceCaptain5(col, i, "right"));
});

l_buttons7?.addEventListener("click", () => {
    collections7.forEach((col, i) => advanceCaptain5(col, i, "left"));
});

// ------------------------ SLIDER BUTTON9 ------------------------

const slides10 = Array.from(document.querySelectorAll(".slider-lieutenant-desc-card2"));

const r_buttons8 = document.getElementById("g-arrow15");
const l_buttons8 = document.getElementById("g-arrow16");

// соберём коллекции и их индексы
const collections8 = [slides10];
const indices8 = collections8.map(() => 0);

// показать первый слайд каждой коллекции
collections8.forEach((col) => {
    if (col.length > 0) col[0].classList.add("displaySlide");
});

// функция переключения
function advanceLieutenant3(collection, i, dir) {
    if (collection.length === 0) return;

  // убрать текущий
    collection[indices8[i]].classList.remove("displaySlide");

  // рассчитать новый индекс
    indices8[i] =
    dir === "right"
        ? (indices8[i] + 1) % collection.length
        : (indices8[i] - 1 + collection.length) % collection.length;

const curr = collection[indices8[i]];

  // сброс старых анимаций
    curr.classList.remove("slideIn");
    curr.classList.remove("reverseSlideIn");
    void curr.offsetWidth; // хак для перезапуска анимации

  // если это наша коллекция slides18 → добавляем анимацию в зависимости от направления
    if (collection === slides10) {
        if (dir === "right") {
            curr.classList.add("slideInB");
        } else {
            curr.classList.add("reverseSlideIn");
        }
    }

  // показать слайд
    curr.classList.add("displaySlide");
}

// обработчики для всех кнопок
r_buttons8?.addEventListener("click", () => {
    collections8.forEach((col, i) => advanceLieutenant3(col, i, "right"));
});

l_buttons8?.addEventListener("click", () => {
    collections8.forEach((col, i) => advanceLieutenant3(col, i, "left"));
});

// ------------------------ SLIDER BUTTON10 ------------------------

const slides11 = Array.from(document.querySelectorAll(".slider-gotei-desc-card5"));

const r_buttons9 = document.getElementById("g-arrow17");
const l_buttons9 = document.getElementById("g-arrow18");

// соберём коллекции и их индексы
const collections9 = [slides11];
const indices9 = collections9.map(() => 0);

// показать первый слайд каждой коллекции
collections9.forEach((col) => {
    if (col.length > 0) col[0].classList.add("displaySlide");
});

// функция переключения
function advanceCaptain6(collection, i, dir) {
    if (collection.length === 0) return;

  // убрать текущий
    collection[indices9[i]].classList.remove("displaySlide");

  // рассчитать новый индекс
    indices9[i] =
    dir === "right"
        ? (indices9[i] + 1) % collection.length
        : (indices9[i] - 1 + collection.length) % collection.length;

const curr = collection[indices9[i]];

  // сброс старых анимаций
    curr.classList.remove("slideIn");
    curr.classList.remove("reverseSlideIn");
    void curr.offsetWidth; // хак для перезапуска анимации

  // если это наша коллекция slides18 → добавляем анимацию в зависимости от направления
    if (collection === slides11) {
        if (dir === "right") {
            curr.classList.add("slideInB");
        } else {
            curr.classList.add("reverseSlideIn");
        }
    }

  // показать слайд
    curr.classList.add("displaySlide");
}

// обработчики для всех кнопок
r_buttons9?.addEventListener("click", () => {
    collections9.forEach((col, i) => advanceCaptain6(col, i, "right"));
});

l_buttons9?.addEventListener("click", () => {
    collections9.forEach((col, i) => advanceCaptain6(col, i, "left"));
});

// ------------------------ SLIDER BUTTON11 ------------------------

const slides12 = Array.from(document.querySelectorAll(".slider-lieutenant-desc-card3"));

const r_buttons10 = document.getElementById("g-arrow19");
const l_buttons10 = document.getElementById("g-arrow20");

// соберём коллекции и их индексы
const collections10 = [slides12];
const indices10 = collections10.map(() => 0);

// показать первый слайд каждой коллекции
collections10.forEach((col) => {
    if (col.length > 0) col[0].classList.add("displaySlide");
});

// функция переключения
function advanceLieutenant4(collection, i, dir) {
    if (collection.length === 0) return;

  // убрать текущий
    collection[indices10[i]].classList.remove("displaySlide");

  // рассчитать новый индекс
    indices10[i] =
    dir === "right"
        ? (indices10[i] + 1) % collection.length
        : (indices10[i] - 1 + collection.length) % collection.length;

const curr = collection[indices10[i]];

  // сброс старых анимаций
    curr.classList.remove("slideIn");
    curr.classList.remove("reverseSlideIn");
    void curr.offsetWidth; // хак для перезапуска анимации

  // если это наша коллекция slides18 → добавляем анимацию в зависимости от направления
    if (collection === slides12) {
        if (dir === "right") {
            curr.classList.add("slideInB");
        } else {
            curr.classList.add("reverseSlideIn");
        }
    }

  // показать слайд
    curr.classList.add("displaySlide");
}

// обработчики для всех кнопок
r_buttons10?.addEventListener("click", () => {
    collections10.forEach((col, i) => advanceLieutenant4(col, i, "right"));
});

l_buttons10?.addEventListener("click", () => {
    collections10.forEach((col, i) => advanceLieutenant4(col, i, "left"));
});

// ------------------------ SLIDER BUTTON12 ------------------------

const slides13 = Array.from(document.querySelectorAll(".slider-gotei-desc-card6"));

const r_buttons11 = document.getElementById("g-arrow21");
const l_buttons11 = document.getElementById("g-arrow22");

// соберём коллекции и их индексы
const collections11 = [slides13];
const indices11 = collections11.map(() => 0);

// показать первый слайд каждой коллекции
collections11.forEach((col) => {
    if (col.length > 0) col[0].classList.add("displaySlide");
});

// функция переключения
function advanceCaptain7(collection, i, dir) {
    if (collection.length === 0) return;

  // убрать текущий
    collection[indices11[i]].classList.remove("displaySlide");

  // рассчитать новый индекс
    indices11[i] =
    dir === "right"
        ? (indices11[i] + 1) % collection.length
        : (indices11[i] - 1 + collection.length) % collection.length;

const curr = collection[indices11[i]];

  // сброс старых анимаций
    curr.classList.remove("slideIn");
    curr.classList.remove("reverseSlideIn");
    void curr.offsetWidth; // хак для перезапуска анимации

  // если это наша коллекция slides18 → добавляем анимацию в зависимости от направления
    if (collection === slides13) {
        if (dir === "right") {
            curr.classList.add("slideInB");
        } else {
            curr.classList.add("reverseSlideIn");
        }
    }

  // показать слайд
    curr.classList.add("displaySlide");
}

// обработчики для всех кнопок
r_buttons11?.addEventListener("click", () => {
    collections11.forEach((col, i) => advanceCaptain7(col, i, "right"));
});

l_buttons11?.addEventListener("click", () => {
    collections11.forEach((col, i) => advanceCaptain7(col, i, "left"));
});

// ------------------------ SLIDER BUTTON13 ------------------------

const slides14 = Array.from(document.querySelectorAll(".slider-lieutenant-desc-card4"));

const r_buttons12 = document.getElementById("g-arrow23");
const l_buttons12 = document.getElementById("g-arrow24");

// соберём коллекции и их индексы
const collections12 = [slides14];
const indices12 = collections12.map(() => 0);

// показать первый слайд каждой коллекции
collections12.forEach((col) => {
    if (col.length > 0) col[0].classList.add("displaySlide");
});

// функция переключения
function advanceLieutenant5(collection, i, dir) {
    if (collection.length === 0) return;

  // убрать текущий
    collection[indices12[i]].classList.remove("displaySlide");

  // рассчитать новый индекс
    indices12[i] =
    dir === "right"
        ? (indices12[i] + 1) % collection.length
        : (indices12[i] - 1 + collection.length) % collection.length;

const curr = collection[indices12[i]];

  // сброс старых анимаций
    curr.classList.remove("slideIn");
    curr.classList.remove("reverseSlideIn");
    void curr.offsetWidth; // хак для перезапуска анимации

  // если это наша коллекция slides18 → добавляем анимацию в зависимости от направления
    if (collection === slides14) {
        if (dir === "right") {
            curr.classList.add("slideInB");
        } else {
            curr.classList.add("reverseSlideIn");
        }
    }

  // показать слайд
    curr.classList.add("displaySlide");
}

// обработчики для всех кнопок
r_buttons12?.addEventListener("click", () => {
    collections12.forEach((col, i) => advanceLieutenant5(col, i, "right"));
});

l_buttons12?.addEventListener("click", () => {
    collections12.forEach((col, i) => advanceLieutenant5(col, i, "left"));
});

// ------------------------ SLIDER BUTTON14 ------------------------

const slides15 = Array.from(document.querySelectorAll(".slider-lieutenant-desc-card5"));

const r_buttons13 = document.getElementById("g-arrow25");
const l_buttons13 = document.getElementById("g-arrow26");

// соберём коллекции и их индексы
const collections13 = [slides15];
const indices13 = collections13.map(() => 0);

// показать первый слайд каждой коллекции
collections13.forEach((col) => {
    if (col.length > 0) col[0].classList.add("displaySlide");
});

// функция переключения
function advanceLieutenant6(collection, i, dir) {
    if (collection.length === 0) return;

  // убрать текущий
    collection[indices13[i]].classList.remove("displaySlide");

  // рассчитать новый индекс
    indices13[i] =
    dir === "right"
        ? (indices13[i] + 1) % collection.length
        : (indices13[i] - 1 + collection.length) % collection.length;

const curr = collection[indices13[i]];

  // сброс старых анимаций
    curr.classList.remove("slideIn");
    curr.classList.remove("reverseSlideIn");
    void curr.offsetWidth; // хак для перезапуска анимации

  // если это наша коллекция slides18 → добавляем анимацию в зависимости от направления
    if (collection === slides15) {
        if (dir === "right") {
            curr.classList.add("slideInB");
        } else {
            curr.classList.add("reverseSlideIn");
        }
    }

  // показать слайд
    curr.classList.add("displaySlide");
}

// обработчики для всех кнопок
r_buttons13?.addEventListener("click", () => {
    collections13.forEach((col, i) => advanceLieutenant6(col, i, "right"));
});

l_buttons13?.addEventListener("click", () => {
    collections13.forEach((col, i) => advanceLieutenant6(col, i, "left"));
});

// ------------------------ SLIDER BUTTON15 ------------------------

const slides16 = Array.from(document.querySelectorAll(".slider-gotei-desc-card7"));

const r_buttons14 = document.getElementById("g-arrow27");
const l_buttons14 = document.getElementById("g-arrow28");

// соберём коллекции и их индексы
const collections14 = [slides16];
const indices14 = collections14.map(() => 0);

// показать первый слайд каждой коллекции
collections14.forEach((col) => {
    if (col.length > 0) col[0].classList.add("displaySlide");
});

// функция переключения
function advanceCaptain8(collection, i, dir) {
    if (collection.length === 0) return;

  // убрать текущий
    collection[indices14[i]].classList.remove("displaySlide");

  // рассчитать новый индекс
    indices14[i] =
    dir === "right"
        ? (indices14[i] + 1) % collection.length
        : (indices14[i] - 1 + collection.length) % collection.length;

const curr = collection[indices14[i]];

  // сброс старых анимаций
    curr.classList.remove("slideIn");
    curr.classList.remove("reverseSlideIn");
    void curr.offsetWidth; // хак для перезапуска анимации

  // если это наша коллекция slides18 → добавляем анимацию в зависимости от направления
    if (collection === slides16) {
        if (dir === "right") {
            curr.classList.add("slideInB");
        } else {
            curr.classList.add("reverseSlideIn");
        }
    }

  // показать слайд
    curr.classList.add("displaySlide");
}

// обработчики для всех кнопок
r_buttons14?.addEventListener("click", () => {
    collections14.forEach((col, i) => advanceCaptain8(col, i, "right"));
});

l_buttons14?.addEventListener("click", () => {
    collections14.forEach((col, i) => advanceCaptain8(col, i, "left"));
});

// ------------------------ SLIDER BUTTON16 ------------------------

const slides17 = Array.from(document.querySelectorAll(".slider-lieutenant-desc-card6"));

const r_buttons15 = document.getElementById("g-arrow29");
const l_buttons15 = document.getElementById("g-arrow30");

// соберём коллекции и их индексы
const collections15 = [slides17];
const indices15 = collections15.map(() => 0);

// показать первый слайд каждой коллекции
collections15.forEach((col) => {
    if (col.length > 0) col[0].classList.add("displaySlide");
});

// функция переключения
function advanceLieutenant7(collection, i, dir) {
    if (collection.length === 0) return;

  // убрать текущий
    collection[indices15[i]].classList.remove("displaySlide");

  // рассчитать новый индекс
    indices15[i] =
    dir === "right"
        ? (indices15[i] + 1) % collection.length
        : (indices15[i] - 1 + collection.length) % collection.length;

const curr = collection[indices15[i]];

  // сброс старых анимаций
    curr.classList.remove("slideIn");
    curr.classList.remove("reverseSlideIn");
    void curr.offsetWidth; // хак для перезапуска анимации

  // если это наша коллекция slides18 → добавляем анимацию в зависимости от направления
    if (collection === slides17) {
        if (dir === "right") {
            curr.classList.add("slideInB");
        } else {
            curr.classList.add("reverseSlideIn");
        }
    }

  // показать слайд
    curr.classList.add("displaySlide");
}

// обработчики для всех кнопок
r_buttons15?.addEventListener("click", () => {
    collections15.forEach((col, i) => advanceLieutenant7(col, i, "right"));
});

l_buttons15?.addEventListener("click", () => {
    collections15.forEach((col, i) => advanceLieutenant7(col, i, "left"));
});

// ------------------------ SLIDER BUTTON17 ------------------------

const slides18 = Array.from(document.querySelectorAll(".slider-gotei-desc-card8"));

const r_buttons16 = document.getElementById("g-arrow31");
const l_buttons16 = document.getElementById("g-arrow32");

// соберём коллекции и их индексы
const collections16 = [slides18];
const indices16 = collections16.map(() => 0);

// показать первый слайд каждой коллекции
collections16.forEach((col) => {
    if (col.length > 0) col[0].classList.add("displaySlide");
});

// функция переключения
function advanceCaptain9(collection, i, dir) {
    if (collection.length === 0) return;

  // убрать текущий
    collection[indices16[i]].classList.remove("displaySlide");

  // рассчитать новый индекс
    indices16[i] =
    dir === "right"
        ? (indices16[i] + 1) % collection.length
        : (indices16[i] - 1 + collection.length) % collection.length;

const curr = collection[indices16[i]];

  // сброс старых анимаций
    curr.classList.remove("slideIn");
    curr.classList.remove("reverseSlideIn");
    void curr.offsetWidth; // хак для перезапуска анимации

  // если это наша коллекция slides18 → добавляем анимацию в зависимости от направления
    if (collection === slides18) {
        if (dir === "right") {
            curr.classList.add("slideInB");
        } else {
            curr.classList.add("reverseSlideIn");
        }
    }

  // показать слайд
    curr.classList.add("displaySlide");
}

// обработчики для всех кнопок
r_buttons16?.addEventListener("click", () => {
    collections16.forEach((col, i) => advanceCaptain9(col, i, "right"));
});

l_buttons16?.addEventListener("click", () => {
    collections16.forEach((col, i) => advanceCaptain9(col, i, "left"));
});

// ------------------------ SLIDER BUTTON18 ------------------------

const slides19 = Array.from(document.querySelectorAll(".slider-gotei-desc-card9"));

const r_buttons17 = document.getElementById("g-arrow33");
const l_buttons17 = document.getElementById("g-arrow34");

// соберём коллекции и их индексы
const collections17 = [slides19];
const indices17 = collections17.map(() => 0);

// показать первый слайд каждой коллекции
collections17.forEach((col) => {
    if (col.length > 0) col[0].classList.add("displaySlide");
});

// функция переключения
function advanceCaptain10(collection, i, dir) {
    if (collection.length === 0) return;

  // убрать текущий
    collection[indices17[i]].classList.remove("displaySlide");

  // рассчитать новый индекс
    indices17[i] =
    dir === "right"
        ? (indices17[i] + 1) % collection.length
        : (indices17[i] - 1 + collection.length) % collection.length;

const curr = collection[indices17[i]];

  // сброс старых анимаций
    curr.classList.remove("slideIn");
    curr.classList.remove("reverseSlideIn");
    void curr.offsetWidth; // хак для перезапуска анимации

  // если это наша коллекция slides18 → добавляем анимацию в зависимости от направления
    if (collection === slides19) {
        if (dir === "right") {
            curr.classList.add("slideInB");
        } else {
            curr.classList.add("reverseSlideIn");
        }
    }

  // показать слайд
    curr.classList.add("displaySlide");
}

// обработчики для всех кнопок
r_buttons17?.addEventListener("click", () => {
    collections17.forEach((col, i) => advanceCaptain10(col, i, "right"));
});

l_buttons17?.addEventListener("click", () => {
    collections17.forEach((col, i) => advanceCaptain10(col, i, "left"));
});

const buttons = document.querySelectorAll('.right-arrow, .left-arrow');

    buttons.forEach(button => {
    const slider = button.closest('.slider');
    const imageSpace = document.querySelectorAll('.slider-gotei-card__image');
    const card = document.querySelectorAll('.slider-gotei-card')

    button.addEventListener('mouseenter', () => {
    card.forEach(space => space.classList.add('scaleCard'));
    imageSpace.forEach(space => space.classList.add('show-after'));
    });

    slider.addEventListener('mouseleave', () => {
    card.forEach(space => space.classList.remove('scaleCard'));
    imageSpace.forEach(space => space.classList.remove('show-after'));
    });
});



// ------------------------ OTHER SLIDER BUTTON ------------------------

const oslides = Array.from(document.querySelectorAll(".other-slide-desc-card"));

const oRbuttons = document.getElementById("o-arrow1");
const oLbuttons = document.getElementById("o-arrow2");

// соберём коллекции и их индексы
const ocollections = [oslides];
const oindices = ocollections.map(() => 0);

// показать первый слайд каждой коллекции
ocollections.forEach((col) => {
    if (col.length > 0) col[0].classList.add("displaySlide");
});

// функция переключения
function advanceUrahara(collection, i, dir) {
    if (collection.length === 0) return;

  // убрать текущий
    collection[oindices[i]].classList.remove("displaySlide");

  // рассчитать новый индекс
    oindices[i] =
    dir === "right"
        ? (oindices[i] + 1) % collection.length
        : (oindices[i] - 1 + collection.length) % collection.length;

const curr = collection[oindices[i]];

  // сброс старых анимаций
    curr.classList.remove("slideIn");
    curr.classList.remove("reverseSlideIn");
    void curr.offsetWidth; // хак для перезапуска анимации

  // если это наша коллекция slides18 → добавляем анимацию в зависимости от направления
    if (collection === oslides) {
        if (dir === "right") {
            curr.classList.add("slideInB");
        } else {
            curr.classList.add("reverseSlideIn");
        }
    }

  // показать слайд
    curr.classList.add("displaySlide");
}

// обработчики для всех кнопок
oRbuttons?.addEventListener("click", () => {
    ocollections.forEach((col, i) => advanceUrahara(col, i, "right"));
});

oLbuttons?.addEventListener("click", () => {
    ocollections.forEach((col, i) => advanceUrahara(col, i, "left"));
});

// ------------------------ OTHER SLIDER BUTTON1 ------------------------

const oslides1 = Array.from(document.querySelectorAll(".other-slide-desc-card1"));

const oRbuttons1 = document.getElementById("o-arrow3");
const oLbuttons1 = document.getElementById("o-arrow4");

// соберём коллекции и их индексы
const ocollections1 = [oslides1];
const oindices1 = ocollections1.map(() => 0);

// показать первый слайд каждой коллекции
ocollections1.forEach((col) => {
    if (col.length > 0) col[0].classList.add("displaySlide");
});

// функция переключения
function advanceVisored(collection, i, dir) {
    if (collection.length === 0) return;

  // убрать текущий
    collection[oindices1[i]].classList.remove("displaySlide");

  // рассчитать новый индекс
    oindices1[i] =
    dir === "right"
        ? (oindices1[i] + 1) % collection.length
        : (oindices1[i] - 1 + collection.length) % collection.length;

const curr = collection[oindices1[i]];

 // сброс старых анимаций
    curr.classList.remove("slideIn");
    curr.classList.remove("reverseSlideIn");
    void curr.offsetWidth; // хак для перезапуска анимации

  // если это наша коллекция slides18 → добавляем анимацию в зависимости от направления
    if (collection === oslides1) {
        if (dir === "right") {
            curr.classList.add("slideInB");
        } else {
            curr.classList.add("reverseSlideIn");
        }
    }

  // показать слайд
    curr.classList.add("displaySlide");
}

// обработчики для всех кнопок
oRbuttons1?.addEventListener("click", () => {
    ocollections1.forEach((col, i) => advanceVisored(col, i, "right"));
});

oLbuttons1?.addEventListener("click", () => {
    ocollections1.forEach((col, i) => advanceVisored(col, i, "left"));
});

// ------------------------ OTHER SLIDER BUTTON2 ------------------------

const oslides2 = Array.from(document.querySelectorAll(".other-slide-desc-card2"));

const oRbuttons2 = document.getElementById("o-arrow5");
const oLbuttons2 = document.getElementById("o-arrow6");

// соберём коллекции и их индексы
const ocollections2 = [oslides2];
const oindices2 = ocollections2.map(() => 0);

// показать первый слайд каждой коллекции
ocollections2.forEach((col) => {
    if (col.length > 0) col[0].classList.add("displaySlide");
});

// функция переключения
function advanceSoulKing(collection, i, dir) {
    if (collection.length === 0) return;

  // убрать текущий
    collection[oindices2[i]].classList.remove("displaySlide");

  // рассчитать новый индекс
    oindices2[i] =
    dir === "right"
        ? (oindices2[i] + 1) % collection.length
        : (oindices2[i] - 1 + collection.length) % collection.length;

const curr = collection[oindices2[i]];

  // сброс старых анимаций
    curr.classList.remove("slideIn");
    curr.classList.remove("reverseSlideIn");
    void curr.offsetWidth; // хак для перезапуска анимации

  // если это наша коллекция slides18 → добавляем анимацию в зависимости от направления
    if (collection === oslides2) {
        if (dir === "right") {
            curr.classList.add("slideInB");
        } else {
            curr.classList.add("reverseSlideIn");
        }
    }

  // показать слайд
    curr.classList.add("displaySlide");
}

// обработчики для всех кнопок
oRbuttons2?.addEventListener("click", () => {
    ocollections2.forEach((col, i) => advanceSoulKing(col, i, "right"));
});

oLbuttons2?.addEventListener("click", () => {
    ocollections2.forEach((col, i) => advanceSoulKing(col, i, "left"));
});

// ------------------------ OTHER SLIDER BUTTON3 ------------------------

const oslides3 = Array.from(document.querySelectorAll(".other-slide-desc-card3"));

const oRbuttons3 = document.getElementById("o-arrow7");
const oLbuttons3 = document.getElementById("o-arrow8");

// соберём коллекции и их индексы
const ocollections3 = [oslides3];
const oindices3 = ocollections3.map(() => 0);

// показать первый слайд каждой коллекции
ocollections3.forEach((col) => {
    if (col.length > 0) col[0].classList.add("displaySlide");
});

// функция переключения
function advanceXcution(collection, i, dir) {
    if (collection.length === 0) return;

  // убрать текущий
    collection[oindices3[i]].classList.remove("displaySlide");

  // рассчитать новый индекс
    oindices3[i] =
    dir === "right"
        ? (oindices3[i] + 1) % collection.length
        : (oindices3[i] - 1 + collection.length) % collection.length;

const curr = collection[oindices3[i]];

  // сброс старых анимаций
    curr.classList.remove("slideIn");
    curr.classList.remove("reverseSlideIn");
    void curr.offsetWidth; // хак для перезапуска анимации

  // если это наша коллекция slides18 → добавляем анимацию в зависимости от направления
    if (collection === oslides3) {
        if (dir === "right") {
            curr.classList.add("slideInB");
        } else {
            curr.classList.add("reverseSlideIn");
        }
    }

  // показать слайд
    curr.classList.add("displaySlide");
}

// обработчики для всех кнопок
oRbuttons3?.addEventListener("click", () => {
    ocollections3.forEach((col, i) => advanceXcution(col, i, "right"));
});

oLbuttons3?.addEventListener("click", () => {
    ocollections3.forEach((col, i) => advanceXcution(col, i, "left"));
});
});

// ФИКС АНИМАЦИЙ -----------------------------------------------
window.addEventListener('load', () => {
  const blackbg = document.getElementById('js-black-bg');
  const bleachbg = document.getElementById('bleach-bg');
  const mainbleach = document.getElementById('main__bleach');
  const gridleach = document.getElementById('gridbleach');
  const footerbleach = document.getElementById('footer__bleach');
  const Icard = document.getElementById('Ichigo-card');
  const bgnav = document.querySelectorAll('nav');
  const navmobile = document.querySelectorAll('.nav-mobile');


  blackbg?.classList.add('color_slidein1s', 'displayElementBlock');
  bleachbg?.classList.add('slideInForwards', 'displayElementBlock');
  mainbleach?.classList.add('slideIn', 'displayElementGrid');
  gridleach?.classList.add('displayElementGrid');
  footerbleach?.classList.add('slideIn', 'displayElementGrid');
  Icard?.classList.add('slideInBleachCard', 'displayElementGrid');
  bgnav.forEach(el => el.classList.add('slideInNav', 'displayElementFlex'));
  navmobile.forEach(el => el.classList.add('slideInNav', 'displayElementFlex'));
});

window.addEventListener('load', () => {
  const goteibg = document.getElementById('gotei-bg');
  const maingotei = document.getElementById('main__gotei')
  goteibg?.classList.add('slideInGotei', 'displayElementBlock');
  maingotei?.classList.add('slideIn', 'displayElementGrid');
});

window.addEventListener('load', () => {
  const espadabg = document.getElementById('espada-bg');
  const mainespada = document.getElementById('main__espada')
  espadabg?.classList.add('slideInEspada', 'displayElementBlock');
  mainespada?.classList.add('slideIn', 'displayElementBlock');
});

window.addEventListener('load', () => {
  const quincybg = document.getElementById('quincy-bg');
  const mainquincy = document.getElementById('main__quincy')
  quincybg?.classList.add('slideInQuincy', 'displayElementBlock');
  mainquincy?.classList.add('slideIn', 'displayElementGrid');
});

window.addEventListener('load', () => {
  const otherbg = document.getElementById('other-bg');
  const mainother = document.getElementById('main__other')
  otherbg?.classList.add('color_slidein1s', 'displayElementBlock');
  mainother?.classList.add('slideIn', 'displayElementGrid');
});

window.addEventListener('load', () => {
  const aboutbg = document.getElementById('about-bg');
  const mainabout = document.getElementById('main__about')
  const imgabout = document.getElementById('about-image')
  aboutbg?.classList.add('color_slidein1s', 'displayElementBlock');
  mainabout?.classList.add('slideIn', 'displayElementGrid');
});

(function(){
    const switcher = document.querySelector('.nav__switcher');
    const selector = switcher?.querySelector('.nav__selector');
    const buttons = switcher ? Array.from(switcher.querySelectorAll('.nav__lang-btn')) : [];
    const STORAGE_KEY = 'preferred_language';
    if(!switcher || !selector || buttons.length===0) return;

    const initialLang = (localStorage.getItem(STORAGE_KEY) || 'en').toLowerCase();
    let current = Math.max(0, buttons.findIndex(b => b.dataset.lang === initialLang));

    function getNumericStyle(propName){
        return parseFloat(getComputedStyle(document.documentElement).getPropertyValue(propName)) || 0;
    }

    function recalc(){
        const rect = switcher.getBoundingClientRect();
        if(rect.width===0){ return; } // контейнер ещё не отрисован
        const padding = getNumericStyle('--padding') || 10;
        const extra = Math.min(getNumericStyle('--selector-extra') || 12, padding * 2 - 2);
        const selectorHeight = Math.max(0, rect.height - padding * 2);
        const btnRect = buttons[current].getBoundingClientRect();
        const size = Math.max(btnRect.width, selectorHeight) + extra;
        selector.style.width = size + 'px';
        selector.style.height = size + 'px';
        selector.style.borderRadius = '50%';
        moveToIndex(current, {animate:false});
    }

    function moveToIndex(idx, {animate=true} = {}){
        idx = Math.max(0, Math.min(idx, buttons.length - 1));
        const rect = switcher.getBoundingClientRect();
        const padding = getNumericStyle('--padding') || 10;
        const extra = Math.min(getNumericStyle('--selector-extra') || 12, padding * 2 - 2);
        const btnRect = buttons[idx].getBoundingClientRect();
        if(rect.width===0 || btnRect.width===0){
            return; // ранний отказ — ещё нет измерений
        }
        const selectorHeight = Math.max(0, rect.height - padding * 2);
        const size = Math.max(btnRect.width, selectorHeight) + extra;
        selector.style.width = size + 'px';
        selector.style.height = size + 'px';
        const btnCenterX = (btnRect.left + btnRect.width / 2) - rect.left;
        const btnCenterY = (btnRect.top + btnRect.height / 2) - rect.top;

        if(!animate){
            selector.style.transition='none';
            selector.classList.remove('pop','ripple');
            selector.style.left=btnCenterX+'px';
            selector.style.top=btnCenterY+'px';
            void selector.offsetWidth;
            selector.style.transition='';
        } else {
            selector.classList.remove('pop','ripple');
            void selector.offsetWidth;
            selector.classList.add('pop','ripple');
            selector.addEventListener('animationend',()=>{selector.classList.remove('pop')},{once:true});
            selector.style.left=btnCenterX+'px';
            selector.style.top=btnCenterY+'px';
        }
        current = idx;
    }

    function applyLang(lang, {save=true, animate=true} = {}) {
  lang = String(lang || 'en').trim().toLowerCase();

  buttons.forEach((btn,i)=>{
    const is = btn.dataset.lang.toLowerCase() === lang;
    if(is){
      btn.setAttribute('selected','');
      btn.setAttribute('aria-selected','true');
      btn.tabIndex=0;
      current=i;
    } else {
      btn.removeAttribute('selected');
      btn.setAttribute('aria-selected','false');
      btn.tabIndex=-1;
    }
  });

  document.documentElement.lang = (lang==='ru') ? 'ru' : 'en';

  document.querySelectorAll('[data-en],[data-ru]').forEach(el=>{
    const v = el.dataset[lang];
    if (v != null) {
      if (v.includes('<br')) {
        el.innerHTML = v;          // разрешаем переносы
      } else {
        el.textContent = v;
      }
      el.setAttribute('data-active-text', v);
    }
  });

  moveToIndex(current, {animate});
  if (save) localStorage.setItem('preferred_language', lang);
  window.dispatchEvent(new CustomEvent('languageChange',{detail:{lang}}));
}

    function init(){
        const doInit = ()=>{
            current = Math.max(0, buttons.findIndex(b=>b.dataset.lang===initialLang));
            recalc();
            applyLang(initialLang,{save:false, animate:false});
            selector.classList.add('selector--ready');
        };
        // Если контейнер ещё не имеет размеров — повторим позже
        if(switcher.getBoundingClientRect().width===0){
            requestAnimationFrame(doInit);
            window.addEventListener('load', doInit, {once:true});
        } else {
            doInit();
        }
    }

    window.addEventListener('resize',()=>{clearTimeout(window.rT); window.rT=setTimeout(()=>moveToIndex(current,{animate:false}),90);});
    buttons.forEach((btn,i)=>{
        btn.addEventListener('click',()=>applyLang(btn.dataset.lang,{animate:true}));
        btn.addEventListener('keydown',e=>{
            if(e.key==='Enter'||e.key===' '){ e.preventDefault(); btn.click(); }
            if(e.key==='ArrowRight'||e.key==='ArrowLeft'){
                e.preventDefault();
                const next = e.key==='ArrowRight' ? (i+1)%buttons.length : (i-1+buttons.length)%buttons.length;
                buttons[next].focus();
            }
        });
    });
    document.addEventListener('DOMContentLoaded', init);
    if(document.readyState==='complete'||document.readyState==='interactive') init();
})();



// замена существующих констант VIDEO_ID / VIDEO_ID1 на карту и помощник
const DEFAULT_VIDEO_ID = 'ZflJXsO1bmo'; // общий fallback
const VIDEO_BY_PAGE = {
    espada: 'iijKJdUDR3c',
    bleach: 'ZflJXsO1bmo',
    gotei: 'AkQ6Z_9uuIA',
    quincy: 'juigm_MD6vU',
    // добавляйте сюда другие страницы: pageId: 'YouTubeID'
    // gotei: 'XYZ...',
    // quincy: 'ABC...'
};
let player, duration=0, isPlaying=false, updateInterval=null;

const playPauseBtn = document.getElementById('playPause');
const currentEl = document.getElementById('current');
const durationEl = document.getElementById('duration');
const progressEl = document.getElementById('progress');
const progressWrap = document.getElementById('progressWrap');
const thumbEl = document.getElementById('thumb');

const volumeWrap = document.getElementById('volumeWrap');
const volumeLevel = document.getElementById('volumeLevel');
const volumeThumb = document.getElementById('volumeThumb');

function getVideoIdForPage() {
    const body = document.body;
    if (!body) return DEFAULT_VIDEO_ID;
    // 1) приоритет: data-video на body
    const attr = body.getAttribute('data-video');
    if (attr && attr.trim()) return attr.trim();
    // 2) по id body через карту
    const pageId = (body.id || '').trim().toLowerCase();
    if (pageId && VIDEO_BY_PAGE[pageId]) return VIDEO_BY_PAGE[pageId];
    // 3) fallback
    return DEFAULT_VIDEO_ID;
}

function formatTime(sec){
    if(isNaN(sec)) return '0:00';
    sec=Math.floor(sec);
    const m=Math.floor(sec/60);
    const s=sec%60;
    return m + ':' + (s<10?'0'+s:s);
}

function onYouTubeIframeAPIReady(){
    const playerEl = document.getElementById('yt-player');
    if (!playerEl) return; // нет контейнера — пропуск
    const idToPlay = getVideoIdForPage();
    player = new YT.Player('yt-player',{
        height:'0', width:'0', videoId: idToPlay,
        playerVars:{controls:0, autoplay:0, disablekb:1, modestbranding:1, rel:0},
        events:{onReady:onPlayerReady, onStateChange:onPlayerStateChange}
    });
}

function onPlayerStateChange(e) {
    if (e.data === YT.PlayerState.PLAYING) {
        isPlaying = true;
        document.getElementById('iconPlay').style.display = 'none';
        document.getElementById('iconPause').style.display = 'block';
        const playerBox = document.querySelector('.player');
        playerBox?.classList.add('playing');
        playerBox?.classList.remove('paused');
    } else if (e.data === YT.PlayerState.PAUSED || e.data === YT.PlayerState.ENDED) {
        isPlaying = false;
        document.getElementById('iconPlay').style.display = 'block';
        document.getElementById('iconPause').style.display = 'none';
        const playerBox = document.querySelector('.player');
        playerBox?.classList.add('paused');
        playerBox?.classList.remove('playing');
        try { sessionStorage.setItem('playerUserInitiated','0'); } catch(e){}
    }
}

function updateProgressUI(currentSec){
    if(!duration||duration<=0){progressEl.style.width='0%'; thumbEl.style.left='0%'; currentEl.textContent=formatTime(0); return;}
    const pct = Math.max(0,Math.min(1,currentSec/duration));
    const percentStr = (pct*100).toFixed(3)+'%';
    progressEl.style.width = percentStr;
    thumbEl.style.left = percentStr;
    currentEl.textContent = formatTime(currentSec);
}

{
    // Play/Pause — безопасно, помечает факт пользовательского запуска и сбрасывает при паузе
    if (playPauseBtn) {
        playPauseBtn.addEventListener('click', () => {
            if (!player) return;
            const state = player.getPlayerState();
            if (state === YT.PlayerState.PLAYING) {
                player.pauseVideo();
                try { sessionStorage.setItem('playerUserInitiated', '0'); } catch (e) {}
            } else {
                player.playVideo();
                try { sessionStorage.setItem('playerUserInitiated', '1'); } catch (e) {}
            }
        });
    }
}

// --- Timeline drag ---
if (progressWrap && progressEl && thumbEl) {
    let isSeeking=false;
    function seekToByClientX(clientX){
        const rect = progressWrap.getBoundingClientRect();
        let x = clientX - rect.left;
        x = Math.max(0, Math.min(rect.width, x));
        const pct = x/rect.width;
        const seekSec = pct*duration;
        const percentStr = (pct*100).toFixed(3)+'%';
        if (progressEl) progressEl.style.width = percentStr;
        if (thumbEl) thumbEl.style.left = percentStr;
        if (currentEl) currentEl.textContent = formatTime(seekSec);
        return seekSec;
    }
    progressWrap.addEventListener('pointerdown', e=>{
        if (!player) return;
        isSeeking=true;
        progressWrap.setPointerCapture(e.pointerId);
        player.seekTo(seekToByClientX(e.clientX), true);
    });
    progressWrap.addEventListener('pointermove', e=>{
        if(!isSeeking) return;
        seekToByClientX(e.clientX);
    });
    progressWrap.addEventListener('pointerup', e=>{
        if(!isSeeking) return;
        isSeeking=false;
        player.seekTo(seekToByClientX(e.clientX), true);
    });
}

if (volumeWrap && volumeLevel && volumeThumb) {
    let isVolDragging=false;
    function updateVolumeUI(vol){
        vol = Math.max(0, Math.min(100, vol));
        if (volumeLevel) volumeLevel.style.height = vol + '%';
        if (volumeThumb) {
            const offset = -10;
            const thumbBottom = vol + offset;
            const maxBottom = 100 - (7 / volumeWrap.clientHeight * 100);
            const minBottom = 0;
            const clamped = Math.max(minBottom, Math.min(maxBottom, thumbBottom));
            volumeThumb.style.bottom = clamped + '%';
        }
    }
    function setVolumeByClientY(clientY){
        const rect = volumeWrap.getBoundingClientRect();
        let y = rect.bottom - clientY;
        y = Math.max(0, Math.min(rect.height, y));
        const pct = (y / rect.height)*100;
        player.setVolume(pct);
        updateVolumeUI(pct);
    }
    volumeWrap.addEventListener('pointerdown', e=>{
        isVolDragging=true;
        volumeWrap.setPointerCapture(e.pointerId);
        setVolumeByClientY(e.clientY);
    });
    volumeWrap.addEventListener('pointermove', e=>{
        if(!isVolDragging) return;
        setVolumeByClientY(e.clientY);
    });
    volumeWrap.addEventListener('pointerup', e=>{
        if(!isVolDragging) return;
        isVolDragging=false;
        setVolumeByClientY(e.clientY);
    });
}

window.addEventListener('beforeunload', ()=>{
    if(updateInterval) clearInterval(updateInterval);
});

// === Сохранение состояния перед уходом со страницы ===
window.addEventListener("beforeunload", () => {
    if (player && typeof player.getCurrentTime === "function") {
        const state = {
            time: player.getCurrentTime(),
            volume: player.getVolume(),
            isPlaying: isPlaying
        };
        localStorage.setItem("playerState", JSON.stringify(state));
    }
});

// === Восстановление состояния при загрузке плеера ===
function onPlayerReady(){
    setTimeout(()=>{
        duration = (player && typeof player.getDuration === 'function') ? player.getDuration()||0 : 0;
        if (durationEl) durationEl.textContent = formatTime(duration);
    }, 500);

    // Восстановление громкости/позиции; автозапуск — только если saved.isPlaying === true и пользователь в этой сессии явно запускал
    const savedStr = localStorage.getItem("playerState");
    const saved = savedStr ? JSON.parse(savedStr) : null;
    const userInitiated = sessionStorage.getItem('playerUserInitiated') === '1';
    const savedIsPlaying = !!saved && saved.isPlaying === true;

    // восстановление громкости/позиции
    if (saved) {
        if (typeof player.setVolume === 'function') player.setVolume(saved.volume != null ? saved.volume : 50);
        if (typeof updateVolumeUI === 'function' && volumeLevel && volumeThumb) updateVolumeUI(saved.volume != null ? saved.volume : 50);
        if (saved.time && typeof player.seekTo === 'function') player.seekTo(saved.time);
    } else {
        if (typeof player.setVolume === 'function') player.setVolume(50);
        if (typeof updateVolumeUI === 'function' && volumeLevel && volumeThumb) updateVolumeUI(50);
    }

    // Если автозапуск не разрешён — явно поставить на паузу (защита от непреднамеренного autoplay)
    if (!(savedIsPlaying && userInitiated) && typeof player.pauseVideo === 'function') {
        // небольшая задержка, чтобы гарантированно остановить автоплей
        setTimeout(() => { try { player.pauseVideo(); } catch (e) {} }, 50);
    } else {
        // разрешён автозапуск
        try { if (typeof player.playVideo === 'function') player.playVideo(); } catch (e) {}
    }

    // Запуск обновления таймлайна
    if (updateInterval) clearInterval(updateInterval);
    updateInterval = setInterval(() => {
        if (player && typeof player.getCurrentTime === "function") {
            updateProgressUI(player.getCurrentTime());
        }
    }, 250);
}

const playerEl = document.querySelector(".player");

window.addEventListener("scroll", () => {
    const scrollY = window.scrollY || window.pageYOffset;
    const viewportHeight = window.innerHeight;
    const trigger = 0.4 * viewportHeight; // 150vh

    if (scrollY >= trigger) {
        playerEl.classList.add("player--hidden");
    } else {
        playerEl.classList.remove("player--hidden");
    }
});


