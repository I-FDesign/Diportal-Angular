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
    

function noSlide(event){
    event.stopPropagation();
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
