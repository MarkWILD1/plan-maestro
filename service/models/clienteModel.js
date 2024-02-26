const mongoose = require('mongoose')
const bcrypt = require('bcrypt')

const consultaSchema = new mongoose.Schema({
    texto: String,
    fecha: {
        type: Date,
        default: Date.now
    }
}, {_id: false})

const QuerySchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Cliente',
    required: true,
  },
  // other fields... (query content etc.)
});


const clienteSchema = new mongoose.Schema({
    nombre: { type: String, required: true },
    apellido: { type: String, required: true},
    email: { 
        type: String,  
        unique: true,  
        lowercase: true,   
        trim: true,   
        validate(value) {
            if (!validator.isEmail(value)) {
                throw new Error("Correo electrónico invalido")
            } 
        }  
    },  
    celular: {
        type: String,
        match: /^(09)[0-9]{7}$/,
        required: true,
    },
    password: {
        type: String,
        required: true
    },
    consultas: [consultaSchema],
    queries: [QuerySchema]
}, {
    timestamps: true, //Crea campos createdAt y updatedAt

})

//Hashear el password
clienteSchema.pre('save', async function(next) {
    const salt = await bcrypt.genSalt()
    this.password = await bcrypt.hash(this.password ,salt)
    next()
})

//Comparar un password con el hasheado en la base de datos
clienteSchema.methods.checkPassword = async function (enteredPassword, password){
    return await bcrypt.compare(enteredPassword, password)
}


const Cliente = mongoose.model('Cliente', clienteSchema)
const Query = mongoose.model('Query', QuerySchema);

module.exports = Cliente, Query