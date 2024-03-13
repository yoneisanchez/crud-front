import { ARTICULOS } from '@/interfaces/product';
import { TRANSACCIONES } from '@/interfaces/transaction';
import React, { useEffect, useState } from 'react';


interface Props {
    onSubmit: (e: TRANSACCIONES) => void;
    products: ARTICULOS[]
}

const AddTransactionForm: React.FC<Props> = ({ onSubmit, products }) => {
    const [form, setForm] = useState<any>();
    const [product, setProduct] = useState<ARTICULOS | undefined>()
    const [formValues, setFormValues] = useState<any[] | undefined>()

    const handleChange = (e: any) => {
        setForm({
            ...form,
            [e.target.name]: e.target.value
        })
    }

    const handleSubmit = (e: any) => {
        e.preventDefault()
        onSubmit(form as TRANSACCIONES);
    }

    const handleChangeProduct = (e: any) => {
        if (!e.target.value) return;
        setProduct(products.find(x => e.target.value == x.Id))
    }

    useEffect(() => {
        if (!product) return;
        setForm({
            ...form,
            Articulo: product.Id
        })

        setFormValues([
            {
                name: "Descripcion",
                type: "text",
                props: {
                }
            },
            {
                name: "Cantidad",
                type: "number",
                props: {
                    min: 1,
                    max: product.Cantidad
                }
            },
        ])
    }, [product])

    useEffect(() => {
        if (form?.Cantidad > 0) {
            setForm({
                ...form,
                Costo: form?.Cantidad * (product?.Costo ?? 1)
            })
        }
    }, [form?.Cantidad])

    return (
        <form onSubmit={handleSubmit}>
            <div className='p-4'>
                <label>Seleccione articulo</label>
                <select
                    className='p-2 w-full border-2 border-grey rounded-md'
                    name="articulo"
                    onChange={handleChangeProduct}
                    required
                >
                    <option value=""></option>
                    {
                        products.map((product: ARTICULOS) => {
                            return (
                                <option value={product.Id} key={product.Id}>
                                    {
                                        product.Descripcion
                                    }
                                </option>
                            )
                        })
                    }
                </select>
            </div>
            {
                formValues && formValues.map(({ name, type, props }: { name: string; type: string; props: {} }) => {
                    return (
                        <div className='p-4' key={name}>
                            <label>{name}</label>
                            <input
                                className='p-2 w-full border-2 border-grey rounded-md'
                                type={type}
                                name={name}
                                onChange={handleChange}
                                required
                                {...props}
                            />
                        </div>
                    )
                })
            }

            <div className='p-4'>
                <label>Costo</label>
                <input
                    className='p-2 w-full border-2 border-grey rounded-md'
                    type="number"
                    name="costo"
                    onChange={handleChange}
                    required
                    disabled
                    value={form?.Costo ?? 0}
                />
            </div>
            <div className='flex '>
                <button
                    onClick={() => {
                        setForm({
                            ...form,
                            TipoTransaccion: 2
                        })
                    }}
                    type="submit"
                    className="p-4 w-full bg-red-700 text-white rounded-sm" >
                    Salida
                </button>
                <button
                    type="submit"
                    onClick={() => {
                        setForm({
                            ...form,
                            TipoTransaccion: 1
                        })
                    }}
                    className="p-4 w-full bg-green-500 text-white rounded-sm" >
                    Entrada
                </button>
            </div>

        </form>
    );
}

export default AddTransactionForm;