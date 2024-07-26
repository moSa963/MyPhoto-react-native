export class Validator{
    
    constructor(values = {}){
        this.values = values;
    }

    min(name, values) {
        return this.values[name]['min'] > values[name].length ? name + ' minimum length is ' + this.values[name]['min'] : null;
    }

    max(name, values) {
        return values[name].length > this.values[name]['max'] ? name + ' maximum length is ' + this.values[name]['max'] : null;
    }

    match(name, values){
        if (!values[name].match(this.values[name]['match'])){
            return name + " format is not valide";
        }
        return null;
    }

    confirm(name, values){
        if (values[name] !== values[this.values[name]['confirm']]){
            return this.values[name]['confirm'] + " confirmation is wrong.";
        }
        return null;
    }

    validateOne(name, values){
        var error = null;
        if (!this.values[name]) return null; 
        Object.keys(this.values[name]).forEach(prop=>{
            if (!this[prop]) return null; 
            const res = this[prop](name, values);
            if (res !== null){
                error = res;
                return;
            }
        });
        return error;
    }

    validate(values = {}){
        var errors = null;
        const keys = Object.keys(values);

        Object.keys(this.values).forEach(name=>{
            if (!values[name]){
                if (!errors) errors = {};
                errors[name] = name + ' is requered.';
            }
        });

        keys.forEach(name=>{
            const error = this.validateOne(name, values);
            if (error){
                if (!errors) errors = {};
                errors[name] = error;
            }
        });

        return errors;
    }
}
 