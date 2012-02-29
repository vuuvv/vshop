from django.db import models
from django.utils.translation import get_language, ugettext, ugettext_lazy as _
from django.contrib.sites.models import Site

class Category(models.Model):
	site = models.ForeignKey(Site, verbose_name=_('Site'))
	name = models.CharField(_('Name'), max_length=200)
	slug = models.SlugField(_('Slug'), blank=True)
	parent = models.ForeignKey('self', blank=True, null=True, related_name='child')
	description = models.TextField(_('Description'), blank=True)
	ordering = models.IntegerField(_('Ordering'), default=0)
	is_active = models.BooleanField(_('Active'), default=True, blank=True)
	related_categories = models.ManyToManyField('self', blank=True, null=True,
		verbose_name=_('Related Categories'), related_name='related_categories')

	class Meta:
		ordering = ['site', 'parent__id', 'ordering', 'name']
		verbose_name = _('Category')
		verbose_name_plural = _('Categoire')
		unique_together = ('site', 'slug')

class CategoryImage(models.Model):
	category = models.ForeignKey(Category, null=True, blank=True, related_name='images')
	picture = models.ImageField(verbose_name=_('Picture'), upload_to='', max_length=200)
	caption = models.CharField(_('Optional caption'), max_length=100, null=True, blank=True)
	ordering = models.IntegerField(_('Sort Order'), default=0)

	class Meta:
		ordering = ['ordering']
		unique_together = ('category', 'sort')
		verbose_name = _('Category Image')
		verbose_name_plural = _('Category Images')

class OptionGroup(models.Model):
	site = models.ForeignKey(Site, verbose_name=_('Site'))
	name = models.CharField(_('Name of Option Group'), max_length=50)
	description = models.CharField(_('Detailed Description'), max_length=100, blank=True)
	ordering = models.IntegerField(_('Sort Order'), default=0)

	class Meta:
		ordering = ['ordering', 'name']
		verbose_name = _("Option Group")
		verbose_name_plural = _("Option Groups")

class Option(models.Model):
	option_group = models.ForeignKey(OptionGroup)
	name = models.CharField(_('Display value'), max_length=50)
	value = models.CharField(_('Stored value'), max_length=50)
	price_change = models.DecimalField(_("Price Change"), null=True, blank=True)
	ordering = models.IntegerField(_("Sort Order"), default=0)

	class Meta:
		ordering = ('option_group', 'sort_order', 'name')
		unique_together = ('option_group', 'value')
		verbose_name = _("Option Item")
		verbose_name_plural = _("Option Items")

class Product(models.Model):
	site = models.ForeignKey(Site, verbose_name=_('Site'))
	name = models.CharField(_('Full Name'), max_length=255, blank=False)
	slug = models.SlugField(_('Slug Name'), max_length=255, blank=True)
	sku = models.CharField(_('SKU'), max_length=255, blank=True, null=True)
	short_desc = models.TextField(_('Short description of product'), default='', max_length=200, blank=True)
	description = models.TextField(_('Description of product'), default='', max_length=200, blank=True)
	category = models.ManyToManyField(Category, blank=True, verbose_name=_('Category'))
	stock = models.DecimalField(_('Number in stock'), max_digits=18, decimal_places=6, default='0')
	data_added = models.DateField(_("Date added"), null=True, blank=True)
	active = models.BooleanField(_('Active'), default=True)
	featured = models.BooleanField(_('Featured'), default=False)
	ordering = models.IntegerField(_('Sort Order'), default=0)
	weight = models.DecimalField(_('Weight'), max_digits=8, decimal_places=2, null=True, blank=True)
	weight_units = models.CharField(_('Weight units'), max_length=3, null=True, blank=True)
	length = models.DecimalField(_('Length'), max_digits=6, decimal_places=2, null=True, blank=True)
	length_unit = models.CharField(_('Length units'), max_length=6, null=True, blank=True)
	width = models.DecimalField(_('Width'), max_digits=6, decimal_places=2, null=True, blank=True)
	width_unit = models.CharField(_('Width units'), max_length=6, null=True, blank=True)
	height = models.DecimalField(_('Height'), max_digits=6, decimal_places=2, null=True, blank=True)
	height_unit = models.CharField(_('Height units'), max_length=6, null=True, blank=True)
	

