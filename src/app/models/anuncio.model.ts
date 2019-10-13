import { Image } from './image.model';
export class Anuncio {
    constructor(
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
        public precio?: any,
        public cmun?: string,
        public imagenes: Image[] = [],
        public description?: string,
        public id?: string,
        public uid?: string
    ) {}
}
