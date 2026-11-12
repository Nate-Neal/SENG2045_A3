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

    @property
    def likes_count(self):
        return self.liked.all().count()
    def get_photos(self):
        return self.photo_set.all()
class Meta:
    ordering = ["-created"]


class Photo(models.Model):
    post = models.ForeignKey(Post, on_delete=models.CASCADE)
    image = models.ImageField(upload_to="photos")
    created = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return f"{self.post.title}-{self.pk}"