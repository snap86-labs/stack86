import GoogleIcon from "../assets/google.svg"
import { Button } from "./base/button"

9
export const SigninButton = () => {
  return (
    <Button variant="outline">
      <img src={GoogleIcon} alt="Google" className="w-4 h-4" />
      Sign in with Google
    </Button>
  );
};