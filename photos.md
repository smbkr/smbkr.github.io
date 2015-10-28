---
layout: photos
title: Photos
permalink: /photos/
chocolat: true
---
<div class="masonry chocolat-parent" data-chocolat-title="photos">
 {% for photo in site.photos %}
  <div class="brick">
   <a class="chocolat-image" href="{{ site.url }}/images/photos/{{ photo.file }}" title="{{ photo.title}}, {{ photo.year }}">
    <img width="100" src="{{ site.url }}/images/photos/{{ photo.file }}" alt="{{ photo.title }}, {{ photo.year }}" />
   </a>
  </div>
 {% endfor %}
</div>
<script>
	$(document).ready(function(){
		$('.chocolat-parent').Chocolat({
			loop: true,
			imageSize: 'cover',			
		});
	});
</script>