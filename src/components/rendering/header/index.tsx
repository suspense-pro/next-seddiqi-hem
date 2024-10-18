import { HeaderProvider } from "@contexts/headerContext";
import styles from "./header.module.scss";
import { DesktopHeader, MegaMenu, MobileHeader } from "@components/module";
import { useWindowWidth } from "@utils/useCustomHooks";

export default function Header({ ...props }) {
  const windowWidth = useWindowWidth();
  return <header className={styles.header}>{windowWidth > 1036 ? <DesktopHeader /> : <MobileHeader />}</header>;
}
