export class Filters {
    constructor(
        public termino: string,
        public terminoFormatted?: string,
        public obraNueva = false,
        public provincia = '',
        public queDesea = 'comprar',
        public tipo = 'vivienda',
        public ambientes = 1,
        public bathrooms = 1,
        public superficieDesde = 0,
        public superficieHasta = 0,
        public precioDesde = 0,
        public precioHasta = 0,
        public cmun?: string,
        public otherOptions = []
    ) {}
}
