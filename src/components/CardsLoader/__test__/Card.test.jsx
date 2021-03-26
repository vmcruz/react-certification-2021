import React from 'react';
import { fireEvent, render } from 'testing-utils';
import Card from '../Card.component';

describe('Card component', () => {
  const props = {
    thumbnail: 'test_thumbnail',
    title: 'Test card',
    description: 'Short description',
    onClick: jest.fn(),
  };

  beforeEach(() => {
    props.onClick.mockClear();
  });

  it('renders correctly', () => {
    const { getByTestId } = render(<Card {...props} />);

    expect(getByTestId('card-container')).toBeInTheDocument();

    const cardThumbnail = getByTestId('card-thumbnail');
    const cardTitle = getByTestId('card-title');
    const cardDescription = getByTestId('card-description');

    expect(cardThumbnail).toBeInTheDocument();
    expect(cardThumbnail).toHaveStyle("background-image: url('test_thumbnail');");
    expect(cardTitle).toBeInTheDocument();
    expect(cardTitle.textContent).toEqual('Test card');
    expect(cardDescription).toBeInTheDocument();
    expect(cardDescription.textContent).toEqual('Short description');
  });

  it('triggers the click function when clicked', () => {
    const { getByTestId } = render(<Card {...props} />);

    const cardContainer = getByTestId('card-container');

    expect(props.onClick).toHaveBeenCalledTimes(0);

    fireEvent.click(cardContainer);

    expect(props.onClick).toHaveBeenCalledTimes(1);
  });

  it('extracts 170 characters if there is a long description', () => {
    const longDescriptionProps = {
      ...props,
      description:
        'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Pellentesque ac hendrerit nisl, quis pharetra nibh. Fusce ut viverra eros. Integer cursus blandit laoreet. Cras id scelerisque nulla.',
    };

    const { getByTestId } = render(<Card {...longDescriptionProps} />);
    const cardDescription = getByTestId('card-description');

    expect(cardDescription.textContent).toEqual(
      'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Pellentesque ac hendrerit nisl, quis pharetra nibh. Fusce ut viverra eros. Integer cursus blandit laoreet. Cras i ...'
    );
  });
});
