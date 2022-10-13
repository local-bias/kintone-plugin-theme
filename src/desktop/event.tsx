import React from 'react';
import { createRoot } from 'react-dom/client';
import { kintoneClient } from '@common/kintone-api';
import { getAppId, getHeaderSpace } from '@lb-ribbit/kintone-xapp';

import App from './app';

const WRAPPER_CLASS = 'local-bias_theme_area-wrapper';

const events: launcher.Events = ['app.record.index.show'];

const action: launcher.Action = async (event, pluginId) => {
  let wrapper = document.querySelector(`.${WRAPPER_CLASS}`);

  if (!wrapper) {
    wrapper = document.createElement('div');
    wrapper.classList.add(WRAPPER_CLASS);

    const headerSpace = getHeaderSpace(event.type);
    if (headerSpace) {
      headerSpace.append(wrapper);
    }
  }

  const response = await kintoneClient.app.getAppSettings({ app: getAppId()! });

  console.log(response);

  createRoot(wrapper).render(<App initSettings={response} />);

  return event;
};

export default { events, action };
