declare module 'paystack-api' {
    interface TransactionParams {
      email: string;
      amount: number;
      currency?: string;
      metadata?: Record<string, any>;
      reference?: string;
    }
  
    interface TransactionResponse {
      status: boolean;
      message: string;
      data: any;
    }
  
    interface PaystackClient {
      transaction: {
        initialize(params: TransactionParams): Promise<TransactionResponse>;
        verify(params: { reference: string }): Promise<TransactionResponse>;
      };
    }
  
    function paystack(secretKey: string): PaystackClient;
  
    export default paystack;
  }
  