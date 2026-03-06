// 1. The "Password Hacker" (The Sequence) A SOLUTION
/* function *passwordHacker() {
  yield* ["Scanning", "Decrypting", "Access Granted"]
}
for (const item of passwordHacker()) {
  console.log(item);
} */

//----------------------------- B SOLUTION

/* function *passwordHacker2() {
  yield "Scanning2";
  yield "Decrypting2";
  yield "Access Granted2";
}

const generator = passwordHacker2();
for (const word of generator) {
  console.log(word);
};
 */

//----------------------------- C SOLUTION

/*
function *passwordHacker3() {
  yield "Scanning";
  yield "Decrypting";
  yield "Access Granted";
}
const g3nerator = passwordHacker3();
console.log(g3nerator.next());
console.log(g3nerator.next());
console.log(g3nerator.next()); */

//-----------------------------
// 2. The "Infinite Power" (The Loop)
/*
function *numbGenerator() {
  let value = 0;
  while (value >= 0) {
    value++;
    yield value;
  };
}
const action = numbGenerator();
console.log(action.next());
console.log(action.next());
console.log(action.next());
console.log(action.next()); */

//-----------------------------
// 3. The "Traffic Light" (The Switch)

/* function* trafficLights() {
  const colors = ["🟢 Green", "🟡 Yellow", "🔴 Red"];
    while (true) {
      for (const color of colors) {
        yield color;
      }
    }
  }
  const evighetsMaskin = trafficLights();
  console.log(evighetsMaskin.next());
  console.log(evighetsMaskin.next());
  console.log(evighetsMaskin.next()); */


//-----------------------------
// 4. The "Array Slicer" (The Iteration)

/* function* arraySlicer() {
const fruits = ['Apple', 'Banana', 'Cherry'];
    for (const fruit of fruits) {
      yield fruit.toUpperCase();
    }
}
const generator = arraySlicer();
console.log(generator.next().value);
console.log(generator.next().value);
console.log(generator.next().value); */

//-----------------------------
// 5. The "Input Receiver" (The Advanced Trick)

/* function* advancedGenerator() {
  const question1 = `What's your name?`;
  const response = yield question1;
  yield response;

  if (response) {
    const question2 = `Hi ${response}, nice to meet you!`;
    const response2 = yield question2;
    yield response2;
  }
}

const generator = advancedGenerator();
console.log(generator.next().value);
console.log(generator.next('Sven!').value);
console.log(generator.next().value);
 */

function* advancedGenerator() {
  const responses = [];

  const steps = [
    () => `What's your name?`,
    () => `Hi, ${responses[0]}, nice to meet you!`,
    () => `What are you thinking about right now?`,
    () =>
      `Hmm, I understand your concern regarding ${responses[2]}, it can be quite a heavy subject!`,
    () => `So, what tickles your brain ${responses[0]}?`,
    () => `Oh, ${responses[4]} really? I would never guess!`,
  ];

  for (const step of steps) {
    const response = yield step();
    responses.push(response);
  }
}

const generator = advancedGenerator();
console.log(generator.next().value);
console.log(generator.next().value);
console.log(generator.next().value);
console.log(generator.next().value);
console.log(generator.next().value);
console.log(generator.next().value);
