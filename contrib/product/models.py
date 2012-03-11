from django import forms
from django.db import models
from django.utils.translation import get_language, ugettext, ugettext_lazy as _
from django.contrib.sites.models import Site

class Category(models.Model):
	site = models.ForeignKey(Site, verbose_name=_("Site"))
	name = models.CharField(_("Name"), max_length=255)
	slug = models.SlugField(_("Slug"), blank=True)
	parent = models.ForeignKey('self', blank=True, null=True, related_name='children')
	description = models.TextField(_("Description"), blank=True);
	ordering = models.IntegerField(_("Ordering"), default=0)
	is_active = models.BooleanField(_("Active"), default=True, blank=True)
	related_categories = models.ManyToManyField('self', blank=True, null=True,
		verbose_name=_("Related Categories"), related_name="related_categories")

	class Meta:
		ordering = ['site', 'parent__id', 'ordering', 'name']
		verbose_name = _("Category")
		verbose_name_plural = _("Categories")
		unique_together = ('site', 'slug')

	def parents(self):
		parents = []
		node = self.parent
		while node is not None:
			parents.append(node)
			node = node.parent
		parents.reverse()
		return parents

	def _check_parent_recurse(self):
		node = self.parent
		while node is not None:
			if node.id == self.id:
				raise forms.ValidationError(_("Category's parent can't be itself!"))
			node = node.parent

	def save(self, **kwargs):
		if self.id:
			if self.parent and self.parent_id == self.id:
				raise forms.ValidationError(_("Category's parent can't be itself!"))
			self._check_parent_recurse()

		if not self.slug:
			self.slug = self.name

		super(Category, self).save(**kwargs)
