import { Image } from './image.model';
import { Address } from './address.model';
export class Anuncio {
    constructor(
        public title = '',
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
        public tipoVivienda = 'piso',
        public ambientes = '1',
        public bathrooms = '1',
        public superficie = '',
        public precio = '',
        // public cmun?: string,
        public imagenes: Image[] = [],
        public description = '',
        public enDescription = '',
        public id?: string,
        public uid?: string,
        public refCode = '',
        public otherOptions = [
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
                name: 'Trastero',
                exists: false
            },
            {
                name: 'Acceso para discapacidad',
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
            }
        ],
    ) {}
}
