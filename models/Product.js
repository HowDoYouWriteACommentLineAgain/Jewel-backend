class Product{
    constructor ({id = null, name, price, description, img, tags = [], stats = {}, created_at = null, modified_at = null }){
        if(!name) throw new Error(`Invalid name: ${name}`);
        if ( isNaN(Number(price)) || Number(price) <= 0) throw new Error(`Invalid price: `);
        
        const now = () => new Date().toISOString();
        this.id = id;
        this.name = name;
        this.price = Number(price);
        this.description = description || null;
        this.img = img || "";
        this.tags = tags || [];
        this.stats = stats || {likes: 0, views: 0, shares: 0};
        this.created_at = created_at || now();
        this.modified_at = modified_at || now();

        this.hasTags = tags.length > 0;

        console.log(` @Products Constructor image : ${this.img}`);
        // console.log(` Product model @ constructor created_at : ${created_at}`);
        // console.log(` Product model @ constructor modified_at : ${modified_at}`);
    }

    /**
     * @returns {Object} - Returns All except the id.
     */
    toFirestore(){
        return {
            name: this.name, 
            price: this.price, 
            description:this.description,
            img: this.img,
            tags: this.tags,
            hasTags: this.hasTags,
            stats: this.stats,
            created_at: this.created_at,
            modified_at: this.modified_at
        }
    }
}

export default Product;