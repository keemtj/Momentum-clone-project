import * as weather from './weather'

const openSettingBox = settingbox => {
  settingbox.style.display = 'block';
};

const closeSettingBox = settingbox => {
  settingbox.style.display = 'none';
};



export { openSettingBox, closeSettingBox };