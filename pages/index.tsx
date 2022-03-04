import { getSession } from "@lib/auth";

function RedirectPage() {
  return;
}

export async function getServerSideProps(context) {
  const session = await getSession(context);
  console.log("on Client", session?.user);
  return { redirect: { permanent: false, destination: "/Home" } };
}

export default RedirectPage;
