import React from 'react';
import ReactDOM from 'react-dom';

import SocialIcons from './SocialIcons';

const WRAPPER_ID = 'local-bias_theme_config-wrapper';

(PLUGIN_ID => {

  ReactDOM.render(
    <SocialIcons />,
    document.getElementById(WRAPPER_ID),
  );

})(kintone.$PLUGIN_ID);