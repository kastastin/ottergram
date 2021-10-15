'use strict';

var DETAIL_IMAGE_SELECTOR = '[data-image-role="target"]',
    DETAIL_TITLE_SELECTOR = '[data-image-title="title"]',
    DETAIL_WRAPPER_SELECTOR = '[data-image-role="frame"]',
    THUMBNAIL_LINK_SELECTOR = '[data-image-role="trigger"]',
    HIDDEN_DETAIL_CLASS = 'hidden-detail',
    TINY_EFFECT_CLASS = 'is-tiny',
    ESC_KEY = 27;

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
        showDetails();
    });
}

function getThumbnailArray() {
    var thumbnails = document.querySelectorAll(THUMBNAIL_LINK_SELECTOR),
        thumbnailArray = [].slice.call(thumbnails);
    return thumbnailArray;
}

function hideDetails() {
    document.body.classList.add(HIDDEN_DETAIL_CLASS);
}

function showDetails() {
    var frame = document.querySelector(DETAIL_WRAPPER_SELECTOR);
    document.body.classList.remove(HIDDEN_DETAIL_CLASS);
    frame.classList.add(TINY_EFFECT_CLASS);
    setTimeout(function() {
        frame.classList.remove(TINY_EFFECT_CLASS);
    }, 50);
}

function addKeyPressHandler() {
    document.body.addEventListener('keyup', function(event) {
        event.preventDefault();
        if (event.keyCode === ESC_KEY) {
            hideDetails();
        }
    });
}

function initializeEvents() {
    var thumbnails = getThumbnailArray();
    thumbnails.forEach(addThumbnailClickHandler);
    addKeyPressHandler();
}

initializeEvents();