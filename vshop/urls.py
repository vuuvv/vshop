from django.conf.urls import patterns, include, url

# Uncomment the next two lines to enable the admin:
# from django.contrib import admin
# admin.autodiscover()

urlpatterns = patterns('',
    # Examples:
    # url(r'^$', 'vshop.views.home', name='home'),
    url(r'^/', include('contrib.store')),
    url(r'^product/', include('contrib.product.urls')),
    url(r'^manage/', include('contrib.manage.urls')),
    #url(r'^v/', include('contrib.jquery_vuuvv')),

    # Uncomment the admin/doc line below to enable admin documentation:
    # url(r'^admin/doc/', include('django.contrib.admindocs.urls')),

    # Uncomment the next line to enable the admin:
    # url(r'^admin/', include(admin.site.urls)),
)
