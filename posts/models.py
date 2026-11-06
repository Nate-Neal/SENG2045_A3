from django.db import models

# Create your models here.
class Post(models.Model):
    title = models.CharField(max_length=200)
    body = models.TextField()
    liked = models.ManyToManyField('auth.User', related_name='liked_posts', blank=True)
    author = models.ForeignKey('auth.User', on_delete=models.CASCADE, related_name='posts')
    updated = models.DateTimeField(auto_now=True)
    created = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return str(self.title)   