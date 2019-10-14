import { Image } from './image.model';
import { Address } from './address.model';
export class Anuncio {
    constructor(
        public address?: Address,
        public obraNueva = false,
        public queDesea = 'comprar',
        public vacacional = {
            diario: {
                desea: false,
                precio: ''
            },
            semanal: {
                desea: false,
                precio: ''
            },
            mensual: {
                desea: false,
                precio: ''
            }
        },
        public tipo = 'vivienda',
        public ambientes = '1',
        public bathrooms = '1',
        public superficie = '',
        public precio = '',
        // public cmun?: string,
        public imagenes: Image[] = [],
        public description = '',
        public id?: string,
        public uid?: string
    ) {}
}
