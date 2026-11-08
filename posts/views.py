from django.contrib.postgres import serializers
from django.http import JsonResponse
from django.shortcuts import render
from .models import Post


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
            'author': obj.author.username,
        }
        data.append(item)
    return JsonResponse({'data': data[lower:upper], 'size': size})

def hello_world_view(request):
    return JsonResponse({'text': 'hello world'})