import React, {useEffect, useMemo, useState} from 'react';
import {ConfirmLayout} from '../../../components/layouts/ConfirmLayout';
import {MONSTER_SCOPES} from '../../../utils/permissions/Premium';
import {useSelected} from '../../../utils/hooks/SelectHook';
import {useSettings} from '../../../providers/SettingsProvider';
import {usePremiums} from '../../../providers/PremiumsProvider';
import {useTranslation} from 'react-i18next';
import {CustomText} from '../../../components/common/CustomText';
import {comp} from '../../../styles/Blocks';
import {AlertMessage} from '../../../components/common/AlertMessage';
import {CustomButton} from '../../../components/common/CustomButton';
import {SearchTextField} from '../../../components/common/inputs/SearchTextField';
import {SelectTextField} from '../../../components/common/inputs/SelectTextField';
import {GAME_PROVIDERS} from '../../../utils/Constants';
import {get} from '../../../utils/api/Fetch';
import {TextInput} from 'react-native-paper';
import {useThemes} from '../../../providers/ThemeProvider';
import {MonsterAvatar} from '../../../components/blocks/timers/MonsterAvatar';
import {baseUrl} from '../../../utils/Links';
import {Game} from '../../../components/items/settings/monsters/Game';
import {FlatList} from 'react-native';
import {ChooseMonster} from '../../../components/items/settings/monsters/ChooseMonster';
import {ListSeparator} from '../../../components/common/ListSeparator';


export const ChooseMonsters = ({navigation}) => {
  const {t} = useTranslation();
  const {theme} = useThemes();
  const {userPremium} = usePremiums();
  const {request, importMonsters} = useSettings();
  const [game, setGame] = useState('');
  const [search, setSearch] = useState('');
  const [monsterPatterns, setMonsterPatterns] = useState([]);
  const {selected, onSelect, dropSelected} = useSelected();

  const actualMonsters = useMemo(() => {
    const availableMonsters = userPremium.find(p => p.action === MONSTER_SCOPES.create);
    const available = (availableMonsters?.limit - availableMonsters?.actual) || 0;
    return available < 0 ? 0 : available;
  }, [userPremium]);

  useEffect(() => {
    (async () => game && await getMonsterPatterns())();
  }, [game]);

  const onMyAccess = () => navigation.navigate('ProfileSettings', {screen: 'PremiumAccesses'});

  const getMonsterPatterns = async () => {
    const {error, json} = await get(`api/v1/monster-patterns/?game=${game.code}`);
    !error && setMonsterPatterns(json);
    dropSelected();
  };

  const onImport = async () => {
    await importMonsters(selected);
    dropSelected();
    navigation.goBack();
  };

  const MonsterPatternsSearch = useMemo(() =>
      monsterPatterns.filter(m => m?.name?.toLowerCase().includes(search.toLowerCase())),
    [monsterPatterns, search],
  );

  return (
    <ConfirmLayout
      loading={request}
      onConfirm={onImport}
      title={t('settings.monsters.chooseMonstersModal.title')}
      disabled={(selected.length > actualMonsters) || selected.length === 0}
    >
      <CustomText style={comp.normalText}>{t('settings.monsters.chooseMonstersModal.description')}</CustomText>
      <AlertMessage
        style={comp.input}
        message={t('settings.monsters.chooseMonstersModal.accessAlert', {count: actualMonsters})}
        level={'info'}
        action={
          <CustomButton
            type={'clear'}
            title={t('settings.monsters.chooseMonstersModal.myAccesses')}
            onPress={onMyAccess}
            color={'primary'}
          />
        }
      />
      <SelectTextField
        label={t('settings.monsters.chooseMonstersModal.gameSelectLabel')}
        left={game?.code && <TextInput.Icon
          name={() => <MonsterAvatar size={'small'} image={baseUrl + `static/images/games/${game.code}.png`}/>}
        />}
        value={game.name}
        choices={GAME_PROVIDERS.map((g, index) => ({...g, id: index}))}
        item={game}
        setItem={setGame}
        renderItem={Game}
        right={<TextInput.Icon name={'gamepad-variant-outline'} color={theme.text}/>}
      />
      {monsterPatterns.length > 0 && <SearchTextField
        style={comp.input}
        search={search}
        setSearch={setSearch}
        placeholder={t('timers.search.placeholder')}
      />}
      <FlatList
        style={[comp.input, comp.bottomList]}
        data={MonsterPatternsSearch}
        removeClippedSubviews={true}
        ItemSeparatorComponent={ListSeparator}
        renderItem={({item}) => <ChooseMonster item={item} onSelect={onSelect} selected={selected}/>}
        keyExtractor={(_, index) => index.toString()}
      />
    </ConfirmLayout>
  );
};
