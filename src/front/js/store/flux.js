const getState = ({ getStore, getActions, setStore }) => {
  return {
    store: {
      userType: null,
      backendurl:
        "https://3001-jantgg-proyectofinaljan-vbyrdoin260.ws-eu86.gitpod.io/api/",
    },
    actions: {
      syncuser: async () => {
        const response = await fetch(getStore().backendurl + "sync", {
          method: "GET",
          headers: {
            Authorization: "Bearer " + localStorage.getItem("token"),
          },
        });
        if (response.ok) {
          const data = await response.json();
          localStorage.setItem("type", data.type);
          setStore({ userType: data.type });
        }
      },
      logout: () => {
        try {
          localStorage.removeItem("token");
          setStore({ userType: null });
          return true;
        } catch (e) {
          console.log(e);
          return false;
        }
      },
    },
  };
};

export default getState;
