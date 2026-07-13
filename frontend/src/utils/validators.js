export function isEmpty(value){
    return value === undefined || 
        value === null ||   
        (typeof value === 'object' && Object.keys(value).length === 0) ||
        (typeof value === 'string' && value.trim().length === 0) 
}
export function formValidation(form){
    for(let key in form){
        if(form[key] === ""){
            return {
                key,
                status: false
            };
        }
    }
    return {
        key: "",
        status: true
    };
}