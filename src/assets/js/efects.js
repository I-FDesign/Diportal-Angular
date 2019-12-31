
// Header------------------------------------------------------------------
function menuSlideDown(){
    $('#menu_dropdown').addClass('slideInDown');
}

function optionsSlideDown( type ){
    const dropdownParent = document.getElementById(type).parentElement;
    const dropdown = dropdownParent.children[1];

    if(dropdown.className.indexOf('drop-visible') >= 0){
        $(dropdown).addClass('slideOutUp');
        setTimeout( () => $(dropdown).removeClass('drop-visible'),  400);

        dropdown.id = '';
        return;
    }

    if(dropdown.className.indexOf('slideOutUp') >= 0){
        $(dropdown).removeClass('slideOutUp');
    }
    
    const dropdowns = document.getElementsByClassName('dropmenu');

    for( let i = 0; i < dropdowns.length; i++ ){
        if( dropdowns[i].className.indexOf('drop-visible') >= 0 ){
            $(dropdowns[i]).removeClass('drop-visible');
        };
    }

    $(dropdown).addClass('drop-visible');
    dropdown.id = 'dropdown_visible';
}

function slideUpDropdown(){
    // Options NavBar
    const dropdown = document.getElementById('dropdown_visible');

    if(dropdown){
        $(dropdown).addClass('slideOutUp');
        setTimeout( () => $(dropdown).removeClass('drop-visible'),  400);
    
        dropdown.id = '';
    }

}

function goToTop(animationTime = 500) {
    $('html, body').animate({
        scrollTop: 0
    }, animationTime);
    return false;
}


function noSlide(event){
    event.stopPropagation();
}

function downToMostSearch(){
    const most_search_div = $('#most_search_div').offset().top;

    $('html, body').animate({
        scrollTop: most_search_div - 500
    }, 500);

    slideUpDropdown();
}

// -----------------------------------------------------------------------------

// Home-------------------------------------------------------------------------
let changed = false;
function changeCheckbox(){
    if(!changed){
        $('.main .search .find .show-new label').addClass('changed');
        changed = true;
    }else{
        $('.main .search .find .show-new label').removeClass('changed');
        changed = false;
    }
}
  

function upToSearch(){
    const search_div = $('#search_div').offset().top;

    $('html, body').animate({
        scrollTop: search_div - 10
    }, 500);
}

// Upload file----------------

function updateStyles(){
    $($('.img-ul-upload')).ready(function(){
        if($('.img-ul-upload').length > 0){
            $('.img-ul-upload').children()[0].innerText='Seleccionar Imagénes'
            $('.img-ul-upload').css({
                'background-color': '#5676FC',
                'margin-bottom': '0'
            })
    
            $('.img-ul-drag-box-msg')[0].innerText = 'O simplemente arrastralas!';
        }
    })
}

function changeClearButton(){
    $('.img-ul-clear')[0].innerText = 'Limpiar';
    $('.img-ul-clear').css({
        'opacity': '.7',
        'padding-top': '11.5px',
        'padding-bottom': '11.5px'
    })
}






