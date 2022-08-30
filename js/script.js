const app = {
    speciality: ["PHP", "JavaScript", "Typescript"],
    professors: [
        {
            name: "Helene",
            language: "Typescript",
            speciality: "Data",
        },
        {
            name: "Fredo",
            language: "JavaScript",
            speciality: "Data",
        },
        {
            name: "Francois",
            language: "PHP",
            speciality: "Symfony",
        },
        {
            name: "Gaetan",
            language: "PHP",
            speciality: "Symfony",
        },
        {
            name: "Benjamin",
            language: "PHP",
            speciality: "React",
        },
        {
            name: "Laurent",
            language: "JavaScript",
            speciality: "React",
        },
        {
            name: "Enzo",
            language: "JavaScript",
            speciality: "React",
        }
    ],

    init: function () {
        // A toi de jouer
        console.log("Initialized");
        app.createDom();
        app.handleLanguage();
    },

    createDom: function () {
        const mainContainer = document.getElementById("app");
        mainContainer.classList.add("container");

        const divSelector = document.createElement("div");
        divSelector.classList.add("divSelector");

        const selectLanguage = document.createElement("select");
        selectLanguage.setAttribute("id", "languages");
        selectLanguage.classList.add("selector");
        const optionlanguage = document.createElement("option");
        optionlanguage.value = "";
        optionlanguage.textContent = "-- Selectionnez un language --";
        selectLanguage.appendChild(optionlanguage);

        const selectOption = document.createElement("select");
        selectOption.classList.add("selector");
        selectOption.setAttribute("id", "options")
        const optionSpeciality = document.createElement("option");
        optionSpeciality.value = "";
        optionSpeciality.textContent = "-- Selectionnez une spécialité --";
        selectOption.appendChild(optionSpeciality);


        app.speciality.forEach((element) => {
            const optionElement = document.createElement("option");
            optionElement.classList.add("options");
            optionElement.value = element;
            optionElement.textContent = element;
            selectLanguage.appendChild(optionElement);
        });

        // je cree un tableau, 
        const optionArray = [];
        
        app.professors.forEach(element => {
          const option = optionArray.includes(element.speciality)
          if(!option) optionArray.push(element.speciality);
        });
        
        optionArray.forEach(option => {

          const optionElement = document.createElement("option");
          optionElement.classList.add("options");
          optionElement.value = option;
          optionElement.textContent = option;
          selectOption.appendChild(optionElement);
        })
        
        divSelector.append(selectLanguage, selectOption);
        mainContainer.appendChild(divSelector);
    },

    handleLanguage: function () {
        const input = document.getElementById("languages");
        
        input.addEventListener("change", (e) => {
            if (e.target.value === "") return app.clearProf();
            app.createContainerProf(e.target.value);
            app.handleSpeciality(e.target.value)
        });
    },

    handleSpeciality: function(languageValue){
      const input = document.getElementById("options");
      input.addEventListener("change", (e) =>{
        if (e.target.value === "") return app.clearProf();

        if (e.target.value !== "") {
          const option = e.target.value;
          const titleProf = app.professors.filter((prof) => prof.language === languageValue && prof.speciality === option);

          if (document.getElementById("section")) {
              app.clearProf();
              app.createTitle(titleProf);
              app.createProf(titleProf);
          } else {
              const sectionContainer = document.createElement("div");
              sectionContainer.setAttribute("id", "section");
              sectionContainer.classList.add("section");
              document.getElementById("app").appendChild(sectionContainer);
              app.createTitle(titleProf);
              app.createProf(titleProf);
          }
      }})
    },

    createTitle: function (numberOfProf) {
        const titleElement = document.createElement("h1");
        titleElement.textContent =
            numberOfProf.length > 1
                ? `${numberOfProf.length} profs trouvés`
                : `${numberOfProf.length} prof trouvé`;
        document.getElementById("section").appendChild(titleElement);
    },

    createProf: function (titleProf) {
        for (let i = 0; i < titleProf.length; i++) {
            const profElement = document.createElement("div");
            profElement.setAttribute("class", "prof-title");
            profElement.classList.add("row");
            document.getElementById("section").appendChild(profElement);

            const profName = document.createElement("p");
            profName.classList.add("prof");
            profName.textContent = titleProf[i].name;
            // profElement.appendChild(profName);

            const language = document.createElement("span");
            language.classList.add("tag");
            language.innerHTML = `<code>${titleProf[i].language}</code>`;
            
            const spec = document.createElement("span");
            spec.classList.add("spec");
            spec.innerHTML = `<code>${titleProf[i].speciality}</code>`;
            
            profElement.append(profName, language, spec);
        }
    },

    clearProf: function () {
        const profSection = document.getElementById("section");
        profSection.innerHTML = "";
    },

    createContainerProf: function (inputValue) {
      if (inputValue !== "") {
        const option = inputValue;
        const titleProf = app.professors.filter((prof) => prof.language === option);

        if (document.getElementById("section")) {
            app.clearProf();
            app.createTitle(titleProf);
            app.createProf(titleProf);
        } else {
            const sectionContainer = document.createElement("div");
            sectionContainer.setAttribute("id", "section");
            sectionContainer.classList.add("section");
            document.getElementById("app").appendChild(sectionContainer);
            app.createTitle(titleProf);
            app.createProf(titleProf);
        }
    }

    }
};

// on initialise l'app dès que le document est prêt
document.addEventListener("DOMContentLoaded", app.init);
