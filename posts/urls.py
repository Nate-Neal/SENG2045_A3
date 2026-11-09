from django.urls import path
from .views import post_list, hello_world_view, load_posts, like_unlike_post, post_detail, post_detail_data_view
app_name = 'posts'

urlpatterns = [
    path('', post_list, name='main-board'),
    path('<int:pk>', post_detail, name= 'post-detail'),
    path('load-posts/<int:num_posts>/', load_posts, name='load-posts'),
    path('like-unlike/<int:pk>/', like_unlike_post, name='like-unlike'),
    path('<int:pk>/data/', post_detail_data_view, name='post-detail-data'),
]