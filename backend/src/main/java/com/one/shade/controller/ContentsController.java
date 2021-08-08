package com.one.shade.controller;

import com.one.shade.config.CurrentUser;
import com.one.shade.domain.*;
import com.one.shade.dto.ContentsListDto;
import com.one.shade.security.auth.PrincipalDetails;
import com.one.shade.service.ContentsService;
import com.one.shade.service.ContentsUserService;
import com.one.shade.service.DBService;
import com.one.shade.util.JepRecommend;
import com.one.shade.vo.ContentMovieDetailVO;
import com.one.shade.vo.ContentSummaryVO;
import com.one.shade.vo.ContentsListVO;
import org.json.simple.JSONArray;
import org.json.simple.JSONObject;
import org.json.simple.parser.JSONParser;
import org.json.simple.parser.ParseException;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Pageable;
import org.springframework.data.web.PageableDefault;
import org.springframework.web.bind.annotation.*;

import java.io.BufferedReader;
import java.io.IOException;
import java.io.InputStreamReader;
import java.util.*;

@CrossOrigin(origins = "http://52.79.189.13")
//@CrossOrigin(origins = "http://localhost:3000")
@RestController
@RequestMapping("/api")
public class ContentsController {

    @Autowired
    private DBService DBService;

    @Autowired
    private ContentsService contentsService;

    @Autowired
    private ContentsUserService contentsUserService;

    //줄거리를 불러와 파이썬에서 키워드 추출
    @GetMapping("/dbKeyword")
    public String keyword(){

        List<ContentSummaryVO> list = contentsService.listSummary();
        List<Map> summary = new ArrayList<>();
        String pathPython = "C:\\Users\\wlgud30\\PycharmProjects\\pythonProject\\JavaCall.py";
        String [] cmd = new String[3];
        String str = "";
        String keyword="";
        int i = 0;
        for(ContentSummaryVO vo : list){
            keyword = "\""+vo.getSummary().replaceAll("\"","")+"\"";
            System.out.println(keyword);
            ProcessBuilder pb = new ProcessBuilder()
                    .command("python","-u",pathPython, keyword);
            Process p = null;
            try {
                p = pb.start();
                BufferedReader in = new BufferedReader(
                        new InputStreamReader(p.getInputStream()));
                StringBuilder buffer = new StringBuilder();
                String line = null;
                while ((line = in.readLine()) != null){
                    buffer.append(line);
                }
                int exitCode = p.waitFor();
                //System.out.println(buffer);
                System.out.println("keyword : " + buffer.toString());
                str = buffer.toString().replace("'","").replace("[","").replace("]","").replaceAll(" ","");
                System.out.println("keyword : " + str);
                contentsService.updateKeyword(str,vo.getContents_id());
                in.close();
            }
            catch (IOException e) {
                e.printStackTrace();
            } catch (InterruptedException e) {
                e.printStackTrace();
            }

        }


        return str;
    }

    @GetMapping("/movieList")
    public List<ContentsListVO> movieList(@PageableDefault(page = 0) Pageable pageRequest,@CurrentUser PrincipalDetails principalDetails,@RequestParam("object_type") String object_type,@RequestParam( required = false,name = "platform_ids") String platform_idss){
        System.out.println("플랫폼 : "+platform_idss);
        List<Long> platform_ids = new ArrayList<>();
        if(platform_idss != null){
            List<String> str = Arrays.asList(platform_idss.split(","));
            for(String s :str){
                platform_ids.add(Long.valueOf(s));
            }
        }else{
            platform_ids = null;
        }
        Long genre_id = null;
        System.out.println("object type : "+object_type);
//        String object_type = "movie";
        System.out.println(pageRequest);
        Long id = 0l;
        if(principalDetails != null){
            id = principalDetails.getId();
        }
        System.out.println("movie List id : "+id);
        System.out.println();
        return contentsService.movieList(pageRequest,platform_ids,genre_id,object_type,id);
    }

    @GetMapping("/likeList")
    public List<ContentsListVO> likeList(@CurrentUser PrincipalDetails principalDetails, String like){
        if(principalDetails== null){
            return null;
        }else{
            return contentsService.likeList(principalDetails.getId(), like);
        }
    }

    @GetMapping("/movieDetail")
    public ContentMovieDetailVO movieDetail(@CurrentUser PrincipalDetails principalDetails,Long contents_id){
        //로그인한 사용자라면 로그인한 사용자의 id 와 contents_id를 사용해서 contents_user update or insert
        int result = 0;
        Long id = null;
        if(principalDetails != null){
            id = principalDetails.getId();
            result = contentsUserService.ContentsUserVisit(id, contents_id);
        }
        int visitResult = contentsService.ContentsVisit(contents_id);
        
        String visitStr = visitResult == 0 ? "방문자 카운트 증가 실패!!" : "방문자 카운트 증가 성공!!";
        
        System.out.println(visitStr);
        
        return contentsService.movieDetail(contents_id,id);
    }

    @GetMapping("/movieRecommend")
    public List<ContentsListDto> recommendMovieList(){
        String title = "어벤져스";
        return JepRecommend.titleRecommend(title);
    }


    @RequestMapping("/home")
    public String home() {
        System.out.println("test home");
        return "Hello, Spring boot!";
    }

    //db 데이터 추출
    @RequestMapping("/api")
    public String api(@RequestBody String api){
        try {
            JSONParser jsonParse = new JSONParser();
            JSONArray jArray = null;
            jArray = (JSONArray) jsonParse.parse(api);

            //Map<String, Object> map = new ObjectMapper().readValue(obj.toJSONString(), Map.class) ;
            List<Contents> contentList = new ArrayList<>();
            List<Casting> castingList = new ArrayList<>();
            List<People> peopleList = new ArrayList<>();
            List<Genre> genre_idsList = new ArrayList<>();
            List<Platform> offersList = new ArrayList<>();
            String video = "";
            for (Object o : jArray) {
                JSONObject obj = (JSONObject) o;
                video = "";
                if (obj.get("offers") != null) {
                    JSONArray offers = (JSONArray) obj.get("offers");
                    Set<Long> set = new HashSet<>();
                    for (int j = 0; j < offers.size(); j++) {
                        JSONObject offersObj = (JSONObject) offers.get(j);
                        Long provider_id = (Long) offersObj.get("provider_id");
                        if (provider_id == 3 || provider_id == 8 || provider_id == 96 || provider_id == 97 || provider_id == 356) {
                            set.add(provider_id);
                            JSONObject urlObj = (JSONObject) offersObj.get("urls");
                            Platform platform = Platform.builder()
                                    .platform_id((Long) offersObj.get("provider_id"))
                                    .contents_id((Long) obj.get("id"))
                                    .monetization_type((String) offersObj.get("monetization_type"))
                                    .retail_price((Long) offersObj.get("retail_price"))
                                    .presentation_type((String) offersObj.get("presentation_type"))
                                    .url((String) urlObj.get("standard_web"))
                                    .build();
                            offersList.add(platform);
                        }
                    }
                    if (set.size() == 0) {
                        continue;
                    }
                }
                if (obj.get("clips") != null) {
                    JSONArray clips = (JSONArray) obj.get("clips");
                    for (Object clip : clips) {
                        JSONObject clipsObj = (JSONObject) clip;
                        String video_type = (String) clipsObj.get("type");
                        if (video_type.equals("trailer")) {
                            video = (String) clipsObj.get("external_id");
                        }
                    }
                }
                Contents content = Contents.builder()
                        .contents_id((Long) obj.get("id"))
                        .title((String) obj.get("title"))
                        .object_type((String) obj.get("object_type"))
                        .opendate((String) obj.get("localized_release_date"))
                        .playtime((Long) obj.get("runtime"))
                        .summary((String) obj.get("short_description"))
                        .poster((String) obj.get("poster"))
                        .video(video)
                        .build();
                if (obj.get("credits") != null) {
                    JSONArray credits = (JSONArray) obj.get("credits");
                    for (Object credit : credits) {
                        JSONObject creditsObj = (JSONObject) credit;
                        Casting casting = Casting.builder()
                                .contents_id((Long) obj.get("id"))
                                .people_id((Long) creditsObj.get("person_id"))
                                .character_name((String) creditsObj.get("character_name"))
                                .role((String) creditsObj.get("role"))
                                .build();
                        People people = People.builder()
                                .people_id((Long) creditsObj.get("person_id"))
                                .people_name((String) creditsObj.get("name"))
                                .build();
                        castingList.add(casting);
                        peopleList.add(people);
                    }
                }
                if (obj.get("genre_ids") != null) {
                    JSONArray genre = (JSONArray) obj.get("genre_ids");
                    for (Object value : genre) {
                        Genre newGenre = Genre.builder()
                                .contents_id((Long) obj.get("id"))
                                .genre_id((Long) value)
                                .build();
                        genre_idsList.add(newGenre);
                    }
                }

                contentList.add(content);
            }

            //ioService.contentSaveAll(contentList);
            //ioService.genreSaveAll(genre_idsList);
            //ioService.platformSaveAll(offersList);
            //ioService.castingSaveAll(castingList);
            //ioService.peopleSaveAll(peopleList);


        } catch (ParseException e) {
            e.printStackTrace();
        }

        /*for(String key : map.keySet()){

            String value = String.valueOf(map.get(key));

            System.out.println(key+" : "+value);

        }*/

        return "Hello, Spring boot!";
    }
    @RequestMapping("/api2")
    public String api2(@RequestBody Map<String,Object> map){
        //DBService.epiSave(map);
        return "Hello, Spring boot!";
    }

    @RequestMapping("/findTitle")
    public List<ContentsListVO> findTitle(String title){

        return contentsService.findTitle(title);
    }


}
