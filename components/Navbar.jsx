import { useState, useEffect } from "react";
import { ConnectButton } from "web3uikit";
import Link from "next/link";
import { useRouter } from "next/router";

const Navbar = () => {
  const [pageName, setPageName] = useState("");
  const router = useRouter();

  useEffect(() => {
    const _pageName = router.pathname;
    setPageName(_pageName);
  }, [router.pathname]);

  useEffect(() => {
    const getFusionBalace = async () => {};
  }, []);

  return <> </>;
};

export default Navbar;
