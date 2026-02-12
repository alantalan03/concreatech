// Interfaz para el mensaje de retorno
interface ReturnMessage {
	ERROR: boolean;
	ERROR_MESSAGE: string;
	CODE: number;
}

// Interfaz para el producto
interface Product {
	id_user_purchase_order_product: number;
	product_name: string;
	product_price: string; // Considera cambiar a number si solo manejas precios numéricos
	url_imagen: string;
	description: string; // Podrías usar otra interfaz si deseas descomponer el JSON
	size: string;
	color: string;
	isChecked: boolean; // Propiedad agregada para indicar si el producto está seleccionado
}

// Interfaz para la orden
interface Order {
	id_user: number;
	order_number: string;
	purchase_data: string; // Considera cambiar a Date si manejas fechas
	products: Product[];
}

// Interfaz para el resultado
interface Result {
	order: Order;
}

// Interfaz principal que une todo
interface ApiResponse {
	return_message: ReturnMessage;
	result: Result;
}
