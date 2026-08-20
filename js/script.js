document.addEventListener('DOMContentLoaded', () => {

  /* ========================================
     ヘッダー
  ======================================== */

  const header = document.querySelector('.site-header');
  const toggle = document.querySelector('.nav-toggle');
  const nav = document.querySelector('.main-nav');

  // スクロール時にヘッダーの見た目を変更
  const onScroll = () => {
    if (!header) return;

    header.classList.toggle(
      'scrolled',
      window.scrollY > 10
    );
  };

  onScroll();
  window.addEventListener('scroll', onScroll);


  /* ========================================
     スマホ用メニュー
  ======================================== */

  if (toggle && nav) {

    toggle.addEventListener('click', () => {

      toggle.classList.toggle('open');
      nav.classList.toggle('open');

    });


    // メニュー内のリンクをクリックしたら閉じる
    nav.querySelectorAll('a').forEach((link) => {

      link.addEventListener('click', () => {

        toggle.classList.remove('open');
        nav.classList.remove('open');

      });

    });

  }


  /* ========================================
     フェードイン
  ======================================== */

  const targets = document.querySelectorAll('.fade-in');

  if (
    'IntersectionObserver' in window &&
    targets.length
  ) {

    const observer = new IntersectionObserver(
      (entries) => {

        entries.forEach((entry) => {

          if (entry.isIntersecting) {

            entry.target.classList.add('in-view');

            observer.unobserve(entry.target);

          }

        });

      },
      {
        threshold: 0.15
      }
    );


    targets.forEach((el) => {

      observer.observe(el);

    });

  } else {

    targets.forEach((el) => {

      el.classList.add('in-view');

    });

  }


  /* ========================================
     工大祭カウントダウン
     
     爆弾をクリック
     ↓
     3
     ↓
     2
     ↓
     1
     ↓
     工大祭まであと○日！！
     
     目標日：2026年10月10日
  ======================================== */

  const countdownBomb =
    document.querySelector('.countdown-bomb');

  const countdownOverlay =
    document.querySelector('.countdown-overlay');


  if (countdownBomb && countdownOverlay) {

    const countText =
      countdownOverlay.querySelector('.countdown-number');

    countdownBomb.addEventListener('click', () => {

      // 連打防止
      if (
        countdownOverlay.classList.contains('active') ||
        countdownOverlay.classList.contains('show')
      ) {
        return;
      }


      // カウントダウン画面を表示
      countdownOverlay.classList.add('active', 'show');
      countdownOverlay.setAttribute('aria-hidden', 'false');


      if (!countText) {
        return;
      }

      countText.style.whiteSpace = 'pre-line';


      /* --------------------
         3・2・1
      -------------------- */

      let count = 3;

      countdownOverlay.classList.remove('exploding', 'result-visible');
      countText.textContent = String(count);


      const timer = setInterval(() => {

        count--;


        if (count > 0) {

          countText.textContent = String(count);

        } else if (count === 0) {

          countText.textContent = '1';

          setTimeout(() => {

            countdownOverlay.classList.add('exploding');
            countText.textContent = 'BANG';

            setTimeout(() => {

              countdownOverlay.classList.remove('exploding');

              /* --------------------
                 目標日
                 2026年10月10日
              -------------------- */

              const targetDate =
                new Date('2026-10-10T00:00:00');


              const today =
                new Date();


              // 今日の日付だけで計算
              const todayDate =
                new Date(
                  today.getFullYear(),
                  today.getMonth(),
                  today.getDate()
                );


              const targetDateOnly =
                new Date(
                  targetDate.getFullYear(),
                  targetDate.getMonth(),
                  targetDate.getDate()
                );


              // 日数の差を計算
              const diffTime =
                targetDateOnly - todayDate;


              const diffDays =
                Math.ceil(
                  diffTime /
                  (1000 * 60 * 60 * 24)
                );


              /* --------------------
                 結果を表示
              -------------------- */

              if (diffDays > 0) {

                countText.textContent = `工大祭まで\nあと${diffDays}日`;

              } else if (diffDays === 0) {

                countText.textContent = '今日は工大祭';

              } else {

                countText.textContent = '工大祭開催中';

              }

              countdownOverlay.classList.add('result-visible');

              setTimeout(() => {

                countdownOverlay.classList.remove(
                  'active', 'show', 'result-visible'
                );
                countdownOverlay.setAttribute('aria-hidden', 'true');

              }, 2600);

            }, 700);

          }, 300);

          clearInterval(timer);

        }

      }, 1000);

    });

  }

});