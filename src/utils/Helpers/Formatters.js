import moment from 'moment';

export const formatPairTime = time => moment(time, 'HH:mm:ss').format('HH:mm');
