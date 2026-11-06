from django.shortcuts import render
from .models import Post

def home(request):
    return render(request, 'posts/home.html')

def post_list(request):
    qs = Post.objects.all()
    return render(request, 'posts/post_list.html', {'qs': qs})