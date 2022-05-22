import {DEFAULT_THEME_SETTINGS} from '../../Utils/Constants';

export const SETTINGS_INITIAL_STATE = {
  monster: {name: '', delta: '', image: '', editMode: false},
  comment: {text: '', id: null, editMode: false},
  theme: DEFAULT_THEME_SETTINGS,
};
