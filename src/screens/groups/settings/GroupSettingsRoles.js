import React, {useMemo, useState} from 'react';
import {FlatList} from 'react-native';
import {connect} from 'react-redux';
import {BackLayout} from '../../../components/layouts/BackLayout';
import {useTranslation} from 'react-i18next';
import {ListSeparator} from '../../../components/common/ListSeparator';
import {CustomFab} from '../../../components/common/CustomFab';
import {Role} from '../../../components/items/groups/settings/Role';
import {setCreateRoleModal} from '../../../redux/Groups/groupsActions';
import CreateRoleModal from '../../../components/modals/groups/settings/CreateRoleModal';
import {EmptyList} from '../../../components/blocks/EmptyList';
import {SearchTextField} from '../../../components/common/inputs/SearchTextField';
import {comp} from '../../../styles/Blocks';


const GroupSettingsRoles = ({navigation, group, setCreateRoleModal}) => {
  const {t} = useTranslation();
  const [search, setSearch] = useState('');

  const onCreateRole = () => setCreateRoleModal(true);

  const RolesSearch = useMemo(() =>
      group?.roles.filter(role => role.name.toLowerCase().includes(search.toLowerCase())),
    [group, search],
  );

  return (
    <BackLayout navigation={navigation} title={t('groups.settings.sidebar.roles')}>
      <SearchTextField
        search={search}
        setSearch={setSearch}
        placeholder={t('groups.settings.roles.searchPlaceholder')}
      />
      <FlatList
        style={[comp.input, comp.bottomList]}
        ItemSeparatorComponent={ListSeparator}
        data={RolesSearch}
        renderItem={({item}) => <Role item={item} menu={true}/>}
        keyExtractor={item => item.id}
        ListEmptyComponent={() =>
          <EmptyList
            entities={RolesSearch}
            search={search}
            {...t('components.emptyLists.groups.roles')}
          />
        }
      />
      <CustomFab onPress={onCreateRole}/>
      <CreateRoleModal/>
    </BackLayout>
  );
};


const getState = (state) => ({group: state.groups.group});

export default connect(getState, {setCreateRoleModal})(GroupSettingsRoles);
