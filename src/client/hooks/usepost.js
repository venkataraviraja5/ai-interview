import { useState } from "react";
import axios from "axios";

export default function usePost() {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [response, setResponse] = useState(null);

  const postData = async (endPoint = "", body = {}, isFormData = false) => {
    setLoading(true);
    setError(null);
    setResponse(null);

    try {
      let config = {};
      let payload = body;

      if (isFormData) {
        payload = new FormData()
        for (const key in body) {
          payload.append(key, body[key])
        }
        config.headers = { "Content-Type": "multipart/form-data"}
      }

      const res = await axios.post(endPoint, payload, config)
      console.log(res.data,'apiiiiiiiiiiiiiiiii')
      setResponse(res.data);

      return res.data

    } catch (err) {
      console.error(err);
      setError(err.response?.data?.message || err.message || "Something went wrong")
      return null;
    } finally {
      setLoading(false);
    }

  }

  return { loading, error, response, postData }
}
