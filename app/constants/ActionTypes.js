import keyMirror from 'keymirror';

module.exports = {
  Config: keyMirror({
    getConfig: null,
    getProfile: null,
  }),
  Series: keyMirror({
    getSeries: null,
    getEpisodes: null,
    downloadEpisode: null,
    resetEspisodes: null,
  }),
  Activity: keyMirror({
    getHistory: null,
    getQueue: null,
  }),
  Modal: keyMirror({
    showModal: null,
    hideModal: null,
  }),
  Search: keyMirror({
    lookup: null,
  }),
};
