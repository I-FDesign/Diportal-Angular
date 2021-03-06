import { Image } from './image.model';
import { Address } from './address.model';
import { User } from './user.model';
export class Anuncio {
    constructor(
        public title = '',
        public englishTitle = '',
        public address?: Address,
        public obraNueva = false,
        public queDesea = 'comprar',
        public vacacional = {
            diario: {
                desea: false,
                precio: null
            },
            semanal: {
                desea: false,
                precio: null
            },
            mensual: {
                desea: false,
                precio: null
            }
        },
        public tipo = 'vivienda',
        public tipoVivienda = 'piso',
        public ambientes = '1',
        public bathrooms = '1',
        public superficie = null,
        public precio = null,
        // public cmun?: string,
        public imagenes: Image[] = [],
        public description = '',
        public enDescription = '',
        // tslint:disable-next-line: variable-name
        public refCode = '',
        public importedOptions = [],
        public otherOptions = [],
        public otherOptionsView = [
            {
                name: 'Amueblado',
                exists: false
            },
            {
                name: 'Piscina',
                exists: false
            },
            {
                name: 'Terraza',
                exists: false
            },
            {
                name: 'Calefacción / Aire Acondicionado',
                exists: false
            },
            {
                name: 'Acceso para discapacidad',
                exists: false
            },
            {
                name: 'Trastero',
                exists: false
            },
            {
                name: 'Ascensor',
                exists: false
            },
            {
                name: 'Chimenea',
                exists: false
            },
            {
                name: 'Baño en suite',
                exists: false
            },
            {
                name: 'Jacuzzi',
                exists: false
            },
            {
                name: 'Admite mascotas',
                exists: false
            },
            {
                name: 'Spa / Balneario',
                exists: false
            },
            {
                name: 'Garage',
                exists: false
            }
        ],
        public _id?: string,
        public uid?: any,
    ) {}
}
