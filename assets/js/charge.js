//localStorage.clear();
setInterval(()=> {
    let count = localStorage.getItem('count')
    let total = localStorage.getItem('total')
    let power = localStorage.getItem('power');
    let sec_recharg = localStorage.getItem('sec_recharg');
    if(Number(total) > power){
        localStorage.setItem('power' , `${Number(power) + Number(sec_recharg)}`);
    }
}, 1000);