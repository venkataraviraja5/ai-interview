import resultService from "../services/result.service";


const resultController = async(req) => {
    const result = await resultService(req)

    return result
}


export default resultController