from django.db import models
from django.conf import settings
from django.utils.translation import get_language, ugettext, ugettext_lazy as _
from django.contrib.sites.models import Site
from django.contrib.contenttypes import generic
from django.contrib.contenttypes.models import ContentType

from ext.fields.thumbs import ImageWithThumbsField

dimension_units = (('cm','cm'), ('in','in'))

weight_units = (('kg','kg'), ('lb','lb'))

DISCOUNT_SHIPPING_CHOICES = (
	('NONE', _('None')),
	('FREE', _('Free Shipping')),
	('FREECHEAP', _('Cheapest shipping option is free')),
	('APPLY', _('Apply the discount above to shipping'))
)

SHIP_CLASS_CHOICES = (
	('DEFAULT', _('Default')),
	('YES', _('Shippable')),
	('NO', _('Not Shippable'))
)

class Image(models.Model):
	content_type = models.ForeignKey(ContentType, verbose_name=_("Content type"), related_name="image", blank=True, null=True)
	object_id = models.PositiveIntegerField(_("Content id"), blank=True, null=True)
	content_object = generic.GenericForeignKey(ct_field="content_type", fk_field="content_id")

	picture = ImageWithThumbsField(verbose_name=_('Picture'), upload_to='images', max_length=200)
	caption = models.CharField(_('Optional caption'), max_length=100, null=True, blank=True)
	ordering = models.IntegerField(_('Sort Order'), default=0)

	class Meta:
		ordering = ['ordering']
		verbose_name = _('Category Image')
		verbose_name_plural = _('Category Images')

class Category(models.Model):
	site = models.ForeignKey(Site, verbose_name=_('Site'))
	name = models.CharField(_('Name'), max_length=200)
	slug = models.SlugField(_('Slug'), blank=True)
	parent = models.ForeignKey('self', blank=True, null=True, related_name='child')
	images = generic.GenericRelation(Image)
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
	price_change = models.DecimalField(_("Price Change"), null=True, blank=True, max_digits=14, decimal_places=6)
	ordering = models.IntegerField(_("Sort Order"), default=0)

	class Meta:
		ordering = ('option_group', 'ordering', 'name')
		unique_together = ('option_group', 'value')
		verbose_name = _("Option Item")
		verbose_name_plural = _("Option Items")

class Product(models.Model):
	site = models.ForeignKey(Site, verbose_name=_('Site'))
	name = models.CharField(_('Full Name'), max_length=255, blank=False)
	slug = models.SlugField(_('Slug Name'), max_length=255, blank=True)
	sku = models.CharField(_('SKU'), max_length=255, blank=True, null=True)
	short_desc = models.TextField(_('Short description of product'), default='', max_length=200, blank=True)
	images = generic.GenericRelation(Image)
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
	related_items = models.ManyToManyField('self', blank=True, null=True, verbose_name=_('Related Items'), related_name='related_products')
	total_sold = models.DecimalField(_("Totle sold"), max_digits=18, decimal_places=6, default='0')
	shipclass = models.CharField(_('Shipping'), choices=SHIP_CLASS_CHOICES, default="DEFAULT", max_length=10)

class AttributeOption(models.Model):
	description =  models.CharField(_("Description"), max_length=100)
	name = models.SlugField(_("Attribute name"), max_length=100)
	validation = models.CharField(_("Field Validation"), max_length=100)
	ordering = models.IntegerField(_("Sort Order"), default=0)
	error_message = models.CharField(_("Error Message"), default=_("Invalid Entry"), max_length=100)

	class Meta:
		ordering = ('ordering',)

class ProductAttribute(models.Model):
	product = models.ForeignKey(Product)
	languagecode = models.CharField(_('language'), max_length=10, choices=settings.LANGUAGES, null=True, blank=True)
	option = models.ForeignKey(AttributeOption)
	value = models.CharField(_("Value"), max_length=255)

	class Meta:
		verbose_name = _("Product Attribute")
		verbose_name_plural = _("Product Attributes")

class CategoryAttribute(models.Model):
	category = models.ForeignKey(Category)
	languagecode = models.CharField(_('language'), max_length=10, choices=settings.LANGUAGES, null=True, blank=True)
	option = models.ForeignKey(AttributeOption)
	value = models.CharField(_("Value"), max_length=255)

	class Meta:
		verbose_name = _("Category Attribute")
		verbose_name_plural = _("Category Attributes")

class Price(models.Model):
	product = models.ForeignKey(Product)
	price = models.DecimalField(_("Price"), max_digits=14, decimal_places=6)
	quantity = models.DecimalField(_("Discount Quantity"), max_digits=18, decimal_places=6, default='1.0')

	class Meat:
		ordering = ['expires', '-quantity']
		verbose_name = _("Price")
		verbose_name_plural = _("Prices")
		unique_together = ("product", "quantity", "expires")

