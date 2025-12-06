import { Sentence, LearnSection } from './types';

export const SENTENCES: Sentence[] = [
  // Easy - Single rule or short
  { id: '1', correctText: "My cat likes to sleep on the sofa.", difficulty: 'easy' },
  { id: '2', correctText: "It is raining outside today.", difficulty: 'easy' },
  { id: '3', correctText: "The bus was late this morning.", difficulty: 'easy' },
  { id: '4', correctText: "I am going to the park.", difficulty: 'easy' },
  { id: '5', correctText: "She has a red balloon.", difficulty: 'easy' },
  { id: '6', correctText: "We love eating fish and chips.", difficulty: 'easy' },
  { id: '7', correctText: "He runs very fast.", difficulty: 'easy' },
  { id: '8', correctText: "The sun is hot today.", difficulty: 'easy' },
  { id: '9', correctText: "I want a new bike.", difficulty: 'easy' },
  { id: 'e1', correctText: "They played in the mud.", difficulty: 'easy' },
  { id: 'e2', correctText: "Look at that big dog.", difficulty: 'easy' },
  { id: 'e3', correctText: "I like blue cars.", difficulty: 'easy' },
  { id: 'e4', correctText: "Can we go home now?", difficulty: 'easy' },
  { id: 'e5', correctText: "The grass is green.", difficulty: 'easy' },
  { id: 'e6', correctText: "My mum is the best.", difficulty: 'easy' },
  { id: 'e7', correctText: "It is time for bed.", difficulty: 'easy' },

  // Medium - Places, Names, Days
  { id: '10', correctText: "We went to London on the train.", difficulty: 'medium' },
  { id: '11', correctText: "Sarah and Tom live in Manchester.", difficulty: 'medium' },
  { id: '12', correctText: "Is it sunny in Cornwall today?", difficulty: 'medium' },
  { id: '13', correctText: "I saw the River Thames yesterday.", difficulty: 'medium' },
  { id: '14', correctText: "Mr. Jones teaches maths on Fridays.", difficulty: 'medium' },
  { id: '15', correctText: "Every Monday, I play football.", difficulty: 'medium' },
  { id: '16', correctText: "Have you been to Edinburgh Castle?", difficulty: 'medium' },
  { id: '17', correctText: "My birthday is in December.", difficulty: 'medium' },
  { id: '18', correctText: "Queen Elizabeth was a famous monarch.", difficulty: 'medium' },
  { id: '19', correctText: "We visited Cardiff for our holiday.", difficulty: 'medium' },
  { id: 'm1', correctText: "Did Sam go to Tesco?", difficulty: 'medium' },
  { id: 'm2', correctText: "I think July is the best month.", difficulty: 'medium' },
  { id: 'm3', correctText: "We live near Hyde Park.", difficulty: 'medium' },
  { id: 'm4', correctText: "Is Paris in France?", difficulty: 'medium' },
  { id: 'm5', correctText: "My dog Rover barks at cats.", difficulty: 'medium' },
  { id: 'm6', correctText: "On Saturday, we eat pizza.", difficulty: 'medium' },
  { id: 'm7', correctText: "Does Harry like studying English?", difficulty: 'medium' },
  { id: 'm8', correctText: "We are going to Wales soon.", difficulty: 'medium' },
  { id: 'm9', correctText: "Mrs. White lost her hat.", difficulty: 'medium' },
  { id: 'm10', correctText: "Halloween is in October.", difficulty: 'medium' },

  // Hard - Multiple rules, specific proper nouns
  { id: '30', correctText: "Last August, Harry Potter visited Diagon Alley.", difficulty: 'hard' },
  { id: '31', correctText: "Dr. Smith works at St. Thomas' Hospital.", difficulty: 'hard' },
  { id: '32', correctText: "The Prime Minister lives at Downing Street.", difficulty: 'hard' },
  { id: '33', correctText: "On Tuesday, I will visit Uncle Bob in Liverpool.", difficulty: 'hard' },
  { id: '34', correctText: "Does Ben Nevis have snow on the top?", difficulty: 'hard' },
  { id: '35', correctText: "I think Wembley Stadium is huge.", difficulty: 'hard' },
  { id: '36', correctText: "My favourite book is Charlie and the Chocolate Factory.", difficulty: 'hard' },
  { id: '37', correctText: "We crossed the English Channel on a ferry.", difficulty: 'hard' },
  { id: '38', correctText: "Is Belfast the capital of Northern Ireland?", difficulty: 'hard' },
  { id: '39', correctText: "Please give this book to Mrs. Green.", difficulty: 'hard' },
  { id: 'h1', correctText: "Next Wednesday, Class 4 are visiting the Science Museum.", difficulty: 'hard' },
  { id: 'h2', correctText: "I wish I could go to Jupiter or Mars.", difficulty: 'hard' },
  { id: 'h3', correctText: "Did you know that Shakespeare wrote Hamlet?", difficulty: 'hard' },
  { id: 'h4', correctText: "We watched the BBC News at six o'clock.", difficulty: 'hard' },
  { id: 'h5', correctText: "My aunt lives near the North Sea.", difficulty: 'hard' },
  { id: 'h6', correctText: "Is Easter earlier than Christmas this year?", difficulty: 'hard' },
  { id: 'h7', correctText: "I speak English, French, and a little Spanish.", difficulty: 'hard' },
  { id: 'h8', correctText: "The Golden Gate Bridge is not in London.", difficulty: 'hard' },
  { id: 'h9', correctText: "Dr. Who travels in a police box.", difficulty: 'hard' },
  { id: 'h10', correctText: "I bought some Nike trainers from JD Sports.", difficulty: 'hard' },

  // Extreme - Multi-clause, direct speech, many capitals
  { id: 'x1', correctText: "On Wednesday, Mr. Bean flew to Paris to eat French toast.", difficulty: 'extreme' },
  { id: 'x2', correctText: "“Stop!” shouted Officer Dibble, chasing Top Cat down Main Street.", difficulty: 'extreme' },
  { id: 'x3', correctText: "I asked, “Can we go to McDonald's after the Arsenal match?”", difficulty: 'extreme' },
  { id: 'x4', correctText: "Every November, the British public remembers Guy Fawkes.", difficulty: 'extreme' },
  { id: 'x5', correctText: "Queen Victoria ruled the British Empire for sixty-three years.", difficulty: 'extreme' },
  { id: 'x6', correctText: "My friend James shouted, “Look at the London Eye over there!”", difficulty: 'extreme' },
  { id: 'x7', correctText: "We sailed across the Atlantic Ocean from Southampton to New York.", difficulty: 'extreme' },
  { id: 'x8', correctText: "Does Sir David Attenborough work for the BBC Natural History Unit?", difficulty: 'extreme' },
  { id: 'x9', correctText: "On New Year's Eve, we watched fireworks by the River Thames.", difficulty: 'extreme' },
  { id: 'x10', correctText: "I think The Lion, the Witch and the Wardrobe is C.S. Lewis's best book.", difficulty: 'extreme' }
];

export const LEARN_SECTIONS: LearnSection[] = [
  {
    id: 'start',
    title: 'Start of Sentences',
    icon: 'Flag',
    content: 'Every sentence must start with a capital letter. It tells the reader that a new thought is beginning.',
    examples: [
      { 
        incorrect: "the dog barked.", 
        correct: "The dog barked.", 
        explanation: "The first letter 'T' must be capitalised." 
      }
    ]
  },
  {
    id: 'pronoun',
    title: 'The Word "I"',
    icon: 'User',
    content: 'When you talk about yourself using the word "I", it is always a capital letter, no matter where it is in the sentence.',
    examples: [
      { 
        incorrect: "Am i late?", 
        correct: "Am I late?", 
        explanation: "The 'i' refers to yourself, so it must be 'I'." 
      }
    ]
  },
  {
    id: 'names',
    title: 'Names and Places',
    icon: 'MapPin',
    content: 'Proper nouns are special names for people, places, days of the week, and months. They always need a capital letter.',
    examples: [
      { 
        incorrect: "We went to london on tuesday.", 
        correct: "We went to London on Tuesday.", 
        explanation: "'London' is a city and 'Tuesday' is a day." 
      },
      {
        incorrect: "My friend sarah is nice.",
        correct: "My friend Sarah is nice.",
        explanation: "'Sarah' is a person's name."
      }
    ]
  },
  {
    id: 'speech',
    title: 'Direct Speech',
    icon: 'MessageSquare',
    content: 'When writing what someone says (direct speech), the first word inside the speech marks (inverted commas) must always start with a capital letter.',
    examples: [
      {
        incorrect: 'Dad said, "it is time for bed."',
        correct: 'Dad said, "It is time for bed."',
        explanation: "The first word spoken is 'It', so it needs a capital letter."
      },
      {
        incorrect: 'She asked, "where are my shoes?"',
        correct: 'She asked, "Where are my shoes?"',
        explanation: "The question inside the speech marks starts with 'Where'."
      }
    ]
  },
  {
    id: 'misconceptions',
    title: 'Common Mistakes',
    icon: 'AlertTriangle',
    content: 'Be careful! We do NOT use capital letters for seasons (spring, summer, autumn, winter) or general school subjects (science, history, maths), unless it is the name of a specific language like English.',
    examples: [
      {
        incorrect: "I love Summer holidays.",
        correct: "I love summer holidays.",
        explanation: "Seasons like 'summer' do not need a capital letter."
      },
      {
        incorrect: "I am good at Maths and History.",
        correct: "I am good at maths and history.",
        explanation: "General subjects are not proper nouns."
      },
      {
        incorrect: "He speaks french.",
        correct: "He speaks French.",
        explanation: "Languages and nationalities ALWAYS need a capital letter."
      }
    ]
  }
];