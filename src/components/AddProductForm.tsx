import { ARTICULOS } from '@/interfaces/product';
import React, { useState } from 'react';


const formValues = [
    {
        name: "Descripcion",
        type: "text",
        props: {
        }
    },
    {
        name: "FechaVencimiento",
        type: "date",
        props: {
        }
    },
    {
        name: "Cantidad",
        type: "number",
        props: {
            min: 1
        }
    },
    {
        name: "Costo",
        type: "number",
        props: {
            min: 1
        }
    },
]

interface Props {
    onSubmit: (e: ARTICULOS) => void
}

const AddProductForm: React.FC<Props> = ({ onSubmit }) => {
    const [form, setForm] = useState({});

    const handleChange = (e: any) => {
        setForm({
            ...form,
            [e.target.name]: e.target.value
        })
    }

    const handleSubmit = (e: any) => {
        e.preventDefault()
        onSubmit(form as ARTICULOS);
    }

    return (
        <form onSubmit={handleSubmit}>
            {
                formValues.map(({ name, type,  props}: { name: string; type: string; props: {} }) => {
                    return (
                        <div className='p-4'>
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
            <button type="submit" className="p-4 w-full bg-yellow-500 text-white rounded-sm" >
                Agregar
            </button>
        </form>
    );
}

export default AddProductForm;