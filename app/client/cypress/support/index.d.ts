import { AsyncThunk, EnhancedStore } from '@reduxjs/toolkit';
import { MountOptions, MountReturn } from 'cypress/react';
import { RootState } from '../../src/redux/store';

export type ApiAction<TPayload> = AsyncThunk<
  TPayload,
  void,
  {
    rejectValue: string;
    dispatch?: any; // You can replace `any` with the correct type if needed
    state?: unknown;
    extra?: unknown;
    serializedErrorType?: unknown;
    pendingMeta?: unknown;
    fulfilledMeta?: unknown;
    rejectedMeta?: unknown;
  }
>;

declare global {
  namespace Cypress {
    interface Chainable {
      /**
       * Mounts a React node
       * @param component React Node to mount
       * @param options Additional options to pass into mount
       */
      mount(
        component: React.ReactNode,
        options?: MountOptions & {
          centralised?: boolean;
          reduxStore?: EnhancedStore<RootState>;
        }
      ): Cypress.Chainable<MountReturn>;
      getByTestId(testId: string): Chainable<JQuery<HTMLElement>>;
      mockApiResponseError<TPayload>(
        apiAction: ApiAction<TPayload>,
        error?: string
      ): void;
    }
  }
}
