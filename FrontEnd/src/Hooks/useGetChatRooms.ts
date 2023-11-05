import { useEffect, useState } from "react";

const useGetChatRooms = () => {
  const [data, setData] = useState(null);

  useEffect(() => {
    fetch("")
      .then((res) => res.json())
      .then((data) => setData(data));
  }, []);

  return [data];
};

export default useGetChatRooms;