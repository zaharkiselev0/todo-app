import json
from django.templatetags.static import static
from django.conf import settings
from pathlib import Path
from django import template


register = template.Library()

@register.simple_tag()
def vite_asset(entry):
    manifest = json.loads(
        (Path(settings.BASE_DIR) / 'static/.vite/manifest.json').read_text()
    )
    return static(manifest[entry]['file'])

@register.simple_tag()
def vite_css(entry):
    manifest = json.loads(
        (Path(settings.BASE_DIR) / 'static/.vite/manifest.json').read_text()
    )
    return manifest[entry].get('css', [])