import React, {useCallback, useEffect, useState} from 'react';
import {FlatList, View} from 'react-native';
import {useSettings} from '../../providers/SettingsProvider';
import {SStyles} from '../../styles/Screens';
import {Sound} from '../../components/items/settings/Sound';
import {Icon, Slider} from 'react-native-elements';
import {ConfirmLayout} from '../../components/layouts/ConfirmLayout';
import {useTranslation} from 'react-i18next';
import {useThemes} from '../../providers/ThemeProvider';
import {Spinner} from '../../components/common/Spinner';
import {comp} from '../../styles/Blocks';
import {ListSeparator} from '../../components/common/ListSeparator';

export const SoundsSettings = () => {
  const {t} = useTranslation();
  const {theme} = useThemes();
  const {request, sounds, getSounds, settings, updateSettings, soundsLoad} = useSettings();
  const [volume, setVolume] = useState(settings.volume * 100);
  const [selectedAudio, setSelectedAudio] = useState(settings.audio);

  useEffect(() => {
    (async () => await getSounds())();
  }, []);

  const sliderChange = useCallback((event) => setVolume(event), []);

  const onSave = async () => await updateSettings({audio: selectedAudio, volume: volume / 100});

  return (
    <ConfirmLayout loading={request} title={t('settings.sidebar.sound')} onConfirm={onSave}>
      <View style={SStyles.sliderContainer}>
        <Icon name={'volume-1'} type={'feather'} color={theme.text}/>
        <Slider
          value={volume}
          maximumValue={100}
          minimumValue={0}
          step={0.1}
          animateTransitions={true}
          animationType={'spring'}
          onValueChange={sliderChange}
          onSlidingComplete={sliderChange}
          style={SStyles.slider}
          minimumTrackTintColor={theme.button.primary}
          maximumTrackTintColor={theme.disabled}
          trackStyle={SStyles.track}
          thumbStyle={[SStyles.thumb, {backgroundColor: theme.button.primary}]}
          thumbTouchSize={40}
        />
        <Icon name={'volume-2'} type={'feather'} color={theme.text}/>
      </View>
      {soundsLoad
        ? <Spinner/>
        : <FlatList
          style={[comp.input, comp.bottomList]}
          data={sounds}
          renderItem={({item, index}) =>
            <Sound
              item={item}
              index={index}
              volume={volume}
              selectedAudio={selectedAudio}
              setSelectedAudio={setSelectedAudio}
            />
          }
          ItemSeparatorComponent={ListSeparator}
          removeClippedSubviews={true}
          keyExtractor={(_, index) => index.toString()}
        />
      }
    </ConfirmLayout>
  );
};
