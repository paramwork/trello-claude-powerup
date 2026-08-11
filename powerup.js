/* global TrelloPowerUp */
(function () {
  'use strict';
  const launchURL = 'https://paramwork.github.io/trello-claude-powerup/launch.html?v=mac-target-blank-3';
  window.TrelloPowerUp.initialize({
    'card-buttons': function (t) {
      return [{
        icon: { url: './icon.svg' },
        text: '✦ Work with Claude',
        callback: function (t) {
          return t.popup({ title: 'Work with Claude', url: launchURL, height: 220 });
        }
      }];
    }
  });
}());
