const isPhone = value => {
    const re = /^[\+]?\d{2,}?[(]?\d{2,}[)]?[-\s\.]?\d{2,}?[-\s\.]?\d{2,}[-\s\.]?\d{0,9}$/im
    return re.test(value)
}

const isEmail = value => {
    const re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(value);
}

const checkMin = (value, rule) => value.length >= rule

const checkMax = (value, rule) => value.length <= rule

const validator = (inputValue, params) => {
    let value = inputValue,
        errors = []
    if(typeof value !== "boolean" && (typeof value === 'string' || value.isArray())) {
        value = value.trim()
        for(let [key, rule] of Object.entries(params)) {
            if(key === 'required') {
                if(value.length === 0) {
                    errors.push('Это обязательное поле')
                    return errors
                }
            } else if(key === 'minLength') {

                if(!checkMin(value, rule)) {
                    errors.push(`Слишком короткое значение`)
                    return errors
                }

            } else if(key === 'maxLength') {

                if(!checkMax(value, rule)) {
                    errors.push(`Слишком длинное значение`)
                    return errors
                }

            } else if(key === 'type') {

                if(rule === 'email') {

                    if(!isEmail(value)) {
                        errors.push(`Неправильный формат Email'а`)
                        return errors
                    }

                } else if(rule === 'phone') {

                    if(!isPhone(value)) {
                        errors.push(`Неправильный формат телефона`)
                        return errors
                    }

                } else {
                    errors.push(`Неправильный формат`)
                    return errors
                }

            }
        }

        return errors

    } else if(typeof value === 'boolean') {
        for(let [key, rule] of Object.entries(params)) {
            if(key === 'required') {
                if(!value) {
                    errors.push(`Это обязательное поле`)
                    return errors
                }
            } else {
                errors.push(`Неправильный формат`)
                return errors
            }
        }

        return errors
    } else {
        errors.push(`Неправильный формат`)
        return errors
    }
}

export {
    checkMin,
    checkMax,
    isPhone,
    isEmail,
    validator
}