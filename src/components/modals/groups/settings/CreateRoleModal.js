import React, {useCallback, useMemo} from 'react';
import {FullScreenModalConfirmLayout} from '../../../layouts/FullScreenModalConfirmLayout';
import {ScrollView, SectionList} from 'react-native';
import {comp} from '../../../../styles/Blocks';
import {TextField} from '../../../common/inputs/TextField';
import {FullScreenModal} from '../../../common/modals/FullScreenModal';
import {connect} from 'react-redux';
import {setCreateRoleModal, setRole} from '../../../../redux/Groups/groupsActions';
import {useGroups} from '../../../../providers/groups/GroupsProvider';
import {GROUPS_INITIAL_STATE} from '../../../../redux/Groups/initialState';
import {useTranslation} from 'react-i18next';
import {CustomText} from '../../../common/CustomText';
import {AlertMessage} from '../../../common/AlertMessage';
import {ListSeparator} from '../../../common/ListSeparator';
import {GROUP_SCOPES} from '../../../../utils/Constants';
import RolePermission from '../../../items/groups/settings/RolePermission';
import {RoleSectionHeader} from '../../../blocks/groups/settings/RoleSectionHeader';


const CreateRoleModal = ({group, role, setRole, createRoleModal, setCreateRoleModal}) => {
  const {t} = useTranslation();
  const {request, createRole, updateRole} = useGroups();

  const onClose = () => {
    setCreateRoleModal(false);
    setRole(GROUPS_INITIAL_STATE.role);
  };
  const keyExtractor = useCallback((item, index) => item + index, []);
  const onSelectScope = useCallback(async (isSelected, permission) => isSelected
    ? setRole({...role, scope: role.scope.filter(p => p !== permission)})
    : setRole({...role, scope: [...role.scope, permission]}),
    [role],
  );
  const onCreate = useCallback(async () => role?.editMode
    ? updateRole(group.id, role.id, role).then(() => onClose())
    : createRole(group.id, role).then(() => onClose()),
    [role],
  );
  const disabled = useMemo(() => role?.name?.length === 0, [role?.name]);

  return (
    <FullScreenModal modal={createRoleModal} onClose={onClose}>
      <FullScreenModalConfirmLayout
        loading={request}
        onClose={onClose}
        disabled={disabled}
        onConfirm={onCreate}
        title={t(`groups.settings.roles.createRoleModal.${role.editMode ? 'editTitle' : 'createTitle'}`)}
      >
        <ScrollView>
          {!role.editMode && <CustomText>
            {t('groups.settings.roles.createRoleModal.description')}
          </CustomText>}
          <AlertMessage level="warning" style={comp.input} message={t('groups.settings.roles.createRoleModal.alert')}/>
          <TextField
            style={comp.input}
            value={role?.name}
            onChangeText={name => setRole({...role, name})}
            label={t('groups.settings.roles.createRoleModal.roleNameInputLabel')}
          />
          <TextField
            multiline
            style={comp.input}
            value={role?.description}
            onChangeText={description => setRole({...role, description})}
            label={t('groups.settings.roles.createRoleModal.roleDescriptionInputLabel')}
          />

          <SectionList
            style={{marginBottom: 20}}
            initialNumToRender={0}
            sections={GROUP_SCOPES}
            ItemSeparatorComponent={ListSeparator}
            showsVerticalScrollIndicator={false}
            keyExtractor={keyExtractor}
            renderItem={({item}) => <RolePermission item={item} onSelect={onSelectScope}/>}
            renderSectionHeader={({section: {section}}) => <RoleSectionHeader section={section}/>}
          />

        </ScrollView>
      </FullScreenModalConfirmLayout>
    </FullScreenModal>
  );
};

const getState = (state) => ({
  role: state.groups.role,
  group: state.groups.group,
  createRoleModal: state.groups.createRoleModal,
});

export default connect(
  getState,
  {
    setRole,
    setCreateRoleModal,
  },
)(CreateRoleModal);
