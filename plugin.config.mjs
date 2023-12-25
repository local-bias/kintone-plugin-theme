const hp = 'https://konomi.app/';
const commonCdn = 'https://kintone-plugin.konomi.app/common';
const localhost = 'https://127.0.0.1:8241';

/** @type { import('@konomi-app/kintone-utilities').PluginConfig } */
export default {
  manifest: {
    base: {
      manifest_version: 1,
      version: '1.1.0',
      type: 'APP',
      name: {
        en: 'Real-time Theme Change Plugin',
        ja: 'リアルタイムテーマ変更プラグイン',
        zh: '实时主题更改插件',
      },
      description: {
        en: 'A plugin that allows you to change themes in real-time for a theme that requires checking while saving the settings of each app.',
        ja: '都度アプリの設定を保存しながら確認しなければならないテーマを、リアルタイムに変更できるようにするプラグインです。',
        zh: '一个插件，可以实时更改需要在保存每个应用程序的设置时进行检查的主题。',
      },
      icon: 'icon.png',
      homepage_url: { ja: hp, en: hp },
      desktop: { js: [`${commonCdn}/desktop.js`], css: [] },
      mobile: { js: [`${commonCdn}/desktop.js`], css: [] },
      config: {
        html: 'config.html',
        js: [`${commonCdn}/config.js`],
        css: [],
        required_params: [],
      },
    },
    dev: {
      desktop: {
        js: [`${localhost}/dist/dev/desktop/index.js`],
        css: [`${localhost}/dist/dev/desktop.css`],
      },
      mobile: {
        js: [`${localhost}/dist/dev/desktop/index.js`],
        css: [`${localhost}/dist/dev/desktop.css`],
      },
      config: {
        js: [`${localhost}/dist/dev/config/index.js`],
        css: [`${localhost}/dist/dev/config.css`],
      },
    },
    prod: {
      desktop: { js: ['desktop.js'], css: ['desktop.css'] },
      mobile: { js: ['desktop.js'], css: ['desktop.css'] },
      config: { js: ['config.js'], css: ['config.css'] },
    },
    standalone: {
      desktop: { js: ['desktop.js'], css: ['desktop.css'] },
      mobile: { js: ['desktop.js'], css: ['desktop.css'] },
      config: { js: ['config.js'], css: ['config.css'] },
    },
  },
};
