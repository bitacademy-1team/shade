from django.contrib import admin
from .models import *


# Register your models here.

class ContentsAdmin(admin.ModelAdmin):
    list_display = ['contents_id', 'title', 'opendate', 'object_type']  # 커스터마이징 코드


class ContentsUserAdmin(admin.ModelAdmin):
    list_display = ['con_user_id', 'id', 'contents_id', 'check_like', 'view_count', 'visit_last_date']


class UsersAdmin(admin.ModelAdmin):
    list_display = ['id', 'email', 'username', 'nickname', 'leave_date']


admin.site.register(Contents, ContentsAdmin)
admin.site.register(Users, UsersAdmin)
admin.site.register(ContentsUser, ContentsUserAdmin)
admin.site.register(Reviews)
