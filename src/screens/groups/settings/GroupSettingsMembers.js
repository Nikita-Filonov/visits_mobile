import React, {useMemo, useState} from 'react';
import {FlatList} from 'react-native';
import {Appbar} from 'react-native-paper';
import {connect} from 'react-redux';
import {BackLayout} from '../../../components/layouts/BackLayout';
import {Icon} from 'react-native-elements';
import {useTranslation} from 'react-i18next';
import {Member} from '../../../components/items/groups/settings/Member';
import {ListSeparator} from '../../../components/common/ListSeparator';
import {CustomFab} from '../../../components/common/CustomFab';
import InviteMemberModal from '../../../components/modals/groups/settings/InviteMemberModal';
import {setCreateMemberModal} from '../../../redux/Groups/groupsActions';
import MailInviteModal from '../../../components/modals/groups/settings/MailInviteModal';
import {MEMBER} from '../../../utils/permissions/Groups';
import {useGroupPermissions} from '../../../providers/groups/GroupPermissionsProvider';
import {EmptyList} from '../../../components/blocks/EmptyList';
import {SearchTextField} from '../../../components/common/inputs/SearchTextField';
import {comp} from '../../../styles/Blocks';


const GroupSettingsMembers = ({navigation, group, setCreateMemberModal}) => {
  const {t} = useTranslation();
  const {isAllowed} = useGroupPermissions();
  const [search, setSearch] = useState('');
  const [mailInvitationModal, setMailInvitationModal] = useState(false);

  const onMail = () => setMailInvitationModal(true);
  const onInvite = () => setCreateMemberModal(true);

  const MembersSearch = useMemo(() =>
      group?.members?.filter(
        member => member?.user?.username?.toLowerCase().includes(search.toLowerCase()) ||
          member?.role?.name?.toLowerCase().includes(search.toLowerCase()),
      ),
    [group, search],
  );

  return (
    <BackLayout
      navigation={navigation}
      title={t('groups.tableHeader.members')}
      actions={[
        <Appbar.Action
          onPress={onMail}
          animated={false}
          disabled={!isAllowed([MEMBER.create])}
          icon={() => <Icon name={'mail'} type={'feather'} color={'white'}/>}
        />,
      ]}
    >
      <SearchTextField
        search={search}
        setSearch={setSearch}
        placeholder={t('groups.settings.members.searchPlaceholder')}
      />
      <FlatList
        style={[comp.input, comp.bottomList]}
        ItemSeparatorComponent={ListSeparator}
        data={MembersSearch}
        renderItem={({item}) => <Member item={item} menu={true}/>}
        keyExtractor={item => item.id}
        ListEmptyComponent={() =>
          <EmptyList
            entities={MembersSearch}
            search={search}
            {...t('components.emptyLists.groups.members')}
          />
        }
      />
      <CustomFab onPress={onInvite}/>
      <InviteMemberModal/>
      <MailInviteModal modal={mailInvitationModal} setModal={setMailInvitationModal}/>
    </BackLayout>
  );
};


const getState = (state) => ({group: state.groups.group});

export default connect(
  getState,
  {
    setCreateMemberModal,
  },
)(GroupSettingsMembers);
