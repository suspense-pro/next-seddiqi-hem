import { HeaderProvider } from "@contexts/headerContext";
import styles from "./header.module.scss";
import { DesktopHeader, MegaMenu, MobileHeader } from "@components/module";
import { useDeviceWidth } from "@utils/useCustomHooks";

export default function Header({ ...props }) {
  const isDesktop = useDeviceWidth()[0];
  return (
    <header className={styles.header}>
      {isDesktop ? <DesktopHeader /> : <MobileHeader />}
    </header>
  );
}
