import { useContext } from "react";
import Link from "next/link";
import { UserContext } from "@contexts/userContext";

const PrivateLink = ({ children, url }) => {
  const userContext = useContext(UserContext);
  const { tokenInfo } = userContext;
  return <Link target="_blank" href={tokenInfo?.access_token ? url : "/auth"}>{children}</Link>;
};

export default PrivateLink;
