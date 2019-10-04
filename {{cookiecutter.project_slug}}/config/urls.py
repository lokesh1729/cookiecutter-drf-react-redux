from django.conf import settings
from django.urls import include, path, re_path
from django.conf.urls.static import static
from django.contrib import admin
from django.views.generic import TemplateView
from {{ cookiecutter.project_slug }}.users.views import AuthRegisterView, AuthDetailsView, AuthLoginView

from rest_framework.routers import DefaultRouter


router = DefaultRouter(trailing_slash=False)


urlpatterns = [
    re_path(r'^app/(?P<route>.*)$', TemplateView.as_view(template_name="index.html"), name='app'),
    path("api/", include(router.urls)),
    path(settings.ADMIN_URL, admin.site.urls),
    # User management
    path("users/", include("{{ cookiecutter.project_slug }}.users.urls", namespace="users")),
    path("api/auth/login/", AuthLoginView.as_view(), name="auth_login"),
    path("api/auth/register/", AuthRegisterView.as_view(), name="auth_register"),
    path("api/auth/details/", AuthDetailsView.as_view(), name="auth_details"),
    path(
        "api/auth/", include(("knox.urls", "knox"), namespace="api_auth"), name="api_auth"
    ),
    # Your stuff: custom urls includes go here
] + static(settings.MEDIA_URL, document_root=settings.MEDIA_ROOT)
