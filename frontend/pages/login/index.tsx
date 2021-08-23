import React from "react";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";
import LoginTemplate from "../../src/templates/login";

const Login = () => {

  return (
    <React.Fragment>
        <LoginTemplate/>
    </React.Fragment>
  );
};

export const getServerSideProps = async ({ locale }:any) => ({
  props: {
    ...(await serverSideTranslations(locale, ["common"])),
  },
});

export default Login;
