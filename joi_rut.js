const BaseJoi = require('@hapi/joi');

const calculateDV = (rut)=> {
    let cuerpo = rut.toString();
    let suma = 0
    let multiplo = 2

    for( let i = 1; i <= cuerpo.length; i++ ) {
        let index = multiplo * cuerpo.charAt(cuerpo.length - i)

        suma += index;

        if( multiplo < 7 ) {
            multiplo += 1
        } else {
            multiplo = 2
        }
    }

    let dvEsperado = 11 - suma % 11

    if( dvEsperado === 10 ) { 
        return "k"
    } else if ( dvEsperado === 11 ) {
        return "0"
    } else {
        return dvEsperado.toString()
        
    }
}

const validRut = (input) => {

    let rut = input.toLowerCase()

    if( !rut || rut.trim().length < 3 ) { 
        return false 
    }

    let rgx = /^[0-9k]*$/
    let test = rgx.test(rut)
    if( !test ) return false;

    let num = rut.substring(0, rut.length - 1)
    let dgv = rut.substring(rut.length - 1)

    let dvCalc = calculateDV(num)
    return dvCalc === dgv

}

let Joi = BaseJoi.extend((joi)=> {
    return {
        type: 'rut',
        base: joi.string(),
        messages: {
            'rut.format': "Rut inválido"
        },
        validate(value, helpers) {
            if( !validRut(value) ) {
                return { value, errors: helpers.error('rut.format') }
            }
        }
    }
})

module.exports = Joi


