import {
  PluginBanner,
  PluginContent,
  PluginLayout,
  PluginConfigProvider,
  Notification,
} from '@konomi-app/kintone-utilities-react';
import { LoaderWithLabel } from '@konomi-app/ui-react';
import { SnackbarProvider } from 'notistack';
import React, { FC, Suspense } from 'react';
import { RecoilRoot } from 'recoil';
import { URL_BANNER, URL_PROMOTION } from '@/lib/static';
import { PluginErrorBoundary } from '@/lib/components/error-boundary';
import Footer from './components/model/footer';
import config from '../../plugin.config.mjs';
import { SwimmingIcon } from '@/lib/components/ui/icon-swimming';

const Component: FC = () => (
  <Suspense fallback={<LoaderWithLabel label='画面の描画を待機しています' />}>
    <RecoilRoot>
      <PluginErrorBoundary>
        <PluginConfigProvider config={config}>
          <Notification />
          <SnackbarProvider maxSnack={1}>
            <Suspense fallback={<LoaderWithLabel label='設定情報を取得しています' />}>
              <PluginLayout singleCondition>
                <PluginContent>
                  <div className='py-32 grid place-items-center'>
                    <div className='grid max-w-md gap-2 place-items-center'>
                      <h1 className='text-2xl font-bold m-0'>設定の必要はありません</h1>
                      <SwimmingIcon className='w-80 h-80' />
                      <p className='text-gray-500 m-0'>
                        このプラグインは、設定が不要なプラグインです。プラグインを有効化するだけで、機能が利用できます。
                      </p>
                    </div>
                  </div>
                </PluginContent>
                <PluginBanner url={URL_BANNER} />
                <Footer />
              </PluginLayout>
            </Suspense>
          </SnackbarProvider>
        </PluginConfigProvider>
      </PluginErrorBoundary>
    </RecoilRoot>
    <iframe title='promotion' loading='lazy' src={URL_PROMOTION} className='border-0 w-full h-16' />
  </Suspense>
);

export default Component;
