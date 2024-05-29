module.exports = {
    components:{
        schemas:{
            User:{
                type:'object',
                properties:{
                    name:{
                        type:'string',
                        description:"User name, must be unique",
                        example:"probeUser22"
                    },
                    pswd:{
                        type:'string',
                        description:"User password, must be secure",
                        example:"123ABCabc!"
                    }
                }
            },
            kart:{
                type:'object',
                properties:{
                    prodId:{
                        type:'objectId',
                        description:"An id of a product",
                        example: "6301064b0028de7866e2b2c4"
                    },
                }
            },
            search:{
                type:'object',
                properties:{
                    product:{
                        type:'string',
                        description:"product name, that will be searched",
                        example:"nestea"
                    }
                }
            },
            clear:{
                type:'object',
                properties:{
                    pordClearAll:{
                        type:'boolean',
                        description:"body secure variable for erase all products",
                        example:"true"
                    }
                }
            },
        }
    }
}