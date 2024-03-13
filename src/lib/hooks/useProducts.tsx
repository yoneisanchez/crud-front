"use client";
import { DefaultProducts } from "@/data/products";
import { ARTICULOS, UPDATEARTICULO } from "@/interfaces/product";
import React, { useEffect, useState } from "react"

export const useProducts = () => {
    const [products, setProducts] = useState<ARTICULOS[]>([])

    const getAll = () => {
        //ToDo: Agregar endpoint para obtener todos los articulos
        setProducts(DefaultProducts);
    }

    const add = (data: ARTICULOS) => {
        //ToDo: Agregar endpoint para crear producto
        setProducts([
            ...products,
            data
        ])
    }

    const updateProduct = (item: UPDATEARTICULO) => {
        //ToDo: Agregar endpoint para editar articulo
        setProducts(products.map((product) => {
            return product.Id !== item.Id
                ? product
                : {
                    ...product,
                    Cantidad: +product.Cantidad + +item.Cantidad
                }
        }))
    }

    useEffect(() => {
        getAll();
    }, [])



    return {
        products,
        add,
        updateProduct
    };
}
