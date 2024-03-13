
import { useProducts } from "@/lib/hooks/useProducts";
import moment from "moment";
import { useModal } from "@/lib/hooks/useModal";
import AddProductForm from "./AddProductForm";
import { ARTICULOS } from "@/interfaces/product";
import { useTransactions } from "@/lib/hooks/useTransactions";
import AddTransactionForm from "./AddTransactionForm";
import { TRANSACCIONES } from "@/interfaces/transaction";
import { tipoTransacciones } from "@/data/products";

const TABLE_PRODUCTS_HEAD = ["Id", "Descripcion", "Fecha Ingreso", "Fecha Vencimiento", "Cantidad", "Costo", "Estado"];
const TABLE_TRANSACTIONS_HEAD = ["Id", "Descripcion", "Tipo Transaccion", "Articulo", "Cantidad", "Costo"];



const ProductList = () => {
    const { products, add, updateProduct } = useProducts();
    const { transactions, add: addTransaction } = useTransactions();
    const { open, draw: Draw, close } = useModal();
    const { open: openTransaction, draw: DrawTransaction, close: closeTransaction } = useModal();

    const handleAddProduct = (data: ARTICULOS) => {
        add({
            ...data,
            Id: products.length + 1,
            Estado: 1
        })
        close()
    }

    const handleAddTransaction = (data: TRANSACCIONES) => {
        addTransaction({
            ...data,
            Id: transactions.length + 1,
            Estado: 1
        })
        closeTransaction()

        updateProduct({
            Id: data.Articulo,
            Cantidad: data.TipoTransaccion === 1 ? +data.Cantidad : +data.Cantidad * -1
        })
    }

    return (
        <div className="h-full w-full p-24 relative">
            <Draw>
                <h2 className="text-center ">Agregar articulo</h2>
                <AddProductForm onSubmit={handleAddProduct} />
            </Draw>

            <DrawTransaction>
                <h2 className="text-center ">Agregar Transaccion</h2>
                <AddTransactionForm products={products} onSubmit={handleAddTransaction} />
            </DrawTransaction>
            <div className="rounded-none">
                <div className="mb-8 flex items-center justify-between gap-8">
                    <div>
                        <p color="blue-gray">
                            Lista de articulos
                        </p>
                    </div>
                    <div className="flex shrink-0 flex-col gap-2 sm:flex-row">
                        <button onClick={open} className="p-4 bg-yellow-500 text-white rounded-sm">
                            Agregar
                        </button>
                    </div>
                </div>
            </div>
            <div className="overflow-auto px-0">
                <table className="mt-4 w-full min-w-max table-auto text-left">
                    <thead>
                        <tr>
                            {TABLE_PRODUCTS_HEAD.map((head) => (
                                <th
                                    key={head}
                                    className="border-y border-blue-gray-100 bg-blue-gray-50/50 p-4"
                                >
                                    <p

                                        color="blue-gray"
                                        className="font-normal leading-none opacity-70"
                                    >
                                        {head}
                                    </p>
                                </th>
                            ))}
                        </tr>
                    </thead>
                    <tbody>
                        {products.map(
                            ({ Id, Descripcion, FechaIngreso, FechaVencimiento, Cantidad, Costo, Estado }, index) => {
                                const isLast = index === products.length - 1;
                                const classes = isLast
                                    ? "p-4"
                                    : "p-4 border-b border-blue-gray-50";

                                return (
                                    <tr key={Id}>
                                        <td className={classes}>
                                            <div className="flex items-center gap-3">
                                                <div className="flex flex-col">
                                                    <p

                                                        color="blue-gray"
                                                        className="font-normal"
                                                    >
                                                        {Id}
                                                    </p>
                                                </div>
                                            </div>
                                        </td>
                                        <td className={classes}>
                                            <div className="flex items-center gap-3">
                                                <div className="flex flex-col">
                                                    <p

                                                        color="blue-gray"
                                                        className="font-normal"
                                                    >
                                                        {Descripcion}
                                                    </p>
                                                </div>
                                            </div>
                                        </td>
                                        <td className={classes}>
                                            <div className="flex flex-col">
                                                <p
                                                    color="blue-gray"
                                                    className="font-normal"
                                                >
                                                    {moment().format("DD-MM-YYYY")}
                                                </p>

                                            </div>
                                        </td>
                                        <td className={classes}>
                                            <div className="flex flex-col">
                                                <p
                                                    color="blue-gray"
                                                    className="font-normal"
                                                >
                                                    {moment().format("DD-MM-YYYY")}
                                                </p>

                                            </div>
                                        </td>
                                        <td className={classes}>
                                            <div className="w-max">
                                                {Cantidad}
                                            </div>
                                        </td>
                                        <td className={classes}>
                                            <p
                                                color="blue-gray"
                                                className="font-normal"
                                            >
                                                {Costo}
                                            </p>
                                        </td>
                                        <td className={classes}>
                                            <p
                                                color="blue-gray"
                                                className="font-normal"
                                            >
                                                {Estado}
                                            </p>
                                        </td>
                                    </tr>
                                );
                            },
                        )}
                    </tbody>
                </table>
            </div>

            <hr className="my-10" />
            <div className="rounded-none">
                <div className="mb-8 flex items-center justify-between gap-8">
                    <div>
                        <p color="blue-gray">
                            Lista de transacciones
                        </p>
                    </div>
                    <div className="flex shrink-0 flex-col gap-2 sm:flex-row">
                        <button onClick={openTransaction} className="p-4 bg-yellow-500 text-white rounded-sm">
                            Agregar transaccion
                        </button>
                    </div>
                </div>
            </div>
            <div className="overflow-auto px-0">
                <table className="mt-4 w-full min-w-max table-auto text-left">
                    <thead>
                        <tr>
                            {TABLE_TRANSACTIONS_HEAD.map((head) => (
                                <th
                                    key={head}
                                    className="border-y border-blue-gray-100 bg-blue-gray-50/50 p-4"
                                >
                                    <p
                                        color="blue-gray"
                                        className="font-normal leading-none opacity-70"
                                    >
                                        {head}
                                    </p>
                                </th>
                            ))}
                        </tr>
                    </thead>
                    <tbody>
                        {transactions.map(
                            ({ Id, Descripcion, TipoTransaccion, Articulo, Cantidad, Costo }, index) => {
                                const isLast = index === products.length - 1;
                                const classes = isLast
                                    ? "p-4"
                                    : "p-4 border-b border-blue-gray-50";

                                return (
                                    <tr key={Id}>
                                        <td className={classes}>
                                            <div className="flex items-center gap-3">
                                                <div className="flex flex-col">
                                                    <p

                                                        color="blue-gray"
                                                        className="font-normal"
                                                    >
                                                        {Id}
                                                    </p>
                                                </div>
                                            </div>
                                        </td>
                                        <td className={classes}>
                                            <div className="flex items-center gap-3">
                                                <div className="flex flex-col">
                                                    <p

                                                        color="blue-gray"
                                                        className="font-normal"
                                                    >
                                                        {Descripcion}
                                                    </p>
                                                </div>
                                            </div>
                                        </td>
                                        <td className={classes}>
                                            <div className="flex flex-col">
                                                <p
                                                    color="blue-gray"
                                                    className="font-normal"
                                                >
                                                    {tipoTransacciones.find(x => x.Id == (TipoTransaccion ?? 1))?.Descripcion ?? "Entrada"}
                                                </p>

                                            </div>
                                        </td>
                                        <td className={classes}>
                                            <div className="flex flex-col">
                                                <p
                                                    color="blue-gray"
                                                    className="font-normal"
                                                >
                                                    {products.find(x => x.Id == +Articulo)?.Descripcion ?? "NA"}
                                                </p>

                                            </div>
                                        </td>
                                        <td className={classes}>
                                            <div className="w-max">
                                                {Cantidad}
                                            </div>
                                        </td>
                                        <td className={classes}>
                                            <p
                                                color="blue-gray"
                                                className="font-normal"
                                            >
                                                {Costo}
                                            </p>
                                        </td>
                                    </tr>
                                );
                            },
                        )}
                    </tbody>
                </table>
            </div>

        </div>
    );
}

export default ProductList