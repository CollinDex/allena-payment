// Mock Payment provider

export const mockInitiatePayment = async (amount: number, userId: string) => {
	return {
		status: 'pending',
		providerReference: `mock_${Date.now()}`,
		amount,
		userId
	};
};

export const mockVerifyPayment = async (providerReference: string) => {
	return {
		status: 'success',
		providerReference
	};
};
