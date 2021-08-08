package com.one.shade.service;

import com.one.shade.domain.ContentsUser;


public interface ContentsUserService {

    int ContentsUserInsertOrUpdate(Long id , Long contents_id,String like);

    ContentsUser findOneByIdAndContentsId(Long id , Long contents_id);

    int ContentsUserVisit(Long id, Long contents_id);



}
