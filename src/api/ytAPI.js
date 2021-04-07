import { youtube } from 'config';

const BASE_SEARCH = `/search?key=${youtube.apiKey}&part=snippet&type=video&videoEmbeddable=true&maxResults=${youtube.maxResults}`;

async function fetchFromYoutube({ resourceUrl, searchTerm }) {
  const response = await fetch(`${youtube.api}${resourceUrl}`);

  if (response.ok && response.status === 200) {
    const data = await response.json();
    return data;
  }

  throw new Error(
    `Error ${response.status || ''}: An error ocurred while searching for [${
      searchTerm.type
    }: ${searchTerm.value}].`
  );
}

function searchQuery({ searchTerm, pageToken }) {
  if (!searchTerm) return null;

  let resourceUrl = `${BASE_SEARCH}&q=${searchTerm}`;

  if (pageToken) {
    resourceUrl += `&pageToken=${pageToken}`;
  }

  return fetchFromYoutube({
    resourceUrl,
    searchTerm: {
      type: 'query',
      value: searchTerm,
    },
  });
}

function searchRelated({ searchTerm, pageToken }) {
  if (!searchTerm) return null;

  let resourceUrl = `${BASE_SEARCH}&relatedToVideoId=${searchTerm}`;

  if (pageToken) {
    resourceUrl += `&pageToken=${pageToken}`;
  }

  return fetchFromYoutube({
    resourceUrl,
    searchTerm: {
      type: 'relatedToVideoId',
      value: searchTerm,
    },
  });
}

function getVideoData({ videoId }) {
  if (!videoId) return null;

  const resourceUrl = `/videos?key=${youtube.apiKey}&part=snippet&id=${videoId}`;

  return fetchFromYoutube({
    resourceUrl,
    searchTerm: {
      type: 'videoId',
      value: videoId,
    },
  });
}

export default { searchQuery, searchRelated, getVideoData };
