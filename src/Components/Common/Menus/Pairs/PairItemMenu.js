import React, {useState} from 'react';
import {CustomMenu} from '../CustomMenu';
import {CustomMenuItem} from '../CustomMenuItem';
import {connect} from 'react-redux';
import {useThemes} from '../../../../Providers/ThemeProvider';

const PairItemMenu = () => {
  const [menu, setMenu] = useState(false);
  const {theme} = useThemes();

  const onClose = () => setMenu(false);

  const onSafeDrop = async () => {
    onClose();
  };

  return (
    <CustomMenu menu={menu} setMenu={setMenu} color={theme.text}>
      <CustomMenuItem
        onPress={onSafeDrop}
        title={'Изменить'}
        icon={'pencil-outline'}
      />
      <CustomMenuItem
        onPress={onSafeDrop}
        title={'Удалить'}
        color={theme.colors.error}
        icon={'delete-outline'}
      />
    </CustomMenu>
  );
};

export default connect(null, null)(PairItemMenu);
