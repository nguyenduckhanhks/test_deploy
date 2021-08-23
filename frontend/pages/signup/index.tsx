import React from "react";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";
import SignupTemplate from "../../src/templates/signup";

const Signup = () => {

  return (
    <React.Fragment>
        <SignupTemplate/>
    </React.Fragment>
  );
};

export const getServerSideProps = async ({ locale }:any) => ({
  props: {
    ...(await serverSideTranslations(locale, ["common"])),
  },
});

export default Signup;
