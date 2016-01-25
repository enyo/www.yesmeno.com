"use strict";

var phrases = [], allTimeElements = document.querySelectorAll('span[data-time]');

var introElement = document.querySelector('.intro'),
    blockElement = document.querySelector('.block');


/**
 * Makes sure any time shifts are accounted for
 */
function t(time) {
  return time + 0.9;
}

// The default state is without any class, so all events need to go back to this state at the end
var events = [
  {
    name: 'part1',
    time: t(27),
    endTime: t(73.4),
    in: function () {
      introElement.classList.add('lyrics-visible');
    },
    out: function () {
      introElement.classList.remove('lyrics-visible');
    }
  },
  {
    name: 'part2',
    time: t(90),
    endTime: t(170),
    in: function () {
      introElement.classList.add('lyrics-visible');
    },
    out: function () {
      introElement.classList.remove('lyrics-visible');
    }
  },
  {
    // Removing the blackout class whenever there is no blackout
    name: 'blackOutBefore',
    time: 0,
    endTime: t(73.27),
    in: function () {
      introElement.classList.remove('blackout');
    }
  },
  {
    // Removing the blackout class whenever there is no blackout
    name: 'blackOutAfter',
    time: t(80),
    endTime: 1000,
    in: function () {
      introElement.classList.remove('blackout');
    }
  },
  {
    // Adding the blackout class.
    // Since the blackout takes some time to execute, and removing the class creates a visible
    // jitter, and we don't want the window of when to trigger the blackout to be too big, I don't remove
    // it here, but remove it a lot later with blackOutAfter (or Before).
    name: 'blackOut',
    time: t(73.28),
    endTime: t(75),
    in: function () {
      introElement.classList.add('blackout');
    }
  },
  {
    name: 'verse2',
    time: t(73.4),
    endTime: 1000,
    in: function () {
      blockElement.classList.add('second-verse');
    },
    out: function () {
      blockElement.classList.remove('second-verse');
    }
  },
  {
    name: 'disappear',
    time: t(163),
    endTime: 1000,
    in: function () {
      introElement.classList.add('lyrics-invisible');
      introElement.classList.remove('lyrics-visible');
    },
    out: function (time) {
      introElement.classList.remove('lyrics-invisible');
      introElement.classList.add('lyrics-visible')
    }
  },
  {
    name: 'shake1',
    time: t(10.52),
    endTime: t(11.02),
    in: shake
  },
  {
    name: 'shake2',
    time: t(127.04),
    endTime: t(127.54),
    in: shake
  }
];

function handleEvent(time) {
  var i, event, exitingEvents = [], currentEvents = [];

  for (i = 0; i < events.length; i++) {
    event = events[i];

    if (event.time < time && event.endTime > time) {
      currentEvents.push(event);
    }
    else if (event.active) {
      exitingEvents.push(event);
    }
  }

  // First do all exiting events
  for (i = 0; i < exitingEvents.length; i++) {
    event = exitingEvents[i];
    event.active = false;
    if (event.out) {
      console.log('Exiting ' + event.name);
      event.out();
    }
  }

  // Then enter the events
  for (i = 0; i < currentEvents.length; i++) {
    event = currentEvents[i];
    if (!event.active) {
      event.active = true;
      if (event.in) {
        console.log('Entering ' + event.name);
        event.in(time);
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
      highlight.style.backgroundPosition = -(spriteInfo.x) + 'px 0';
      highlight.style.width = spriteInfo.width + 'px';
      highlight.style.height = spriteInfo.height + 'px';
      highlight.style.marginLeft = -Math.round(spriteInfo.width / 2 - spriteInfo.offsetX) + 'px';
      highlight.style.marginTop = -Math.round(spriteInfo.height / 2 - spriteInfo.offsetY) + 'px';
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
parseTimeForElements(chorusElements, 'chorus', 71.72);
parseTimeForElements(chorusElements, 'chorus', 89.6);

function highlightPhrase(time) {
  for (var ii = 0, phrase; phrase = phrases[ii]; ii++) {
    if (phrase.start < time && phrase.end > time) {
      !function (phrase) {
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

function shake() {
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
    setTimeout(function () {
      document.body.classList.add('video-loaded');
    }, 1000);
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
  handleEvent(exactTime);
  updateProgress(exactTime);
}

function stopFollowingTime() {
  clearInterval(intervalId);
  intervalId = null;
}


document.querySelector('.player__mouse-capture').addEventListener('click', function () {
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
document.querySelector('.player-controls__click-area').addEventListener('click', function (event) {
  var offset = getMouseOffset(event);
  var seekTime = totalDuration * offset / playerControls.clientWidth;
  player.seekTo(seekTime);
  updateProgress(seekTime);
  player.playVideo();
});
document.querySelector('.player-controls__click-area').addEventListener('mousemove', function (event) {
  var offset = getMouseOffset(event);
  playerControlsCursorFollow.style.width = offset + 'px';
});

function getMouseOffset(event) {
  var rect = event.target.getBoundingClientRect();
  return event.pageX - rect.left;
}