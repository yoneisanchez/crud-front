export interface TRANSACCIONES {
    Id: number;
    Descripcion: string;
    TipoTransaccion: number;
    Articulo: number;
    FechaDocumento: Date;
    Cantidad: number;
    Costo: number;
    Estado: number;
}

export interface TIPOSTRANSACCIONES {
    Id: number;
    Descripcion: string;
}