module.exports.shuffleArray = (questions) => {
  let length = questions.length;
  for (let i = length - 1; i >= 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    let question1 = { ...questions[i] };
    let question2 = { ...questions[j] };
    questions[i] = question2;
    questions[j] = question1;
  }

  let newQuestions = [];

  for (let i = 0; i < questions.length; i++)
    newQuestions.push(questions[i]._doc);

  return newQuestions;
};
