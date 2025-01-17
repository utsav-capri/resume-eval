from rest_framework import serializers
from rest_framework_simplejwt.tokens import RefreshToken

from .models import User, Job, Application

class UserSerializer(serializers.ModelSerializer):
    """This serializer describes the User"""
    class Meta:
        model = User
        fields = '__all__'

class JobSerializer(serializers.ModelSerializer):
    """This serializer describes the Job"""
    class Meta:
        model = Job
        fields = '__all__'

class ApplicationSerializer(serializers.ModelSerializer):
    """"This serializer describes the Application"""
    class Meta:
        model = Application
        fields = '__all__'

class ApplicationBriefSerializer(serializers.ModelSerializer):
    """"This serializer contains all fields of Application except analytics"""
    class Meta:
        model = Application
        fields = ['resume_url','name','email','github','id','rating']
        
class UserSerializerWithToken(serializers.ModelSerializer):
    """Same as UserSerializer but will have one additional field for JWT token """
    token = serializers.SerializerMethodField(read_only=True)
    class Meta:
        model = User
        fields = ['id','username','name','token','organisation','email']
        extra_kwargs = {
            'password':{
                'write_only':True,
                'style':{'input_type':'password'}
            }
        }
        
    def get_token(self,obj):
        token = RefreshToken.for_user(obj)
        return str(token.access_token)