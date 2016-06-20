module.exports = {
  getAddOptions: (monitorId, seasons, searchMissing = false) => {
    const addOptions = {
      ignoreEpisodesWithFiles: false,
      ignoreEpisodesWithoutFiles: false,
      searchForMissingEpisodes: searchMissing,
    };
    let editedSeasons = seasons.map(s => s.set('monitored', true));
    switch (monitorId) {
      case 0:
        addOptions.ignoreEpisodesWithFiles = false;
        addOptions.ignoreEpisodesWithoutFiles = false;
        break;
      case 1:
        addOptions.ignoreEpisodesWithFiles = true;
        addOptions.ignoreEpisodesWithoutFiles = true;
        break;
      case 2:
        addOptions.ignoreEpisodesWithFiles = true;
        addOptions.ignoreEpisodesWithoutFiles = false;
        break;
      case 3:
        addOptions.ignoreEpisodesWithFiles = false;
        addOptions.ignoreEpisodesWithoutFiles = true;
        break;
      case 4:
        addOptions.ignoreEpisodesWithFiles = false;
        addOptions.ignoreEpisodesWithoutFiles = false;
        editedSeasons = seasons.set(0, seasons.get(0).set('monitored', true));
        break;
      case 5:
        addOptions.ignoreEpisodesWithFiles = false;
        addOptions.ignoreEpisodesWithoutFiles = false;
        editedSeasons = seasons.set(seasons.size - 1, seasons.get(seasons.size - 1).set('monitored', true));
        break;
      case 6:
        addOptions.ignoreEpisodesWithFiles = false;
        addOptions.ignoreEpisodesWithoutFiles = false;
        editedSeasons = seasons.map(s => s.set('monitored', false));
        break;
      default:

    }
    return {
      monitored: true,
      addOptions,
      seasons: editedSeasons.toJS(),
    };
  },
};
