import { Fragment } from 'react';
import { useRouter } from 'next/router';

function PageTemp({output, req}) {
    
  const router = useRouter();  

  console.log(output)
  console.log(req)

  //forces page to refresh props on server
  const refreshData = () => {
    router.replace(router.asPath);
  }

  return (
    <Fragment>
      <h1>Temporary Page</h1>

      <div>
        <button onClick={refreshData}>Test</button>
      </div>
    </Fragment>
  );
}

/*
export async function getServerSideProps(context) {
    const res = await fetch('https://firebasestorage.googleapis.com/v0/b/cs-222-sp-2022.appspot.com/o/sept_2020.json?alt=media&token=dcc1f386-523c-4455-8b96-69ff937108e0');

    const data = await res.json();

    console.log(data);

    return {props: {data},} //returns the data to the client's page
}
*/

export const getServerSideProps = async ( {req} ) => {

  const res = await fetch('https://firebasestorage.googleapis.com/v0/b/cs-222-sp-2022.appspot.com/o/apr_2021.json?alt=media&token=0f799be3-7772-48f0-9d25-fcb9e247e872');
  const data = await res.json();

  console.log(data[0]);

  req = "";

  const output = data[0];

  return {props: {output, req}}
}

export default PageTemp;