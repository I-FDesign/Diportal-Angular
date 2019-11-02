export class Filters {
    constructor(
        public termino: string,
        public obraNueva = false,
        public provincia = '',
        public queDesea = 'comprar',
        public tipo = 'vivienda',
        public ambientes = '1',
        public bathrooms = '',
        public superficieDesde = '0',
        public superficieHasta = '0',
        public desde?: any,
        public hasta?: any,
        public cmun?: string
    ) {}
}
