import TabbedNavigation from "@components/module/tabbedNavigation";
import styles from "./authentication.module.scss";
import SignIn from "./signIn";
import Register from "./register";

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
      content: <Register gridColumn={"1fr"} />,
    },
  ];

  return (
    <div className={styles.container}>
      <TabbedNavigation gap={0} className={styles.tabNavigation} tabs={tabs} />
    </div>
  );
};

export default Authentication;
