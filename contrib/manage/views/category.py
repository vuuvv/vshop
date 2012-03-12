from django.shortcuts import render_to_response
from django.http import HttpResponseRedirect, HttpResponse
from django.core.urlresolvers import reverse

from contrib.product.models import Category

def index(request):
	category = Category.objects.all()
	if not category:
		import pdb;pdb.set_trace()
		url = reverse("contrib.manage.views.category:add")
	else:
		url = reverse("", kwargs={"category_id": category.id})
	return HTTPResponseRedirect(url)

def add(request):
	return HttpResponse("add category")

def view(request, category_id):
	return HttpResponse("view category")
