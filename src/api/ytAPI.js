import { youtube } from 'config';

async function search({ query, relatedToVideoId, pageToken }) {
  let endpoint = `/search?key=${youtube.apiKey}&part=snippet&type=video&videoEmbeddable=true&maxResults=${youtube.maxResults}`;

  if (query) {
    endpoint += `&q=${query}`;
  } else if (relatedToVideoId) {
    endpoint += `&relatedToVideoId=${relatedToVideoId}`;
  }

  if (pageToken) {
    endpoint += `&pageToken=${pageToken}`;
  }

  const response = await fetch(`${youtube.api}${endpoint}`);

  if (response.ok && response.status === 200) {
    const data = await response.json();
    return data;
  }

  throw new Error(
    `Error ${response.status}: An error ocurred while searching for <${query}>.`
  );
}

export default { search };
