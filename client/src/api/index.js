import axios from 'axios';

const API_URL = 'https://datatubeapi.kevinmanssat.fr';

const config = {
  headers: {
    Accept: 'application/ld+json',
    'Cache-Control': 'no-transform',
  },
};

const api = {
  fetchVideosDurations(regionId, videoCategoryId, range) {
    return axios.get(
      `${API_URL}/videos?regionId=${regionId}&videoCategoryId=${videoCategoryId}&range=${range}&filters[]=duration&filters[]=title`,
      config,
    );
  },

  fetchVideosLikes(regionId, videoCategoryId, range) {
    return axios.get(
      `${API_URL}/videos?regionId=${regionId}&videoCategoryId=${videoCategoryId}&range=${range}&filters[]=likeCount&filters[]=dislikeCount`,
      config,
    );
  },

  fetchYoutubers(regionId, videoCategoryId, range) {
    return axios.get(`${API_URL}/channels`, config);
  },
};

export { api };
