from django.contrib.postgres import serializers
from django.http import JsonResponse
from django.shortcuts import render
from .models import Post


def home(request):
    return render(request, 'posts/home.html')

def post_list(request):
    qs = Post.objects.all()
    return render(request, 'posts/post_list.html', {'qs': qs})

def load_posts(request):
    qs = Post.objects.all()
    data = []
    for obj in qs:
        item = {
            'id': obj.id,
            'title': obj.title,
            'body': obj.body,
            'author': obj.author.username,
        }
        data.append(item)
    return JsonResponse({'data': data})

def hello_world_view(request):
    return JsonResponse({'text': 'hello world'})