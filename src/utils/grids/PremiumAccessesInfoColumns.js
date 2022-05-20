import React from 'react';
import {useTranslation} from 'react-i18next';
import {IsIncluded} from './IsIncluded';

export const PremiumAccessesInfoColumns = () => {
  const {t} = useTranslation();

  const PREMIUM_ACCESS_INFO_COLUMNS = [
    {
      field: 'action',
      headerName: t('profile.premiumAccesses.grid.action'),
      flex: 1,
      valueGetter: (params) => t(`premiums.accesses.scopes.${params}`),
    },
    {
      field: 'limit',
      headerName: t('premiums.info.grid.limit'),
      width: 120,
      renderCell: (params) => <IsIncluded included={params}/>,
    },
  ];
  return {PREMIUM_ACCESS_INFO_COLUMNS};
};
