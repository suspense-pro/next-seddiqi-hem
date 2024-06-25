import { FormEvent } from 'react'
import Layout from "@components/layout";
import ContentBlock from "@components/module/contentBlock";
import compact from "lodash/compact";
import { GetServerSidePropsContext } from "next";
import {
  getContentItemByKey,
  getHierarchyChildren,
} from "@utils/cms/amplience";
import { mapToID } from "@utils/helpers";

import { getCustomer, registerCustomer2 } from "@utils/sfcc-connector/dataService";
import LoginForm from "@components/LoginForm";
import RegistrationForm from "@components/RegistrationForm";

export async function getServerSideProps(context: GetServerSidePropsContext) {
  const data: any = await getContentItemByKey("homepage");
  const contents = await getHierarchyChildren(data._meta.deliveryId);


  return {
    props: {
      ...data,
      contents: contents,
    },
  };
}

export default function Home({ contents }) {

const getCustomerObj = async () =>  {

  alert("customer Information!");
  try {
    const response = await getCustomer();
    if (response)
    alert (response);
  } catch(err) {
    console.log('Error submitting form: ' + err.message);
  }
}

const rigisterCustomerSFCC = async () =>  {

  console.log("customer Registration!");
  try {
    const response = await registerCustomer2();
    if (response)
    alert (response);
  } catch(err) {
    console.log('Error submitting form: ' + err.message);
  }
}

  return (
    <div className="main-content">
      {compact(contents).map((content) => (
        <ContentBlock
          content={content}
          type="CONTENT"
          key={content?._meta.deliveryId}
        />
      ))}

      <RegistrationForm />
      
      <button onClick={rigisterCustomerSFCC}> Get Customer</button>

      <LoginForm />

    </div>    
  );
}

Home.Layout = Layout;
