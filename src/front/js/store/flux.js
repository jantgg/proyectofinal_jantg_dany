const getState = ({ getStore, getActions, setStore }) => {
  return {
    store: {
      userType: null,
      backendurl:
        "https://3001-jantgg-proyectofinaljan-p281rercrz8.ws-eu90.gitpod.io/api/",
      questions: [],
      answers: [],
      routes: [],
      photographers: [],
      photos: [],
      bikes: [],
      favorites: [],
    },
    actions: {
      getQuestions: async () => {
        const response = await fetch(getStore().backendurl + "questions");
        const data = await response.json();
        setStore({ questions: data.body });
      },
      getAnswers: async () => {
        const response = await fetch(getStore().backendurl + "answers");
        const data = await response.json();
        setStore({ answers: data.body });
      },
      getBikes: async () => {
        const response = await fetch(getStore().backendurl + "bikes");
        const data = await response.json();
        setStore({ bikes: data.body });
      },
      getRoutes: async () => {
        const response = await fetch(getStore().backendurl + "routes");
        const data = await response.json();
        setStore({ routes: data.body });
      },
      getPhotographers: async () => {
        const response = await fetch(getStore().backendurl + "photographers");
        const data = await response.json();
        setStore({ photographers: data.body });
      },
      getPhotos: async () => {
        const response = await fetch(getStore().backendurl + "photos");
        const data = await response.json();
        setStore({ photos: data.body });
      },
      getFavorites: async () => {
        const response = await fetch(getStore().backendurl + "favorites", {
          method: "GET",
          headers: {
            Authorization: "Bearer " + localStorage.getItem("token"),
          },
        });
        if (response.ok) {
          const data = await response.json();
          setStore({ favorites: data.body });
        }
      },
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
          localStorage.removeItem("type");
          localStorage.removeItem("email");
          localStorage.removeItem("user_id");
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
