package com.one.shade.repository;

import com.one.shade.domain.Contents;
import com.one.shade.domain.QContents;
import com.one.shade.domain.QGenre;
import com.one.shade.domain.QPlatform;
import com.one.shade.util.PredicateQuery;
import com.querydsl.jpa.impl.JPAQueryFactory;
import org.springframework.data.domain.Pageable;

import java.util.List;

public class CustomizedContentsRepositoryImpl implements CustomizedContentsRepository{
    private final JPAQueryFactory queryFactory;


    private CustomizedContentsRepositoryImpl(final JPAQueryFactory queryFactory) {
        this.queryFactory = queryFactory;
    }
    @Override
    public List<Contents> movieList(Pageable pageable, List<Long> platform_ids, Long genre_id) {
        return queryFactory
                .selectFrom(QContents.contents)
                .leftJoin(QPlatform.platform)
                .on(QContents.contents.contents_id.eq(QPlatform.platform.contents_id))
                .leftJoin(QGenre.genre)
                .on(QContents.contents.contents_id.eq(QGenre.genre.contents_id))
                .where(PredicateQuery.search(platform_ids,genre_id))
                .groupBy(QContents.contents.contents_id)
                .orderBy(QContents.contents.opendate.desc())
                .limit(pageable.getPageSize())
                .offset(pageable.getPageNumber())
                .fetch();
    }
}
