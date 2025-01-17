from rest_framework import permissions

class UserPermissions(permissions.BasePermission):
    """Permission class for user"""
    def has_permission(self, request, view):
        """All the ip addresses have permission"""
        return True
    
    def has_object_permission(self, request, view, obj):
        """Only user can view/edit their data"""
        return obj == request.user
    
class JobPermissions(permissions.BasePermission):
    """Permission class for Job"""
    def has_permission(self, request, view):
        """All the ip addresses have permission"""
        return True
    
    def has_object_permission(self, request, view, obj):
        """Only user can view/edit their job"""
        return obj.creator == request.user  
    
class ApplicationPermissions(permissions.BasePermission):
    """Permission class for Applications"""
    def has_permission(self, request, view):
        """All the ip addresses have permission"""
        return True
    
    def has_object_permission(self, request, view, obj):
        """Only user can view/edit the application for the job"""
        return obj.job_id.creator == request.user  