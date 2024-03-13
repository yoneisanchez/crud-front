"use client";
import { DefaultProducts } from "@/data/products";
import { ARTICULOS } from "@/interfaces/product";
import { TRANSACCIONES } from "@/interfaces/transaction";
import React, { useEffect, useState } from "react"

export const useTransactions = () => {
    const [transactions, setTransactions] = useState<TRANSACCIONES[]>([])

    const add = (data: TRANSACCIONES) => {
        //ToDo: Agregar endpoint para crear transaccion
        setTransactions([
            ...transactions,
            data
        ])
    }

    return {
        transactions,
        add,
    };
}
