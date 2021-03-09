import ytAPI from '../ytAPI';

describe('Youtube API', () => {
  const successMock = {
    ok: true,
    status: 200,
    json: jest.fn().mockResolvedValue({ data: 'success' }),
  };

  const failMock = {
    ok: false,
    status: 403,
  };

  beforeEach(() => {
    global.fetch = jest.fn().mockResolvedValue(successMock);
  });

  afterEach(() => {
    global.fetch.mockRestore();
  });

  describe('Search by query', () => {
    it('returns null if empty or undefined query', () => {
      expect(ytAPI.searchQuery({ searchTerm: undefined })).toBe(null);
      expect(ytAPI.searchQuery({ searchTerm: null })).toBe(null);
      expect(ytAPI.searchQuery({ searchTerm: '' })).toBe(null);
    });

    it('calls youtube api if query is not empty', () => {
      ytAPI.searchQuery({ searchTerm: 'testing' });

      expect(global.fetch).toHaveBeenCalledTimes(1);
      expect(global.fetch).toHaveBeenCalledWith(
        '<YOUTUBE_API>/search?key=<YOUTUBE_API_KEY>&part=snippet&type=video&videoEmbeddable=true&maxResults=24&q=testing'
      );
    });

    it('calls youtube api if query is not empty and has a page token', () => {
      ytAPI.searchQuery({ searchTerm: 'testing', pageToken: 'tokenTest' });

      expect(global.fetch).toHaveBeenCalledTimes(1);
      expect(global.fetch).toHaveBeenCalledWith(
        '<YOUTUBE_API>/search?key=<YOUTUBE_API_KEY>&part=snippet&type=video&videoEmbeddable=true&maxResults=24&q=testing&pageToken=tokenTest'
      );
    });

    it('throws error if unsuccessful response', () => {
      global.fetch = jest.fn().mockResolvedValue(failMock);

      expect(
        ytAPI.searchQuery({ searchTerm: 'testing', pageToken: 'tokenTest' })
      ).rejects.toThrow(
        new Error('Error 403: An error ocurred while searching for [query: testing].')
      );
    });
  });

  describe('Search by related videos', () => {
    it('returns null if empty or undefined related video', () => {
      expect(ytAPI.searchRelated({ searchTerm: undefined })).toBe(null);
      expect(ytAPI.searchRelated({ searchTerm: null })).toBe(null);
      expect(ytAPI.searchRelated({ searchTerm: '' })).toBe(null);
    });

    it('calls youtube api if related video is not empty', () => {
      ytAPI.searchRelated({ searchTerm: 'testing' });

      expect(global.fetch).toHaveBeenCalledTimes(1);
      expect(global.fetch).toHaveBeenCalledWith(
        '<YOUTUBE_API>/search?key=<YOUTUBE_API_KEY>&part=snippet&type=video&videoEmbeddable=true&maxResults=24&relatedToVideoId=testing'
      );
    });

    it('calls youtube api if related video is not empty and has a page token', () => {
      ytAPI.searchRelated({ searchTerm: 'testing', pageToken: 'tokenTest' });

      expect(global.fetch).toHaveBeenCalledTimes(1);
      expect(global.fetch).toHaveBeenCalledWith(
        '<YOUTUBE_API>/search?key=<YOUTUBE_API_KEY>&part=snippet&type=video&videoEmbeddable=true&maxResults=24&relatedToVideoId=testing&pageToken=tokenTest'
      );
    });

    it('throws error if unsuccessful response', () => {
      global.fetch = jest.fn().mockResolvedValue(failMock);

      expect(
        ytAPI.searchRelated({ searchTerm: 'testing', pageToken: 'tokenTest' })
      ).rejects.toThrow(
        new Error(
          'Error 403: An error ocurred while searching for [relatedToVideoId: testing].'
        )
      );
    });
  });
});
