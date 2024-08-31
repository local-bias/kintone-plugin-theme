//@ts-check
const hp = 'https://konomi.app';
const cdn = 'https://kintone-plugin.konomi.app';
const key = 'theme';

/** @satisfies { Plugin.Meta.Config } */
export default /** @type { const } */ ({
  id: `ribbit-kintone-plugin-${key}`,
  pluginReleasePageUrl: `https://ribbit.konomi.app/kintone-plugin/`,
  server: {
    port: 8241,
  },
  lint: {
    build: false,
  },
  tailwind: {
    css: 'src/styles/global.css',
    config: {
      desktop: 'tailwind.config.desktop.mjs',
      config: 'tailwind.config.config.mjs',
    },
  },
  manifest: {
    base: {
      manifest_version: 1,
      version: '2.0.0',
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
      desktop: { js: [`${cdn}/common/desktop.js`], css: [] },
      mobile: { js: [`${cdn}/common/desktop.js`], css: [] },
      config: {
        html: 'config.html',
        js: [`${cdn}/common/config.js`],
        css: [],
        required_params: [],
      },
    },
    prod: {
      desktop: { js: [`${cdn}/${key}/desktop.js`], css: [`${cdn}/${key}/desktop.css`] },
      mobile: { js: [`${cdn}/${key}/desktop.js`], css: [`${cdn}/${key}/desktop.css`] },
      config: { js: [`${cdn}/${key}/config.js`], css: [`${cdn}/${key}/config.css`] },
    },
    standalone: {
      desktop: { js: ['desktop.js'], css: ['desktop.css'] },
      mobile: { js: ['desktop.js'], css: ['desktop.css'] },
      config: { js: ['config.js'], css: ['config.css'] },
    },
  },
});
