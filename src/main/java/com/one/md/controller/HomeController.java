package com.one.md.controller;

import com.fasterxml.jackson.databind.ObjectMapper;
import org.json.simple.JSONObject;
import org.json.simple.parser.JSONParser;
import org.springframework.web.bind.annotation.*;

import java.util.Map;


@CrossOrigin(origins = "http://localhost:3000")
@RestController
public class HomeController {

    private String json_api = "";

    @RequestMapping("/home")
    public String home() {
        System.out.println("옵니까?2");
        return "Hello, Spring boot!";
    }

    @RequestMapping("/api")
    public String api(@RequestBody String api) throws Exception{
        System.out.println(api);
        System.out.println("옵니까?1");

        // String to Json
        JSONParser jsonParse = new JSONParser();
        JSONObject obj =  (JSONObject)jsonParse.parse(api);
        System.out.println("JsonObject 결과 값 :: " + obj);

        Map<String, Object> map = null;

        map = new ObjectMapper().readValue(obj.toJSONString(), Map.class) ;

        for(String key : map.keySet()){

            String value = String.valueOf(map.get(key));

            System.out.println(key+" : "+value);

        }

        return "Hello, Spring boot!";
    }



}
