import React from 'react';
import {
  CircularProgress,
  FormControl,
  InputLabel,
  MenuItem,
  Select,
} from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import { green } from '@material-ui/core/colors';

const THEMES = [
  ['WHITE', 'gaia-argoui-app-theme-white', 'ホワイト'], 
  ['RED', 'gaia-argoui-app-theme-red', 'レッド'],
  ['BLUE', 'gaia-argoui-app-theme-blue', 'ブルー'],
  ['GREEN', 'gaia-argoui-app-theme-green', 'グリーン'],
  ['YELLOW', 'gaia-argoui-app-theme-yellow', 'イエロー'],
  ['BLACK', 'gaia-argoui-app-theme-black', 'ブラック'],
];

const TARGET_SELECTOR = '.container-gaia';

const sleep = ms => new Promise(resolve => setTimeout(resolve, ms));

const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
    alignItems: 'center',
  },
  wrapper: {
    margin: theme.spacing(1),
    position: 'relative',
  },
  formControl: {
    marginTop: -theme.spacing(1)
  },
  select: {
    minWidth: 150,
  },
  buttonProgress: {
    color: green[500],
    position: 'absolute',
    top: '50%',
    left: '50%',
    marginTop: -12,
    marginLeft: -12,
  },
}));

function getThemeClassName(src) {
  for (const theme of THEMES) {
    if (theme[0] === src) {
      return theme[1];
    }
  }
  return '';
}

export default function HeaderComponent(props) {

  const app = props.app;

  const classes = useStyles();
  const [loading, setLoading] = React.useState(false);
  const [theme, setTheme] = React.useState(props.initTheme || THEMES[0][0]);
  const timer = React.useRef();

  React.useEffect(() => {
    return () => {
      clearTimeout(timer.current);
    };
  }, []);

  const handleChange = async event => {
    if (loading) {
      return;
    }
    setLoading(true);
    setTheme(event.target.value);

    const origin = await kintone.api(kintone.api.url('/k/v1/preview/app/settings', true), 'GET', {app: app.getId()});

    const originClass = getThemeClassName(origin.theme);
    
    const response = await kintone.api(kintone.api.url('/k/v1/preview/app/settings', true), 'PUT', {
      app: app.getId(),
      theme: event.target.value
    });

    const dstClass = getThemeClassName(event.target.value);
    const target = document.querySelector(TARGET_SELECTOR);

    target.classList.remove(originClass);
    target.classList.add(dstClass);

    // 変更をアプリ設定に適用
    await kintone.api(kintone.api.url('/k/v1/preview/app/deploy', true), 'POST', {
      apps: [
        {app: app.getId(), revision: response.revision}
      ]
    });

    // 設定変更の完了には時間がかかる場合があるので、一定間隔で確認します
    let deployed = false;
    while (!deployed) {

      await sleep(500);

      const deployResponse = await kintone.api(kintone.api.url('/k/v1/preview/app/deploy', true), 'GET', {
        apps: [app.getId()]
      });

      deployed = deployResponse.apps[0].status === 'SUCCESS';
    }

    // 読込通知を終了
    setLoading(false);
  };

  return (
    <div className={classes.wrapper}>
      <FormControl className={classes.formControl}>
        <InputLabel id="theme-select-label">テーマの変更</InputLabel>
        <Select
          labelId="theme-select-label"
          id="theme-select"
          value={theme}
          disabled={loading}
          onChange={handleChange}
          className={classes.select}
        >
          {THEMES.map(theme => <MenuItem value={theme[0]}>{theme[2]}</MenuItem>)}
        </Select>
        {loading && <CircularProgress size={24} className={classes.buttonProgress} />}
      </FormControl>
    </div>
  );
}