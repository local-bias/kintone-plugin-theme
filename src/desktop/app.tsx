import React, { ChangeEventHandler, FCX } from 'react';
import { CircularProgress, MenuItem, TextField } from '@mui/material';
import { kintoneClient } from '@common/kintone-api';
import { getApp } from '@lb-ribbit/kintone-xapp';
import styled from '@emotion/styled';

type AppSettings = Awaited<ReturnType<typeof kintoneClient.app.getAppSettings>>;

type Props = { initSettings: AppSettings };

type Theme = AppSettings['theme'];

const THEMES = [
  ['WHITE', 'gaia-argoui-app-theme-white', 'ホワイト'],
  ['RED', 'gaia-argoui-app-theme-red', 'レッド'],
  ['BLUE', 'gaia-argoui-app-theme-blue', 'ブルー'],
  ['GREEN', 'gaia-argoui-app-theme-green', 'グリーン'],
  ['YELLOW', 'gaia-argoui-app-theme-yellow', 'イエロー'],
  ['BLACK', 'gaia-argoui-app-theme-black', 'ブラック'],
];

const TARGET_SELECTOR = '.container-gaia';

const sleep = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms));

function getThemeClassName(src: Theme) {
  for (const theme of THEMES) {
    if (theme[0] === src) {
      return theme[1];
    }
  }
  return '';
}

const Component: FCX<Props> = ({ className, initSettings }) => {
  const app = getApp()!;

  const [loading, setLoading] = React.useState(false);
  const [theme, setTheme] = React.useState(initSettings.theme || THEMES[0][0]);
  const timer = React.useRef();

  React.useEffect(() => {
    return () => {
      clearTimeout(timer.current);
    };
  }, []);

  const handleChange: ChangeEventHandler<HTMLInputElement> = async (event) => {
    const selectedTheme = event.target.value as Theme;

    if (loading) {
      return;
    }
    setLoading(true);
    setTheme(selectedTheme);

    const origin = await kintone.api(kintone.api.url('/k/v1/preview/app/settings', true), 'GET', {
      app: app.getId(),
    });

    const originClass = getThemeClassName(origin.theme);

    const response = await kintone.api(kintone.api.url('/k/v1/preview/app/settings', true), 'PUT', {
      app: app.getId(),
      theme: event.target.value,
    });

    const dstClass = getThemeClassName(selectedTheme);
    const target = document.querySelector(TARGET_SELECTOR);

    if (!target) {
      throw 'error';
    }

    target.classList.remove(originClass);
    target.classList.add(dstClass);

    // 変更をアプリ設定に適用
    await kintone.api(kintone.api.url('/k/v1/preview/app/deploy', true), 'POST', {
      apps: [{ app: app.getId(), revision: response.revision }],
    });

    // 設定変更の完了には時間がかかる場合があるので、一定間隔で確認します
    let deployed = false;
    while (!deployed) {
      await sleep(500);

      const deployResponse = await kintone.api(
        kintone.api.url('/k/v1/preview/app/deploy', true),
        'GET',
        {
          apps: [app.getId()],
        }
      );

      deployed = deployResponse.apps[0].status === 'SUCCESS';
    }

    // 読込通知を終了
    setLoading(false);
  };

  return (
    <div className={className}>
      <TextField
        label='テーマの変更'
        select
        value={theme}
        disabled={loading}
        onChange={handleChange}
        className='select'
      >
        {THEMES.map((theme) => (
          <MenuItem value={theme[0]}>{theme[2]}</MenuItem>
        ))}
      </TextField>
      {loading && <CircularProgress size={24} className='button-progress' />}
    </div>
  );
};

const StyledComponent = styled(Component)`
  position: relative;

  .select {
    min-width: 120px;
  }
  .button-progress {
    color: #4caf50;
    position: absolute;
    top: 50%;
    left: 50%;
    margin-top: -12px;
    margin-left: -12px;
  }
`;

export default StyledComponent;
