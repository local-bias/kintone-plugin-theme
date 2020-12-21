import React from 'react';
import ReactDOM from 'react-dom';
import HeaderComponent from './HeaderComponent.js';

const WRAPPER_CLASS = 'local-bias_theme_area-wrapper';

/*

  今のところデザインテーマの設定はPC版のみですが、
  モバイル版でもテーマが実装された際に適用を楽にするために、モバイルを想定したコードが所々あります。

*/

(PLUGIN_ID => {

  kintone.events.on(['app.record.index.show', 'mobile.app.record.index.show'], async event => {

    const app = kintone.app.getId() ? kintone.app : kintone.mobile.app;

    let wrapper = document.querySelector(`.${WRAPPER_CLASS}`);

    if (!wrapper) {
      wrapper = document.createElement('div');
      wrapper.classList.add(WRAPPER_CLASS)

      const headerSpace = kintone.app.getHeaderMenuSpaceElement() || kintone.mobile.app.getHeaderSpaceElement();
      headerSpace.append(wrapper);
    }

    const initResponse = await kintone.api(kintone.api.url('/k/v1/preview/app/settings', true), 'GET', {app: app.getId()});

    ReactDOM.render(<HeaderComponent app={app} initTheme={initResponse.theme} />, wrapper);

    return event;
  });

})(kintone.$PLUGIN_ID);