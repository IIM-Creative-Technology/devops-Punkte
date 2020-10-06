import axios from 'axios';

export const API_URL = process.env.NODE_ENV === 'production' ? '/api' : 'http://localhost:3000';

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
