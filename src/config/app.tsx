import React, { Suspense, FC } from 'react';
import { RecoilRoot } from 'recoil';
import { SnackbarProvider } from 'notistack';

import { restoreStorage } from '@common/plugin';

import SocialIcons from './components/social-icons';
import { Loading } from '@common/components/loading';
import { pluginIdState, storageState } from './states/plugin';
import { PluginErrorBoundary } from '@common/components/functional/error-boundary';

const Component: FC<{ pluginId: string }> = ({ pluginId }) => (
  <Suspense fallback={<Loading label='画面の描画を待機しています' />}>
    <RecoilRoot
      initializeState={({ set }) => {
        set(pluginIdState, pluginId);
        set(storageState, restoreStorage(pluginId));
      }}
    >
      <PluginErrorBoundary>
        <SnackbarProvider maxSnack={1}>
          <div>設定の必要はありません🍀</div>
        </SnackbarProvider>
      </PluginErrorBoundary>
    </RecoilRoot>
    <SocialIcons />
  </Suspense>
);

export default Component;
