
declare const kintone: any;

/**
 * プラグインに保持しているパラメータを返却します.
 *
 * @params {string} id プラグインID
 * @return {any} プラグインに保持しているパラメータ
 */
export const getConfig = (id: string): any => {

  const config = kintone.plugin.app.getConfig(id);

  return Object.keys(config).reduce((accu: {}, key: string) => {

    accu[key] = JSON.parse(config[key]);

    return accu;

  }, {});
}

/**
 * プラグインに保持させるパラメータを設定します
 *
 * @param {any} params プラグインに保持させるパラメータ
 */
export const setConfig = async (config: any, callback: Function): Promise<any> => {

  // 引数のプロパティをJSON形式に変換し、格納し直します
  const converted = Object.keys(config).reduce((accu: {}, key: string) => {

    accu[key] = JSON.stringify(config[key]);

    return accu;

  }, {});

  kintone.plugin.app.setConfig(converted, callback);

  return true;
}