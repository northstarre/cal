import { getToken } from "next-auth/jwt";

export default async (req, res) => {
  const token = await getToken({ req });
  if (token) {
    // Signed in
    console.log("JSON Web Token", JSON.stringify(token, null, 2));
  } else {
    // Not Signed in
    res.status(401);
  }
  res.end();
};
