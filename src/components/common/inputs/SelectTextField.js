import React, {useState} from 'react';
import {TouchableOpacity} from 'react-native';
import {SelectModal} from '../modals/SelectModal';
import {TextField} from './TextField';
import {comp} from '../../../styles/Blocks';

export const SelectTextField = ({value, item, setItem, choices, renderItem, label, right, left}) => {
  const [modal, setModal] = useState(false);

  const onSelect = () => setModal(true);

  return (
    <React.Fragment>
      <TouchableOpacity onPress={onSelect}>
        <TextField
          left={left}
          style={comp.input}
          value={value}
          editable={false}
          label={label}
          right={right}
        />
      </TouchableOpacity>
      <SelectModal
        modal={modal}
        setModal={setModal}
        choices={choices}
        selectedItem={item}
        setItem={setItem}
        renderItem={renderItem}
      />
    </React.Fragment>
  );
};
