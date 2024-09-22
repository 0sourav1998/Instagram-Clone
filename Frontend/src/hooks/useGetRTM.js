import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { setMessages } from "@/redux/slice/chatSlice";

export const useGetRTM = () => {
  const { messages } = useSelector((state) => state.chat);
  const { socket } = useSelector((state) => state.socket);
  const dispatch = useDispatch();
  useEffect(() => {
    socket?.on("newMsg", (msg) => {
      dispatch(setMessages([...messages, msg]));
    });
    return ()=>{
        socket?.off()
    }
  }, [messages]);
};
