package com.one.shade.util;

import org.json.simple.JSONObject;
import org.json.simple.parser.JSONParser;
import org.json.simple.parser.ParseException;

import java.io.*;
import java.net.HttpURLConnection;
import java.net.MalformedURLException;
import java.net.URL;
import java.net.URLEncoder;
import java.util.HashMap;
import java.util.Map;

public class NaverPapagoUtils {

    private static final String CLIENT_ID = "5XMucmDWGZIYYmwSxT4o";
    private static final String CLIENT_SECRET = "ZsxhPV5wmN";
    private static final String API_URL = "https://openapi.naver.com/v1/papago/n2mt";

    public String papago(String text){

        try{
            text = URLEncoder.encode(text,"UTF-8");
        }catch (UnsupportedEncodingException e){
            throw new RuntimeException("인코딩 실패!!",e);
        }

        Map<String,String> requestHeaders = new HashMap<>();
        requestHeaders.put("X-Naver-Client-Id",CLIENT_ID);
        requestHeaders.put("X-Naver-Client-Secret",CLIENT_SECRET);

        String responseBody = post(requestHeaders,text);
        System.out.println(responseBody);

        JSONParser jsonParse = new JSONParser();
        try {
            JSONObject jsonObject = (JSONObject) jsonParse.parse(responseBody);
            JSONObject message = (JSONObject) jsonObject.get("message");
            JSONObject jsonObj = (JSONObject) message.get("result");
            String result = (String) jsonObj.get("translatedText");
            System.out.println(result);
            return result;
        } catch (ParseException e) {
            e.printStackTrace();
            return "";
        }


    }

    private String post (Map<String,String> requestHeaders,String text){
        HttpURLConnection con = connect();
        String postParams = "source=en&target=ko&text="+text;

        try {
            con.setRequestMethod("POST");
            for(Map.Entry<String,String> header : requestHeaders.entrySet()){
                con.setRequestProperty(header.getKey(),header.getValue());
            }

            con.setDoOutput(true);

            try (DataOutputStream wr = new DataOutputStream(con.getOutputStream())){
                wr.write(postParams.getBytes());
                wr.flush();
            }

            int responseCode = con.getResponseCode();
            if(responseCode == HttpURLConnection.HTTP_OK){
                return readBody(con.getInputStream());
            }else{
                return readBody(con.getErrorStream());
            }

        } catch (IOException e) {
            throw new RuntimeException("API 요청과 응답 실패", e);
        } finally {
            con.disconnect();
        }
    }

    private HttpURLConnection connect(){
        try {
            URL url = new URL(API_URL);
            return (HttpURLConnection)url.openConnection();
        } catch (MalformedURLException e) {
            throw new RuntimeException("API URL이 잘못되었습니다. : " + API_URL, e);
        } catch (IOException e) {
            throw new RuntimeException("연결이 실패했습니다. : " + API_URL, e);
        }
    }

    private String readBody(InputStream body){
        InputStreamReader streamReader = new InputStreamReader(body);

        try(BufferedReader lineReader = new BufferedReader(streamReader)){
            StringBuilder responseBody = new StringBuilder();

            String line;

            while ((line=lineReader.readLine())!=null){
                responseBody.append(line);
            }

            return responseBody.toString();
        }catch (IOException e){
            throw new RuntimeException("API 응답을 읽는데 실패했습니다.",e);
        }
    }

}
