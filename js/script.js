document.addEventListener('DOMContentLoaded', () => {
  const header = document.querySelector('.header');
  const hamburger = document.querySelector('.hamburger');
  const nav = document.querySelector('nav');

  // ハンバーガーメニュー
  if (hamburger && nav) {
    hamburger.addEventListener('click', () => {
      nav.classList.toggle('is-open');
      hamburger.classList.toggle('is-open');

      if (window.innerWidth <= 768) {
        nav.style.display = nav.classList.contains('is-open') ? 'flex' : 'none';
      }
    });
  }

  // リサイズ対応
  function updateMenu() {
    if (!nav) return;

    if (window.innerWidth > 768) {
      nav.style.display = 'flex';
    } else if (!nav.classList.contains('is-open')) {
      nav.style.display = 'none';
    }
  }

  updateMenu();
  window.addEventListener('resize', updateMenu);

  // スクロール時ヘッダー
  window.addEventListener('scroll', () => {
    if (!header) return;

    if (window.scrollY > 60) {
      header.classList.add('scrolled');
    } else {
      header.classList.remove('scrolled');
    }
  });

  // スムーススクロール
  document.querySelectorAll('a[href^="#"]').forEach(link => {
    link.addEventListener('click', e => {

      const target = document.querySelector(link.getAttribute('href'));

      if (!target) return;

      e.preventDefault();

      target.scrollIntoView({
        behavior: "smooth"
      });

      if (window.innerWidth <= 768) {
        nav.classList.remove("is-open");
        nav.style.display = "none";
      }

    });
  });

  // フェードイン
  const observer = new IntersectionObserver(entries => {

    entries.forEach(entry => {

      if (entry.isIntersecting) {
        entry.target.classList.add("show");
      }

    });

  }, {
    threshold: 0.2
  });

  document.querySelectorAll("section").forEach(section => {
    section.classList.add("fade");
    observer.observe(section);
  });

  document.querySelectorAll(".cards article").forEach(card => {
    card.classList.add("fade");
    observer.observe(card);
  });

  document.querySelectorAll(".gallery .item").forEach(item => {
    item.classList.add("fade");
    observer.observe(item);
  });

  // カウンターアニメーション
  const counters = document.querySelectorAll("[data-counter]");

  counters.forEach(counter => {

    let started = false;

    const counterObserver = new IntersectionObserver(entries => {

      entries.forEach(entry => {

        if (entry.isIntersecting && !started) {

          started = true;

          const target = parseInt(counter.dataset.counter);

          let value = 0;

          const increment = Math.ceil(target / 100);

          const timer = setInterval(() => {

            value += increment;

            if (value >= target) {

              value = target;

              clearInterval(timer);

            }

            counter.textContent = value.toLocaleString();

          }, 20);

        }

      });

    });

    counterObserver.observe(counter);

  });

  // ギャラリー
  document.querySelectorAll(".gallery .item").forEach(item => {

    item.addEventListener("click", () => {

      item.classList.toggle("zoom");

    });

  });

  console.log("Website Loaded");
});