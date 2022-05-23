import React, {useState} from 'react';
import {CustomMenu} from '../CustomMenu';
import {CustomMenuItem} from '../CustomMenuItem';
import {connect} from 'react-redux';
import {useThemes} from '../../../../Providers/ThemeProvider';
import {useAlerts} from '../../../../Providers/AlertsProvider';
import {usePairs} from '../../../../Providers/Pairs/PairsProvider';
import {setPair} from '../../../../Redux/Pairs/pairsActions';
import {navigate} from '../../../Navigation/RootNavigation';

const PairItemMenu = ({pair, setPairStore}) => {
  const [menu, setMenu] = useState(false);
  const {theme} = useThemes();
  const {setConfirmModal} = useAlerts();
  const {deletePair} = usePairs();

  const onClose = () => setMenu(false);

  const onEdit = async () => {
    onClose();
    setPairStore({...pair, editMode: true});
    navigate('CreatePair');
  };

  const onDelete = async () => {
    onClose();
    setConfirmModal({
      action: async () => await deletePair(pair.id),
      modal: true,
      content: {
        title: 'Удалить пару',
        description:
          'Вы действительно хотите удалить пару? Отменить это действие будет невозможно',
        confirmButton: 'Удалить',
      },
    });
  };

  return (
    <CustomMenu menu={menu} setMenu={setMenu} color={theme.text}>
      <CustomMenuItem onPress={onEdit} title={'Изменить'} />
      <CustomMenuItem
        onPress={onDelete}
        title={'Удалить'}
        color={theme.colors.error}
      />
    </CustomMenu>
  );
};

export default connect(null, {setPairStore: setPair})(PairItemMenu);
