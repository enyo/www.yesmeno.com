void main() {
  print('Timespan between Chorus 1 + 2: ${(times[1].totalMilliseconds - times[0].totalMilliseconds) / 1000}');
  print('Timespan between Chorus 1 + 3: ${(times[2].totalMilliseconds - times[0].totalMilliseconds) / 1000}');

  times.forEach((time) {
    print('${time.name.padLeft(30, ' ')}: ${time.totalMilliseconds / 1000} ${time.details}');
  });
}


List<TWF> times = [
  new TWF('Chorus 1 / start', 0, 55, 08),
  new TWF('Chorus 2 / start', 2, 07, 01),
  new TWF('Chorus 2 / repeat', 2, 24, 23),
  // Don't change the order of the first 3

  new TWF('Intro Beat', 0, 10, 13),
  new TWF('Blackout', 1, 13, 07),


  new TWF('Verse 1', 0, 28, 11, 'There was something'),
  new TWF('Verse 1', 0, 30, 17, 'In the Flashlights'),
  new TWF('Verse 1', 0, 32, 19, 'and'),
  new TWF('Verse 1', 0, 32, 23, 'like'),
  new TWF('Verse 1', 0, 33, 05, 'a'),
  new TWF('Verse 1', 0, 33, 09, 'pack'),
  new TWF('Verse 1', 0, 33, 17, 'of'),
  new TWF('Verse 1', 0, 33, 23, 'vultures'),
  new TWF('Verse 1', 0, 35, 04, 'They circled through the night'),



  new TWF('Chorus', 0, 55, 08, 'I wanna be rich and then some'),
  new TWF('Chorus', 0, 57, 14, 'Smooth and loud'),
  new TWF('Chorus', 0, 59, 07, 'I wanna go'),
  new TWF('Chorus', 0, 59, 21, 'else'),
  new TWF('Chorus', 1, 00, 03, 'where'),
  new TWF('Chorus', 1, 00, 10, 'you'),
  new TWF('Chorus', 1, 00, 16, 'can'),
  new TWF('Chorus', 1, 01, 00, 'stay'),
  new TWF('Chorus', 1, 01, 07, 'and'),
  new TWF('Chorus', 1, 01, 15, 'hold'),
  new TWF('Chorus', 1, 01, 19, 'the'),
  new TWF('Chorus', 1, 01, 22, 'door'),

  new TWF('Chorus', 1, 03, 19, 'I wanna be'),
  new TWF('Chorus', 1, 04, 08, 'loved'),
  new TWF('Chorus', 1, 04, 17, 'and'),
  new TWF('Chorus', 1, 05, 02, 'cherished'),

  new TWF('Chorus', 1, 06, 13, 'like'),
  new TWF('Chorus', 1, 06, 21, 'your'),
  new TWF('Chorus', 1, 07, 01, 'favourite book'),

  new TWF('Chorus', 1, 08, 03, 'I'),
  new TWF('Chorus', 1, 08, 05, 'want'),
  new TWF('Chorus', 1, 08, 07, 'it'),
  new TWF('Chorus', 1, 08, 11, 'all'),
  new TWF('Chorus', 1, 08, 20, 'right here'),
  new TWF('Chorus', 1, 09, 09, 'right now'),
  new TWF('Chorus', 1, 09, 22, 'ah'),
  new TWF('Chorus', 1, 10, 04, 'ah'),
  new TWF('Chorus', 1, 10, 11, 'ah'),
  new TWF('Chorus', 1, 10, 20, 'aaah'),


  new TWF('Verse 2', 1, 31, 08, 'You want something'),
  new TWF('Verse 2', 1, 33, 14, 'Something special'),

  new TWF('Verse 2', 1, 35, 14, 'and'),
  new TWF('Verse 2', 1, 35, 19, 'like'),
  new TWF('Verse 2', 1, 36, 04, 'a pack'),
  new TWF('Verse 2', 1, 36, 19, 'of vultures'),

  new TWF('Verse 2', 1, 37, 27, 'you would have torn it down'),

  new TWF('Verse 2', 1, 39, 24, 'still'),
  new TWF('Verse 2', 1, 40, 06, 'they'),
  new TWF('Verse 2', 1, 40, 17, 'get'),
  new TWF('Verse 2', 1, 40, 23, 'it'),
  new TWF('Verse 2', 1, 41, 06, 'all'),

  new TWF('Verse 2', 1, 42, 12, 'their face up on'),
  new TWF('Verse 2', 1, 43, 04, 'the'),
  new TWF('Verse 2', 1, 43, 10, 'wall'),

  new TWF('Verse 2', 1, 44, 16, 'It should have been for me'),
  new TWF('Verse 2', 1, 46, 26, 'just remember that'),



];


class TWF {
  String name;
  String details;
  int minute;
  int second;
  int frame;
  TWF(this.name, this.minute, this.second, this.frame, [this.details = '']);

  int get totalMilliseconds {
    var timeMs = (minute * 60 + second) * 1000;
    timeMs += frame * 40;
    return timeMs;
  }
}