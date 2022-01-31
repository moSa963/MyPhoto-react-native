export const praseTime = (timeStr)=>{
    const milis = Date.now() - Date.parse(timeStr);
    var output = milis * 1.65344e-9;

    if (output >= 1){
        return new Date(timeStr).toUTCString();
    }

    output = milis * 1.15741e-8;
    if (output >= 1){
        return output.toFixed() + " days";
    }

    output = milis * 2.77778e-7;
    if (output >= 1){
        return output.toFixed() + " hours";
    }

    output = milis * 1.66667e-5;
    if (output >= 1){
        return output.toFixed() + " minute";
    }

    output = milis * 0.001;
    return output.toFixed() + " seconds";
    
}

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


export const interpolate = (value = 0, input = [], output = [])=>{
    if (value < input[0]) {
        return output[0];
    }

    for(var i = 1; i < input.length; ++i){

        if (value <= input[i]){
            return ((output[i] - output[i - 1]) * ((value - input[i - 1]) / (input[i] - input[i - 1]))) + output[i-1]; 
        }

    }

    return output[output.length - 1];
}