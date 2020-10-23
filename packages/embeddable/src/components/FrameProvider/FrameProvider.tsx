import createCache from '@emotion/cache';
import { CacheProvider } from '@emotion/core';
import weakMemoize from '@emotion/weak-memoize';
import React from 'react';
import { FrameContextConsumer } from 'react-frame-component';

const createContainerCache = weakMemoize((container: HTMLElement) => {
  return createCache({ container });
});

/**
 * Provider for rendering components in an iframe preserving their (emotion)
 * styles.
 */
export default function FrameProvider(props) {
  return (
    <FrameContextConsumer>
      {({ document }) => {
        return <CacheProvider value={createContainerCache(document.head)}>{props.children}</CacheProvider>;
      }}
    </FrameContextConsumer>
  );
}