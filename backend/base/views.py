from django.contrib.auth.hashers import make_password

from rest_framework import status
from rest_framework.decorators import api_view
from rest_framework.decorators import permission_classes
from rest_framework.permissions import IsAuthenticated
from rest_framework.response import Response

from rest_framework_simplejwt.serializers import TokenObtainPairSerializer
from rest_framework_simplejwt.views import TokenObtainPairView

from utils import extract_info_from_resume

from .serializers import ApplicationBriefSerializer,UserSerializerWithToken, JobSerializer, ApplicationSerializer
from .models import User,Job, Application
from .permissions import JobPermissions, ApplicationPermissions

from .bot_utils import get_question_from_jd, get_candidate_rating
# Create your views here.


class MyTokenObtainPairSerializer(TokenObtainPairSerializer):
    """Creating our custom serializer for Token"""
    def validate(self,attrs):
        """Overriding the validate function
        This function returns the data that is returned when user is authenticated
        """
        data = super().validate(attrs)
        
        # Serializing the current User
        serializer = UserSerializerWithToken(self.user).data
        
        # Populating the data dictionary with data returned from serializer
        for k,v in serializer.items():
            data[k] = v
        return data

class MyTokenObtainPairView(TokenObtainPairView):
    """Creating our own custom view to use our serializer"""
    serializer_class = MyTokenObtainPairSerializer


@api_view(['GET'])
def get_routes(request):
    """View to display all the endpoints"""
    routes = {
        "login" : "To authenticate a user",
        "users/create" : "Create a new user",
    }
    return Response(routes)


@api_view(['POST'])
def create_user(request):
    """APIView to create User"""
    data = request.data
    
    # Try creating the user with username and password
    try:
        user = User.objects.create(
            username = data['username'],
            password = make_password(data['password'])
        )
    except:
        message = {'detail':"User with this username already exists"}
        return Response(message,status=status.HTTP_400_BAD_REQUEST)
    
    # If first name and last name provided then update the user
    user.email = data.get('email','')
    user.name = data.get('name','')
    user.organisation = data.get('organisation','')
    user.save()
    
    # Once the user has been created return the information of user with token
    serializer = UserSerializerWithToken(user,many=False)
    return Response(serializer.data)


@api_view(['GET'])
@permission_classes([IsAuthenticated])
def get_all_jobs(request):
    """Api View to get all the jobs posted by the HR"""
    try:
        user = request.user
        jobs = user.get_all_jobs()
        serialized_job = JobSerializer(jobs, many=True)
    except Exception as e:
        message = {'detail':str(e)}
        return Response(message,status=status.HTTP_400_BAD_REQUEST)

    return Response(serialized_job.data)


@api_view(['POST'])
@permission_classes([IsAuthenticated])
def create_job(request):
    """Api View to create a new job"""
    
    try:
        data = request.data

        job = Job.objects.create(
            creator=request.user,
            title=data["title"],
            description=data["description"],
            location=data["location"]
        )

        job_questions = get_question_from_jd(job.description)
        job.questions = job_questions
        
        job.save()
        
        serialized_job = JobSerializer(job, many=False)
        
        return Response(serialized_job.data)
    except Exception as e:
        message = {'detail':str(e)}
        return Response(message,status=status.HTTP_400_BAD_REQUEST)


@api_view(['GET'])
@permission_classes([IsAuthenticated,JobPermissions])
def get_all_applications(request,pk):
    try:
        job = Job.objects.get(id=pk)
        JobPermissions().has_object_permission(request,None,job)
        applications = job.get_all_applications()
        serialized_applications = ApplicationBriefSerializer(applications,many=True)
        return Response({"desc":job.description, "applicants": serialized_applications.data})
    except Exception as e:
        message = {'detail':str(e)}
        return Response(message,status=status.HTTP_400_BAD_REQUEST)


@api_view(['POST'])
@permission_classes([IsAuthenticated,JobPermissions])
def create_application(request,pk):
    try:
        job = Job.objects.get(id=pk)
        JobPermissions().has_object_permission(request,None,job)
        application = Application.objects.create(
            resume_url=request.data["resume_url"],
            job_id=job
        )
        extracted_information = extract_info_from_resume(request.data["resume_url"])
        
        ratings, chats = get_candidate_rating(job.questions, application.resume_url)

        application.name = extracted_information["name"]
        application.github = extracted_information["github"]
        application.email = extracted_information["email"]
        application.analytics = {"ratings": ratings, "chats": chats}
        application.rating = (ratings["candidate_rating"]["technical_skill"] + ratings["candidate_rating"]["relevance"])/2
        application.save()
        serialized_applications = ApplicationBriefSerializer(application,many=False)
        
        return Response(serialized_applications.data)
    except Exception as e:
        message = {'detail':str(e)}
        return Response(message,status=status.HTTP_400_BAD_REQUEST)

@api_view(['GET'])
@permission_classes([IsAuthenticated,ApplicationPermissions])
def get_application(request,pk):
    try:
        application = Application.objects.get(id=pk)
        ApplicationPermissions().has_object_permission(request,None,application)
        serialized_application = ApplicationSerializer(application,many=False)

        return Response(serialized_application.data)
    except Exception as e:
        message = {'detail':str(e)}
        return Response(message,status=status.HTTP_400_BAD_REQUEST)