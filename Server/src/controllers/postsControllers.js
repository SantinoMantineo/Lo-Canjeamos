const { Post, User } = require("../DB_config");
const { transporter } = require("../config/mailer")
const { postCreated } = require("../utils/mailObjects")

exports.getAllPosts = async () => {
  try {
    const posts = await Post.findAll({
      include: User, //trae toda la informacion del usuario, hay que elegir las porpiedades necesarias en vez de TODAS como esta configurado ahora
    });

    return posts;
  } catch (error) {
    throw error;
  }
};

exports.getAllDisabled = async () => {
  try {
    const disabledPosts = await Post.findAll({
      where: {paranoid: false}
    })

    return disabledPosts
  } catch (error) {
    throw "Ocurrió un error al traer las publicaciones: " + error;
  }
};

exports.getAllExisting = async () => {
  try {
    const existingPosts = await Post.findAll({
      paranoid: false,
      order: [['id', 'ASC']],
    })

    return existingPosts
  } catch (error) {
    throw "Ocurrió un error al traer las publicaciones: " + error;
  }
};

exports.getPostById = async (id) => {
  try {
    const postById = await Post.findByPk(id, {
      include: User, 
    });

    if (!postById) {
      throw new Error("No post found with the specified id");
    }

    return postById;
  } catch (error) {
    throw error;
  }
};


exports.getPostsByCategory = async (category) => {
  try {
    const posts = await Post.findAll({
      where: {
        category: category,
      },
    });

    return posts;
  } catch (error) {
    throw error;
  }
};

exports.createPost = async (postData) => {
  try {
    const posteos = await Post.findAll({
      where: {
        UserId: postData.UserId,
        Deshabilitado: null
      }
    });

    const usuario = await User.findByPk(postData.UserId);

    if(posteos.length >= 1 && usuario.plan != "premium") {
      throw new Error("Solo los usuarios premium pueden tener mas de una publicacion a la vez!")
      
    } else {
      const newPost = await Post.create(postData);
      const postUser = await User.findByPk(postData.UserId)
      await transporter.sendMail(postCreated(postUser.email, postData))
      return newPost;
    }
  } catch (error) {
    throw new Error(error.message);
    // throw error;
    }
};

exports.updatePost = async (id, updatedData) => {
  try {
    const post = await Post.findByPk(id);

    if (!post) {
      throw new Error("Post not found");
    }

    await post.update(updatedData);

    return post;
  } catch (error) {
    throw error;
  }
};

exports.deletePost = async (id) => {
  try {
    const post = await Post.findByPk(id);

    if (!post) {
      throw new Error("Post not found");
    } else {
      await post.destroy();
    }


    return true;
  } catch (error) {
    throw error;
  }
};

exports.getPostsByProvince = async(provincia) => {
    const posts = await Post.findAll();
    const provinceFilter = posts.filter((post) => {
      return post.ubication.startsWith(`${provincia}`);
    });
    return provinceFilter;
}


exports.getPostsByLocality = async (localidad) => {
  const posts = await Post.findAll();
  const localityFilter = posts.filter((post) => {
    return post.ubication.endsWith(`${localidad}`);
  });
  return localityFilter;
}

exports.restorePost = async (id) => {
  try {
    const postDisabled = await Post.findByPk(id, {paranoid:false})

    if(!postDisabled) {
      throw new Error("La publicacion que intenta restaurar no se encuentra.")
    }
    
    await postDisabled.restore()
    return postDisabled;
  } catch (error) {
    throw (error)
  }
};
