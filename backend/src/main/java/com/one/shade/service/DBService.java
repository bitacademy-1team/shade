package com.one.shade.service;

import com.one.shade.domain.*;
import com.one.shade.repository.*;
import lombok.RequiredArgsConstructor;
import org.json.simple.JSONArray;
import org.json.simple.JSONObject;
import org.json.simple.parser.JSONParser;
import org.json.simple.parser.ParseException;
import org.springframework.stereotype.Service;

import javax.transaction.Transactional;
import java.util.ArrayList;
import java.util.List;
import java.util.Map;

@Service
@RequiredArgsConstructor
public class DBService {

    private final ContentsRepository contentsRepository;

    private final GenreRepository genreRepository;

    private final PlatformRepository platformRepository;

    private final CastingRepository castingRepository;

    private final PeopleRepository peopleRepository;

    private final SeasonsRepository seasonsRepository;

    private final EpisodeRepository episodeRepository;

    @Transactional
    public void contentSaveAll(List list){

        contentsRepository.saveAll(list);
    }

    @Transactional
    public void genreSaveAll(List list){

        genreRepository.saveAll(list);
    }

    @Transactional
    public void platformSaveAll(List list){

        platformRepository.saveAll(list);
    }

    @Transactional
    public void castingSaveAll(List list){

        castingRepository.saveAll(list);
    }
    @Transactional
    public void peopleSaveAll(List list){

        peopleRepository.saveAll(list);
    }

    @Transactional
    public void epiSave(Map<String,Object> map){
        String contentsData = (String) map.get("api1");
        String episodeData = (String) map.get("api2");
        try{
            JSONParser jsonParser = new JSONParser();
            JSONArray contentsArray = null;
            JSONArray episodeArray = null;
            contentsArray = (JSONArray) jsonParser.parse(contentsData);
            episodeArray = (JSONArray) jsonParser.parse(episodeData);
            //-------contens,genre insert
            List<Contents> contentsList = new ArrayList<>();
            List<Genre> genreList = new ArrayList<>();

            for(Object o : contentsArray){
                JSONObject obj = (JSONObject) o;
                String video = "";
                String poster = (String) obj.get("poster");
                String opendate = String.valueOf(obj.get("original_release_year"));
                if(poster != null){
                    poster.replace("{profile}","s332");
                }
                if(obj.get("clips") != null){
                    JSONArray clips = (JSONArray) obj.get("clips");
                    JSONObject clipsObj = (JSONObject) clips.get(0);
                    video = (String) clipsObj.get("external_id");
                }
                if(opendate!=null && opendate.length()<5){
                    opendate = opendate +"-01-01";
                }
                Contents content = Contents.builder()
                        .contents_id((Long) obj.get("id"))
                        .title((String) obj.get("title"))
                        .object_type("show")
                        .opendate(opendate)
                        .playtime((Long) obj.get("runtime"))
                        .summary((String) obj.get("short_description"))
                        .poster(poster)
                        .video(video)
                        .build();
                contentsList.add(content);
                if (obj.get("genre_ids") != null) {
                    JSONArray genre = (JSONArray) obj.get("genre_ids");
                    for (Object value : genre) {
                        Genre newGenre = Genre.builder()
                                .contents_id((Long) obj.get("id"))
                                .genre_id((Long) value)
                                .build();
                        genreList.add(newGenre);
                    }
                }

            }
            //-------casting,platform,episode,seasons insert
            List<Platform> platformList = new ArrayList<>();
            List<Casting> castingList = new ArrayList<>();
            List<Episode> episodeList = new ArrayList<>();
            List<Seasons> seasonsList = new ArrayList<>();
            List<People> peopleList = new ArrayList<>();

            for(Object o : episodeArray){
                JSONObject obj = (JSONObject) o;
                String poster = (String) obj.get("poster");
                if(poster != null){
                    poster.replace("{profile}","s332");
                }
                String opendate = ((obj).get("s_original_release_year")==null) ? null:"";
                if(obj.get("s_original_release_year")!=null){
                    opendate =String.valueOf(obj.get("s_original_release_year"));
                    if(opendate.length()<5){
                        opendate = opendate +"-01-01";
                    }
                }


                Seasons seasons = Seasons.builder()
                        .season_id((Long) obj.get("season_id"))
                        .contents_id((Long) obj.get("contents_id"))
                        .sea_poster(poster)
                        .sea_num((Long) obj.get("season_num"))
                        .sea_title((String) obj.get("s_title"))
                        .sea_video((String) obj.get("clips"))
                        .sea_summary((String) obj.get("short_description"))
                        .sea_opendate(opendate)
                        .ex_contents_id((Long) obj.get("ex_contents_id"))
                        .build();

                seasonsList.add(seasons);
                //------------season

                if(obj.get("credits") != null){
                    JSONArray credits = (JSONArray) obj.get("credits");
                    for (Object credit : credits) {
                        JSONObject creditsObj = (JSONObject) credit;
                        Casting casting = Casting.builder()
                                .contents_id((Long) obj.get("contents_id"))
                                .people_id((Long) creditsObj.get("person_id"))
                                .character_name((String) creditsObj.get("character_name"))
                                .role((String) creditsObj.get("role"))
                                .season_id((Long) obj.get("season_id"))
                                .object_type("show")
                                .build();
                        People people = People.builder()
                                .people_id((Long) creditsObj.get("person_id"))
                                .people_name((String) creditsObj.get("name"))
                                .build();
                        castingList.add(casting);
                        peopleList.add(people);
                    }
                }
                //-----------casting,people
                if(obj.get("episodes") != null){
                    JSONArray episodes = (JSONArray) obj.get("episodes");
                    for(Object episode : episodes){
                        JSONObject episodeObj = (JSONObject) episode;

                        Episode episode1 = Episode.builder()
                                .episode_id((Long) episodeObj.get("id"))
                                .season_id((Long) obj.get("season_id"))
                                .epi_times((Long) episodeObj.get("runtime"))
                                .epi_title((String) episodeObj.get("title"))
                                .epi_num((Long) episodeObj.get("episode_number"))
                                .epi_summary((String) episodeObj.get("short_description"))
                                .build();
                        episodeList.add(episode1);
                        JSONArray offers = (JSONArray) episodeObj.get("offers");
                        if(offers != null){
                            for(Object offer : offers){
                                JSONObject platforms = (JSONObject) offer;
                                JSONObject urlObj = (JSONObject) platforms.get("urls");
                                Platform platform = Platform.builder()
                                        .contents_id((Long) obj.get("contents_id"))
                                        .platform_id((Long) platforms.get("provider_id"))
                                        .monetization_type((String) platforms.get("monetization_type"))
                                        .retail_price((Long) platforms.get("retail_price"))
                                        .url((String) urlObj.get("standard_web"))
                                        .presentation_type((String) platforms.get("presentation_type"))
                                        .object_type("show")
                                        .episode_id((Long) episodeObj.get("id"))
                                        .build();

                                platformList.add(platform);
                            }
                        }

                    }
                }
            }
            contentsRepository.saveAll(contentsList);
            genreRepository.saveAll(genreList);
            platformRepository.saveAll(platformList);
            seasonsRepository.saveAll(seasonsList);
            episodeRepository.saveAll(episodeList);
            castingRepository.saveAll(castingList);
            peopleRepository.saveAll(peopleList);


        } catch (ParseException e) {
            e.printStackTrace();
        }
    }


}
