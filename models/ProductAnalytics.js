/**
 * @param {number} data.product_id - product or referenced id. Verify via snap.exist() before initiating constructor
 */
class ProductAnalytics{
    constructor({
        id = null, 
        product_id, //before creation verify that product doc snap exist via snap.exists()
        likes = 0, 
        shares = 0, 
        views = 0, 
        created_at = null, 
        modified_at = null 
    }){
        if(!product_id) throw new Error(`Invalid product id`);
        if ( isNaN(Number(price)) || Number(price) <= 0) throw new Error(`Invalid price: ${!isNaN(Number(price))}`);
        this.id = id;
        this.product_id = product_id;
        this.likes = likes;
        this.shares = shares;
        this.views = views;
        this.created_at = created_at || now();
        this.modified_at = modified_at || now();
        console.log(` ProductAnalytics model @ constructor created_at : ${created_at}`);
        console.log(` ProductAnalytics model @ constructor modified_at : ${modified_at}`);
    }

    toFirestore(){
        return {
            product_id: this.product_id,
            shares: this.shares,
            likes: this.likes,
            view: this.views,
            created_at: this.created_at,
            modified_at: this.modified_at
        }
    }
}