package com.one.shade.content.test;

import com.one.shade.repository.ContentsRepository;
import com.one.shade.vo.ContentMovieDetailVO;
import com.one.shade.vo.ContentsListVO;
import org.junit.Test;
import org.junit.runner.RunWith;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.test.context.junit4.SpringRunner;

import javax.transaction.Transactional;
import java.util.List;
import java.util.stream.Collectors;

@RunWith(SpringRunner.class)
@SpringBootTest(webEnvironment = SpringBootTest.WebEnvironment.RANDOM_PORT)
public class ContentsRepositoryTest {

    @Autowired
    private ContentsRepository contentsRepository;

    /*@After
    public void cleanup(){
        contentsRepository.deleteAll();
    }*/

    /*@Test
    public void create(){

        Contents content =
                Contents.builder()
                        .contents_id(1l)
                        .opendate(null)
                        .title("제목")
                        .playtime(90L)
                        .object_type("movie")
                        .summary("abcd")
                        .build();
        Contents newContent = contentsRepository.save(content);
        System.out.println(content.toString());
    }*/

    @Test
    @Transactional
    public void list(){

        List<ContentMovieDetailVO> contentsList =contentsRepository.findAllWithGenre("20210608").stream().map(ContentMovieDetailVO::new).collect(Collectors.toList());


        System.out.println(contentsList.get(0));
    }
}
