from django.contrib.postgres import serializers
from django.http import JsonResponse
from django.shortcuts import render
from .models import Post
from django.shortcuts import get_object_or_404
from django.contrib.auth.decorators import login_required
from django.views.decorators.http import require_POST

def home(request):
    return render(request, 'posts/home.html')

def post_list(request):
    qs = Post.objects.all()
    return render(request, 'posts/post_list.html', {'qs': qs})

def load_posts(request, num_posts):
    visible = 3
    upper = num_posts
    lower = upper - visible
    size = Post.objects.all().count()

    qs = Post.objects.all()[:num_posts]
    data = []
    for obj in qs:
        item = {
            'id': obj.id,
            'title': obj.title,
            'body': obj.body,
            'liked': True if request.user in obj.liked.all() else False,
            'count': obj.likes_count,
            'author': obj.author.username,
        }
        data.append(item)
    return JsonResponse({'data': data[lower:upper], 'size': size})

@login_required
@require_POST
def like_unlike_post(request, pk):
    obj = get_object_or_404(Post, pk=pk)

    if request.user in obj.liked.all():
        liked = False
        obj.liked.remove(request.user)
    else:
        liked = True
        obj.liked.add(request.user)

    return JsonResponse({
        'liked': liked,
        'count': obj.liked.count()
    })

def hello_world_view(request):
    return JsonResponse({'text': 'hello world'})