import uuid

from django.db import models
from django.contrib.auth.models import AbstractUser

# Create your models here.

class User(AbstractUser):
    """
    Custom user model 
    """
    name = models.CharField(max_length=100)
    organisation = models.CharField(max_length=100)
    
    def get_all_jobs(self):
        """ Returns all the jobs posted by this user

        Returns:
            [QuerySet]: jobs with foreign connection to this user
        """
        return self.job_set.all()

class Job(models.Model):
    id = models.UUIDField(default=uuid.uuid4, editable=False, unique=True, primary_key=True)
    creator = models.ForeignKey(User, on_delete=models.CASCADE)
    title = models.CharField(max_length=100)
    description = models.TextField()
    location = models.CharField(max_length=100)
    applicant_count = models.IntegerField(default=0)
    created_at = models.DateTimeField(auto_now_add=True, editable=False)
    questions = models.JSONField(blank=True,null=True)

    def __str__(self) -> str:
        return self.title
    
    """ Returns all the applications for this job

    Returns:
        [QuerySet]: jobs with foreign connection to this job
    """
    def get_all_applications(self):
        return self.application_set.all()
    
class Application(models.Model):
    id = models.UUIDField(default=uuid.uuid4, editable=False, unique=True, primary_key=True)
    job_id=models.ForeignKey(Job,on_delete=models.CASCADE)
    resume_url=models.CharField(max_length=100,null=False,blank=False)
    name=models.CharField(max_length=100,blank=True,null=True)
    email=models.EmailField(blank=True,null=True)
    github=models.URLField(blank=True,null=True)
    analytics=models.JSONField(blank=True,null=True)
    rating=models.FloatField(blank=False,null=True)