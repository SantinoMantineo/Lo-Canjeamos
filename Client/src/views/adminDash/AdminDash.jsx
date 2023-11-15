import { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import {
  getAllExistingUsers,
  getAllExistingPosts,
  deleteUser,
  restoreUser,
  deletePost,
  restorePost,
  getMatches,
  sortUsersByID,
  sortUsersByPlan,
  sortUsersByStatus,
  resetUsersFilter,
  sortPostsByID,
  sortPostsByStatus,
  resetPostsFilter,
} from "../../redux/actions";
import style from "./AdminDash.module.css";
import Swal from "sweetalert2";

const AdminDash = () => {
  const dispatch = useDispatch();
  const allUsers = useSelector((state) => state.allExistingUsers);
  const allUsersCopy = useSelector((state) => state.allExistingUsersCopy);
  const allPosts = useSelector((state) => state.allExistingPosts);
  const allPostsCopy = useSelector((state) => state.allExistingPostsCopy);
  const allMatches = useSelector((state) => state.matches);

  const [selectedUserID, setselectedUserID] = useState("");
  const [selectedUserPlan, setselectedUserPlan] = useState("");
  const [selectedUserStatus, setselectedUserStatus] = useState("");

  const [selectedPostsID, setselectedPostID] = useState("");
  const [selectedPostStatus, setselectedPostStatus] = useState("");

  useEffect(() => {
    dispatch(getAllExistingUsers());
    dispatch(getAllExistingPosts());
    dispatch(getMatches());
  }, [dispatch]);

  const activeUsersCounter = () => {
    let activeUsers = 0;

    for (const user of allUsersCopy) {
      if (!user.Deshabilitado) {
        activeUsers += 1;
      }
    }

    return activeUsers;
  };

  const disabledUsersCounter = () => {
    let disabledUsers = 0;

    for (const user of allUsersCopy) {
      if (user.Deshabilitado) {
        disabledUsers += 1;
      }
    }

    return disabledUsers;
  };

  const premiumUsersCounter = () => {
    let premiumUsers = 0;

    for (const user of allUsersCopy) {
      if (user.plan === "premium") {
        premiumUsers += 1;
      }
    }

    return premiumUsers;
  };

  const handleDisableUser = async (id) => {
    try {
      await dispatch(deleteUser(id));
      const Toast = Swal.mixin({
        toast: true,
        position: 'top-end',
        showConfirmButton: false,
        timer: 1000,
        timerProgressBar: true,
        didOpen: (toast) => {
          toast.addEventListener('mouseleave', Swal.resumeTimer);
        }
      });

      Toast.fire({
        icon: 'warning',
        iconColor: 'red',
        title: '⛔ Usuario Deshabilitado ⛔',
      });
      await dispatch(getAllExistingUsers());
    } catch (error) {
      console.error("Hubo un problema al deshabilitar el usuario: ", error);
    }
  };

  const handleRestoreUser = async (id) => {
    try {
      await dispatch(restoreUser(id));
      const Toast = Swal.mixin({
        toast: true,
        position: 'top-end',
        showConfirmButton: false,
        timer: 1000,
        timerProgressBar: true,
        didOpen: (toast) => {
          toast.addEventListener('mouseleave', Swal.resumeTimer);
        }
      });

      Toast.fire({
        icon: 'success',
        title: '✅ Usuario Reactivado ✅',
      });
      await dispatch(getAllExistingUsers());
    } catch (error) {
      console.error("Hubo un problema al reactivar el usuario: ", error);
    }
  };

  const handleDisablePost = async (id) => {
    try {
      await dispatch(deletePost(id));

      const Toast = Swal.mixin({
        toast: true,
        position: 'top-end',
        showConfirmButton: false,
        timer: 1000,
        timerProgressBar: true,
        didOpen: (toast) => {
          toast.addEventListener('mouseleave', Swal.resumeTimer);
        }
      });

      Toast.fire({
        icon: 'warning',
        iconColor: 'red',
        title: '⛔Publicacion deshabilitada⛔',
      });
      await dispatch(getAllExistingPosts());
    } catch (error) {
      console.error("Hubo un problema al deshabilitar la publicacion: ", error);
    }
  };

  const handleRestorePost = async (id) => {
    try {
      await dispatch(restorePost(id));
      const Toast = Swal.mixin({
        toast: true,
        position: 'top-end',
        showConfirmButton: false,
        timer: 1000,
        timerProgressBar: true,
        didOpen: (toast) => {
          toast.addEventListener('mouseleave', Swal.resumeTimer);
        }
      });

      Toast.fire({
        icon: 'succes',
        title: '✅ Publicacion Reactivada ✅',
      });
      await dispatch(getAllExistingPosts());
    } catch (error) {
      console.error("Hubo un problema al reactivar la publicacion: ", error);
    }
  };

  function handleSortByID() {
    setselectedUserID(event.target.value);
    dispatch(sortUsersByID(event.target.value));
  }

  function handleSortByPlan() {
    setselectedUserPlan(event.target.value);
    if (event.target.value === "Estándar") {
      dispatch(sortUsersByPlan("notPremium"));
    } else {
      dispatch(sortUsersByPlan("premium"));
    }
  }

  function handleSortByStatus() {
    setselectedUserStatus(event.target.value);
    dispatch(sortUsersByStatus(event.target.value));
  }

  function handleResetUsersFilters() {
    setselectedUserID("");
    setselectedUserPlan("");
    setselectedUserStatus("");
    dispatch(resetUsersFilter());
  }

  function handleSortPostByID() {
    setselectedPostID(event.target.value);
    dispatch(sortPostsByID(event.target.value));
  }

  function handleSortPostByStatus() {
    setselectedPostStatus(event.target.value);
    dispatch(sortPostsByStatus(event.target.value));
  }

  function handleResetPostsFilters() {
    setselectedPostID("");
    setselectedPostStatus("");
    dispatch(resetPostsFilter());
  }

  return (
    <>
      <h3>Panel de Administrador</h3>
      <div className={style.topContainer}>
        <div className={style.tile1}>
          <p>Activos</p>
          <h4 className={style.newUsers}>{activeUsersCounter()}</h4>
        </div>
        <div className={style.tile2}>
          <p>Deshabilitados</p>
          <h4 className={style.delUsers}>{disabledUsersCounter()}</h4>
        </div>
        <div className={style.tile3}>
          <p>Publicaciones</p>
          <h4 className={style.publications}>{allPostsCopy.length}</h4>
        </div>
        <div className={style.tile4}>
          <p>Matches</p>
          <h4 className={style.matchs}>{allMatches.length}</h4>
        </div>
        <div className={style.tile5}>
          <p>Premium</p>
          <h4 className={style.premium}>{premiumUsersCounter()}</h4>
        </div>
      </div>
      <div className={style.filters}>
        <div className={style.uFilters}>
          <h3>Filtros de Usuario</h3>
          <div className={style.uSelect}>
            <select onChange={handleSortByID} value={selectedUserID}>
              <option hidden defaultValue>
                ID
              </option>
              {["Ascendente", "Descendente"].map((plan, index) => (
                <option value={plan} key={index}>
                  {plan}
                </option>
              ))}
            </select>
            <select onChange={handleSortByPlan} value={selectedUserPlan}>
              <option hidden defaultValue>
                Plan
              </option>
              {["Estándar", "Premium"].map((plan, index) => (
                <option value={plan} key={index}>
                  {plan}
                </option>
              ))}
            </select>
            <select onChange={handleSortByStatus} value={selectedUserStatus}>
              <option hidden defaultValue>
                Estado
              </option>
              {["Activos", "Deshabilitados"].map((plan, index) => (
                <option value={plan} key={index}>
                  {plan}
                </option>
              ))}
            </select>
            <button onClick={handleResetUsersFilters}>Limpiar</button>
          </div>
        </div>
        <div className={style.pFilters}>
          <h3>Filtros de Publicaciones</h3>
          <div className={style.pSelect}>
            <select onChange={handleSortPostByID} value={selectedPostsID}>
              <option hidden defaultValue>
                ID
              </option>
              {["Ascendente", "Descendente"].map((plan, index) => (
                <option value={plan} key={index}>
                  {plan}
                </option>
              ))}
            </select>
            <select
              onChange={handleSortPostByStatus}
              value={selectedPostStatus}
            >
              <option hidden defaultValue>
                Estado
              </option>
              {["Activas", "Deshabilitadas"].map((estado, index) => (
                <option value={estado} key={index}>
                  {estado}
                </option>
              ))}
            </select>
            <button onClick={handleResetPostsFilters}>Limpiar</button>
          </div>
        </div>
      </div>
      <div className={style.bottomContainer}>
        <div className={style.column1}>
          <div className={style.uList}>
            {allUsers.map((user) => (
              <div key={user.id} className={style.element}>
                <h4>ID: {user.id}</h4>
                <h4>{user.username} <h5>{user.email}</h5></h4>
                
                {user.Deshabilitado ? (
                  <span style={{ color: "crimson", fontSize: 16 }}>
                    Deshabilitado
                  </span>
                ) : (
                  <span style={{ color: "#3ec762", fontSize: 16 }}>Activo</span>
                )}
                {user.plan === "premium" ? (
                  <img
                    width="24"
                    height="24"
                    src="https://img.icons8.com/color/48/guarantee.png"
                    alt="guarantee"
                    className={style.logo}
                  />
                ) : (
                  <img
                    width="24"
                    height="24"
                    src="https://img.icons8.com/puffy-filled/32/experimental-user-puffy-filled.png"
                    alt="experimental-user-puffy-filled"
                  />
                )}
                <button
                  onClick={() => handleDisableUser(user.id)}
                  disabled={user.Deshabilitado}
                >
                  <img
                    width="20"
                    height="20"
                    src="https://img.icons8.com/fluency/48/cancel-2.png"
                    alt="Desactivar"
                  />
                </button>
                <button
                  onClick={() => handleRestoreUser(user.id)}
                  disabled={!user.Deshabilitado}
                >
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
              <div key={post.id} className={style.element}>
                <h4>ID: {post.id}</h4>
                <h4>{post.title}</h4>
                {post.Deshabilitado ? (
                  <span style={{ color: "crimson", fontSize: 16 }}>
                    Deshabilitada
                  </span>
                ) : (
                  <span style={{ color: "#3ec762", fontSize: 16 }}>Activa</span>
                )}
                <button
                  onClick={() => handleDisablePost(post.id)}
                  disabled={post.Deshabilitado}
                >
                  <img
                    width="20"
                    height="20"
                    src="https://img.icons8.com/fluency/48/cancel-2.png"
                    alt="Desactivar"
                  />
                </button>
                <button
                  onClick={() => handleRestorePost(post.id)}
                  disabled={!post.Deshabilitado}
                >
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
