import axios from 'axios'; 

const BOARD_API_BASE_URL = "http://localhost:8080/movieDetail"; 

class MovieDetailService {

    getMovieDetail(contents_id) {
        return axios.get(BOARD_API_BASE_URL+"?contents_id="+contents_id);
    }
}

export default new MovieDetailService();