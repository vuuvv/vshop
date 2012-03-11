"""
This file demonstrates writing tests using the unittest module. These will pass
when you run "manage.py test".

Replace this with more appropriate tests for your application.
"""

from django.test import TestCase
from django.db import IntegrityError
from django.forms.util import ValidationError
from django.contrib.sites.models import Site

from contrib.product.models import Category

class CategoryTest(TestCase):
	"""
	Run some category tests
	"""
	def setUp(self):
		self.site = Site.objects.get_current()

		self.root, _create = Category.objects.get_or_create(
			slug="root", name="root", parent=None, site=self.site
		)
		self.level10, _create = Category.objects.get_or_create(
			slug="level10", name="level10", parent=None, site=self.site
		)
		self.level11, _create = Category.objects.get_or_create(
			slug="level11", name="level11", parent=None, site=self.site
		)
		self.level200, _create = Category.objects.get_or_create(
			slug="level200", name="level200", parent=None, site=self.site
		)
		self.level300, _create = Category.objects.get_or_create(
			slug="level300", name="level300", parent=None, site=self.site
		)
		self.level210, _create = Category.objects.get_or_create(
			slug="level210", name="level210", parent=None, site=self.site
		)
		
	def tearDown(self):
		pass

	def test_no_slug(self):
		node1, _create = Category.objects.get_or_create(
			slug="node", name="node1", parent=None, site=self.site
		)

		node2, _create = Category.objects.get_or_create(
			name="node2", parent=None, site=self.site
		)

		self.assertEqual(node1.slug, "node")
		self.assertEqual(node2.slug, "node2")

	def test_same_slug(self):
		node1, _create = Category.objects.get_or_create(
			slug="node1", name="node1", parent=None, site=self.site
		)

		node2, _create = Category.objects.get_or_create(
			slug="node2", name="node2", parent=None, site=self.site
		)

		node2.slug = "node1"

		self.assertRaises(IntegrityError, node2.save)


	def test_hierarchy_validation(self):
		self.level210.parent = self.level210
		self.assertRaises(ValidationError, self.level210.save)

		self.level200.parent = self.level10
		self.level200.save()
		self.level10.parent = self.level300
		self.level10.save()
		self.level300.parent = self.level200
		self.assertRaises(ValidationError, self.level300.save)

	def test_hierarchy(self):
		self.level10.parent = self.root
		self.level11.parent = self.root
		self.level200.parent = self.level10
		self.level300.parent = self.level200
		self.level210.parent = self.level11

		self.assertEqual(self.root.parents(), [])
		self.assertEqual(self.level10.parents(), [self.root])
		self.assertEqual(self.level11.parents(), [self.root])
		self.assertEqual(self.level200.parents(), [self.root, self.level10])
		self.assertEqual(self.level300.parents(), [self.root, self.level10, self.level200])
		self.assertEqual(self.level210.parents(), [self.root, self.level11])

