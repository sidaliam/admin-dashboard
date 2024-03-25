import { useEffect, useState } from "react";
import axios from "axios";
const useF = (url) => {
  const [data, setdata] = useState([]);
  const [loading, setloading] = useState(false);
  const [error, seterror] = useState(false);

  useEffect(() => {
    const fetchdata = async () => {
      setloading(true);
      try {
        const res = await axios.get(url);
        setdata(res.data);
      } catch (err) {
        seterror(err);
      }
      setloading(false);
    };
    fetchdata();
  }, [url]);

  const refetchdata = async () => {
    setloading(true);
    try {
      const res = await axios.get(url);
      setdata(res.data);
    } catch (err) {
      seterror(err);
    }
    setloading(false);
  };
  return {data,error,loading,refetchdata}
};

export default useF;