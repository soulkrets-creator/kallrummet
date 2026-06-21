// Mini-quiz för finska.html.
// JavaScriptet är medvetet litet: det kontrollerar bara svaren i formuläret.
document.addEventListener("DOMContentLoaded", function () {
    var quiz = document.getElementById("finska-quiz");

    if (!quiz) {
        return;
    }

    var fields = quiz.querySelectorAll("input[data-answer]");

    fields.forEach(function (field) {
        field.addEventListener("input", function () {
            checkAnswer(field);
        });
    });

    quiz.addEventListener("reset", function () {
        window.setTimeout(function () {
            fields.forEach(function (field) {
                showFeedback(field, "", "");
            });
        }, 0);
    });
});

function checkAnswer(field) {
    var userAnswer = normalizeAnswer(field.value);
    var acceptedAnswers = field.dataset.answer.split("|").map(normalizeAnswer);

    if (!userAnswer) {
        showFeedback(field, "", "");
        return;
    }

    if (acceptedAnswers.indexOf(userAnswer) !== -1) {
        showFeedback(field, "Rätt - hyvä!", "correct");
    } else {
        showFeedback(field, "Inte riktigt än. Prova igen.", "wrong");
    }
}

function normalizeAnswer(value) {
    return value
        .trim()
        .toLowerCase()
        .replace(/\s+/g, " ")
        .replace(/[.!?]/g, "");
}

function showFeedback(field, message, state) {
    var question = field.closest(".finska-question");
    var feedback = question ? question.querySelector(".finska-feedback") : null;

    if (!feedback) {
        return;
    }

    feedback.textContent = message;
    feedback.classList.remove("is-correct", "is-wrong");

    if (state) {
        feedback.classList.add("is-" + state);
    }
}
