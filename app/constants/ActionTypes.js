import keyMirror from 'keymirror';

module.exports = {
  Config: keyMirror({
    getConfig: null,
  }),
  Series: keyMirror({
    getSeries: null,
    getEpisodes: null,
    downloadEpisode: null,
  }),
  History: keyMirror({
    getHistory: null,
  }),
};
