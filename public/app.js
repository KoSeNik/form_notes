document.addEventListener("DOMContentLoaded", () => {
  const submitForm = document.getElementById("submitForm");
  const successMessage = document.getElementById("successMessage");

  if (successMessage) {
    successMessage.style.display = "none";
  }

  if (submitForm && successMessage) {
    submitForm.addEventListener("submit", async (event) => {
      event.preventDefault();

      const fio = document.getElementById("fio").value;
      const phoneNumber = document.getElementById("phoneNumber").value;
      const descriptionProblem =
        document.getElementById("descriptionProblem").value;

      const dataNote = {
        fio,
        phoneNumber,
        descriptionProblem,
      };

      try {
        const note = await fetch("/", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(dataNote),
        });

        if (note.ok) {
          successMessage.style.display = "block";
          submitForm.reset();
        }
      } catch (error) {
        console.error("Ошибка отправки заявки:", error);
      }
    });
  }
});
