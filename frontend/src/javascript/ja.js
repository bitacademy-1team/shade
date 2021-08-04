//let i = 1;
const JustWatch = require('justwatch-api');
let api = "";
let apiResult = [];
let finalResult = [];
let i = 1000;
let idList;
let j = 0
const api_url = "http://localhost:8080/api"; 
document.getElementById("btn1").addEventListener("click",(async function(){
	//alert("hi");
	
	var justwatch = new JustWatch();

	var searchContent = await justwatch.getTitle("show","33582");
    print_result("searchContent", searchContent);
	var searchContent = await justwatch.getSeason("50299");
    print_result("searchContent", searchContent);
	var searchResult = await justwatch.search({query: '',page:1,page_size:100,content_types:['show']});
		print_result("searchContent", searchResult);
	 
		for(let i = 1900;i<=2021;i++){
		var searchResult = await justwatch.search({query: '',page:1,page_size:100,content_types:['show'],release_year_from:i,release_year_until:i});
		print_result("searchContent", searchResult);
		let total_pages = searchResult.total_pages
		for(let j = 1; j<=total_pages;j++){
			searchResult = await justwatch.search({query: '',page:j,page_size:100,content_types:['show'],release_year_from:i,release_year_until:i});
			if(searchResult.items.length!=0){
				for(let k=0;k<searchResult.items.length;k++){
					var n = searchResult.items[k];
					finalResult = finalResult.concat(n.id);
				}
			}
		}
	}

	
	/*
	for(let i=0;i<=20;i++){
		var searchResult = await justwatch.search({query: '',page:i,page_size:100,content_types:['movie'],release_year_from:1900,release_year_until:1978});
		print_result("searchContent", searchResult);
		for(let j = 0 ; j<searchResult.items.length;j++){
			var n = searchResult.items[j];
			var searchContent = await justwatch.getTitle(n.object_type,n.id);
			let a = {id : searchContent.id,title : searchContent.title,poster : searchContent.poster,object_type : searchContent.object_type,
				short_description : searchContent.short_description,runtime : searchContent.runtime,localized_release_date : searchContent.localized_release_date,
				clips:searchContent.clips,credits:searchContent.credits,offers:searchContent.offers,genre_ids:searchContent.genre_dis}; 
			
			finalResult = finalResult.concat(a);
		}
		

	}
	*/
	console.log(finalResult);
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
}));
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
function startInterval(callback) {

	btn2(); 

	return setInterval(callback,6000000); 
}

async function btn2(){
	var justwatch = new JustWatch();

	for(; j<i;j++){
		var n = idList[j];
		var searchContent = await justwatch.getTitle('movie',n.id);
		let a = {id : searchContent.id,title : searchContent.title,poster : searchContent.poster,object_type : searchContent.object_type,
			short_description : searchContent.short_description,runtime : searchContent.runtime,localized_release_date : searchContent.localized_release_date,
			clips:searchContent.clips,credits:searchContent.credits,offers:searchContent.offers,genre_ids:searchContent.genre_ids};
			console.log("for 안 : "+j);
		finalResult = finalResult.concat(a);
	}
	i = i+1000;
	console.log("for 밖 : "+j);
		/*for(; j<j+1000;j++){
			var n = idList[j];
			var searchContent = await justwatch.getTitle('movie',n.id);
			let a = {id : searchContent.id,title : searchContent.title,poster : searchContent.poster,object_type : searchContent.object_type,
				short_description : searchContent.short_description,runtime : searchContent.runtime,localized_release_date : searchContent.localized_release_date,
				clips:searchContent.clips,credits:searchContent.credits,offers:searchContent.offers,genre_ids:searchContent.genre_dis}; 
				console.log("for 안 : "+j);
			finalResult = finalResult.concat(a);
		}
		console.log("for 밖 : "+j);
		j = j+1000
		*/
}

document.getElementById("btn2").addEventListener("click",(function(){
	startInterval(btn2());
	console.log(finalResult);
}));

document.getElementById("btn3").addEventListener("click",function(){
	var input = document.createElement("input");
    input.type = "file";
    input.accept = "text/plain"; // 확장자가 xxx, yyy 일때, ".xxx, .yyy"
    input.onchange = function (event) {
        processFile(event.target.files[0]);
    };
    input.click();
})
function processFile(file) {
    var reader = new FileReader();
    reader.onload = function () {
		idList = JSON.parse(reader.result.replace(/(\r\n\t|\n|\r\t)/gm,''));
		console.log(idList);
    };
    reader.readAsText(file, /* optional */ "UTF-8");
}

document.getElementById("btn4").addEventListener("click",function(){
	axios.post(api_url,idList)
})

function print_result(name, result) {
	console.log(name+":");
	api =JSON.stringify(result, null, 4);
	console.log(JSON.stringify(result, null, 4));
	console.log("\n\n\n\n");
}