/* global TrelloPowerUp */
(function () {
  'use strict';
  window.TrelloPowerUp.initialize({
    'card-buttons': function (t) {
      return [{
        icon: { url: './icon.svg' },
        text: '✦ Work with Claude',
        callback: function () {
          return t.popup({ title: 'Work with Claude', url: './launch.html', height: 220 });
        }
      }];
    }
  });
}());
