import React from 'react';
import {IsIncluded} from './IsIncluded';
import {useTranslation} from 'react-i18next';

export const PremiumAccessesColumns = () => {
  const {t} = useTranslation();

  const PREMIUM_ACCESS_COLUMNS = [
    {
      field: 'action',
      headerName: t('profile.premiumAccesses.grid.action'),
      flex: 1,
      valueGetter: (params) => t(`premiums.accesses.scopes.${params}`),
    },
    {
      field: 'actual',
      headerName: t('profile.premiumAccesses.grid.actual'),
      width: 80,
      valueGetter: (params) => params ? params : '---',
    },
    {
      field: 'limit',
      headerName: t('profile.premiumAccesses.grid.limit'),
      width: 70,
      valueGetter: (params) => params ? params : '---',
    },
    {
      field: 'active',
      headerName: t('profile.premiumAccesses.grid.active'),
      width: 80,
      renderCell: (params) => <IsIncluded included={params}/>,
    },
  ];
  return {PREMIUM_ACCESS_COLUMNS};
};
