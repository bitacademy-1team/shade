import { useState, useEffect } from "react";
import axios from "axios";
import { API_BASE_URL } from "./oauth2/OAuth";

export default function SearchService(query, pageNumber) {
  const [list, setList] = useState([]);
  const [error, setError] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setList([]);
  }, [query]);

  useEffect(() => {
    setLoading(true);
    setError(false);
    let cancel;
    axios({
      method: "GET",
      url: API_BASE_URL+"/findTitle?title="+query,
      cancelToken: new axios.CancelToken((c) => (cancel = c)),
    })
      .then((res) => {
        setList((prevList) => {
          return [...new Set([...prevList, ...res.data.map((l) => l)])];
        });
        setLoading(false);
      })
      .catch((e) => {
        if (axios.isCancel(e)) return;
        setError(true);
      });
    return () => cancel();
  }, [query, pageNumber]);
  return { list, setList };
}