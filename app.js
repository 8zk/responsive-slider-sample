$(function() {
  var MAX_WIDTH = 1000;
  var INTERVAL_TIME = 3000;
  var $slider = $('.slider');
  var $stop = $('.stop');
  var $start = $('.start');
  var $prev = $('.prev');
  var $next = $('.next');
  var touchEvent = document.ontouchstart === null ? 'touchstart' : 'click';
  var timer;

  function getStyle(option) {
    return {
      left: option.isNext ? ($(window).width() < MAX_WIDTH ? '-100vw' : - MAX_WIDTH) : 0,
      transition: option.isAnimation ? 'all 0.5s' : 'initial',
    };
  }

  function checkIsNotAnimation() {
    var transition = $slider[0].style.transition;
    
    return (
      transition === '' ||
      transition === 'initial'
    );
  }

  function startTimer() {
    if (timer) {
      return;
    }
    timer = setInterval(function() {
      $slider.css(getStyle({
        isNext: true,
        isAnimation: true,
      }));
    }, INTERVAL_TIME);
  }

  function stopTimer() {
    clearInterval(timer);
    timer = null;
  }

  function moveRight() {
    if (checkIsNotAnimation()) {
      stopTimer();
      $slider.css(getStyle({
        isNext: true,
        isAnimation: true,
      }));
    }
  }

  function moveLeft() {
    if (checkIsNotAnimation()) {
      stopTimer();
      $slider.prepend($slider.find('.sliderItem').last());
      $slider.css(getStyle({
        isNext: true,
        isAnimation: false,
      }));
      setTimeout(function() {
        $slider.css(getStyle({
          isNext: false,
          isAnimation: true,
        }));
      }, 0);
    }
  }

  function endTransition(e) {
    var isNextAnimation = parseInt(e.target.style.left, 10);

    $slider.css(getStyle({
      isNext: false,
      isAnimation: false,
    }));
    if (isNextAnimation) {
      $slider.append($slider.find('.sliderItem').first());
    }
    startTimer();
  }

  startTimer();

  $stop.on(touchEvent, stopTimer);
  $start.on(touchEvent, startTimer);
  $prev.on(touchEvent, moveLeft);
  $next.on(touchEvent, moveRight);
  $slider.on('transitionend', endTransition);
});
