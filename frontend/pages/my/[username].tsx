import React from "react";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";
import { useRouter } from "next/router";
import {MyLinksTemplate} from '../../src/templates/my-links';
import adminApi from '../../src/api/adminApi';
import authApi from '../../src/api/authApi';

const MyLinks = ({linksData, socialsData, profileData}:any) => {

  return (
    <React.Fragment>
      <MyLinksTemplate linksData={linksData} socialsData={socialsData} profileData={profileData}/>
    </React.Fragment>
  );
};

export async function getStaticProps({params}:any) {

  const linksData = await adminApi.getLinksApi({username: params.username}).then((res) => {
    if(res.data.success) {
      return res.data.data
    } else return [];
  }).catch()

  const socialsData = await adminApi.getSocialsApi({username: params.username}).then((res) => {
    if(res.data.success) {
      return res.data.data
    } else return [];
  }).catch()

  const profileData = await authApi.getUserApi({username: params.username}).then(res => {
    if(res.data.success) {
      console.log(1)
      return res.data.data
    } else return null;
  }).catch()  
  console.log(2)

  return {
    props: {
      linksData,
      socialsData,
      profileData,
    },
  }
}

export async function getStaticPaths() {
  return {
    paths: [1].map(() => ({
      params: {
        username: 'user1',
      }
    })), //indicates that no page needs be created at build time
    fallback: 'blocking' //indicates the type of fallback
  }
}

// export const getServerSideProps = async ({ locale }:any) => ({
//   props: {
//     ...(await serverSideTranslations(locale, ["common"])),
//   },
// });

export default MyLinks;
