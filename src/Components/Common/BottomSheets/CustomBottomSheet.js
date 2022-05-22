import React from 'react';
import BottomSheet from 'reanimated-bottom-sheet';
import {DefaultBottomSheetStyles} from '../../../Styles/Sheets';
import {View} from 'react-native';
import {useThemes} from '../../../Providers/ThemeProvider';

export const CustomBottomSheet = React.forwardRef(
  ({children, snapPoints}, ref) => {
    const {theme} = useThemes();

    return (
      <BottomSheet
        initialSnap={2}
        enabledInnerScrolling={true}
        ref={ref}
        snapPoints={snapPoints}
        borderRadius={20}
        renderContent={() => (
          <View
            style={[
              DefaultBottomSheetStyles.container,
              {backgroundColor: theme.listItem, borderColor: theme.background},
            ]}>
            <View
              style={[
                DefaultBottomSheetStyles.tip,
                {backgroundColor: theme.text},
              ]}
            />
            {children}
          </View>
        )}
      />
    );
  },
);
