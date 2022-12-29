# Usuarios 
## Wilberth 
eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjYzYWUxN2JkOTZhNDBlZjU2MWY3NDY1OCIsImlhdCI6MTY3MjM1Mzc3Nn0.xvUVLjWzGAKdCrlzKYxXe_GyNAs65UN2f9sYA0JOOWo
## Mildred
eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjYzYWUxN2QyOTZhNDBlZjU2MWY3NDY1YyIsImlhdCI6MTY3MjM1MzgwNH0.f-BMox93h1SchkY4gVtDOw1EZIlkkrnXBgypeg85dPQ

## Renato
eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjYzYWUxN2UyOTZhNDBlZjU2MWY3NDY2MCIsImlhdCI6MTY3MjM1MzgyMH0.NvjtOPwwGot4D--uqR66KEvsMjuEmnl5LySMLx4DYbU




Para establecer una publicación con nombre único solamente para el dueño en Mongoose, puedes agregar una propiedad de usuario a la esquema de la publicación y crear un índice compuesto que incluya la propiedad del nombre de la publicación y la propiedad del usuario.

Aquí hay un ejemplo de cómo hacerlo:

const postSchema = new mongoose.Schema({
  name: { type: String },
  user: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
  // otros campos de la publicación
});

postSchema.index({ name: 1, user: 1 }, { unique: true });

const Post = mongoose.model('Post', postSchema);