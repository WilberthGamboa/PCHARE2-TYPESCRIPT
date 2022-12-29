Para establecer una publicación con nombre único solamente para el dueño en Mongoose, puedes agregar una propiedad de usuario a la esquema de la publicación y crear un índice compuesto que incluya la propiedad del nombre de la publicación y la propiedad del usuario.

Aquí hay un ejemplo de cómo hacerlo:

const postSchema = new mongoose.Schema({
  name: { type: String },
  user: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
  // otros campos de la publicación
});

postSchema.index({ name: 1, user: 1 }, { unique: true });

const Post = mongoose.model('Post', postSchema);