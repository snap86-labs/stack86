import { GoogleIcon } from "../assets/icons";
import { Button } from "./base/button"


export const SigninButton = () => {
  return <Button variant="outline">
    <GoogleIcon />
    Sign in with Google
  </Button>;
};