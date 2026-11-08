from django.urls import path
from .views import post_list, hello_world_view, load_posts
app_name = 'posts'

urlpatterns = [
    path('', post_list, name='main-board'),
    path('hello-world/',hello_world_view, name='hello-world'),
    path('load-posts/', load_posts, name='load-posts'),
]