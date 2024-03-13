export interface ARTICULOS {
    Id: number;
    Descripcion: string;
    FechaIngreso: Date;
    FechaVencimiento: Date;
    Cantidad: number;
    Costo: number;
    Estado: number;
}

export interface UPDATEARTICULO {
    Id: number;
    Cantidad: number;
}