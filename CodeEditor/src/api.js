import axios from 'axios';
import { LANGUAGES_VERSIONS } from './constants';
const API = axios.create({
    baseURL: 'https://emkc.org/api/v2/piston'
})
export const executeCode = async (sourceCode, language) => {
    const response = await API.post('/execute', {
        "language": language,
        "version": LANGUAGES_VERSIONS[language],
        "files": [
            {

                "content": sourceCode
            }
        ],
    });

    return response.data
}

function extractCode(){

}