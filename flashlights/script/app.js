"use strict";

var phrases = [], allTimeElements = document.querySelectorAll('span[data-time]');

/**
 * Makes sure any time shifts are accounted for
 */
function t(time) {
  return time + 0.9;
}

var events = {
  appear: {
    time: t(27), active: false, in: function () {
      document.querySelector('.intro').classList.add('lyrics-visible');
    }, out: function () {
      document.querySelector('.intro').classList.remove('lyrics-visible')
    }
  },
  disappear: {
    time: t(163), active: false, in: function () {
      document.querySelector('.intro').classList.add('lyrics-invisible');
      document.querySelector('.intro').classList.remove('lyrics-visible');
    }, out: function (time) {
      document.querySelector('.intro').classList.remove('lyrics-invisible')
      if (time > events.appear.time) {
        // Make sure that the lyrics appear properly when necessary
        document.querySelector('.intro').classList.add('lyrics-visible')
      }
    }
  },
  switchVerse: {
    time: t(73.5), active: false, in: function () {
      document.querySelector('.block').classList.add('second-verse');
    }, out: function () {
      document.querySelector('.block').classList.remove('second-verse');
    }
  },
  blackOut: {
    time: t(73.28), endTime: t(75), active: false, in: function () {
      document.querySelector('.intro').classList.add('blackout');
    }, out: function () {
      document.querySelector('.intro').classList.remove('blackout');
    }
  }
};

function handleEvent(time) {
  for (var eventName in events) {
    if (events.hasOwnProperty(eventName)) {
      var event = events[eventName];
      if (time > event.time && !event.active) {
        if (!event.endTime || time < event.endTime) {
          event.active = true;
          event.in(time);
        }
      }
      else if (time < event.time && event.active) {
        event.active = false;
        event.out(time);
      }
    }
  }
}


function parseTimeForElements(elements, textName, timeShift) {
  for (var i = 0, span; span = elements[i]; i++) {
    var time = t(parseFloat(span.getAttribute('data-time')));
    if (isNaN(time)) break;

    if (timeShift) time += timeShift;

    _parseTimeForElement(time, span, textName, i);
  }
}

function _parseTimeForElement(time, element, textName, i) {
  var length = phrases.push({
    start: time,
    end: time + 2,
    element: element,
    heart: element.querySelector('.heart')
  });

  if (!element.hasHighlightElement) {
    var highlight = document.createElement('span');
    highlight.className = 'highlight';
    element.appendChild(highlight);
    element.hasHighlightElement = true;

    var spriteMapInfo = sprites[textName];
    var spriteInfo = spriteMapInfo.sprites[i];

    if (!spriteInfo) {
      console.warn('No sprite info for ' + textName + ' sprite nr. ' + i);
    }
    else {
      highlight.style.backgroundImage = 'url("images/highlights/' + textName + '.png")';
      highlight.style.backgroundSize = spriteMapInfo.totalWidth + 'px ' + spriteMapInfo.totalHeight + 'px';
      highlight.style.backgroundPositionX = -(spriteInfo.x) + 'px';
      highlight.style.width = spriteInfo.width + 'px';
      highlight.style.height = spriteInfo.height + 'px';
      highlight.style.marginLeft = - Math.round(spriteInfo.width / 2 - spriteInfo.offsetX) + 'px';
      highlight.style.marginTop = - Math.round(spriteInfo.height / 2 - spriteInfo.offsetY) + 'px';
    }

  }

  if (length > 1) { // Not the first element, so we want to set the previous end time to this start time
    var prevPhrase = phrases[length - 2];
    if (time != prevPhrase.start && time > prevPhrase.start) { // But only if they don't start at the same time
      prevPhrase.end = Math.min(prevPhrase.end, time);
    }
  }
}

parseTimeForElements(document.querySelectorAll('.block__lyrics span[data-time]'), 'verse1');
parseTimeForElements(document.querySelectorAll('.block__lyrics--second-verse span[data-time]'), 'verse2');
var chorusElements = document.querySelectorAll('.block__lyrics--chorus span[data-time]');
parseTimeForElements(chorusElements, 'chorus', 0);
// Adding the same lyrics for the two other choruses
parseTimeForElements(chorusElements, 'chorus', t(71.72));
parseTimeForElements(chorusElements, 'chorus', t(89.6));

function highlightPhrase(time) {
  for (var ii = 0, phrase; phrase = phrases[ii]; ii++) {
    if (phrase.start < time && phrase.end > time) {
      !function(phrase) {
        phrase.element.classList.add('highlighted');
        setTimeout(function () {
          phrase.element.classList.remove('highlighted');
        }, 3000);
      }(phrase);
      if (phrase.heart && !phrase.heart.classList.contains('beat')) {
        !function (heart) {
          heart.classList.add('beat');
          setTimeout(function () {
            heart.classList.remove('beat')
          }, 4000);
        }(phrase.heart);
      }
    }
  }
}

function shakeOnTime(time) {
  for (var i = 0; i < shakeTimes.length; i++) {
    var shakeTime = shakeTimes[i];
    if (time > shakeTime && time < shakeTime + 0.5) {
      shake();
    }
  }
}

var shakeTimes = [t(10.52), t(127.04)], lastShake = 0;
var introElement = document.querySelector('.intro');
function shake() {
  if (new Date().getTime() < lastShake + 1000) return;

  lastShake = new Date().getTime();
  var _shake = function (strength, reset) {
    var x, y, opacity;
    if (reset) {
      x = 0;
      y = 0;
      opacity = 1;
    }
    else {
      var xVariance = strength * 4, yVariance = strength * 25;
      x = xVariance / 2 - Math.random() * xVariance;
      y = yVariance / 2 - Math.random() * yVariance;
      opacity = Math.random() * 0.5 + 0.5;
    }
    introElement.style.transform = 'translate(' + x + 'px, ' + y + 'px)';
    introElement.style.opacity = opacity;
  };
  var delay = 30, steps = 15;
  for (var i = 0; i < steps; i++) {
    (function (i) {
      setTimeout(function () {
        _shake((steps - i) / steps)
      }, i * delay);
    })(i);
  }
  setTimeout(function () {
    _shake(0, true);
  }, i * delay);
}


// Setup the Youtube Player

// 2. This code loads the IFrame Player API code asynchronously.
var tag = document.createElement('script');

tag.src = "https://www.youtube.com/iframe_api";
var firstScriptTag = document.getElementsByTagName('script')[0];
firstScriptTag.parentNode.insertBefore(tag, firstScriptTag);

// 3. This function creates an <iframe> (and YouTube player)
//    after the API code downloads.
var player;

var isPlaying = false;

function onYouTubeIframeAPIReady() {
  player = new YT.Player('player', {
    height: '720',
    width: '1280',
    //videoId: 'wDpgJB0iSz0',
    //videoId: 'ph1C-dtR8aM',
    videoId: 'sFBFkZYGgcE',
    playerVars: {
      modestbranding: 1,
      showinfo: 0,
      controls: 0,
      rel: 0
    },
    events: {
      'onReady': onPlayerReady,
      'onStateChange': onPlayerStateChange
    }
  });
}

// 4. The API will call this function when the video player is ready.
function onPlayerReady(event) {
  totalDuration = event.target.getDuration();
  if (typeof window.orientation === 'undefined') {
    // Only autoplay on desktops
    event.target.playVideo();
  }
}

// 5. The API calls this function when the player's state changes.
function onPlayerStateChange(event) {
  if (event.data == YT.PlayerState.PLAYING) {
    isPlaying = true;
    document.body.classList.remove('player-paused');
    startFollowingTime();
  }
  else if (event.data == YT.PlayerState.PAUSED || event.data == YT.PlayerState.ENDED) {
    isPlaying = false;
    document.body.classList.add('player-paused');
    stopFollowingTime();
  }
}

var intervalId, intervalDelay = 25;


function startFollowingTime() {
  if (!intervalId) {
    document.body.classList.add('video-loaded');
    intervalId = setInterval(_updateTime, intervalDelay);
  }
}

// All in seconds
var lastCurrentTime = -1, exactTime, totalDuration = 0;

function _updateTime() {
  var currentTime = player.getCurrentTime();
  if (currentTime != lastCurrentTime) {
    lastCurrentTime = exactTime = currentTime;
  }
  else {
    exactTime += intervalDelay / 1000;
  }
  highlightPhrase(exactTime);
  shakeOnTime(exactTime);
  handleEvent(exactTime);
  updateProgress(exactTime);
}

function stopFollowingTime() {
  clearInterval(intervalId);
  intervalId = null;
}


document.querySelector('.player__mouse-capture').addEventListener('click', function() {
  if (isPlaying) {
    player.pauseVideo();
  }
  else {
    player.playVideo();
  }
});

var playerControls = document.querySelector('.player-controls');
var playerControlsProgress = playerControls.querySelector('.player-controls__progress');
var playerControlsCursorFollow = playerControls.querySelector('.player-controls__cursor-follow');
function updateProgress(time) {
  var percentage = 100 * time / totalDuration;
  playerControlsProgress.style.width = percentage + '%';
}
document.querySelector('.player-controls__click-area').addEventListener('click', function(event) {
  var offset = getMouseOffset(event);
  var seekTime = totalDuration * offset / playerControls.clientWidth;
  player.seekTo(seekTime);
  updateProgress(seekTime);
  player.playVideo();
});
document.querySelector('.player-controls__click-area').addEventListener('mousemove', function(event) {
  var offset = getMouseOffset(event);
  playerControlsCursorFollow.style.width = offset + 'px';
});

function getMouseOffset(event) {
  var rect = event.target.getBoundingClientRect();
  return event.pageX - rect.left;
}