export class Order {
    id?: any;
    order_id?: any;
    product_name?:string = "";
    order_Product_ID?: string;
    order_Product_Quantity?: number;
    order_Customer?: string;
    order_Customer_Contact?: string;
    order_Customer_Address?: string;
    order_Type_Delivery?: boolean;
    order_Type_Pay?: boolean;
    order_Product_total_Price?: number = 0;
    order_Delivery_Status?: boolean;
    order_User_ID?: string;
    order_Date?: Date;
  }