package com.one.shade.service;

import com.one.shade.domain.Contents;
import com.one.shade.repository.ContentsRepository;
import com.one.shade.vo.ContentMovieDetailVO;
import com.one.shade.vo.ContentSummaryVO;
import com.one.shade.vo.ContentsListVO;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;

import javax.transaction.Transactional;
import java.util.List;
import java.util.stream.Collectors;

@Service
public class ContentsServiceImpl  implements ContentsService{

    @Autowired
    private ContentsRepository contentsRepository;

//    @Transactional
//    public List<ContentsListVO> listMovie(String date, Pageable pageable){
//        //return contentsRepository.listMovie(date,pageable).stream().map(ContentsListVO::new).collect(Collectors.toList());
//
//        pageable = PageRequest.of(pageable.getPageNumber(), pageable.getPageSize());
//        Page<Contents> managers = contentsRepository.listMovie(date,pageable);
//
//        return managers.stream().map(
//                contents -> new ContentsListVO(
//                        contents.getContents_id(),
//                        contents.getTitle(),
//                        contents.getPoster()
//                )).collect(Collectors.toList());
//
//    }

    @Transactional
    @Override
    public List<ContentsListVO> movieList(Pageable pageable,List<Long> platform_ids, Long genre_id,String object_type,Long id){
        //return contentsRepository.listMovie(date,pageable).stream().map(ContentsListVO::new).collect(Collectors.toList());

        pageable = PageRequest.of(pageable.getPageNumber(), pageable.getPageSize());
        List<ContentsListVO> managers = contentsRepository.movieList(pageable,platform_ids,genre_id,object_type,id);
        System.out.println(managers);
        return managers.stream().map(
                contentsListVO -> new ContentsListVO(
                        contentsListVO.getContents_id(),
                        contentsListVO.getTitle(),
                        contentsListVO.getPoster(),
                        contentsListVO.getCheck_like()
                )).collect(Collectors.toList());
    }



    @Transactional
    @Override
    public ContentMovieDetailVO movieDetail(Long contents_id){
        return contentsRepository.movieDetail(contents_id);
    }


    @Transactional
    @Override
    public List<ContentSummaryVO> listSummary(){
        return contentsRepository.findContentsIdSummary().stream().map(ContentSummaryVO::new).collect(Collectors.toList());
    }

    @Transactional
    @Override
    public void updateKeyword(String keyword,Long contents_id){
        contentsRepository.updateKeyword(keyword,contents_id);
    }

    @Transactional
    @Override
    public List<ContentsListVO> findTitle(String title){
        List<Contents> managers = contentsRepository.findTop12ByTitleContains(title);
        List<ContentsListVO> list = managers.stream().map(
                contentsListVO -> new ContentsListVO(
                        contentsListVO.getContents_id(),
                        contentsListVO.getTitle(),
                        contentsListVO.getPoster()
                )).collect(Collectors.toList());

        return list;
    }
}
