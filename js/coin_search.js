function coin_search() {
    var value = document.getElementById('coin_search').value;
    var list = document.getElementsByClassName('coin');

    for(let i = 0; i < list.length; i++) {
        var name = list[i].getElementsByTagName('strong');
        if(name[0].innerHTML.indexOf(value) > -1) {
            list[i].style.display = 'flex';
        } else {
            list[i].style.display = 'none';
        }
    } 
}