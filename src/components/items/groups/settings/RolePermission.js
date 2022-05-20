import React, {useMemo} from 'react';
import {ListItem} from 'react-native-elements';
import {Checkbox} from 'react-native-paper';
import {connect} from 'react-redux';
import {useTranslation} from 'react-i18next';
import {useThemes} from '../../../../providers/ThemeProvider';
import {comp} from '../../../../styles/Blocks';


const RolePermission = ({item, onSelect, role}) => {
  const {theme} = useThemes();
  const {t} = useTranslation();

  const isSelected = useMemo(() => role.scope.includes(item.scope), [role.scope]);
  const onSafeSelect = async () => await onSelect(isSelected, item.scope);

  return (
    <ListItem
      disabled={item.label === 'View'}
      onPress={onSafeSelect}
      style={comp.image}
      containerStyle={[{backgroundColor: theme.listItem}, comp.image]}
    >
      <ListItem.Content>
        <ListItem.Title style={{color: theme.text}}>
          {t(`groups.settings.roles.createRoleModal.${item.label}`)}
        </ListItem.Title>
      </ListItem.Content>
      <Checkbox
        disabled={item.label === 'View'}
        onPress={onSafeSelect}
        status={isSelected ? 'checked' : 'unchecked'}
        uncheckedColor={theme.text}
        color={theme.button.primary}
      />
    </ListItem>
  );
};

const getState = (state) => ({role: state.groups.role});

export default connect(getState, null)(RolePermission);
