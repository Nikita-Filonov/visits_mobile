import moment from 'moment';
import {isDateTimeValid} from './Validators';

export const formatPairTime = time => moment(time, 'HH:mm:ss').format('HH:mm');

export const getCurrentPairDate = () =>
  moment(undefined, undefined, 'ru').format('D MMMM, dddd');

export const formatVisitTime = time =>
  moment(time, undefined, 'ru').format('D MMMM YYYY, HH:mm, dddd');

export const formatToApiAcceptableTime = time => {
  if (typeof time === 'string') {
    return moment(time, 'HH:mm:ss').format('HH:mm:ss');
  }

  return time ? moment(time).format('HH:mm:ss') : null;
};
