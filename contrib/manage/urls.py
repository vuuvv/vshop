from django.conf.urls import patterns, include, url

# Uncomment the next two lines to enable the admin:
# from django.contrib import admin
# admin.autodiscover()

urlpatterns = patterns('contrib.manage.views.home',
	url(r'^$', 'index'),
)

urlpatterns += patterns('contrib.manage.views.category',
	url(r'^category$', 'index'),
	url(r'$category/add/(?P<category_id>\d*)$', 'add'),
	url(r'$category/(?p<category_id>\d*)$', 'view'),
)
