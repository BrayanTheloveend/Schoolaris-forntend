export function kFormatter(num) {

    if(Math.abs(num) <= 999){
       return Math.sign(num)*Math.abs(num)
    }else if(Math.abs(num) > 999 && Math.abs(num) < 999999){
        return Math.sign(num)*((Math.abs(num)/1000).toFixed(2)) + 'K'
    }else{
        return Math.sign(num)*((Math.abs(num)/1000000).toFixed(2)) + 'M'
    }
}