import axios from 'axios'; 

const BOARD_API_BASE_URL = "http://localhost:8080/movieList"; 

class MovieService {

    getMovies(page) {
        return axios.get(BOARD_API_BASE_URL+"?page="+page);
    }
}

export default new MovieService();