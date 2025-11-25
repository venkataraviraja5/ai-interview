import axios from "axios"
import { useState } from "react"

export default function usePost () {

    const[loading,setLoading] = useState(false)

    const postData = async(endPoint='',body={},formData=false) => {
        setLoading(true)
        const data = await axios.post(endPoint,body,)

    }
}