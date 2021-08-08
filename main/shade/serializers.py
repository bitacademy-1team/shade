from rest_framework import serializers  # serializer import
from .models import Contents  # 선언한 모델 import
from .models import ContentsUser


class ContentsSerializer(serializers.ModelSerializer):
    class Meta:
        model = Contents  # 모델 설정
        fields = ('contents_id', 'title', 'opendate', 'summary', 'playtime', 'poster', 'video', 'keyword')  # 필드 설정


class ContentsUserSerializer(serializers.ModelSerializer):
    class Meta:
        model = ContentsUser
        fields = ('id', 'contents_id', 'check_like', 'view_count', 'visit_last_date', 'cou')
