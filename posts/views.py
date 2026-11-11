
from django import forms
from django.http import JsonResponse
from django.shortcuts import render
from .models import Post
from django.shortcuts import get_object_or_404
from django.contrib.auth.decorators import login_required
from django.views.decorators.http import require_POST
from .forms import PostForm
from profiles.models import Profile

def home(request):
    return render(request, 'posts/home.html')


def post_list(request):
    form = PostForm(request.POST or None)
    if request.headers.get('x-requested-with') == 'XMLHttpRequest':
        if form.is_valid():
            instance = form.save(commit=False)
            instance.author = request.user
            instance.save()
            return JsonResponse({
                'title': instance.title,
                'body': instance.body,
                'author': instance.author.username,
                'id': instance.id,

            })
    context = {
        'form': form,
    }
    return render(request, 'posts/post_list.html', context)

def post_detail(request, pk):
    obj = Post.objects.get(pk=pk)
    form = PostForm(instance=obj)

    context = {
        'obj': obj,
        'form': form,
    }

    return render(request, 'posts/detail.html', context)

def load_posts(request, num_posts):
    if request.headers.get('x-requested-with') == 'XMLHttpRequest':
        visible = 3
        upper = num_posts
        lower = max(upper - visible, 0)
        size = Post.objects.all().count()

        qs = Post.objects.all().order_by('-created', '-id')[lower:upper]
        data = []

        for obj in qs:
            item = {
                'id': obj.id,
                'title': obj.title,
                'body': obj.body,
                'liked': request.user in obj.liked.all(),
                'count': obj.liked.count(),
                'author': obj.author.username,
            }
            data.append(item)

        return JsonResponse({
            'data': data,
            'size': size
        })    
    return JsonResponse({
        'error': 'AJAX request required'
    }, status=400)

def post_detail_data_view(request, pk):  
    obj = Post.objects.get(pk=pk)
    data = {
        'id': obj.id,
        'title': obj.title,
        'body': obj.body,
        'author': obj.author.username,
        'logged_in': request.user.username,
    }
    return JsonResponse({'data': data})

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

def update_post(request, pk):
    obj = Post.objects.get(pk=pk)
    if request.headers.get('x-requested-with') == 'XMLHttpRequest':
        new_title = request.POST.get('title')
        new_body = request.POST.get('body')
        obj.title = new_title
        obj.body = new_body
        obj.save()
        return JsonResponse({
            'title': new_title,
            'body': new_body,
        })

def delete_post(request, pk):
    obj = Post.objects.get(pk=pk)
    if request.is_ajax():
        obj.delete()
    return JsonResponse
