import keyMirror from 'keymirror';

module.exports = {
  Config: keyMirror({
    getConfig: null,
    getProfile: null,
    getRootFolder: null,
    getSystemStatus: null,
  }),
  Series: keyMirror({
    getSeries: null,
    getEpisodes: null,
    getEpisodesFiles: null,
    downloadEpisode: null,
    resetEspisodes: null,
    addSerie: null,
    deleteEpisodeFromFile: null,
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
    searchReleases: null,
    downloadRelease: null,
  }),
};
