(function () {
    'use strict';

    var config = Reveal.getConfig();

    if (config === null || typeof config.coursemod === 'undefined' || !config.coursemod.enabled)
        return;
    
    //disable when print-pdf is enabled
    if (window.location.href.indexOf('print-pdf') > -1)
        return;


    var holders = {
        presentation: undefined,
        courseView: undefined
    };

    function setup() {
        holders.presentation = document.querySelector('.reveal');
        holders.presentation.style.width = '100%';
        holders.presentation.style.position = 'relative';
        holders.presentation.style.display = 'inline-block';
        var controls = document.querySelector('.controls');
        controls.style.position = 'absolute';

        var courseView = document.createElement('div');
        courseView.className = 'coursemod__course-view';
        courseView.style.width = '33%';
        courseView.style.height = '100%';
        courseView.style.backgroundColor = 'white';
        courseView.style.boxSizing = 'border-box';
        courseView.style.borderLeft = '2px solid black';
        courseView.style.display = 'none';
        courseView.style.overflowX = 'scroll';
        courseView.style.padding = '0 10px';
        courseView.style.position = 'fixed';
        courseView.style.top = '0';
        courseView.style.right = '0';
        holders.presentation.parentNode.insertBefore(courseView, holders.presentation.nextElementSibling);
        holders.courseView = courseView;
    }

    function toggleCourseView() {
        if(config.coursemod.shown){
            holders.presentation.style.width = '66.66%';
            holders.courseView.style.display='inline-block';
        }else {
            holders.courseView.style.display='none';
            holders.presentation.style.width = '100%';
        }
    }

    function updateNotes(currentSlide) {
        var notes = currentSlide.querySelector('aside.notes');
        if (notes !== null) {
            holders.courseView.innerHTML = notes.innerHTML;
        } else if(currentSlide.hasAttribute('data-notes')){
            holders.courseView.innerHTML = currentSlide.getAttribute('data-notes');
        } else {
            holders.courseView.innerHTML = '';
        }
    }

    if (typeof config.coursemod.shown === 'undefined') {
        config.coursemod.shown = true;
    }

    setup();
    updateNotes(Reveal.getCurrentSlide());

    toggleCourseView();

    Reveal.configure({
        keyboard: {
            67: function() {
                config.coursemod.shown = !config.coursemod.shown;
                toggleCourseView()
            }
        }
    });
    Reveal.addEventListener( 'slidechanged', function( event ) {
        updateNotes(event.currentSlide);
    } );
}).call(this);