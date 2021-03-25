const YT_API = process.env.REACT_APP_YT_API;
const YT_API_KEY = process.env.REACT_APP_YT_API_KEY;

if (!YT_API || !YT_API_KEY) throw new Error('Missing config');

export const youtube = {
  api: YT_API,
  apiKey: YT_API_KEY,
  maxResults: 24,
};
