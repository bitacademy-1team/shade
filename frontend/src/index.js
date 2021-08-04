import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import { BrowserRouter} from 'react-router-dom';
import axios from "axios";

ReactDOM.render(
  <React.StrictMode>
    <BrowserRouter>
    <App />
    </BrowserRouter>
  </React.StrictMode>,
  document.getElementById('root')
);

const JustWatch = require('justwatch-api');
let api = "";
let apiResult = [];
let finalResult = [];
let i = 0;
const api_url = "http://localhost:8080/api"; 
async function btn1(){
	//alert("hi");
	var justwatch = new JustWatch();
	for(let i=0;i<=20;i++){
		var searchResult = await justwatch.search({query: '',page:i,object_type:"show",providers:[3,8,96,97,356]});
		print_result("searchContent", searchResult);
		/* 
		for(let j = 0 ; j<searchResult.items.length/10;j++){
			var n = searchResult.items[j];
			var searchContent = await justwatch.getTitle(n.object_type,n.id);
			let a = {id : searchContent.id,title : searchContent.title,poster : searchContent.poster,object_type : searchContent.object_type,
				short_description : searchContent.short_description,runtime : searchContent.runtime,localized_release_date : searchContent.localized_release_date,
				clips:searchContent.clips,credits:searchContent.credits,offers:searchContent.offers,genre_ids:searchContent.genre_dis}; 
			
			finalResult = finalResult.concat(a);
		}
		*/

	}
	//console.log(finalResult);
	//document.getElementById("btn1").disabled = true;
	
	//var episodes = await justwatch.getEpisodes(searchResult.items[0].id);
	//print_result("episodes", episodes);
    
    //var searchContent = await justwatch.getTitle("movie","822043");
    //print_result("searchContent", searchContent);

	//var searchPerson = await justwatch.getPerson("44201");
	//print_result("searchContent", searchPerson);

	//console.log(searchResult.items);

	//alert(searchResult);
	//axios.post(api_url,searchResult);
};
/*
document.getElementById("btn2").addEventListener("click",(function(){
	var justwatch = new JustWatch();
	apiResult.forEach(function(n){
		setTimeout(async function() {
			var searchContent = await justwatch.getTitle(n.object_type,n.id);
			//print_result("searchContent", searchContent);
			let a = {id : n.id,title : n.title,poster : n.poster,object_type : n.object_type,short_description : n.short_description,runtime : n.runtime,localized_release_date : n.localized_release_date}; 
			finalResult = finalResult.concat(a);
		}, 11000);
		
	})
	for(let j = 0 ; j<apiResult.length;j++){
		var searchContent = await justwatch.getTitle(n.object_type,n.id);
	}
	console.log(finalResult);
}));
*/
async function btn2(){
	/*var justwatch = new JustWatch();

	for(let j = 0 ; j<apiResult.length;j++){
		var n = apiResult[j];
		var searchContent = await justwatch.getTitle(n.object_type,n.id);
		let a = {id : searchContent.id,title : searchContent.title,poster : searchContent.poster,object_type : searchContent.object_type,
			short_description : searchContent.short_description,runtime : searchContent.runtime,localized_release_date : searchContent.localized_release_date,
			clips:searchContent.clips,credits:searchContent.credits,offers:searchContent.offers,genre_ids:searchContent.genre_dis}; 
		
		finalResult = finalResult.concat(a);
		setTimeout(function(){

		},3000)
	}
	console.log(finalResult);*/
	const options = {
		method: 'GET',
		url: 'https://utelly-tv-shows-and-movies-availability-v1.p.rapidapi.com/lookup',
		params: {term: 'bojack', country: 'kr'},
		headers: {
		  'x-rapidapi-key': '87a2e2ca4amsh39594de9e097d59p124e41jsnae7330789859',
		  'x-rapidapi-host': 'utelly-tv-shows-and-movies-availability-v1.p.rapidapi.com'
		}
	  };
	  
	  axios.request(options).then(function (response) {
		  console.log(response.data);
	  }).catch(function (error) {
		  console.error(error);
	  });
};

function print_result(name, result) {
	console.log(name+":");
	api =JSON.stringify(result, null, 4);
	console.log(JSON.stringify(result, null, 4));
	console.log("\n\n\n\n");
}
