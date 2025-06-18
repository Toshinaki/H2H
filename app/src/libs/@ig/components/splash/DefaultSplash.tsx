import { useAppStore } from "store";
import Splash from "./Splash";
import SplashLogo from "./SplashLogo";

const DefaultSplash = () => {
  const status = useAppStore((state) => state.init.status);

  return (
    <Splash show={!(status === "initialized")}>
      <SplashLogo />
    </Splash>
  );
};

export default DefaultSplash;
