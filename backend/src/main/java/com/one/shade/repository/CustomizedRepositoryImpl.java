package com.one.shade.repository;

import com.one.shade.domain.*;
import com.one.shade.util.PredicateQuery;
import com.one.shade.vo.ContentsListVO;
import com.one.shade.vo.ReviewsListVO;
import com.querydsl.core.types.Projections;
import com.querydsl.jpa.impl.JPAQueryFactory;
import org.springframework.data.domain.Pageable;

import java.util.List;

public class CustomizedRepositoryImpl implements CustomizedRepository{
    private final JPAQueryFactory queryFactory;


    private CustomizedRepositoryImpl(final JPAQueryFactory queryFactory) {
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
        System.out.println(list);
        return list;
    }

    @Override
    public List<ReviewsListVO> reviewList(Long contents_id) {
        List<ReviewsListVO> list = queryFactory.select(Projections.constructor(ReviewsListVO.class, QReviews.reviews.reviewId,QReviews.reviews.id,QUser.user.nickname,QReviews.reviews.comment,QReviews.reviews.createDate,QReviews.reviews.modify_date))
                .from(QReviews.reviews)
                .leftJoin(QUser.user)
                .on(QReviews.reviews.id.eq(QUser.user.id))
                .where(QReviews.reviews.contentsId.eq(contents_id).and(QReviews.reviews.deleteCheck.eq("N")))
                .orderBy(QReviews.reviews.createDate.desc())
                .fetch();
        return list;
    }


}
