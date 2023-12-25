import { KintoneRestAPIClient } from '@kintone/rest-api-client';
import { kintoneAPI } from '@konomi-app/kintone-utilities';

/** kintoneアプリに初期状態で存在するフィールドタイプ */
const DEFAULT_DEFINED_FIELDS: kintoneAPI.FieldPropertyType[] = [
  'RECORD_NUMBER',
  'UPDATED_TIME',
  'CREATOR',
  'CREATED_TIME',
  'CATEGORY',
  'MODIFIER',
  'STATUS',
];

class FlexKintone extends KintoneRestAPIClient {
  constructor(...options: ConstructorParameters<typeof KintoneRestAPIClient>) {
    const url = kintone.api.url('/k/v1/app', true);
    const found = url.match(/k\/guest\/([0-9]+)\//);

    if (found && found.length > 1) {
      super({
        guestSpaceId: found[1],
        ...(options[0] || {}),
      });
      return;
    }

    super(...options);
  }
}

/** REST APIクライアント(シングルトン) */
export const kintoneClient = new FlexKintone();

export const getFieldProperties = async (
  targetApp?: string | number
): Promise<kintoneAPI.FieldProperties> => {
  const app = targetApp || kintone.app.getId();

  if (!app) {
    throw new Error('アプリのフィールド情報が取得できませんでした');
  }

  const { properties } = await kintoneClient.app.getFormFields({ app });

  return properties;
};

export const getUserDefinedFields = async (): Promise<kintoneAPI.FieldProperties> => {
  const properties = await getFieldProperties();
  return omitFieldProperties(properties, DEFAULT_DEFINED_FIELDS);
};

/** サブテーブルをばらしてフィールドを返却します */
export const getAllFields = async (): Promise<kintoneAPI.FieldProperty[]> => {
  const properties = await getFieldProperties();

  const fields = Object.values(properties).reduce<kintoneAPI.FieldProperty[]>((acc, property) => {
    if (property.type === 'SUBTABLE') {
      return [...acc, ...Object.values(property.fields)];
    }
    return [...acc, property];
  }, []);

  return fields;
};

/**
 * APIから取得したフィールド情報から、指定した関数の条件に当てはまるフィールドのみを返却します
 *
 * @param properties APIから取得したフィールド情報
 * @param callback 絞り込み条件
 * @returns 条件に当てはまるフィールド
 */
export const filterFieldProperties = (
  properties: kintoneAPI.FieldProperties,
  callback: (field: kintoneAPI.FieldProperty) => boolean
): kintoneAPI.FieldProperties => {
  const filtered = Object.entries(properties).filter(([_, value]) => callback(value));

  const reduced = filtered.reduce<kintoneAPI.FieldProperties>(
    (acc, [key, value]) => ({ ...acc, [key]: value }),
    {}
  );

  return reduced;
};

/**
 * APIから取得したフィールド情報から、指定したフィールドタイプを除いたフィールド一覧を返却します
 *
 * @param properties APIから取得したフィールド情報
 * @param omittingTypes 除外するフィールドタイプ
 * @returns 指定したフィールドタイプを除いた一覧
 */
export const omitFieldProperties = (
  properties: kintoneAPI.FieldProperties,
  omittingTypes: kintoneAPI.FieldPropertyType[]
): kintoneAPI.FieldProperties => {
  return filterFieldProperties(properties, (property) => !omittingTypes.includes(property.type));
};
