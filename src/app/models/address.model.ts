export class Address {
    constructor(
        public formatted?: string,
        public provincia?: string,
        public provinciaFormatted?: any,
        public poblacion?: string,
        public zona?: string,
        public cp?: string,
        public longitud?: string,
        public latitud?: string
    ) {}
}
