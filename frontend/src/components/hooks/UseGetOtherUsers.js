import axios from "axios";
import { useDispatch } from "react-redux";
import { setOtherUsers } from "../../redux/UserSlices";
import { useEffect } from "react";
function UseGetOtherUsers() {
  const dispatch = useDispatch();
  useEffect(() => {
    const fetchOtherUsers = async () => {
      try {
        axios.defaults.withCredentials = true;
        const res = await axios.get("http://localhost:4000/api/v1/user/");
        // console.log(res);
        //store
        dispatch(setOtherUsers(res.data));
      } catch (error) {
        console.log(error);
      }
    };
    fetchOtherUsers();
  }, [dispatch]);
}

export default UseGetOtherUsers;
