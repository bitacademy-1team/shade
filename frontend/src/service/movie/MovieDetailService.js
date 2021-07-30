import axios from 'axios'; 
import { API_BASE_URL, ACCESS_TOKEN } from '../oauth2/OAuth';

class MovieDetailService {

    getMovieDetail(contents_id) {
        return axios.get(API_BASE_URL+"/movieDetail?contents_id="+contents_id,{ headers:{'Content-Type': 'application/json','Authorization':'Bearer ' + localStorage.getItem(ACCESS_TOKEN)}});
    }
}

export default new MovieDetailService();