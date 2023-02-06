export default {
  checkForm() {
    const firstname = document.getElementById("firstname");
    const lastname = document.getElementById("lastname");
    const email = document.getElementById("email");
    const message = document.getElementById("message");
    let error = 0;

    if (firstname.value.trim() === "" || firstname.value.trim().length < 2) {
      document.getElementById("errorFirst").innerHTML =
        "Le champ doit faire plus de 2 caractères.";
      error += 1;
    } else {
      document.getElementById("errorFirst").innerHTML = "";
    }

    if (lastname.value.trim() === "" || lastname.value.trim().length < 2) {
      document.getElementById("errorLast").innerHTML =
        "Le champ doit faire plus de 2 caractères.";
      error += 1;
    } else {
      document.getElementById("errorLast").innerHTML = "";
    }

    const regexEmail = /^[\w-\.]+@([\w-]+\.)+[\w-]{2,5}$/;
    if (regexEmail.test(email.value) === false) {
      document.getElementById("errorEmail").innerHTML =
        "L'email doit être valide.";
      error += 1;
    } else {
      document.getElementById("errorEmail").innerHTML = "";
    }

    if (message.value.trim() === "" || message.value.trim().length < 2) {
      document.getElementById("errorMessage").innerHTML =
        "Le champ doit faire plus de 2 caractères.";
      error += 1;
    } else {
      document.getElementById("errorMessage").innerHTML = "";
    }

    if (error === 0) {
      console.log(
        "Prénom : " + firstname.value + "\n" +
        "Nom : " + lastname.value + "\n" +
        "Email : " + email.value + "\n" +
        "Message : " + message.value
      );
    }
  },
};
