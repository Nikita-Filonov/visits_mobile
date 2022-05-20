import React, {useEffect, useMemo, useState} from 'react';
import {Image, ScrollView, TouchableOpacity} from 'react-native';
import {comp} from '../../../styles/Blocks';
import {GCStyles} from '../../../styles/Screens';
import {useGroups} from '../../../providers/groups/GroupsProvider';
import {connect} from 'react-redux';
import {ConfirmLayout} from '../../../components/layouts/ConfirmLayout';
import {useTranslation} from 'react-i18next';
import {CustomButton} from '../../../components/common/CustomButton';
import {TextField} from '../../../components/common/inputs/TextField';
import {useAlerts} from '../../../providers/AlertsProvider';
import {useGroupPermissions} from '../../../providers/groups/GroupPermissionsProvider';
import {Icon} from 'react-native-elements';
import {Appbar, TextInput} from 'react-native-paper';
import {GROUP} from '../../../utils/permissions/Groups';
import SelectGroupCreatorModal from '../../../components/modals/groups/settings/SelectGroupCreatorModal';
import {useThemes} from '../../../providers/ThemeProvider';
import SelectGroupImageModal from '../../../components/modals/groups/settings/SelectGroupImageModal';

const GroupSettingsGeneral = ({navigation, group}) => {
  const {t} = useTranslation();
  const {theme} = useThemes();
  const {setConfirmModal} = useAlerts();
  const {isAllowed} = useGroupPermissions();
  const {request, updateGroup, deleteGroup} = useGroups();
  const [selectImageModal, setSelectImageModal] = useState(false);
  const [groupCreatorModal, setGroupCreatorModal] = useState(false);
  const [title, setTitle] = useState(group.title);
  const [description, setDescription] = useState(group.description);
  const [image, setImage] = useState(group.image);
  const [creator, setCreator] = useState(group.creator);

  useEffect(() => {
    setTitle(group.title);
    setImage(group.image);
    setCreator(group.creator);
  }, [group]);

  const disabled = useMemo(() => {
    if (title !== group?.title) {
      return false;
    }
    if (image !== group?.image) {
      return false;
    }

    if (description !== group?.description) {
      return false;
    }

    return creator?.id === group?.creator?.id;

  }, [title, image, description, creator]);

  const onSave = async () => await updateGroup(group.id, {title, image, description, creator: creator?.id});
  const onCreator = () => setGroupCreatorModal(true);
  const onImage = () => setSelectImageModal(true);
  const onDelete = () => {
    setConfirmModal({
      action: async () => {
        navigation.navigate('Groups');
        await deleteGroup(group.id);
      },
      modal: true,
      content: {...t('groups.settings.common.deleteGroupModal'), confirmButton: t('common.delete')},
    });
  };

  return (
    <ConfirmLayout
      loading={request}
      onConfirm={onSave}
      title={t('groups.settings.sidebar.common')}
      disabled={disabled || !isAllowed([GROUP.update]) || !creator?.id}
      actions={[
        <Appbar.Action
          onPress={onDelete}
          animated={false}
          disabled={!isAllowed([GROUP.delete])}
          icon={() => <Icon name={'delete'} type={'material-community'} color={'#FFFFFF'}/>}
        />,
      ]}
    >
      <ScrollView>
        <Image source={{uri: image, cache: 'force-cache'}} style={GCStyles.image}/>
        <CustomButton
          color={'primary'}
          type={'clear'}
          title={t('groups.settings.common.changeIcon')}
          onPress={onImage}
          disabled={!isAllowed([GROUP.update])}
        />
        <TextField
          value={title}
          onChangeText={setTitle}
          style={comp.input}
          label={t('groups.tableHeader.title')}
        />
        <TextField
          value={description}
          onChangeText={setDescription}
          style={comp.input}
          multiline={true}
          label={t('groups.settings.common.description')}
        />
        <TouchableOpacity onPress={onCreator} disabled={!isAllowed([GROUP.update])}>
          <TextField
            value={creator?.username}
            style={comp.input}
            editable={false}
            label={t('groups.tableHeader.creator')}
            right={<TextInput.Icon name={'account-cog-outline'} color={theme.text}/>}
          />
        </TouchableOpacity>
      </ScrollView>
      <SelectGroupCreatorModal
        creator={creator}
        setCreator={setCreator}
        modal={groupCreatorModal}
        setModal={setGroupCreatorModal}
      />
      <SelectGroupImageModal
        modal={selectImageModal}
        setModal={setSelectImageModal}
        setImage={setImage}
      />
    </ConfirmLayout>
  );
};


const getState = (state) => ({
  group: state.groups.group,
});


export default connect(
  getState,
  null,
)(GroupSettingsGeneral);
