import {useCallback, useState} from 'react';

export const useSelected = () => {
  const [selected, setSelected] = useState([]);

  const onSelect = async (itemId, isSelected) =>
    isSelected
      ? setSelected(selected.filter(e => e !== itemId))
      : setSelected([...selected, itemId]);


  const isSelected = useCallback((itemId) => selected.indexOf(itemId) !== -1, [selected]);
  const dropSelected = () => setSelected([]);

  return {selected, onSelect, isSelected, dropSelected, setSelected};
};
