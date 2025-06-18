import I18nProvider from "@i18n/i18n.provider";
import Theme from "./Theme";
import { Initializer, type InitializerProps } from "./Initializer";
import { DefaultSplash } from "@ig/components/splash";
import { ScrollProvider } from "@ig/components/scroll/ScrollProvider";
import Layout, { type LayoutProps } from "./layouts/app-layout/Layout";

interface AppProps extends Partial<InitializerProps>, LayoutProps {
  splash?: React.ReactNode;
}

const App = (props: React.PropsWithChildren<AppProps>) => {
  const { checkers, checkerActions, loaders, loaderActions, splash, children, ...layoutProps } =
    props;

  return (
    <I18nProvider>
      <Theme>
        <Initializer
          checkers={checkers || {}}
          checkerActions={checkerActions || []}
          loaders={loaders || {}}
          loaderActions={loaderActions || []}
        />
        {splash || <DefaultSplash />}

        <ScrollProvider>
          <Layout {...layoutProps}>{children}</Layout>
        </ScrollProvider>
      </Theme>
    </I18nProvider>
  );
};

export default App;
