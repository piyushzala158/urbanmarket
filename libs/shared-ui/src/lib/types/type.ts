export interface loginDataType {
    email: string;
    password: string;
}
export interface signupDataType {
    username: string;
    email: string;
    password: string;
    confirmPassword: string;
}

export interface productsDataType {
    name?: string;
    description?: string;
    price?: number;
    image?: any ;
    category?: string;
    brand?: string;
    id?: string;
}

export interface categoryDataType {
    name?: string;
    description?: string;
    imageurl?: any ;
    id?: string;
    items?:number
}