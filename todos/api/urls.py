from rest_framework import routers

from .views import TodoViewSet

router = routers.DefaultRouter()

router.register('todos', TodoViewSet, 'todos')
#router.register()
urlpatterns = router.urls