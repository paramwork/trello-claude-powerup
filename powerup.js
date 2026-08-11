/* global TrelloPowerUp */
(function () {
  'use strict';
  const MAX_DESCRIPTION = 1800;
  const MAX_CHECKLIST = 1000;
  function text(value) { return typeof value === 'string' ? value : ''; }
  function clipped(value, max) { const string = text(value); return string.length > max ? `${string.slice(0, max - 1)}…` : string; }
  function query(values) { return new URLSearchParams(Object.entries(values).filter(([, value]) => value !== undefined && value !== null && value !== '')).toString(); }
  window.TrelloPowerUp.initialize({
    'card-buttons': function (t) {
      return [{
        icon: { url: './icon.svg' }, text: '✦ Work with Claude',
        callback: async function () {
          const [card, board, list] = await Promise.all([
            t.card('id', 'name', 'desc', 'url', 'shortLink', 'due', 'labels', 'checklists'),
            t.board('id', 'name', 'url', 'shortLink'), t.list('id', 'name')
          ]);
          const checklist = (card.checklists || []).flatMap((item) => (item.checkItems || []).map((checkItem) => checkItem.name)).join('\n');
          const payload = query({
            v: '1', cardId: card.id, cardUrl: card.url, shortLink: card.shortLink, title: card.name,
            boardId: board.id, boardName: board.name, listId: list.id, listName: list.name,
            desc: clipped(card.desc, MAX_DESCRIPTION), labels: (card.labels || []).map((label) => label.name).filter(Boolean).join(', '),
            due: card.due || '', checklist: clipped(checklist, MAX_CHECKLIST)
          });
          return t.popup({ title: 'Work with Claude', url: `./launch.html?handoff=2&${payload}`, height: 220 });
        }
      }];
    }
  });
}());
