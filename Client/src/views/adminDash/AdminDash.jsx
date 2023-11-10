import { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { getAllExistingUsers, getAllExistingPosts, deleteUser, restoreUser, deletePost, restorePost } from "../../redux/actions";
import style from "./AdminDash.module.css";

const AdminDash = () => {
  const dispatch = useDispatch();
  const allUsers = useSelector((state) => state.allExistingUsers);
  const allPosts = useSelector((state) => state.allExistingPosts);

  console.log(allUsers);

  useEffect(() => {
    dispatch(getAllExistingUsers());
    dispatch(getAllExistingPosts());
  }, [dispatch]);

  const handleDisableUser = async (id) => {
    try {
      dispatch(deleteUser(id))
      alert("⛔ Usuario Deshabilitado ⛔")
      dispatch(getAllExistingUsers());
    } catch (error) {
      console.error("Hubo un problema al deshabilitar el usuario: ", error)
    }
  };

  const handleRestoreUser = async (id) => {
    try {
      dispatch(restoreUser(id))
      alert("✅ Usuario Reactivado ✅");
      dispatch(getAllExistingUsers());
    } catch (error) {
      console.error("Hubo un problema al reactivar el usuario: ", error)
    }
  };

  const handleDisablePost = async (id) => {
    try {
      dispatch(deletePost(id))
      alert("⛔ Publicacion Deshabilitada ⛔")
      dispatch(getAllExistingPosts());
    } catch (error) {
      console.error("Hubo un problema al deshabilitar la publicacion: ", error)
    }
  };

  const handleRestorePost = async (id) => {
    try {
      dispatch(restorePost(id))
      alert("✅ Publicacion Reactivada ✅");
      dispatch(getAllExistingPosts());
    } catch (error) {
      console.error("Hubo un problema al reactivar la publicacion: ", error)
    }
  };

  return (
    <>
      <h3>Admin Panel</h3>
      <div className={style.topContainer}>
        <div className={style.tile1}>
          <p>altas</p>
          <h4 className={style.newUsers}>1500</h4>
        </div>
        <div className={style.tile2}>
          <p>bajas</p>
          <h4 className={style.delUsers}>50</h4>
        </div>
        <div className={style.tile3}>
          <p>publicaciones</p>
          <h4 className={style.publications}>4500</h4>
        </div>
        <div className={style.tile4}>
          <p>matchs</p>
          <h4 className={style.matchs}>750</h4>
        </div>
        <div className={style.tile5}>
          <p>premium</p>
          <h4 className={style.premium}>550</h4>
        </div>
      </div>
      <div className={style.filters}>
        <div className={style.uFilters}>
          <h3>User filters</h3>
          <div className={style.uSelect}>
            <select>
              <option>Premium</option>
            </select>
            <select>
              <option>Rating</option>
            </select>
          </div>
        </div>
        <div className={style.pFilters}>
          <h3>Publications filters</h3>
          <div className={style.pSelect}>
            <select>
              <option>Premium</option>
            </select>
            <select>
              <option>Premium</option>
            </select>
            <select>
              <option>Premium</option>
            </select>
          </div>
        </div>
      </div>
      <div className={style.bottomContainer}>
        <div className={style.column1}>
          <div className={style.uList}>
            {allUsers.map((user) => (
              <div key={user.id} className={style.element}>
                <h4>{user.username}</h4>
                {user.plan === "premium" && <img
            width="36"
            height="36"
            src="https://img.icons8.com/color/48/guarantee.png"
            alt="guarantee"
            className={style.logo}
          />}
                <button onClick={() => handleDisableUser(user.id)} disabled={user.Deshabilitado}>
                  <img
                    width="20"
                    height="20"
                    src="https://img.icons8.com/fluency/48/cancel-2.png"
                    alt="Desactivar"
                  />
                </button>
                <button onClick={() => handleRestoreUser(user.id)} disabled={!user.Deshabilitado}>
                  <img
                    width="20"
                    height="20"
                    src="https://img.icons8.com/color/48/ok--v1.png"
                    alt="Reactivar"
                  />
                </button>
              </div>
            ))}
          </div>
        </div>
        <div className={style.column2}>
          <div className={style.pList}>
          {allPosts.map((post) => (
            <div key={post.id}>
              <h4>{post.title}</h4>
              <button onClick={() => handleDisablePost(post.id)} disabled={post.Deshabilitado}>
                  <img
                    width="20"
                    height="20"
                    src="https://img.icons8.com/fluency/48/cancel-2.png"
                    alt="Desactivar"
                  />
                </button>
                <button onClick={() => handleRestorePost(post.id)} disabled={!post.Deshabilitado}>
                  <img
                    width="20"
                    height="20"
                    src="https://img.icons8.com/color/48/ok--v1.png"
                    alt="Reactivar"
                  />
                </button>
            </div>
            ))}
          </div>
        </div>
      </div>
    </>
  );
};

export default AdminDash;
