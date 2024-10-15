import TabbedNavigation from "@components/module/tabbedNavigation";
import styles from "./authentication.module.scss";
import Register from "./register";
import SignIn from "./signIn";

const Authentication = () => {
  let tabs = [
    {
      id: 1,
      title: "Sign In",
      content: <SignIn direction={"column"} />,
    },
    {
      id: 2,
      title: "Register",
      content: <Register />,
    },
  ];

  return (
    <div className={styles.container}>
      <TabbedNavigation gap={0} className={styles.tabNavigation} tabs={tabs} />
    </div>
  );
};

export default Authentication;
