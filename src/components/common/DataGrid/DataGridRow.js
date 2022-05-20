import React, {useCallback} from 'react';
import {View} from 'react-native';
import {CustomText} from '../CustomText';
import {comp, DataGridStyles} from '../../../Styles/Blocks';
import {useThemes} from '../../../Providers/ThemeProvider';

const DataGidCell = value => (
  <CustomText style={comp.smallText}>{value}</CustomText>
);

export const DataGridRow = ({item, columns}) => {
  const {theme} = useThemes();

  const getValue = useCallback(
    col =>
      col?.valueGetter ? col?.valueGetter(item[col.field]) : item[col.field],
    [],
  );
  const getCell = useCallback(col => col?.renderCell || DataGidCell, []);

  return (
    <View style={[DataGridStyles.rowContainer, {borderColor: theme.disabled}]}>
      {columns?.map((col, index) => (
        <View
          key={index}
          style={[
            DataGridStyles.rowWrapper,
            {width: col?.width, flex: col?.flex},
          ]}>
          {getCell(col)(getValue(col))}
        </View>
      ))}
    </View>
  );
};
