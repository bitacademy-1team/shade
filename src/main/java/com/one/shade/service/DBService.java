package com.one.shade.service;

import com.one.shade.domain.Contents;
import com.one.shade.repository.*;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import javax.transaction.Transactional;
import java.util.List;

@Service
@RequiredArgsConstructor
public class DBService {

    private final ContentsRepository contentsRepository;

    private final GenreRepository genreRepository;

    private final PlatformRepository platformRepository;

    private final CastingRepository castingRepository;

    private final PeopleRepository peopleRepository;

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


}
