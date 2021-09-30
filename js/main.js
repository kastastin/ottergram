'use strict';

var DETAIL_IMAGE_SELECTOR = '[data-image-role="target"]',
    DETAIL_TITLE_SELECTOR = '[data-image-title="title"]',
    THUMBNAIL_LINK_SELECTOR = '[data-image-role="trigger"]';

function setDetails(imageUrl, titleText) {
    var detailImage = document.querySelector(DETAIL_IMAGE_SELECTOR);
    detailImage.setAttribute('src', imageUrl);
    
    var detailTitle = document.querySelector(DETAIL_TITLE_SELECTOR);
    detailTitle.textContent = titleText;
}

function getImageFromThumbnail(thumbnail) {
    return thumbnail.getAttribute('data-image-url');
}

function getTitleFromThumbnail(thumbnail) {
    return thumbnail.getAttribute('data-image-title');
}

function setDetailsFromThumbnail(thumbnail) {
    var image = getImageFromThumbnail(thumbnail),
        title = getTitleFromThumbnail(thumbnail);
    setDetails(image, title);
}

function addThumbnailClickHandler(thumbnail) {
    thumbnail.addEventListener('click', function(event) {
        event.preventDefault();
        setDetailsFromThumbnail(thumbnail);
    });
}

function getThumbnailArray() {
    var thumbnails = document.querySelectorAll(THUMBNAIL_LINK_SELECTOR),
        thumbnailArray = [].slice.call(thumbnails);
    return thumbnailArray;
}

function initializeEvents() {
    var thumbnails = getThumbnailArray();
    thumbnails.forEach(addThumbnailClickHandler);
}

initializeEvents();