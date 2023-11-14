const { Like, User, Post, Matches } = require("../DB_config");
const { transporter } = require("../config/mailer")
const { matchMail} = require("../utils/mailObjects")

// Función para encontrar matches
const findMatches = async () => {
  try {
    const allLikes = await Like.findAll(); // Obtén todos los registros de "likes"
    const matches = [];

    for (let i = 0; i < allLikes.length; i++) {
      for (let j = i + 1; j < allLikes.length; j++) {
        const like1 = allLikes[i];
        const like2 = allLikes[j];

        if (
          like1.myUserId === like2.anotherUserId &&
          like1.myPostId === like2.likedPostId &&
          like1.anotherUserId === like2.myUserId &&
          like1.likedPostId === like2.myPostId
        ) {
          matches.push({ match: [like1, like2] });
          
          const matchExists = await Matches.findOne({
            where: {
              UserId1: like1.myUserId,
              UserId2: like1.anotherUserId,
              PostId1: like1.myPostId,
              PostId2: like1.likedPostId,
              EmailSended: true,
            },
          });

          if(!matchExists) {
            await Matches.create({
              UserId1: like1.myUserId,
              UserId2: like1.anotherUserId,
              PostId1: like1.myPostId,
              PostId2: like1.likedPostId,
              EmailSended: true,
            });

            const firstUser = await User.findByPk(like1.myUserId);
            const secondUser = await User.findByPk(like1.anotherUserId);
            const firstPost = await Post.findByPk(like1.myPostId);
            const secondPost = await Post.findByPk(like1.likedPostId);

            transporter.sendMail(matchMail(firstUser, secondUser, firstPost, secondPost))
          }
        }
      }
    }

    return matches;
  } catch (error) {
    throw new Error('Error al buscar coincidencias: ' + error.message);
  }
};

const sendMatchMail = async (user1, user2, post1, post2) => {

  const firstUser = await User.findByPk(user1);
  const secondUser = await User.findByPk(user2);
  const firstPost = await Post.findByPk(post1);
  const secondPost = await Post.findByPk(post2);

  try {
    transporter.sendMail(matchMail(firstUser, secondUser, firstPost, secondPost))
    return
  } catch (error) {
    throw error;
  }
}

module.exports = {
  findMatches,
  sendMatchMail,
};
