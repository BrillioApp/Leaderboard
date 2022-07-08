import Home from "containers/home/Home";
import { useSelector } from "react-redux";

function UserDetail() {
  const user = useSelector((state) => state.userReducer);

  return (
    <div>
      <Home user={user} table="userDetail" />
    </div>
  );
}

export default UserDetail;
