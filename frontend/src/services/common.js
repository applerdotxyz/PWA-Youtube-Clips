import moment from 'moment';

const formatTime = (time, format) => {
  // return time; // @todo : complete formatting filte
  if (format === 'date') {
    return moment(time).format('MMM Do YYYY');
  }

  return moment(time).format(format);
};

export { formatTime };
