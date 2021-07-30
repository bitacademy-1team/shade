package com.one.shade.repository;

import com.one.shade.domain.QContents;
import com.one.shade.domain.QContentsUser;
import com.one.shade.domain.QGenre;
import com.one.shade.domain.QPlatform;
import com.one.shade.util.PredicateQuery;
import com.one.shade.vo.ContentsListVO;
import com.querydsl.core.types.Projections;
import com.querydsl.jpa.impl.JPAQueryFactory;
import org.springframework.data.domain.Pageable;

import java.util.List;

public class CustomizedContentsRepositoryImpl implements CustomizedContentsRepository{
    private final JPAQueryFactory queryFactory;


    private CustomizedContentsRepositoryImpl(final JPAQueryFactory queryFactory) {
        this.queryFactory = queryFactory;
    }
    @Override
    public List<ContentsListVO> movieList(Pageable pageable, List<Long> platform_ids, Long genre_id, String object_type, Long id) {
        List<ContentsListVO> list = queryFactory
                .select(Projections.constructor(ContentsListVO.class,QContents.contents.contents_id,QContents.contents.title,QContents.contents.poster,QContentsUser.contentsUser.check_like))
                .from(QContents.contents)
                .leftJoin(QPlatform.platform)
                .on(QContents.contents.contents_id.eq(QPlatform.platform.contents_id))
                .leftJoin(QGenre.genre)
                .on(QContents.contents.contents_id.eq(QGenre.genre.contents_id))
                .leftJoin(QContentsUser.contentsUser)
                .on(QContents.contents.contents_id.eq(QContentsUser.contentsUser.contents_id).and(PredicateQuery.loginCheck(id)))
                .where(QContents.contents.object_type.eq(object_type).and(PredicateQuery.search(platform_ids,genre_id)))
                .groupBy(QContents.contents.contents_id)
                .orderBy(QContents.contents.opendate.desc(),QContents.contents.title.desc())
                .limit(pageable.getPageSize())
                .offset(pageable.getPageNumber())
                .fetch();

        return list;
    }
}
