import {options} from '../repositories'
const knex = require('knex')(options);

export class Product {
    public name: string
    public foto: string
    public price: number

    constructor(name: string, foto: string, price:number){
        this.name = name;
        this.price = price;
        this.foto = foto;
    }
}

export class Products{
    products: Array<Product>
    
    constructor(arrayProducts: Array<Product>){
        this.products = arrayProducts;
    }

    async getAllProducts(){
        this.products = await bringProductsFromDB()
        if(this.products === null || this.products === []){
            return []
        }
        return this.products;
    }

    async getProductById(id: string){
        let myId = parseInt(id)
        let product = bringSingleProductoFromDb(myId)
        if(!product){
            return {}
        }
        return product;
    }

    async addProduct(product: Product){
        let savedProduct = saveProductToDB(product);
        return savedProduct;
    }

    async updateProductById(id: string, updatedProduct: any){
        let myId = parseInt(id)
        let product = await updateProductInDB(myId, updatedProduct);
        if(!product){
            return {error : 'Producto no encontrado'}
        }
        return product;
    }

    async deleteProduct(id: string){
        let myId = parseInt(id)
        let product = deleteProductFromDB(myId)
        if(!product){
            return {}
        }
        return product;
    }
}

const bringProductsFromDB = async() => {
    try {
        let products = await knex.select().from('productos')
        return products;
    } catch (error){
        console.log(error);
        return [];
    }
}

const bringSingleProductoFromDb = async(id: Number) => {
    try {
        let product = await knex('productos').where('id', id)
        return product;
    } catch (error){
        console.log(error);
        return {};
    }
}

const saveProductToDB = async(product: Product) => {
    try {
        let savedProduct = await knex('productos').insert(product)
        return savedProduct
    } catch (error){
        console.log(error);
        return {};
    }
}

const updateProductInDB = async(id: Number, updatedProduct: any) => {
    try {
        await knex('productos')
        .where('id', '=', id)
        .update(updatedProduct)
        let product = await knex('productos').where('id', id)
        return product;
    } catch (error){
        console.log(error);
        return [];
    }
}

const deleteProductFromDB = async(id:Number) => {
    try {
        let product = await knex('productos').where('id', id)
        await knex('productos')
        .where('id', '=', id)
        .del()
        return product;
    } catch (error){
        console.log(error);
        return [];
    }
}