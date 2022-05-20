import React from 'react';
import {USER_PREMIUM_STATUSES} from '../../../utils/Constants';
import {member} from '../../../Styles/Items';
import {Badge} from 'react-native-elements';

export const PremiumIsActive = ({status, isBefore}) => {
  const isActive =
    (status === USER_PREMIUM_STATUSES.ACTIVE ||
      status === USER_PREMIUM_STATUSES.WAITING_FOR_EXTEND) &&
    !isBefore;

  return (
    <Badge
      badgeStyle={{backgroundColor: isActive ? '#44b700' : '#BDBDBD'}}
      containerStyle={member.badge}
    />
  );
};
