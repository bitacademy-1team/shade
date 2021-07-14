import React, {useState, useEffect} from 'react';
import '../App.css';
import '../App';
import axios from 'axios';
import JustWatch from 'justwatch-api';
export default function api() {

let api = "";
let apiResult = [];
let finalResult = [];
let i = 2015;
let obj;
let obj2
let y_from = 1900;
let y_until = 1901;
let str = [];
const api_url = "http://localhost:8080/api"; 
let k = 1;
const btn1 = async () =>{
    
	var justwatch = new JustWatch();
	for(;i<=2021;i++){
		var searchResult = await justwatch.search({query: '',content_types:['show'],providers: ['3','8','96','97','356'],page:1,release_year_from:i,release_year_until:i+1});
		print_result("searchContent", searchResult);
		console.log(searchResult.total_pages);
		if(searchResult.total_pages !== 0 ){

			for(;k<=searchResult.total_pages;k++){

			
				searchResult = await justwatch.search({query: '',content_types:['show'],providers: ['3','8','96','97','356'],page:k,release_year_from:i,release_year_until:i+1});
				print_result("searchContent", searchResult);
				
				for(let j = 0 ; j<searchResult.items.length;j++){
					var n = searchResult.items[j];
					if(n.object_type ==="show"){
						console.log(finalResult);
						var searchContent = await justwatch.getTitle(n.object_type,n.id);
						let a = {id : searchContent.id,title : searchContent.title,poster : searchContent.poster,object_type : searchContent.object_type,
						short_description : searchContent.short_description,runtime : searchContent.runtime,original_release_year : searchContent.original_release_year,
						clips:searchContent.clips,credits:searchContent.credits,offers:searchContent.offers,genre_ids:searchContent.genre_dis,seasons:searchContent.seasons}; 
					
						finalResult = finalResult.concat(a);
					}
					
				}
			}
			k=1;
		}
		console.log(finalResult);
	}
	console.log(finalResult);
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
	var justwatch = new JustWatch();

	for(let j = 0 ; j<1;j++){
		var n = apiResult[j];
		var searchContent = await justwatch.getSeason(224494);
		print_result("searchContent",searchContent)
		let a = {id : searchContent.id,title : searchContent.title,poster : searchContent.poster,object_type : searchContent.object_type,
			short_description : searchContent.short_description,runtime : searchContent.runtime,localized_release_date : searchContent.localized_release_date,
			clips:searchContent.clips,credits:searchContent.credits,offers:searchContent.offers,genre_ids:searchContent.genre_dis}; 
		
		finalResult = finalResult.concat(a);
	}
	console.log(finalResult);
}
function print_result(name, result) {
	console.log(name+":");
	api =JSON.stringify(result, null, 4);
	console.log(JSON.stringify(result, null, 4));
	console.log("\n\n\n\n");
}

function openTextFile() {
    var input = document.createElement("input");
    input.type = "file";
    input.accept = "text/plain"; // 확장자가 xxx, yyy 일때, ".xxx, .yyy"
    input.onchange = function (event) {
        processFile(event.target.files[0]);
    };
    input.click();
}
function openTextFile2() {
    var input = document.createElement("input");
    input.type = "file";
    input.accept = "text/plain"; // 확장자가 xxx, yyy 일때, ".xxx, .yyy"
    input.onchange = function (event) {
        processFile2(event.target.files[0]);
    };
    input.click();
}
let s_id;
function processFile(file) {
    var reader = new FileReader();
    reader.onload = function () {
		apiResult = reader.result
		obj = JSON.parse(apiResult);
		console.log(obj.length)
		console.log(obj)
		/*
		var result = [];
		//var result = obj.filter(x => x.offers.provider_id ===3||x.offers.provider_id===8||x.offers.provider_id ===96||x.offers.provider_id===97||x.offers.provider_id ===356);
		loop1 : for(let i = 0 ; i<obj.length;i++){
			for(let j = 0 ; j<obj[i].offers.length;j++){
				console.log(obj[i].offers)
				if(obj[i].offers[j].provider_id ===3||obj[i].offers[j].provider_id ===8||obj[i].offers[j].provider_id ===96||obj[i].offers[j].provider_id ===97||obj[i].offers[j].provider_id ===356){
					result.push(obj[i])
					continue loop1
				}
			}
		}
		//var result = obj.filter(x => x.offers !== undefined)
		console.log(result);
		console.log("apiResult"+obj.length);
		*/
		//var str ="";
		// console.log(str);
		// s_id = apiResult.split(",");
		// console.log(s_id);
		//obj = JSON.parse(apiResult);
    };
    reader.readAsText(file, /* optional */ "utf-8");
}

function processFile2(file) {
    var reader = new FileReader();
	var rr = []
	var a
    reader.onload = function () {
		var apiResult2 = reader.result
		obj2 = JSON.parse(apiResult2);
		
		// for(let i = 0 ; i<obj.length;i++){
		// 	for(let k = 0 ; k<obj2.length;k++){
		// 		if(obj[i].id===obj2[k].contents_id){
		// 			obj[i].genre_ids = obj2[k].genre_ids
		// 		}
		// 	}
		// }
		// console.log(obj)
		// console.log(obj2)
		// console.log(rr)
		obj = JSON.stringify(obj)
		obj2 = JSON.stringify(obj2)
		axios.post('http://localhost:8080/api2', {
			api1:obj,
			api2:obj2
		});
	}
	reader.readAsText(file, /* optional */ "utf-8");
	
	


}
i = 0 ;
k = 0 ;
function btn4(){
	for(let i = 0 ; i<obj.length;i++){
		let n = obj[i];
		for(let k = 0 ; k<n.seasons.length;k++){
			str += n.seasons[k].id+","
		}
	}
	console.log(str);

}
//json 중복값제거!
function btn6(){
	var result = obj.filter(function(item1, idx1){
		//filter() 메서드는 콜백함수에서 정의한 조건이 true인 항목만 리턴한다.(필터링)
		return obj.findIndex(function(item2, idx2){
			//findIndex() 메서드는 콜백함수에 정의한 조건이 true인 항목의 index를 리턴한다.
			return item1.id === item2.id
		}) === idx1;
	});
	console.log(result)
}

let c_id = 1045741;
let ex_id = 53864;
async function btn5(){
	var justwatch = new JustWatch();
	
	for(; i<s_id.length;i++){
		var searchContent = await justwatch.getSeason(s_id[i]);
		print_result("searchContent",searchContent)
		if(ex_id !== searchContent.show_id){
			c_id++;
		}
		let un = undefined;
		if(searchContent.clips!==undefined){
			un = searchContent.clips[0].external_id
		}
		let a = {contents_id:c_id,season_id : searchContent.id,s_title : searchContent.title,s_poster : searchContent.poster,object_type : searchContent.object_type,
			s_original_release_year : searchContent.original_release_year,clips : un,short_description : searchContent.short_description,
			credits:searchContent.credits,offers:searchContent.offers,season_num:searchContent.season_number,ex_contents_id:searchContent.show_id,
			episodes:searchContent.episodes,genre_ids:searchContent.genre_ids,runtime:searchContent.runtime
		}; 
		
		console.log(searchContent.show_id)
		
		ex_id = searchContent.show_id;
		finalResult = finalResult.concat(a);
		console.log(ex_id)
		console.log(finalResult)
	}
}

  return (
    <div className="App">
      <header className="App-header">
        <h1 className="App-title">msg : </h1>
        <button id="btn1" onClick={btn1}>11</button>
        <button id="btn2" onClick={btn2}>11</button>
        <button id="btn3" onClick={openTextFile}>11</button>
        <button id="btn1" onClick={openTextFile2}>11</button>
      </header>
    </div>
  );
}