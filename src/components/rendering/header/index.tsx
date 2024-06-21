import { HeaderProvider } from "@contexts/headerContext";
import styles from "./header.module.scss";
import { DesktopHeader, MegaMenu } from "@components/module";

export default function Header() {
  return (
    <HeaderProvider>
      <header className={styles.header}>
        <DesktopHeader />
      </header>
    </HeaderProvider>
  );
}
