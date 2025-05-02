import { useEffect } from "react";
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import { setMessages } from "../../redux/MessageSlice";
function UseGetMessages() {
  const { selectedUser } = useSelector((store) => store.user);
  const dispatch = useDispatch();
  useEffect(() => {
    const fetchmessages = async () => {
      // if (!selectedUser?._id) return;
      try {
        axios.defaults.withCredentials = true;
        const res = await axios.get(
          `http://localhost:4000/api/v1/message/${selectedUser._id}`
        );
        // console.log(res);
        //store
        dispatch(setMessages(res.data));
      } catch (error) {
        console.log(error);
      }
    };
    fetchmessages();
  }, [selectedUser?._id, dispatch]);
}

export default UseGetMessages;
