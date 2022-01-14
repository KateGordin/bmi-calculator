
function calculateBMI(weight, height) {
    return weight / (height * height);
}

validateNumberOfInputs(process.argv);


function calculateBMR(weight, height, ageOfUser, genderOfUser) {
    const heightInCm = height * 100;

    let BMR;

    if (genderOfUser === "m") {
        BMR = 10 * weight + 6.25 * heightInCm - 5 * ageOfUser + 50;
      } else {
        BMR = 10 * weight + 6.25 * heightInCm - 5 * ageOfUser - 150;
      }

      return BMR;
  }

//   Daily calories depends on daily exercising
  function calculateDailyCalories(basalMetabolicRate, doesUserExercise) {
    return doesUserExercise === "yes"
    ? basalMetabolicRate * 1.6
    : basalMetabolicRate * 1.4;
}


//   idealWeight: 22.5 x height (m) x height (m)
function calculateIdealWeight(height) {
     return 22.5 * height * height;
}

// It is better to gain or lose weight for 500 g every week
function calculateDietWeeks(weightToLose) {
    return Math.abs(weightToLose / 0.5);
  }

//   You may need to gain weight or to lose
  function calculateDietCalories(weightToLose, caloriesUsedDaily) {
    return weightToLose > 0 ? caloriesUsedDaily - 500 : caloriesUsedDaily + 500;
  };

//  Validations!!!
  function validateNumberOfInputs(argv) {
    if (argv.length !== 7) {
        console.log(`
          You gave ${argv.length - 2} argument(s) to the program
      
          Please provide 5 arguments for
          
          weight (kg), 
          height (m), 
          age (years), 
          wether you exercise daily (yes or no)
          and your gender (m or f)
          
          Example:
      
          $ node index.js 82 1.79 32 yes m
        `);
    
        process.exit();
    }
  }

  function validateWeightHeightAndAge(weight, height, ageOfUser, argv) {
    if (isNaN(weight) || isNaN(height) || isNaN(ageOfUser)) {
      console.log(`
        Please make sure weight, height and age are numbers:
  
        weight (kg) example: 82 | your input: ${argv[2]}
        height (m) example 1.79 | your input: ${argv[3]}
        age (years) example 32  | your input: ${argv[4]} 
  
        $ node index.js 82 1.79 32 yes m
      `);
  
      process.exit();
    }

    if (ageOfUser < 20) {
        console.log(`We do not provide a calculator for people under 20 years old`);
        process.exit();
    };

    if (weight < 30 || weight > 300) {
        console.log(`You probbaly wrote a wrong weight, you wrote ${weight}, please try again`);
        process.exit();
    };

};

function validateDailyExercise(doesUserExercise) {
    if(doesUserExercise !== "yes" && doesUserExercise !== "no") {
        console.log(`You probably wrote wrong answer, you entered ${doesUserExercise}. 
        Please, provise "yes" if you exercese daily or "no" if not`);
        process.exit();
    };
}

function validateGender(genderOfUser) {
    if(genderOfUser !== "m" && genderOfUser !== "f") {
        console.log(`You entered gender ${genderOfUser}. 
        Please, provise "m" for male or "f" for female`);
        process.exit();
    }
}



function formatOutput(userObject) {
    // we can access properties on object like:
    // userObject.propertyName
    return `
      **************
      BMI CALCULATOR
      **************
  
      age: ${userObject.age} years
      gender: ${userObject.gender}
      height: ${userObject.heightInM} m
      weight: ${userObject.weightInKg} kg
      do you exercise daily? ${userObject.dailyExercise}
  
      ****************
      FACING THE FACTS
      ****************
  
      Your BMI is ${Math.round(userObject.BMI)}
  
      A BMI under 18.5 is considered underweight
      A BMI above 25 is considered overweight
  
      Your ideal weight is ${Math.round(userObject.idealWeightKg)} kg
      With a normal lifestyle you burn ${Math.round(userObject.dailyCalories)} calories a day
      **********
      DIET PLAN
      **********

      If you want to reach your ideal weight of ${Math.round(userObject.idealWeightKg)} kg:

      Eat ${Math.round(userObject.dietCalories)} calories a day
      For ${Math.round(userObject.dietWeeks)} weeks
    `;
}



// Our input
function bmiCalculator() {
    const weightInKg = parseInt(process.argv[2]);
    const heightInM = parseFloat(process.argv[3]);
    const age = parseInt(process.argv[4]);
    const dailyExercise = process.argv[5];
    const gender = process.argv[6];
  
    validateWeightHeightAndAge(weightInKg, heightInM, age, process.argv);
    validateDailyExercise(dailyExercise);
    validateGender(gender);


    // call functions
    const BMI = calculateBMI(weightInKg, heightInM);
    const idealWeightKg = calculateIdealWeight(heightInM);
    const BMR = calculateBMR(weightInKg, heightInM, age, gender);
    const dailyCalories = calculateDailyCalories(BMR, dailyExercise);
    const weightToLoseKg = weightInKg - idealWeightKg;
    const dietWeeks = calculateDietWeeks(weightToLoseKg);
    const dietCalories = calculateDietCalories(weightToLoseKg, dailyCalories);

    const user = {
        weightInKg: weightInKg,
        heightInM: heightInM,
        age: age,
        dailyExercise: dailyExercise,
        gender: gender,
        BMI: BMI,
        idealWeightKg: idealWeightKg,
        dailyCalories: dailyCalories,
        weightToLoseKg: weightToLoseKg,
        dietWeeks: dietWeeks,
        dietCalories: dietCalories,
      };
    
      const output = formatOutput(user);
      console.log(output);
    }
  
    bmiCalculator();

