export class User {
    constructor(
        // tslint:disable-next-line: variable-name
        public _id?: string,
        public name?: string,
        public email?: string,
        public password?: string,
        public inmobiliaria?: string,
        public favourites = [],
        public role = 'USER_ROLE'
    ) {}
}
