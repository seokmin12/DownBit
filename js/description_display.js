$(document).ready(function() {
    var height;
    $(window).scroll(function() {
        height = $(document).scrollTop();
        console.log(height);
    })
    if (height = 242) {
        generate_code();
    }

    if (height = 740) {
        $('#desc1').fadeIn(2000);
        setTimeout(function() {
            $('#desc2').fadeIn(2000);
        }, 2000);
        setTimeout(function() {
            $('#desc3').fadeIn(2000);
        }, 4000);
    }
})