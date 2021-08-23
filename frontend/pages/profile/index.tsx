import React from "react";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";
// import AdminTemplate from "../../src/templates/admin";

const Admin = () => {

  return (
    <React.Fragment>
        {/* <AdminTemplate/> */}
        Admin
    </React.Fragment>
  );
};

export const getServerSideProps = async ({ locale }:any) => ({
  props: {
    ...(await serverSideTranslations(locale, ["common"])),
  },
});

export default Admin;
