export const numberToStr = (number)=>{
    if (number < 1000){
        return number + '';
    } else if (number < 1000000){
        return (number / 1000) + "K";
    } else if (number < 1000000000){
        return (number / 1000000) + "M";
    } else if (number < 1000000000000){
        return (number / 1000000000) + "B";
    } else {
        return "infinity";
    }
}