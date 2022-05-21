import moment from 'moment';

export const formatPairTime = time => moment(time, 'HH:mm:ss').format('HH:mm');

export const getCurrentPairDate = () =>
  moment(undefined, undefined, 'ru').format('D MMMM, dddd');
