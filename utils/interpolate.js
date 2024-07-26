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