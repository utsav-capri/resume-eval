from django.urls import path

from . import views

urlpatterns = [
    path('',views.get_routes,name="routes"),
    path('login/', views.MyTokenObtainPairView.as_view(),name='token_obtain_pair'),
    path('users/create',views.create_user,name="users-create"),
    path('jobs',views.get_all_jobs,name="all-jobs"),
    path('jobs/create',views.create_job,name="create-job"),
    path('jobs/<slug:pk>',views.get_all_applications,name="all-applications"),
    path('applications/create/<slug:pk>',views.create_application,name="create-application"),
    path('applications/<slug:pk>',views.get_application,name="get-application"),
]