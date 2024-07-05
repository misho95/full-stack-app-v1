import { useSessionUser } from "../../utils/global-context";
import { UserType } from "../../utils/types";
import FormContainer from "./form-container";

const AuthSession = ({ localUser }: { localUser: UserType }) => {
  const { setUser } = useSessionUser();

  return (
    <FormContainer title>
      <div>avatar</div>
      <div>{localUser.username}</div>
      <button
        onClick={() => {
          setUser(localUser);
        }}
      >
        login as {localUser.username}
      </button>
    </FormContainer>
  );
};

export default AuthSession;
