import { I18nProvider } from '@ttoss/react-i18n';
import { NotificationsProvider } from '@ttoss/react-notifications';
import { setOptions } from '@ttoss/test-utils';

const Providers = ({ children }: { children: React.ReactNode }) => {
  return (
    <I18nProvider>
      <NotificationsProvider>{children}</NotificationsProvider>
    </I18nProvider>
  );
};

/**
 * Add global wrapper to React Testing Library `customRender`.
 */
setOptions({ wrapper: Providers });
