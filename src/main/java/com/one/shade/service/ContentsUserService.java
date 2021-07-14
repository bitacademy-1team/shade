package com.one.shade.service;

import com.one.shade.domain.ContentsUser;

public interface ContentsUserService {

    void ContentsUserInsertOrUpdate(Long id , Long contents_id);

    ContentsUser findOneByIdAndContentsId(Long id , Long contents_id);
}
