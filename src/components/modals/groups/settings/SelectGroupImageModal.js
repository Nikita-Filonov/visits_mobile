import React, {useEffect, useState} from 'react';
import {FlatList, View} from 'react-native';
import {SIStyles} from '../../../../styles/Modals';
import {Appbar} from 'react-native-paper';
import {Icon} from 'react-native-elements';
import {connect} from 'react-redux';
import {useAuth} from '../../../../providers/AuthProvider';
import {GroupImage} from '../../../items/groups/GroupImage';
import * as ImagePicker from 'react-native-image-picker';
import {useAlerts} from '../../../../providers/AlertsProvider';
import {FullScreenModal} from '../../../common/modals/FullScreenModal';
import {useTranslation} from 'react-i18next';
import {get} from '../../../../utils/api/Fetch';
import {FullScreenModalConfirmLayout} from '../../../layouts/FullScreenModalConfirmLayout';
import {baseUrl} from '../../../../utils/Links';
import {MAX_FILE_SIZE} from '../../../../utils/Constants';


const SelectGroupImageModal = ({modal, setModal, setImage, group}) => {
  const {t} = useTranslation();
  const {token} = useAuth();
  const {setAlert} = useAlerts();
  const [selectedImage, setSelectedImage] = useState(group.image);
  const [images, setImages] = useState([]);
  const [request, setRequest] = useState(false);

  useEffect(() => {
    (async () => token && await getGroupsImages())();
  }, [token]);

  const onClose = () => {
    setModal(false);
    setRequest(false);
  };

  const getGroupsImages = async () => {
    const {error, json} = await get(`api/v1/groups/${group.id}/images/`);
    !error && setImages(json);
    error && setAlert(json);
  };

  const uploadImage = async (image) => {
    if (image.fileSize > MAX_FILE_SIZE) {
      setRequest(false);
      setAlert(t('components.alerts.custom.maxFileSize'));
      return;
    }

    setRequest(true);
    const formData = new FormData();
    formData.append('image', {uri: image.uri, type: image.type, name: image.fileName});

    const init = {
      method: 'POST',
      headers: {'Authorization': `Token ${token}`},
      body: formData,
    };
    const response = await fetch(baseUrl + `api/v1/groups/${group.id}/images/`, init);
    const json = await response.json();
    !response.ok && setAlert(json);
    response.ok && setImages([...images, json.uri]);
    setRequest(false);
  };

  const choosePhoto = async () => {
    const options = {};
    ImagePicker.launchImageLibrary(options, async response => response.uri && await uploadImage(response));
  };
  const onConfirm = () => {
    setImage(selectedImage);
    onClose();
  };

  return (
    <FullScreenModal modal={modal} setModal={setModal}>
      <FullScreenModalConfirmLayout
        onClose={onClose}
        title={t('groups.settings.common.chooseIcon')}
        onConfirm={onConfirm}
        loading={request}
        actions={[
          <Appbar.Action
            onPress={choosePhoto}
            animated={false}
            icon={() => <Icon name={'image-outline'} type={'material-community'} color={'white'}/>}
          />,
        ]}
      >
        <FlatList
          style={SIStyles.list}
          horizontal={true}
          data={images}
          ItemSeparatorComponent={() => <View style={SIStyles.separator}/>}
          renderItem={({item}) =>
            <GroupImage
              item={item}
              selectedImage={selectedImage}
              setSelectedImage={setSelectedImage}
            />
          }
          keyExtractor={((item, index) => item + index)}
        />
      </FullScreenModalConfirmLayout>
    </FullScreenModal>
  );
};


const getState = (state) => ({
  group: state.groups.group,
});


export default connect(
  getState,
  null,
)(SelectGroupImageModal);
