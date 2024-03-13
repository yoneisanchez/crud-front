import { ARTICULOS } from "@/interfaces/product";
import { TIPOSTRANSACCIONES } from "@/interfaces/transaction";

export const DefaultProducts:ARTICULOS[] = [
{
    Id: 1,
    Descripcion: 'Harina de maiz',
    FechaIngreso:  new Date(),
    FechaVencimiento: new Date(),
    Cantidad: 10,
    Costo: 20,
    Estado: 1
},
{
    Id: 2,
    Descripcion: 'Harina de arroz',
    FechaIngreso:  new Date(),
    FechaVencimiento: new Date(),
    Cantidad: 10,
    Costo: 30,
    Estado: 1
},
{
    Id: 3,
    Descripcion: 'Harina de avena',
    FechaIngreso:  new Date(),
    FechaVencimiento: new Date(),
    Cantidad: 10,
    Costo: 40,
    Estado: 1
}
]

export const tipoTransacciones: TIPOSTRANSACCIONES[] = [
    {
        Id:1,
        Descripcion: "Entrada"
    },
    {
        Id:2,
        Descripcion: "Salida"
    }
]