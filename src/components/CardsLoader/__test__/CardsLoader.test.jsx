import React from 'react';
import { fireEvent, render } from 'testing-utils';
import CardsLoader from '../CardsLoader.component';

const mockHistory = {
  push: jest.fn(),
};

jest.mock('react-router-dom', () => ({
  useHistory: () => mockHistory,
}));

function generateVideoMocks({ size, fromApi = true, setSnippet = true }) {
  const videos = [];
  for (let i = 1; i <= size; i += 1) {
    let id = `videoId${i}`;

    if (fromApi) {
      id = {
        videoId: `videoId${i}`,
      };
    }

    let snippet;

    if (setSnippet) {
      snippet = {
        thumbnails: {
          medium: {
            url: `test_thumbnail_${i}`,
          },
        },
        title: `Test title ${i}`,
        description: `Description ${i}`,
      };
    }

    videos.push({
      snippet,
      id,
    });
  }
  return videos;
}

describe('CardsLoader component', () => {
  beforeEach(() => {
    mockHistory.push.mockClear();
  });

  it('renders correctly', () => {
    const videosMock = generateVideoMocks({ size: 3 });
    const { getAllByTestId } = render(<CardsLoader videos={videosMock} />);

    expect(getAllByTestId('card-container')).toHaveLength(3);
  });

  it('renders only the videos with snippet property', () => {
    const videosMock = [
      ...generateVideoMocks({ size: 4, fromApi: false }),
      ...generateVideoMocks({ size: 2, setSnippet: false }),
    ];

    const { getAllByTestId } = render(<CardsLoader videos={videosMock} />);

    expect(getAllByTestId('card-container')).toHaveLength(4);
  });

  it('sends the user to watch the video on click', () => {
    const videosMock = generateVideoMocks({ size: 1 });

    const { getByTestId } = render(<CardsLoader videos={videosMock} />);

    const cardContainer = getByTestId('card-container');

    fireEvent.click(cardContainer);

    expect(mockHistory.push).toHaveBeenCalledTimes(1);
    expect(mockHistory.push).toHaveBeenCalledWith('/watch/videoId1');
  });
});
