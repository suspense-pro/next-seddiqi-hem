import DesktopHeader from "@components/module/desktopHeader";
import MegaMenu from "@components/module/megaMenu";
import { HeaderProvider } from "@contexts/headerContext";
import styles from "./header.module.scss";

export default function Header() {
  return (
    <HeaderProvider>
      <header className={styles.header}>
        <DesktopHeader />
        <MegaMenu />
      </header>
    </HeaderProvider>
  );
}
