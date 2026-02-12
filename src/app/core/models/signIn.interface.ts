export interface responseSignInInterface {
	return_message: returnMessageSignIn;
	result: returnResultSignIn;
}

export interface returnMessageSignIn {
	ERROR: boolean;
	ERROR_MESSAGE: string;
	CODE: number;
}
export interface returnResultSignIn {
	data: dataSignIn;
}

export interface dataSignIn {
	token: string;
}

export interface bodySignIn {
	email: string;
	order_number: string;
}
