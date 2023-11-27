import React from 'react';
import { createRoot } from 'react-dom/client';
import { kintoneClient } from '@common/kintone-api';
import { getAppId, getHeaderSpace } from '@lb-ribbit/kintone-xapp';

import App from './app';

const ROOT_ID = 'ribbit-kintone-plugin-theme-root';

const events: launcher.Events = ['app.record.index.show'];

const action: launcher.Action = async (event, pluginId) => {
  if (document.getElementById(ROOT_ID)) {
    return event;
  }

  const headerSpace = getHeaderSpace(event.type);
  if (!headerSpace) {
    console.warn('No header space found');
    return event;
  }

  const rootElement = document.createElement('span');
  rootElement.id = ROOT_ID;
  rootElement.style.display = 'inline-flex';
  rootElement.style.padding = '0 8px';

  const root = createRoot(rootElement);

  const response = await kintoneClient.app.getAppSettings({ app: getAppId()! });

  console.log(response);

  root.render(<App initSettings={response} />);

  return event;
};

export default { events, action };
