import DesktopHeader from "@components/module/desktopHeader";
import MegaMenu from "@components/module/megaMenu";
import { HeaderProvider } from "@contexts/headerContext";

export default function Header() {
  return (
    <HeaderProvider>
      <header>
        <DesktopHeader />
        <MegaMenu />
      </header>
    </HeaderProvider>
  );
}
