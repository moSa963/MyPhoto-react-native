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