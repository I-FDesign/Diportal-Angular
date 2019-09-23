export class Filters {
    constructor(
        public termino: string,
        public obraNueva = false,
        public queDesea = 'comprar',
        public tipo = 'vivienda',
        public ambientes = '1',
        public desde?: any,
        public hasta?: any,
        public cmun?: string
    ) {}
}
