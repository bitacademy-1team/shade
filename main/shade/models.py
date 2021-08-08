from django.conf import settings
from django.db import models
from django.utils import timezone
from django.db.models import Manager, Count, Case, When, IntegerField


# class Post(models.Model):
#     author = models.ForeignKey(settings.AUTH_USER_MODEL, on_delete=models.CASCADE)
#     title = models.CharField(max_length=200)
#     text = models.TextField()
#     created_date = models.DateTimeField(
#         default=timezone.now)
#     published_date = models.DateTimeField(
#         blank=True, null=True)
#
#     def publish(self):
#         self.published_date = timezone.now()
#         self.save()
#
#     def __str__(self):
#         return self.title


class Contents(models.Model):
    contents_id = models.IntegerField(primary_key=True)
    title = models.CharField(max_length=200)
    opendate = models.CharField(max_length=150)
    playtime = models.IntegerField()
    summary = models.CharField(max_length=1500)
    object_type = models.CharField(max_length=150)
    poster = models.CharField(max_length=150)
    video = models.CharField(max_length=150)
    keyword = models.CharField(max_length=150)

    class Meta:
        db_table = 'contents'


class Users(models.Model):
    id = models.IntegerField(primary_key=True)
    email = models.CharField(max_length=50)
    password = models.CharField(max_length=120)
    roles = models.CharField(max_length=255)
    username = models.CharField(max_length=20)
    nickname = models.CharField(max_length=30)
    leave_date = models.DateTimeField()

    class Meta:
        db_table = 'users'


class ContentsUser(models.Model):
    con_user_id = models.IntegerField(primary_key=True)
    id = models.IntegerField()
    contents_id = models.IntegerField()
    check_like = models.CharField(max_length=10)
    view_count = models.IntegerField()
    visit_last_date = models.CharField(max_length=50)

    @classmethod
    def cou(cls):
        q = cls.objects.annotate(
            cou=Count(Case(
                When(check_like='like', then=1),
                output_field=IntegerField(),
            ))
        ).filter(contents_id=1)
        return q

    class Meta:
        db_table = 'contents_user'


class Reviews(models.Model):
    review_id = models.IntegerField(primary_key=True)
    id = models.IntegerField()
    contents_id = models.IntegerField()
    delete_check = models.CharField(max_length=3)
    comment = models.CharField(max_length=500)
    modify_date = models.CharField(max_length=150)
    create_date = models.CharField(max_length=150)

    class Meta:
        db_table = 'reviews'
