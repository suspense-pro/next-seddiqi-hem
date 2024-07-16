import { HeaderContext } from "@contexts/headerContext";
import { useContext } from "react";
import Link from "next/link";
import Image from "next/image";

const LogoLink = ({ logo, width, height }) => (
  <Link
    key={logo?.altText}
    href={logo?.url || "/"}
    style={{ margin: 0, padding: 0 }}
  >
    <Image
      src={`https://${logo?.image.defaultHost}/i/${logo?.image.endpoint}/${logo?.image.name}`}
      width={width}
      height={height}
      alt={logo?.altText}
    />
  </Link>
);

const HeaderLogoBar = ({ headerLogoContainer }) => {
  const { headerData } = useContext(HeaderContext);
  const MAIN_LOGO = headerData?.content?.mainLogo?.image;
  const PATEK_LOGO = headerData?.content?.leftLogo?.image;
  const ROLEX_LOGO = headerData?.content?.rightLogo?.image;

  return (
    <div className={headerLogoContainer && headerLogoContainer}>
      {PATEK_LOGO && <LogoLink logo={PATEK_LOGO} width={78.65} height={46} />}
      {MAIN_LOGO && <LogoLink logo={MAIN_LOGO} width={120} height={24} />}
      {ROLEX_LOGO && <LogoLink logo={ROLEX_LOGO} width={100.3} height={46} />}
    </div>
  );
};

export default HeaderLogoBar;
