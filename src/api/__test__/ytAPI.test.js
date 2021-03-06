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

  const ytFunctionsTestHelper = [
    {
      searchBy: 'query',
      fn: ytAPI.searchQuery,
      urlParam: 'q',
    },
    {
      searchBy: 'relatedToVideoId',
      fn: ytAPI.searchRelated,
      urlParam: 'relatedToVideoId',
    },
  ];

  ytFunctionsTestHelper.forEach((helper) => {
    describe(`Search by ${helper.searchBy}`, () => {
      it('returns null if empty or undefined searchTerm', () => {
        expect(helper.fn({ searchTerm: undefined })).toBe(null);
        expect(helper.fn({ searchTerm: null })).toBe(null);
        expect(helper.fn({ searchTerm: '' })).toBe(null);
      });

      it('calls youtube api if searchTerm is not empty', () => {
        helper.fn({ searchTerm: 'testing' });

        expect(global.fetch).toHaveBeenCalledTimes(1);
        expect(global.fetch).toHaveBeenCalledWith(
          `<YOUTUBE_API>/search?key=<YOUTUBE_API_KEY>&part=snippet&type=video&videoEmbeddable=true&maxResults=24&${helper.urlParam}=testing`
        );
      });

      it('calls youtube api if searchTerm is not empty and has a page token', () => {
        helper.fn({ searchTerm: 'testing', pageToken: 'tokenTest' });

        expect(global.fetch).toHaveBeenCalledTimes(1);
        expect(global.fetch).toHaveBeenCalledWith(
          `<YOUTUBE_API>/search?key=<YOUTUBE_API_KEY>&part=snippet&type=video&videoEmbeddable=true&maxResults=24&${helper.urlParam}=testing&pageToken=tokenTest`
        );
      });

      it('throws error if unsuccessful response', () => {
        global.fetch = jest.fn().mockResolvedValue(failMock);

        expect(
          helper.fn({ searchTerm: 'testing', pageToken: 'tokenTest' })
        ).rejects.toThrow(
          new Error(
            `Error 403: An error ocurred while searching for [${helper.searchBy}: testing].`
          )
        );
      });
    });
  });

  describe('getVideoData', () => {
    it('returns null if the videId is not provided or undefined', () => {
      expect(ytAPI.getVideoData({ videoId: null })).toEqual(null);
      expect(ytAPI.getVideoData({ videoId: undefined })).toEqual(null);
      expect(ytAPI.getVideoData({ videoId: '' })).toEqual(null);
      expect(ytAPI.getVideoData({ videoId: 0 })).toEqual(null);
    });

    it('calls the api to search for the video data', () => {
      ytAPI.getVideoData({ videoId: 'testVideoId' });

      expect(global.fetch).toHaveBeenCalledTimes(1);
      expect(global.fetch).toHaveBeenCalledWith(
        '<YOUTUBE_API>/videos?key=<YOUTUBE_API_KEY>&part=snippet&id=testVideoId'
      );
    });

    it('throws the correct error if unsuccessful response', () => {
      global.fetch = jest.fn().mockResolvedValue(failMock);

      expect(ytAPI.getVideoData({ videoId: 'testVideoId' })).rejects.toThrow(
        new Error(
          `Error 403: An error ocurred while searching for [videoId: testVideoId].`
        )
      );
    });
  });
});
