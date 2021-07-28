package com.one.shade.util;

import com.one.shade.domain.QContentsUser;
import com.one.shade.domain.QGenre;
import com.one.shade.domain.QPlatform;
import com.querydsl.core.BooleanBuilder;
import com.querydsl.core.types.Predicate;

import java.util.List;
public class PredicateQuery {

    public static Predicate search(List<Long> platform_ids, Long genre_id){
        QGenre genre = QGenre.genre;
        QPlatform platform = QPlatform.platform;

        BooleanBuilder builder = new BooleanBuilder();

        if(platform_ids != null){
            builder.and(platform.platform_id.in(platform_ids));
        }
        if(genre_id != null){
            builder.and(genre.genre_id.eq(genre_id));
        }

        return builder;
    }

    public static Predicate loginCheck(Long id){
        QContentsUser cu = QContentsUser.contentsUser;

        BooleanBuilder builder = new BooleanBuilder();

        if(id != null){
            builder.and(cu.id.eq(id));
        }

        return builder;
    }
}
