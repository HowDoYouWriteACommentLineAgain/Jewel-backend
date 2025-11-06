export default class Admin{
    constructor(id = null, name, permissions = 0, created_at = null, modified_at = null){
        if(typeof name !== 'string' || !name) throw new Error('invalid name');
        id = this.id;
        name = this.name;
        permissions = this.permissions; // 0 view; 1 write; 3 edit and delete
        created_at = new Date().toISOString;
        modified_at = new Date().toISOString
    }
    
    toFirstore(){
        return {
            id: this.id, 
            name: this.name, 
            permissions: this.permissions,
            created_at: this.created_at,
            modified_at: this.modified_at
        }
    }
}

