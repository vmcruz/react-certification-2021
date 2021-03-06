import PropTypes from 'prop-types';

const validValues = ['sm', 'md', 'lg', 'xlg'];

const propTypes = PropTypes.shape({
  all: PropTypes.oneOf(validValues),
  vertical: PropTypes.oneOf(validValues),
  horizontal: PropTypes.oneOf(validValues),
  top: PropTypes.oneOf(validValues),
  bottom: PropTypes.oneOf(validValues),
  left: PropTypes.oneOf(validValues),
  right: PropTypes.oneOf(validValues),
});

const defaultProps = {
  all: null,
  vertical: null,
  horizontal: null,
  top: null,
  bottom: null,
  left: null,
  right: null,
};

export default { defaultProps, propTypes };
