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

      const isOpen = toggle.classList.toggle('open');
      nav.classList.toggle('open', isOpen);
      toggle.setAttribute('aria-expanded', String(isOpen));

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
            
            // BANGを爆発SVGに変更（画像の爆発に合わせたデザイン）
            countText.innerHTML = `
              <svg class="countdown-explosion" viewBox="0 0 250 250" xmlns="http://www.w3.org/2000/svg">
                <!-- 外側のオレンジ大きい雲 -->
                <ellipse cx="125" cy="100" rx="80" ry="70" fill="#FF8C00" opacity="0.9"/>
                <ellipse cx="60" cy="110" rx="70" ry="65" fill="#FF6B35" opacity="0.85"/>
                <ellipse cx="190" cy="110" rx="75" ry="70" fill="#FF8C00" opacity="0.85"/>
                
                <!-- 上部の爆発 -->
                <ellipse cx="125" cy="40" rx="60" ry="55" fill="#FFA500" opacity="0.9"/>
                <ellipse cx="90" cy="50" rx="50" ry="50" fill="#FF8C00" opacity="0.8"/>
                <ellipse cx="160" cy="45" rx="55" ry="52" fill="#FF9500" opacity="0.85"/>
                
                <!-- 左上の爆発 -->
                <ellipse cx="45" cy="60" rx="55" ry="50" fill="#FF8C00" opacity="0.8"/>
                <ellipse cx="30" cy="85" rx="50" ry="55" fill="#FF6B35" opacity="0.75"/>
                
                <!-- 右上の爆発 -->
                <ellipse cx="205" cy="60" rx="55" ry="50" fill="#FF8C00" opacity="0.8"/>
                <ellipse cx="220" cy="85" rx="50" ry="55" fill="#FF6B35" opacity="0.75"/>
                
                <!-- 中央の黄色い部分 -->
                <ellipse cx="125" cy="105" rx="55" ry="50" fill="#FFD700" opacity="0.95"/>
                <ellipse cx="100" cy="95" rx="45" ry="45" fill="#FFDA03" opacity="0.9"/>
                <ellipse cx="150" cy="100" rx="48" ry="43" fill="#FFD700" opacity="0.9"/>
                
                <!-- 中心の明るい部分 -->
                <ellipse cx="125" cy="100" rx="35" ry="32" fill="#FFFACD" opacity="1"/>
                <circle cx="125" cy="95" r="20" fill="#FFFF99" opacity="0.95"/>
                
                <!-- 下部の爆発 -->
                <ellipse cx="125" cy="160" rx="65" ry="55" fill="#FFA500" opacity="0.85"/>
                <ellipse cx="90" cy="150" rx="50" ry="50" fill="#FF8C00" opacity="0.8"/>
                <ellipse cx="160" cy="155" rx="52" ry="48" fill="#FF9500" opacity="0.8"/>
              </svg>
            `;

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

  /* ========================================
     カレンダーウィジェット
  ======================================== */

  let currentMonth = new Date();
  const calendarGrid = document.getElementById('calendarGrid');
  const monthYearDisplay = document.querySelector('.calendar-month-year');
  const prevButton = document.querySelector('.calendar-prev');
  const nextButton = document.querySelector('.calendar-next');

  if (!calendarGrid || !monthYearDisplay || !prevButton || !nextButton) {
    return;
  }

  const eventDates = [
    { month: 10, day: 10 },
    { month: 10, day: 11 }
  ];

  function renderCalendar() {
    calendarGrid.innerHTML = '';

    const year = currentMonth.getFullYear();
    const month = currentMonth.getMonth();

    // 月名の表示
    const monthNames = [
      '1月', '2月', '3月', '4月', '5月', '6月',
      '7月', '8月', '9月', '10月', '11月', '12月'
    ];
    monthYearDisplay.textContent = `${year}年 ${monthNames[month]}`;

    // 曜日のヘッダーを追加
    const dayNames = ['日', '月', '火', '水', '木', '金', '土'];
    dayNames.forEach(name => {
      const dayHeader = document.createElement('div');
      dayHeader.className = 'calendar-day-header';
      dayHeader.textContent = name;
      calendarGrid.appendChild(dayHeader);
    });

    // その月の最初の日
    const firstDay = new Date(year, month, 1);
    const lastDay = new Date(year, month + 1, 0);
    const prevLastDay = new Date(year, month, 0);

    const firstDayOfWeek = firstDay.getDay();
    const lastDayDate = lastDay.getDate();
    const prevLastDayDate = prevLastDay.getDate();

    // 前月の最後の日を追加
    for (let i = firstDayOfWeek - 1; i >= 0; i--) {
      const dayDiv = document.createElement('div');
      dayDiv.className = 'calendar-day other-month';
      dayDiv.textContent = prevLastDayDate - i;
      calendarGrid.appendChild(dayDiv);
    }

    // 今月の日付を追加
    const today = new Date();
    for (let day = 1; day <= lastDayDate; day++) {
      const dayDiv = document.createElement('div');
      dayDiv.className = 'calendar-day';

      // 今日の日付かチェック
      if (
        day === today.getDate() &&
        month === today.getMonth() &&
        year === today.getFullYear()
      ) {
        dayDiv.classList.add('today');
      }

      // イベント日付かチェック
      const isEventDay = eventDates.some(
        event => event.month === month + 1 && event.day === day
      );
      if (isEventDay) {
        dayDiv.classList.add('event-day');
      }

      dayDiv.textContent = day;
      calendarGrid.appendChild(dayDiv);
    }

    // 次月の最初の日を追加
    const totalCells = calendarGrid.children.length - 7; // ヘッダー分を除く
    const remainingCells = 42 - totalCells; // 6行 × 7列 = 42
    for (let day = 1; day <= remainingCells; day++) {
      const dayDiv = document.createElement('div');
      dayDiv.className = 'calendar-day other-month';
      dayDiv.textContent = day;
      calendarGrid.appendChild(dayDiv);
    }
  }

  // 前の月へ
  prevButton.addEventListener('click', () => {
    currentMonth.setMonth(currentMonth.getMonth() - 1);
    renderCalendar();
  });

  // 次の月へ
  nextButton.addEventListener('click', () => {
    currentMonth.setMonth(currentMonth.getMonth() + 1);
    renderCalendar();
  });

  // 初期表示
  renderCalendar();

});